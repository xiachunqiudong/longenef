<template>
  <div>
    <el-card class="box-card" shadow="never" style="border-style: solid; border-color: #333745; border-width: 2px">
      <div class="text item">
        <div style="text-align: center">
          <span style="font-size: 16px">Gene:&nbsp&nbsp</span>
          <el-select
            v-model="gene"
            filterable
            remote
            placeholder="please enter gene symbol"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="GeneSearch"
          >
            <!-- remote-method封装好的钩子函数。当用户在输入框中输入内容的时候，会触发这个函数的执行，
            把输入框对应的值作为参数带给回调函数，loading的意思就是远程搜索的时候等待的时间，即：加载中-->
            <el-option
              v-for="option in options"
              :label="option"
              :value="option">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-empty :image-size="200" description="wait for your search" v-show="empShow"></el-empty>
      <el-card class="result" v-for="geneInfo in geneInfos" :key="geneInfo.gene">
        <div>
          <el-descriptions title="Gene Info" column="1" border>
            <el-descriptions-item label="symbol"><el-tag size="small">{{geneInfo.symbol}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="species"><el-tag size="small">{{geneInfo.species}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="reference">{{geneInfo.reference}}</el-descriptions-item>
            <el-descriptions-item label="validated"><el-tag size="small">{{geneInfo.validated}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="why">{{geneInfo.why}}</el-descriptions-item>
            <el-descriptions-item label="pmid">{{geneInfo.pmid}}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        // 模糊搜索
        allGenes: [],
        options: [],
        gene: '',
        // 搜索部分
        resShow: false,
        empShow: true,
        loading: false,
        // 搜索数据展示
        geneInfos: [],
        geneAgeLink: '',
      }
    },
    methods: {
      GeneSearch() {
        this.empShow = false;
        this.$http.get(this.api.reqURL + "/gene" + "/search" + '/' + this.gene).then(res => {
          if (res.data.ok) {
            this.geneInfos = res.data.data;
            this.geneAgeLink = 'http://genomics.senescence.info/genes/entry.php?hgnc=' + res.data.data.symbol;
            this.resShow = true;
          } else {
            alert("can not find");
            this.empShow = true;
          }
        });
      },
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
      }
    },
    mounted() {
      this.$http.get(this.api.reqURL + '/gene/all').then(res => {
        this.allGenes = res.data.data;
      })
    }
  }
</script>

<style scoped>

  /*搜索栏*/
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 1000px;
    margin: auto;
  }

  .result {
    margin-top: 50px;
  }
</style>
