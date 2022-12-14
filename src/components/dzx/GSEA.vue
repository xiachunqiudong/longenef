<template>
  <div style="margin: auto; text-align: center">
    <!--搜索表单-->
    <div style="margin: 20px;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="All Gene">
          <el-switch
            v-model="allGene"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="Cancer">
          <el-select v-model="cancer" filterable placeholder="Cancer">
            <el-option
              v-for="cancer in cancers"
              :key="cancer"
              :label="cancer"
              :value="cancer">
            </el-option>
          </el-select>
        </el-form-item>
        <!--all gene-->
        <el-form-item label="Gene" v-show="allGene">
          <el-input v-model="gene" placeholder="please enter gene symbol"></el-input>
        </el-form-item>
        <!--longivity gene-->
        <el-form-item label="Gene" v-show="!allGene">
          <el-select
            v-model="gene"
            filterable
            remote
            placeholder="please enter gene symbol"
            :remote-method="remoteMethod"
            :loading="loading">
            <!-- remote-method封装好的钩子函数。当用户在输入框中输入内容的时候，会触发这个函数的执行，
            把输入框对应的值作为参数带给回调函数，loading的意思就是远程搜索的时候等待的时间，即：加载中-->
            <el-option
              v-for="option in options"
              :label="option"
              :value="option"
              :key="option">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="getPic">Click</el-button>
      </el-form>
    </div>
    <!--结果展示模块-->
    <el-divider></el-divider>
    <el-empty description="Wait For Your Click" v-show="!show" style="height: 600px"></el-empty>
    <div v-loading="loading" v-show="show">
      <!--Surv-->
      <el-image
        style=" height: 800px;"
        :src="'data:image/png;base64,' + img64"
        fit="contain">
      </el-image>
      <br>
      <el-button type="primary" round @click="downloadImg">Download</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GSEA",
    data() {
      return {
        show: false,
        allGenes: [],
        options: [],
        // gene and cancer
        gene: 'APOE',
        cancer: 'BLCA',
        img64: "",
        loading: false,
        cancers: [],
        allGene: false
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
      getPic() {
        this.$http.get(this.api.xdlURL + "/long/gene/addview/" + this.gene);
        this.show = true;
        this.loading = true;
        this.img64 = "";
        this.$http.get(this.api.rURL + "/gsea/" + this.gene + "/" + this.cancer).then(res => {
          this.img64 = res.data;
          this.loading = false;
        });
      },
      downloadImg() {
        let imgHref = this.api.dzxURL + "/down/gsea/" + this.gene + "/" + this.cancer;
        let a = document.createElement('a');
        a.href = imgHref;
        a.click();
      },
    },
    mounted() {
      // 获取长寿基因列表
      this.$http.get(this.api.xdlURL + '/long/gene/all').then(res => {
        this.allGenes = res.data;
      });
      this.cancers = ["BLCA", "BRCA", "CHOL", "COAD", "ESCA",
        "HNSC", "KICH", "KIRC", "KIRP", "LIHC",
        "LUAD", "LUSC", "PRAD", "READ", "STAD",
        "THCA", "UCEC"];
    }
  }
</script>

<style scoped>

</style>
