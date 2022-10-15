<template>
  <div>
    <div style="width: auto;height: 500px" id="methy" class="chart"></div>
  </div>
</template>

<script>
  export default {
    name: "Methy",
    data() {
      return {
        methyList: [],
      }
    },
    methods: {
      getMethyByGene(gene) {
        this.$http.get(this.api.dzxURL + '/methy/' + gene).then(res => {
          this.methyList = res.data;
          this.methyInit();
        })
      },
      methyInit() {
        let data = [];
        let cancers = [];
        for(let i = 0; i < this.methyList.length; i++) {
          let methy = this.methyList[i];
          data.push(methy.dataList);
          cancers.push(methy.cancer);
        }
        console.log(data);
        this.$echarts.init(document.getElementById('methy')).setOption( {
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
  }
</script>
