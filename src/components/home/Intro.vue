<template>
  <div>
    <span style="font-size: 30px;">Welcome to Longevity And Cancer Online Analysis Database</span>
    <el-divider></el-divider>
    <el-row>
      <!--文字介绍-->
      <el-col span="14">
        <span style="font-size: 18px">
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
        </span>
      </el-col>
      <el-col span="10">
        <el-carousel height="400px">
          <el-carousel-item v-for="img in imgs" :key="img" style="text-align: center">
            <el-image
              style="width: 400px;"
              :src="img">
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import f1 from "../../assets/intro/1.png"
  import f2 from "../../assets/intro/2.png"

  export default {
    name: "Intro",
    data() {
      return {
        imgs: [f1, f2],
      }
    },
  }
</script>

<style scoped>

</style>
