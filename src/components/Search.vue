<template>
  <div>
    <el-card class="box-card" shadow="hover">
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
            size="medium"
            @change="GeneSearch"
          >
            <!-- remote-method封装好的钩子函数。当用户在输入框中输入内容的时候，会触发这个函数的执行，
            把输入框对应的值作为参数带给回调函数，loading的意思就是远程搜索的时候等待的时间，即：加载中-->
            <el-option
              v-for="option in options"
              :key="option"
              :label="option"
              :value="option">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-empty :image-size="200" description="wait for your search" v-show="empShow"></el-empty>
      <el-descriptions title="Result" :column="1" border v-show="resShow" v-loading="loading">
        <el-descriptions-item label="symbol">{{ searchResult.symbol }}</el-descriptions-item>
        <el-descriptions-item label="species">{{ searchResult.species }}</el-descriptions-item>
        <el-descriptions-item label="reference">{{ searchResult.reference }}</el-descriptions-item>
        <el-descriptions-item label="validated">{{ searchResult.validated }}</el-descriptions-item>
        <el-descriptions-item label="source">
          <el-link :underline="false" type="primary" :href="geneAgeLink">GenAge Link</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      // 模糊搜索
      allGenes:[],
      options: [],
      gene: '',
      // 搜索部分
      resShow: false,
      empShow: true,
      loading: false,
      // 搜索数据展示
      searchResult: {},
      geneAgeLink: '',
    }
  },
  methods: {
    GeneSearch() {
      this.empShow = false;
      this.$http.get(this.api.reqURL + "/search" + '/' + this.gene).then(res => {
        if (res.data.ok) {
          this.searchResult = res.data.data;
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
    this.$http.get(this.api.reqURL + '/genes').then(res => {
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
  background-color: #CEE3F8;
}
</style>
