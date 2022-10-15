<template>
  <div>
    <!--轮播图-->
    <el-carousel indicator-position="outside" height="500px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>
          <el-image :src="src"></el-image>
        </h3>
      </el-carousel-item>
    </el-carousel>

    <div style="margin-top: 50px">
      <div class="first-card-header main-color">
        <span class="first-font">LongevityGene-CancerDB</span>
      </div>
      <el-card class="first-card" shadow="never">
        <div class="text item">
          <!--介绍部分-->
          <div>
            <h2 style="text-align: center">Welcome to Longivity And Cancer Online Analysis Database</h2>
            <p>
              Longevity has always been a sought-after goal, and the risk of cancer increases with age.
              The association between longevity genes and cancer is still unclear.
              This database is dedicated to find the association between longevity genes and cancer.
            </p>
            <p>
              One of the important questions in aging research is how differences in transcriptomics are associated with
              the longevity of various species. Unfortunately,
              at the level of individual genes, the links between expression in different organs and maximum lifespan
              (MLS) are yet to be fully understood.
              Analyses are complicated further by the fact that MLS is highly associated with other confounding factors
              (metabolic rate, gestation period, body mass, etc.)
              and that linear models may be limiting. Using gene expression from 41 mammalian species, across five
              organs,
              we constructed gene-centric regression models associating gene expression with MLS and other species
              traits.
              Additionally, we used SHapley Additive exPlanations and Bayesian networks to investigate the non-linear
              nature of the interrelations between the genes predicted to be determinants of species MLS.
              Our results revealed that expression patterns correlate with MLS, some across organs, and others in an
              organ-specific manner.
              The combination of methods employed revealed gene signatures formed by only a few genes that are highly
              predictive towards MLS, which could be used to identify novel longevity regulator candidates in mammals.
            </p>
          </div>
        </div>
      </el-card>
    </div>

    <div style="margin-top: 50px">
      <div class="first-card-header">
        <span class="first-font">Results</span>
      </div>
      <el-card class="first-card" shadow="never">
        <div class="text item">
          <!--结果展示-->
          <el-image
            style="width: 1200px; height: 800px"
            :src="survImg"
            :fit="scale-down"></el-image>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

  import surv from "../assets/home/surv.png"
  import gene from  "../assets/home/gene.jpg"

  export default {
    name: "Index",
    data() {
      return {
        overview: {},
        survImg: surv,
        src: gene,
      }
    },
    methods: {
      getOverView() {
        this.$http.get(this.api.reqURL + "/index/gene/overview").then(res => {
          console.log(res.data.data);
          this.overview = res.data.data;
        })
      }
    },
    created() {
      this.getOverView();
    }
  }
</script>

<style scoped>

  /* 一级卡片*/
  .first-card {
    border-radius: 0;
  }

  .first-font {
    color: #0056AB;
    font-size: 24px;
  }

  .first-card-header {
    background-color: #D1E8FF;
    color: #333745;
    height: 34px;
    text-align: center;
  }


  /*轮播图*/
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
