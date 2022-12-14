<template>
  <div id="app">
    <div style="background-color: #D1E8FF">
      <!--logo-->
      <el-image
        style="height: 100px"
        :src="logo"
        fit="fit">
      </el-image>
    </div>
    <!--导航菜单-->
    <el-menu :default-active="activeIndex"
             mode="horizontal"
             @select="handleSelect"
             class="el-menu-demo"
             text-color="#0056AB"
             active-text-color="#F56C6C"
             background-color="#D1E8FF"
             id="elMenu"
    >
<!--      <el-menu-item>
        <span style="font-size: 25px">LongevityGene-CancerDB</span>
      </el-menu-item>-->
      <!--Home-->
      <el-menu-item index="/home" style="margin-left:350px">
        <i class="el-icon-s-home"></i><span class="nav-font">Home</span>
      </el-menu-item>
      <!--Browser-->
      <el-menu-item index="/browser">
        <i class="el-icon-s-promotion"></i><span class="nav-font">Browser</span>
      </el-menu-item>
      <!--Search-->
      <el-menu-item index="/search">
        <i class="el-icon-search"></i><span class="nav-font">Search</span>
      </el-menu-item>
      <!--Analysis-->
      <el-menu-item index="/ana">
        <i class="el-icon-s-marketing"></i><span class="nav-font">Analysis</span>
      </el-menu-item>
      <!--Help-->
      <el-menu-item index="/help">
        <i class="el-icon-s-marketing"></i><span class="nav-font">Help</span>
      </el-menu-item>
      <!--Contact us-->
      <el-menu-item index="/contact">
        <i class="el-icon-phone"></i><span class="nav-font">Contact us</span>
      </el-menu-item>
    </el-menu>

    <el-container style="padding:0;">
      <el-main id="mainContent" style="margin-top: 80px;padding:0;">
        <router-view/>
      </el-main>
    </el-container>

    <!--footer-->
    <div id="footer">
      <br>
      <p style="color:#0056AB">Copyright © Guo Lab, School of Geographic and Biologic Information, Nanjing University
        of Posts and Telecommunications, Nanjing, China.</p>
      <p style="color:#0056AB">Liang Lab, College of Life Science, Nanjing Normal University, Nanjing, China</p>
      <p style="color:#0056AB">© All right Reversed. ICP9036104</p>
    </div>
  </div>
</template>

<script>
  import logo from './assets/logo.png'
  import l1 from './assets/results/lunbo/l1.jpeg'
  export default {
    name: 'App',
    data() {
      return {
        activeIndex: this.$router.path,
        logo: logo,
        l1: l1,
      };
    },
    methods: {
      // 导航菜单跳转
      handleSelect(key, keyPath) {
        this.$router.push(key)
      },
    }
  }
</script>

<style>
  #mainContent {
    max-width: 1400px;
    min-width: 600px;
    margin: auto;
  }

  body {
    padding: 0px;
    margin: 0px;
  }

  .nav-font {
    font-size: 20px;
  }

  .chart {
    border-color: #D1E8FF;
  }

  .main-color {
    background-color: #D1E8FF;
  }

  #footer {
    height: 140px;
    width: 100%;
    margin-top: 150px;
    background-color: #D1E8FF;
    text-align: center;
  }

</style>
