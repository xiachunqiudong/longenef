<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div class="text item">
        <el-form :inline="true" :model="searchDto">
          <el-form-item label="Gene">
            <el-input v-model="searchDto.gene" placeholder="gene"></el-input>
          </el-form-item>
          <el-form-item label="Cancer Type">
            <el-select v-model="searchDto.cancer" placeholder="cancer">
              <el-option label="LUAD" value="shanghai"></el-option>
              <el-option label="LUSC" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="GeneSearch">Search</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-empty :image-size="200" description="wait for your search" v-show="empShow"></el-empty>
      <el-descriptions title="Result" :column="1" border v-show="resShow" v-loading="loading">
        <el-descriptions-item label="symbol">{{searchResult.symbol}}</el-descriptions-item>
        <el-descriptions-item label="species">{{searchResult.species}}</el-descriptions-item>
        <el-descriptions-item label="reference">{{searchResult.reference}}</el-descriptions-item>
        <el-descriptions-item label="validated">{{searchResult.validated}}</el-descriptions-item>
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
      searchDto: {
        gene: '',
        cancer: '',
      },
      // 搜索部分
      resShow: false,
      empShow: true,
      loading: true,
      // 搜索数据展示
      searchResult: {},
      geneAgeLink: '',
    }
  },
  methods: {
    GeneSearch() {
      this.empShow = false;
      this.$http.post(this.api.reqURL + "/search", this.searchDto).then(res => {
          if(res.data.ok) {
            this.searchResult = res.data.data;
            this.geneAgeLink = 'http://genomics.senescence.info/genes/entry.php?hgnc=' + res.data.data.symbol;
            this.resShow = true;
          } else {
            alert("can not find");
            this.empShow = true;
          }
      });
    }
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
  width: 800px;
  margin: auto;
  margin-top: 100px;
}
</style>
