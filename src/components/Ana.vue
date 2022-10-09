<template>
  <div>
    <el-card class="box-card" style="border-color: #333745;border-width: 2px">
      <div class="text item">
        <!--搜索表单-->
        <el-form :inline="true" :model="geneAndCancer" style="margin-top: 50px; margin-left: 20px;">
          <el-form-item label="Gene">
            <el-input v-model="geneAndCancer.gene" placeholder="Gene"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryByGeneAndCancer">Search</el-button>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <!--结果展示-->
        <!--log2fc-->
        <div class="chart-header"><span class="chart-header-font">Log2FC of Differential Analysis</span></div>
        <Diff ref="diff"></Diff>
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

  import Diff from "./dzx/Diff";
  import Methy from "./dzx/Methy";

  export default {
    name: 'Ana',
    data() {
      return {
        // gene and cancer
        geneAndCancer: {
          gene: 'ADPGK',
          cancer: 'ACC',
        },
        cancers: this.api.cancers,
        logfcAndMutData: [],
        cnvList: [],
        methyList: [],
      };
    },
    components: {
      Methy,
      Diff
    },
    methods: {
      logfcAndMut() {
        this.$http.post(this.api.reqURL + "/ana/general/logfcAndMut", this.geneAndCancer)
          .then(res => {
            if (res.data.ok) {
              this.logfcAndMutData = res.data.data;
              this.mutInit();
            } else {
              this.resShow = true
              this.$notify.error({
                title: 'warning',
                message: 'please check gene symbol!',
                type: 'waring',
                duration: 1000
              });
            }
          })
      },
      getCnvData() {
        this.$http.post(this.api.reqURL + "/ana/general/cnv", this.geneAndCancer)
          .then(res=>{
            if (res.data.ok) {
              this.cnvList = res.data.data;
              this.cnvInit();
            } else {
              this.resShow = true
              this.$notify.error({
                title: 'warning',
                message: 'please check gene symbol!',
                type: 'waring',
                duration: 1000
              });
            }
          })
      },
      queryByGeneAndCancer() {
        this.$refs.diff.getDiffList(this.geneAndCancer.gene);
        this.$refs.methy.getMethyByGene(this.geneAndCancer.gene);
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
    }
  }
</script>

<style scoped>
  .chart {
    border-style: groove;
    border-color: #333745;
  }

  .chart-header {
    margin-top: 60px;
    background-color: #333745;
    text-align: center;
    height: 30px;
  }

  .chart-header-font {
    color: #FFFFFF;
    font-size: 20px;
  }
</style>


