<template>
  <div>
    <!--Introduce-->
    <Intro></Intro>
    <!--PIPELINE-->
    <div style="margin-top: 50px;">
      <el-divider>
        <span style="font-size: 30px;">PIPELINE</span>
      </el-divider>
      <el-image
        :src="pipe"
        style="margin-top: 20px"
      >
      </el-image>
    </div>
    <!--长寿基因与药物的关系-->
    <div style="margin-top: 50px;">
      <el-divider>
        <span style="font-size: 30px;">DRUG RELATIONSHIPS</span>
      </el-divider>
      <el-image
        :src="drug"
        style="margin-top: 20px"
      >
      </el-image>
    </div>
  </div>
</template>

<script>
  // 结果图
  import Intro from "./home/Intro";
  import Result from "./home/Result"
  import pipe from "../assets/home/pipe.jpg"
  import drug from "../assets/home/drug.jpg"

  export default {
    name: "Index",
    components: {
      Intro,
      Result
    },
    data() {
      return {
        // 流程图
        pipe: pipe,
        drug: drug,
      }
    },
  }
</script>

<style scoped>

  /*轮播图*/
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    line-height: 300px;
    margin: 0;
  }

</style>
