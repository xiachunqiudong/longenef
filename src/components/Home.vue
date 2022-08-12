<template>
  <div>
    <div id="introduce">
      <el-card class="box-card">
        <div class="text item">
          <!--介绍部分-->
          <div id="welcome" style="margin-bottom: 5px">
            <h3 style="text-align: center">Longivity Hub: Welcome to Longivity Gene And Cancer Online Analysis Database</h3>
            <p>
              Gene expression profiles of AS and non-AS samples were curated from the
              GEOproject.Differential expression analysis was adopted fo rscreening AS-specificaging-
              related genes. LASSO regression analysis was presented for constructing a diagnostic
              model, and the discriminatory capacity was evaluated with ROC curves.
            </p>
            <p>
              Through
              consensus clustering analysis, aging-based molecular subtypes were conducted.
              Immune levels were estimated based on the expression of HLAs
            </p>
            <p>
              Gene expression profiles of AS and non-AS samples were curated from the
              GEOproject.Differential expression analysis was adopted fo rscreening AS-specificaging-
              related genes. LASSO regression analysis was presented for constructing a diagnostic
              model, and the discriminatory capacity was evaluated with ROC curves.
            </p>
            <p>
              Gene expression profiles of AS and non-AS samples were curated from the
              GEOproject.Differential expression analysis was adopted fo rscreening AS-specificaging-
              related genes. LASSO regression analysis was presented for constructing a diagnostic
              model, and the discriminatory capacity was evaluated with ROC curves.
            </p>
          </div>
          <el-divider style="color: black"></el-divider>
          <!--统计部分-->
          <div id="Over View">
            <h2 style="text-align: center">Over View</h2>
            <div>
              <h4>Genes: {{overview.ngene}}</h4>
              <h4>Cancers: 18</h4>
              <h4>Species: </h4>
            </div>
          </div>

          <el-divider></el-divider>

          <div id="Results">
            <h2 style="text-align: center">Results</h2>
            <br/>
            <br/>
            <div id="images">
              <el-row :gutter="10">
                <el-col :span="6" v-for="(img, index) in introduceImgs" :key="index">
                  <el-card :body-style="{ padding: '0px' }">
                    <el-image class="intro-image" :src="img" fit="fit">
                    </el-image>
                    <div style="padding: 1px; text-align: center; background-color: #E63462;">
                      <p>Volcano</p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>   
            </div>
          </div>

        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import indexImgs1 from "../assets/indexImgs/1.png"
import volcano from "../assets/home/volcano.png"

export default {
  name: "Index",
  data() {
    return {
      // intro图
      img1: indexImgs1,
      introduceImgs: [volcano, volcano, volcano, volcano],
      // over view
      overview: {},
    }
  },
  methods: {
    getOverView() {
       this.$http.get(this.api.reqURL + "/index/gene/overview").then(res=>{
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

#introduce{
  margin-top: 10px;
}
/* 卡片 */
.box-card {
  width: 100%;
  margin: auto;
  background-color: #BDEFC6;
}
.text {
  font-family: Helvetica Neue;
  font-size: 18px;
  color: #303133;
}
.item {
  padding-top: 5px;
}
/* 介绍文字 */
.introduceContent{
  font-size: 16px;
}

.el-divider{
  display: inline-block;
  background: black;
  border-top: 1px solid #E6EBF5;
}

/* 展示图片 */
.intro-image {
    width: 100%;
    height: 250px;
    display: block;
}

</style>
