<template>
  <div>
    <Intro></Intro>
    <!--介绍部分-->
    <div style="margin-top: 50px">
      <div class="first-card-header main-color">
        <span class="first-font">INTRODUCE</span>
      </div>
      <el-card class="first-card" shadow="never">
        <div class="text item">
          <div>
            <h2 style="text-align: center">Welcome to the Longevity And Cancer Online Analysis Database!</h2>
            <p style="font-size: 20px">
              Longevity has always been a sought-after goal, and the risk of cancer increases with age.
              The association between longevity genes and cancer is still unclear.
              This database is dedicated to find the association between longevity genes and cancer.
            </p>
            <p style="font-size: 20px">
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

    <!--overview-->
    <div style="margin-top: 50px">
      <div class="first-card-header main-color">
        <span class="first-font">OVERVIEW</span>
      </div>
      <el-card class="first-card" shadow="never">
        <el-row :gutter="40">
          <el-col span="14">
            <el-card class="box-card">
              <div slot="header">
                <span style="font-size: 25px">Statistics</span>
              </div>
              <h4>Number of longevity genes : {{overview.ngene}}</h4>
              <h4>Number of cancers : {{overview.ncancer}}</h4>
              <h4>Number of samples : {{overview.nsample}}</h4>
            </el-card>
          </el-col>
          <el-col span="10">
            <el-card class="box-card">
              <div slot="header">
                <span style="font-size: 25px">Hot Longevity Genes</span>
              </div>
              <el-table
                :data="geneRank"
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="gene"
                  label="Gene"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="view"
                  label="View"
                  width="200">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!--RESULT-->
    <div style="margin-top: 50px">
      <div class="first-card-header">
        <span class="first-font">RESULTS</span>
      </div>
      <el-image
        class="result"
        :src="f3"
        style="width: 1380px"
        :fit="scale-down">
      </el-image>
      <div class="text item" style="text-align: center">
        <!--结果展示-->
        <el-image
          class="result"
          :src="f1"
          :fit="scale-down">
        </el-image>
        <el-image
          class="result"
          :src="f2"
          :fit="scale-down">
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
  // 轮播图
  import gene from '../assets/results/lunbo/gene.jpg'
  import l1 from '../assets/results/lunbo/l1.jpeg'
  // 结果图
  import f1 from '../assets/results/f1.jpg'
  import f2 from '../assets/results/f2.png'
  import f3 from '../assets/results/f1.png'
  import Intro from "./home/Intro";

  export default {
    name: "Index",
    components: {
      Intro
    },
    data() {
      return {
        overview: {
          ngene: 360,
          ncancer: 1000,
          nsample: 1000,
        },
        geneRank: [],
        // 结果展示
        f1: f1,
        f2: f2,
        f3: f3,
        res: [f1, f2],
      }
    },
    methods: {
      getGeneRank() {
        this.$http.get(this.api.xdlURL + "/long/gene/all/rank").then(res => {
          this.geneRank = res.data;
        })
      },
      ov() {
        this.$http.get(this.api.xdlURL + "/long/ov").then(res => {
          this.overview = res.data;
        })
      },
    },
    created() {
      this.getGeneRank();
      this.ov();
    },
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
    line-height: 300px;
    margin: 0;
  }

  .result {
    height: 875px;
    margin: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

</style>
