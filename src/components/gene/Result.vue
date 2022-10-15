<template>
  <div>
    <el-card class="result" v-for="geneInfo in geneInfos" :key="geneInfo.symbol">
      <div>
        <el-descriptions title="Gene Info" column="1" border direction="vertical">
          <el-descriptions-item label="Symbol">
            <!--链接到geneCard-->
            <el-link type="primary" :underline="false"
                     :href="'https://www.genecards.org/cgi-bin/carddisp.pl?gene=' + geneInfo.symbol">
              {{geneInfo.symbol}}
            </el-link>
          </el-descriptions-item>
          <!--物种-->
          <el-descriptions-item label="Species">
            <el-tag size="small">
              {{geneInfo.species}}
            </el-tag>
          </el-descriptions-item>
          <!--snp-->
          <el-descriptions-item label="Snp Sites">
            {{geneInfo.snpSite}}
          </el-descriptions-item>
          <!--引用-->
          <el-descriptions-item label="Reference">
            {{geneInfo.title}}
          </el-descriptions-item>
          <!--对长寿影响-->
          <el-descriptions-item label="Longevity Influence">{{geneInfo.influence}}</el-descriptions-item>
          <!--实验验证-->
          <el-descriptions-item label="Validated">
            <el-tag size="small">{{geneInfo.validated}}</el-tag>
          </el-descriptions-item>
          <!--描述-->
          <el-descriptions-item label="Description">{{geneInfo.description}}</el-descriptions-item>
          <!--pmid-->
          <el-descriptions-item label="PMID">
            <el-link type="primary" :underline="false" :href="'https://pubmed.ncbi.nlm.nih.gov/' + geneInfo.pmid ">
              {{geneInfo.pmid}}
            </el-link>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Result",
    data() {
      return {
        pmid: 123,
        geneInfos: [],
      }
    },
    methods: {
      getGeneInfo(gene) {
        this.empShow = false;
        this.$http.get(this.api.xdlURL + "/long/geneinfo/" + gene).then(res => {
          this.geneInfos = res.data;
        });
      },
    }
  }
</script>

<style scoped>
  .result {
    margin-top: 50px;
  }
</style>
