<template>
  <div>
    <el-card class="box-card" shadow="never" style="border-style: solid; border-color: #D1E8FF; border-width: 2px">
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
              :value="option"
              :key="option">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-empty :image-size="200" description="wait for your search" v-show="empShow"></el-empty>
      <Result ref="result"></Result>
    </el-card>
  </div>
</template>

<script>
  import Result from "./gene/Result";
  export default {
    name: "Search",
    components: {
      Result
    },
    data() {
      return {
        // 模糊搜索7
        allGenes: [],
        options: [],
        gene: '',
        // 搜索部分
        resShow: true,
        empShow: true,
        loading: false,
        // 搜索数据展示
        geneInfos: [],
      }
    },
    methods: {
      GeneSearch() {
        this.empShow = false;
        this.$refs.result.getGeneInfo(this.gene);
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
      this.$http.get(this.api.xdlURL + '/long/gene/all').then(res => {
        this.allGenes = res.data;
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
    height: auto;
    margin: auto;
  }

</style>
