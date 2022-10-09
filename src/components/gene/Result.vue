<template>
  <div>
    <el-card class="result" v-for="geneInfo in geneInfos">
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
          <el-descriptions-item label="Species"><el-tag size="small">
            {{geneInfo.species}}</el-tag>
          </el-descriptions-item>
          <!--引用-->
          <el-descriptions-item v-if="geneInfo.reference !== null && geneInfo.reference.length !== 0 && geneInfo.source !== 'genageHuman' " label="Reference">
            {{geneInfo.reference}}
          </el-descriptions-item>
          <!--来源-->
          <el-descriptions-item label="Source" v-if="geneInfo.source === 'genageHuman' ">
            <el-link type="primary" :underline="false" :href="'https://genomics.senescence.info/genes/entry.php?hgnc=' + geneInfo.symbol ">{{geneInfo.source}}</el-link>
          </el-descriptions-item>
          <!--实验验证-->
          <el-descriptions-item v-if="geneInfo.validated !== null && geneInfo.validated.length !== 0" label="Validated"><el-tag size="small">{{geneInfo.validated}}</el-tag></el-descriptions-item>
          <!--描述-->
          <el-descriptions-item v-if="geneInfo.why !== null && geneInfo.why.length !== 0" label="Description">{{geneInfo.why}}</el-descriptions-item>
          <!--对长寿影响-->
          <el-descriptions-item v-if="geneInfo.inf !== null && geneInfo.inf.length !== 0" label="Longevity Influence">{{geneInfo.inf}}</el-descriptions-item>
          <!--pmid-->
          <el-descriptions-item v-if="geneInfo.source !== 'genageHuman'" label="PMID">
            <el-link type="primary" :underline="false" :href="'https://pubmed.ncbi.nlm.nih.gov/' + geneInfo.pmid ">{{geneInfo.pmid}}</el-link>
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
          }
        },
        props: {
          geneInfos: [],
        }
    }
</script>

<style scoped>
  .result {
    margin-top: 50px;
  }
</style>
