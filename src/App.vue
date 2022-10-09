<template>
  <div id="app">
    <!--logo-->
    <el-image
      style="height: 90px"
      :src="logo"
      fit="fit">
    </el-image>
    <br>
    <!--导航菜单-->
    <el-menu :default-active="activeIndex"
             mode="horizontal"
             @select="handleSelect"
             class="el-menu-demo"
             text-color="#0056AB"
             active-text-color="#F56C6C"
             background-color="#D1E8FF"
             id="elMenu">
      <el-menu-item>
        <span style="font-size: 25px">LongevityGene-CancerDB</span>
      </el-menu-item>
      <!--Home-->
      <el-menu-item index="/home" style="margin-left:150px">
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
  </div>
</template>

<script>
  import logo from './assets/home/aegip.png'
  export default {
    name: 'App',
    data() {
      return {
        activeIndex: this.$router.path,
        logo: logo,
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
    max-width: 1300px;
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

</style>
