<template>
  <div>
    <el-card class="box-card">
      <div style="text-align: center">
        <span style="font-size: 28px">Contact Information</span>
      </div>
      <el-divider></el-divider>
      <p>
        Department of Bioinformatics, Smart Health Big Data Analysis and Location Services Engineering Lab of Jiangsu
        Province, School of Geographic and Biologic Information, Nanjing University of Posts and Telecommunications
      </p >
      <p>
        Nanjing 210023
      </p>
      <p>
        China
      </p>
      <p>
        Email:lguo@njupt.edu.cn
      </p>
    </el-card>
    <el-card class="box-card">
      <div style="text-align: center">
        <span style="font-size: 28px">Copyright ©</span>
      </div>
      <el-divider></el-divider>
      <br>
      <el-link type="primary" :underline="false" style="font-size: 18px; margin-bottom: 30px" href="http://cgb.njupt.edu.cn/">
        Guo Lab, School of Geographic and Biologic Information, Nanjing University of Posts and Telecommunications, Nanjing, China.

        Liang Lab, College of Life Science, Nanjing Normal University, Nanjing, China
      </el-link>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Contact"
  }
</script>

<style scoped>
  .box-card {
    margin-top: 100px;
    border-width: 2px;
    border-color: #3a8ee6;
  }

</style>
