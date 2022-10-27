<template>
  <div>
    <el-card class="box-card" style="border-color: #D1E8FF;border-width: 2px">
      <div class="text item">
        <!--搜索表单-->
        <div style="margin: 20px;">
          <span style="font-size: 16px">Gene:&nbsp&nbsp</span>
          <el-select
            v-model="gene"
            filterable
            remote
            placeholder="please enter gene symbol"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="queryByGeneAndCancer"
          >
            <!-- remote-method封装好的钩子函数。当用户在输入框中输入内容的时候，会触发这个函数的执行，
            把输入框对应的值作为参数带给回调函数，loading的意思就是远程搜索的时候等待的时间，即：加载中-->
            <el-option
              v-for="option in options"
              :label="option"
              :value="option"
              :key="option">
            </el-option>
          </el-select>
        </div>
          <el-form-item>
            <el-button type="primary" @click="queryByGeneAndCancer">Search</el-button>
          </el-form-item>
        <el-divider></el-divider>
        <!--结果展示-->
        <!--diffR-->
        <div class="chart-header"><span class="chart-header-font">mRNA Expression</span></div>
        <DiffR ref="diffr"></DiffR>
        <!--mut-->
        <div class="chart-header"><span class="chart-header-font">Mutation Rate</span></div>
        <div style="width: auto;height: 600px" id="mut" class="chart"></div>
        <!--Copy Number Variance-->
        <div class="chart-header"><span class="chart-header-font">Copy Number Variance</span></div>
        <div style="width: auto;height: 500px" id="cnv" class="chart"></div>
        <!--Methylation-->
        <div class="chart-header"><span class="chart-header-font">DNA Methylation</span></div>
        <Methy ref="methy"></Methy>
      </div>
    </el-card>
  </div>
</template>

<script>

  import Methy from "./dzx/Methy";
  import DiffR from "./dzx/DiffR";

  export default {
    name: 'Ana',
    data() {
      return {
        allGenes: [],
        options: [],
        // gene and cancer
        gene: 'APOE',
        geneAndCancer: {
          gene: 'APOE',
          cancer: 'ACC',
        },
        cancers: this.api.cancers,
        logfcAndMutData: [],
        cnvList: [],
        methyList: [],
      };
    },
    components: {
      DiffR,
      Methy,
    },
    methods: {
      logfcAndMut() {
        this.$http.post(this.api.reqURL + "/ana/general/logfcAndMut", this.geneAndCancer)
          .then(res => {
            this.logfcAndMutData = res.data.data;
            this.mutInit();
          })
      },
      // 模糊搜索
      remoteMethod(query) {
        // 如果用户输入内容了，就发请求拿数据，远程搜索模糊查询
        if (query !== "") {
          this.loading = true; // 开始拿数据喽
          this.options = this.allGenes.filter((item) => {
            // 大于-1说明只要有就行，不论是不是开头也好，中间也好，或者结尾也好
            return item.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
          this.loading = false // 拿到数据喽
        } else {
          this.options = [];
        }
      },
      // 拷贝数变异
      getCnvData() {
        this.$http.post(this.api.reqURL + "/ana/general/cnv", this.geneAndCancer)
          .then(res=>{
            this.cnvList = res.data.data;
            this.cnvInit();
          })
      },
      queryByGeneAndCancer() {
        this.$refs.diffr.getDiffPic(this.gene);
        this.$refs.methy.getMethyByGene(this.gene);
        this.logfcAndMut();
        this.getCnvData();
      },
      // mut初始化
      mutInit() {
        let cancers = [];
        let muts = [];
        let nomutes = [];
        cancers.push('Cancer');
        muts.push('Mutation');
        nomutes.push('No Mutation');
        for (let i = 0; i < this.logfcAndMutData.length; i++) {
          cancers.push(this.logfcAndMutData[i].cancer);
          muts.push(this.logfcAndMutData[i].mut)
          nomutes.push(1 - this.logfcAndMutData[i].mut)
        }
        let sets = [];
        let x = 8;
        let y = 16;
        let title = [];
        let a = 7;
        let b = 25;
        for(let i = 1; i < cancers.length; i++) {
          sets.push({
            type: 'pie',
            radius: '11%',
            center: [x + '%', y + '%'],
            encode: {
              itemName: 'Cancer',
              value: cancers[i]
            }
          });
          title.push({
            subtext: cancers[i],
            left: a + '%',
            top:  b + '%',
            textAlign: 'center',
          })
          x += 12;
          a += 12;
          if(i % 8 === 0) {
            x = 8;
            y += 22;
            a = 8;
            b += 22
          }
        }
        this.$echarts.init(document.getElementById('mut')).setOption(
          {
            title: title,
            legend: {},
            tooltip: {},
            label: {
              position: 'outer',
              alignTo: 'none',
              bleedMargin: 5
            },
            dataset: {
              source: [
                cancers,
                muts,
                nomutes,
              ]
            },
            series: sets,
          })
      },
      // cnv初始化
      cnvInit() {
        let data = [];
        let cancers = [];
        for(let i = 0; i < this.cnvList.length; i++) {
          let cnv = this.cnvList[i];
          data.push(cnv.dataList);
          cancers.push(cnv.cancer);
        }
        this.$echarts.init(document.getElementById('cnv')).setOption( {
            dataset: [
              {
                source: data
              },
              {
                transform: {
                  type: 'boxplot',
                  config: { itemNameFormatter: function (param) {
                      return cancers[param.value];
                    }
                  }
                }
              },
              {
                fromDatasetIndex: 1,
                fromTransformResult: 1
              }
            ],
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '10%',
              right: '10%',
              bottom: '15%'
            },
            xAxis: {
              type: 'category',

              axisLabel:{
                interval: 0,
                formatter: function (value) {
                  //x轴的文字改为竖版显示
                  var str = value.split("");
                  return str.join("\n");
                }
              }
            },
            yAxis: {
              type: 'value',
              name: 'Copy Number Variance',
              splitArea: {
                show: true
              }
            },
            series: [
              {
                name: 'boxplot',
                type: 'boxplot',
                datasetIndex: 1,
                with: '50%',
              },
              {
                name: 'outlier',
                type: 'scatter',
                datasetIndex: 2
              }
            ]
          }
        )
      }
    },
    mounted() {
      this.queryByGeneAndCancer();
      // 获取长寿基因列表
      this.$http.get(this.api.xdlURL + '/long/gene/all').then(res => {
        this.allGenes = res.data;
      });
    }
  }
</script>

<style scoped>

  .chart-header {
    margin-top: 60px;
    background-color: #D1E8FF;
    text-align: center;
    height: 30px;
  }

  .chart-header-font {
    color: #0056AB;
    font-size: 20px;
  }
</style>


