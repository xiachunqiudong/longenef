<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <h1>
        Longivity-cancer DB uses the following technical means:
      </h1>
      <ul>
        <li class="intro-font">
          Back-end development in Java, with Springboot and MybatisPlus
        </li>
        <li class="intro-font">
          Mysql database for data storage
        </li>
        <li class="intro-font">
          Front-end development with Vue and elementUI
        </li>
        <li class="intro-font">
          Fuzzy search support
        </li>
        <li class="intro-font">
          Switching between longevity genes and all genes
        </li>
        <li class="intro-font">
          Analysis and image download functions
        </li>
      </ul>
    </el-card>
    <!--使用介绍-->
    <el-card class="box-card" shadow="hover">
      <h1>
        Example Usage
      </h1>
      <!--浏览模块-->
      <h2>1. Browser</h2>
      <el-image :src="browserImg"></el-image>
      <el-card shadow="hover">
        <ol>
          <li>
            click the "more" button to get additional information.
          </li>
        </ol>
      </el-card>
      <!--搜索模块-->
      <h2>2. Search</h2>
      <el-image :src="searchImg"></el-image>
      <el-card shadow="hover">
        <ol>
          <li>
            please enter the gene you are interested in in this field
          </li>
          <li>
            this field also supports fuzzy searches
          </li>
        </ol>
      </el-card>
      <!--分析模块-->
      <h2>3. Analysis</h2>
      <!--差异表达分析-->
      <h3>3.1 mRNA Expression</h3>
      <el-image :src="diffImg"></el-image>
      <el-card shadow="hover">
        <ol>
          <li>
            click this switch button to toggle between longevity genes and all genes.
            The switch will be red for longevity genes and green for all genes.
          </li>
          <li>
            this field also supports fuzzy searches
          </li>
          <li>
            click this button to start the analysis
          </li>
          <li>
            click this button to download the pan-cancer expression image
          </li>
          <li>
            click this button to download the differential expression analysis result
          </li>
        </ol>
      </el-card>
      <!--生存分析-->
      <h3>3.2 Survival</h3>
      <el-image :src="survImg"></el-image>
      <el-card shadow="hover">
        <ol>
          <li>
            click this switch button to toggle between longevity genes and all genes.
            The switch will be red for longevity genes and green for all genes
          </li>
          <li>
            enter the cancer that you want to analyze
          </li>
          <li>
            this field also supports fuzzy searches
          </li>
          <li>
            click this button to start the analysis
          </li>
          <li>
            click this button to download the survival image
          </li>
        </ol>
      </el-card>
      <!--ssgsea-->
      <h3>3.3 ssGSEA</h3>
      <el-image :src="ssgseaImg"></el-image>
      <el-card shadow="hover">
        <ol>
          <li>
            click this switch button to toggle between longevity genes and all genes.
            The switch will be red for longevity genes and green for all genes
          </li>
          <li>
            enter the cancer that you want to analyze
          </li>
          <li>
            this field also supports fuzzy searches
          </li>
          <li>
            click this button to start the analysis
          </li>
          <li>
            click this button to download the ssGSEA image
          </li>
        </ol>
      </el-card>
      <!--DNA Methylation-->
      <h3>3.4 DNA Methylation</h3>
      <el-image :src="methyImg"></el-image>
      <el-card shadow="hover">
        <ol>
          <li>
            this field also supports fuzzy searches
          </li>
          <li>
            click this button to start the analysis
          </li>
        </ol>
      </el-card>
      <!--Mut-->
      <h3>3.5 Mutation</h3>
      <el-image :src="mutImg"></el-image>
      <el-card shadow="hover">
        <ol>
          <li>
            this field also supports fuzzy searches
          </li>
          <li>
            click this button to start the analysis
          </li>
        </ol>
      </el-card>
      <!--CNV-->
      <h3>3.6 Copy Number Variance</h3>
      <el-image :src="cnvImg"></el-image>
      <el-card shadow="hover">
        <ol>
          <li>
            this field also supports fuzzy searches
          </li>
          <li>
            click this button to start the analysis
          </li>
        </ol>
      </el-card>
    </el-card>
  </div>
</template>

<script>
  import diffImg from "../assets/help/diff.jpeg"
  import browserImg from "../assets/help/browser.png"
  import searchImg from "../assets/help/search.png"
  import survImg from "../assets/help/surv.png"
  import ssgsea from "../assets/help/gsea.png"
  import methy from "../assets/help/methy.png"
  import mut from "../assets/help/mut.png"
  import cnv from "../assets/help/cnv.png"

  export default {
    name: "Help.vue",
    data() {
      return {
        browserImg: browserImg,
        searchImg: searchImg,
        diffImg: diffImg,
        survImg: survImg,
        ssgseaImg: ssgsea,
        methyImg: methy,
        mutImg: mut,
        cnvImg: cnv
      }
    }
  }
</script>

<style scoped>

  .box-card {
    margin-top: 40px;
  }

  .intro-font {
    font-size: 20px;
  }
</style>
