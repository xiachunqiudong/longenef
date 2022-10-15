<template>
  <div>
    <div style="width: auto;height: 400px" id="logfc" class="chart"></div>
  </div>
</template>

<script>
  export default {
    name: "Diff",
    data() {
      return {
        diffList: [],
      }
    },
    methods: {
      getDiffList(gene) {
        this.$http.get(this.api.dzxURL + '/diff/' + gene).then(res => {
          this.diffList = res.data;
          this.logfcInit();
        })
      },
      logfcInit() {
        let cancers = [];
        let logfcs = [];
        let padjs = [];
        for (let i = 0; i < this.diffList.length; i++) {
          let diff = this.diffList[i];
          cancers.push(diff.cancer);
          logfcs.push(diff.logfc);
          padjs.push(diff.padj);
        }
        this.$echarts.init(document.getElementById('logfc')).setOption(
          {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: cancers,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0
              }
            },
            yAxis: {
              type: 'value',
              name: 'Log2FC',
              splitArea: {
                show: true
              }
            },
            series: [
              // log2fc
              {
                name: 'logfc',
                data: logfcs,
                type: 'bar',
                barWidth: '50%',
                // 添加log2fc = 1.2
                markLine: {
                  symbol: 'none',//去掉箭头
                  itemStyle: {
                    normal: { lineStyle: { type: 'solid', color:'red'}
                      ,label: { show: false, position:'left' } }
                  },
                  data: [{
                    name: 'Y 轴值为 100 的水平线',
                    yAxis: 1.2,
                  },
                    {
                      name: 'Y 轴值为 100 的水平线',
                      yAxis: -1.2,
                    },
                  ]
                }
              },
              // p-value
              {
                name: 'p-value',
                data: padjs,
                type: 'scatter',
                color:'rgba(128, 128, 128,0)'
              }
            ]
          }
        )
      },
    },
  }
</script>

