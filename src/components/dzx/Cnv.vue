<template>
  <div>
    <!--搜索表单-->
    <div style="margin: 20px; text-align: center">
      <span style="font-size: 16px">Gene:&nbsp&nbsp</span>
      <el-select
        v-model="gene"
        filterable
        remote
        placeholder="please enter gene symbol"
        :remote-method="remoteMethod"
        @change="getCnvData"
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
      <el-button type="primary" @click="getCnvData">Click</el-button>
    </div>
    <el-divider></el-divider>
    <div style="width: auto;height: 600px" id="cnv" class="chart" v-loading="loading"></div>
  </div>
</template>

<script>
  export default {
    name: "Methy",
    data() {
      return {
        allGenes: [],
        options: [],
        // gene and cancer
        gene: 'APOE',
        cnvList: [],
        loading: false
      }
    },
    methods: {
      // 模糊搜索
      remoteMethod(query) {
        // 如果用户输入内容了，就发请求拿数据，远程搜索模糊查询
        if (query !== "") {
          this.options = this.allGenes.filter((item) => {
            // 大于-1说明只要有就行，不论是不是开头也好，中间也好，或者结尾也好
            return item.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        } else {
          this.options = [];
        }
      },
      // 拷贝数变异
      getCnvData() {
        this.loading = true;
        this.$http.get(this.api.xdlURL + "/long/gene/addview/" + this.gene);
        this.$http.get(this.api.dzxURL + '/cnv/' + this.gene)
          .then(res=>{
            this.cnvList = res.data;
            this.cnvInit();
            this.loading = false;
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
            title: [
              {
                text: 'CNV',
                left: 'center'
              },
              {
                text: 'Cancer Type',
                left: 'center',
                top: '95%'
              }
            ],
            xAxis: {
              type: 'category',
              position: 'bottom',
              show: true,
              axisLabel: {
                interval: 0,
                rotate: 40
              }
            },
            yAxis: {
              type: 'value',
              name: 'Copy Number Variance',
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
      // 获取长寿基因列表
      this.$http.get(this.api.xdlURL + '/long/gene/all').then(res => {
        this.allGenes = res.data;
      });
    }
  }
</script>
