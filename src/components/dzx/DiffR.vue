<template>
  <div style="margin: auto; text-align: center">
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
        @change="getDiffPic">
        <!-- remote-method封装好的钩子函数。当用户在输入框中输入内容的时候，会触发这个函数的执行，
        把输入框对应的值作为参数带给回调函数，loading的意思就是远程搜索的时候等待的时间，即：加载中-->
        <el-option
          v-for="option in options"
          :label="option"
          :value="option"
          :key="option">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getDiffPic">Click</el-button>
    </div>
    <el-divider></el-divider>
    <el-empty description="Wait For Your Click" v-show="!show" style="height: 600px"></el-empty>
    <div v-loading="loading" v-show="show">

      <!--mRNA表达图片-->
      <el-image
        style=" height: 600px; width: 1250px"
        :src="'data:image/png;base64,' + img64"
        fit="contain">
      </el-image>
      <br>
      <el-button type="primary" round @click="downloadDiffImg">Download</el-button>

      <el-divider></el-divider>

      <!--mRNA差异表达数据-->
      <el-table
        :stripe="true"
        :data="diffList"
        height="500"
        border
        style="width: 100%;">
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
      <br>
      <el-button type="primary" round @click="downloadDiffData">Download</el-button>
      <br>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DiffR",
    data() {
      return {
        show: false,
        allGenes: [],
        options: [],
        // gene and cancer
        gene: 'APOE',
        img64: "",
        loading: false,
        diffList: [],
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
      // 获取基因表达水平图
      getDiffPic() {
        this.show = true;
        this.loading = true;
        this.img64 = "";
        this.$http.get(this.api.rURL + "/diffpic/" + this.gene).then(res => {
          this.img64 = res.data;
          this.$http.get(this.api.dzxURL + "/diff/" + this.gene).then(res => {
            this.diffList = res.data;
          });
          this.loading = false;
        });
      },
      downloadDiffImg() {
        let imgHref = this.api.dzxURL + "/diff/down/img/" + this.gene;
        let a = document.createElement('a');
        a.href = imgHref;
        a.click();
      },
      downloadDiffData() {
        let dataHref = this.api.dzxURL + "/diff/down/data/" + this.gene;
        let a = document.createElement('a');
        a.href = dataHref;
        a.click();
      },
    },
    mounted() {
      // 获取长寿基因列表
      this.$http.get(this.api.xdlURL + '/long/gene/all').then(res => {
        this.allGenes = res.data;
      });
    }
  }
</script>

<style scoped>

</style>
