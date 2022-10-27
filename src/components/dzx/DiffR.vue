<template>
  <div style="margin: auto">
    <el-image
      style=" height: 600px; width: 1250px"
      :src="'data:image/png;base64,' + img64"
      fit="contain"
      v-loading="loading"
      >
    </el-image>
    <el-table
      :data="diffList"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="gene"
        label="Gene">
      </el-table-column>
      <el-table-column
        prop="cancerType"
        label="Cancer Type">
      </el-table-column>
      <el-table-column
        prop="logFC"
        label="logFC">
      </el-table-column>
      <el-table-column
        prop="aveExpr"
        label="AveExpr">
      </el-table-column>
      <el-table-column
        prop="adjP"
        label="Adj.P">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "DiffR",
    data() {
      return {
        img64: "",
        loading: true,
        diffList: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      getDiffPic(gene) {
        this.img64 = "";
        this.loading = true;
        this.$http.get(this.api.rURL + "/diffpic/" + gene).then(res => {
          this.img64 = res.data;
          this.loading = false;
        });
        this.$http.get(this.api.dzxURL + "/diff/" + gene).then(res => {
          this.diffList = res.data;
        });
      }
    }
  }
</script>

<style scoped>

</style>
