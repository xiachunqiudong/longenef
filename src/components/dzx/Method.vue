<template>
  <div>
    <el-timeline style="margin-top: 50px">
      <el-timeline-item>
        <el-card>
          <h1>mRNA Expression</h1>
          <ul>
            <li>
              <p class="intro-font">
                The data used for our analysis is log2(tpm + 0.01) sourced from TCGA and GTEx.
              </p>
            </li>
            <li>
              <p class="intro-font">
                The asterisk (*) represents the degree of difference.
              </p>
            </li>
            <li>
              <p class="intro-font">
                R Packages: limma
              </p>
            </li>
          </ul>
        </el-card>
      </el-timeline-item>
      <el-timeline-item>
        <el-card>
          <h1>Survival</h1>
          <!--差异表达分析数据来源为TCGA和GTEx的log2(tpm + 0.01)数据, 采用limma对其进行差异表达分析-->
          <ul>
            <li>
              <p class="intro-font">
                We use mRNA expression data from TCGA tumor patients for our analysis.
              </p>
            </li>
            <li>
              <p class="intro-font">
                We divide our samples into high and low expression groups using median gene expression as the cutoff.
              </p>
            </li>
            <li>
              <p class="intro-font">
                R Packages: survminer, survival
              </p>
            </li>
          </ul>
        </el-card>
      </el-timeline-item>
      <el-timeline-item>
        <el-card>
          <h1>ssGSEA</h1>
          <!--差异表达分析数据来源为TCGA和GTEx的log2(tpm + 0.01)数据, 采用limma对其进行差异表达分析-->
          <ul>
            <li>
              <p class="intro-font">
                We use mRNA expression data from TCGA tumor patients for our analysis.
              </p>
            </li>
            <li>
              <p class="intro-font">
                We divide our samples into high and low expression groups using median gene expression as the cutoff.
              </p>
            </li>
            <li>
              <p class="intro-font">
                R Packages: GSVA
              </p>
            </li>
          </ul>
        </el-card>
      </el-timeline-item>
      <el-timeline-item>
        <el-card>
          <h1>DNA Methylation</h1>
          <ul>
            <li>
              <p class="intro-font">
                DNA Methylation came from TCGA.
              </p>
            </li>
          </ul>
        </el-card>
      </el-timeline-item>
      <el-timeline-item>
        <el-card>
          <h1>Mutation</h1>
          <ul>
            <li>
              <p class="intro-font">
                Mutation came from TCGA.
              </p>
            </li>
          </ul>
        </el-card>
      </el-timeline-item>
      <el-timeline-item>
        <el-card>
          <h1>Copy Number Variance</h1>
          <ul>
            <li>
              <p class="intro-font">
                CNV came from TCGA.
              </p>
            </li>
          </ul>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  export default {
    name: "Method"
  }
</script>

<style scoped>
  .intro-font {
    font-size: 18px;
  }
</style>
