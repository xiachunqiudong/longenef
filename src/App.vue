<template>
  <div id="app">
              <!--导航菜单-->
            <el-menu :default-active="activeIndex"
                     mode="horizontal"
                     @select="handleSelect"
                     class="el-menu-demo"
                     background-color="#333745"
                     text-color="#FFFFFF"
                     active-text-color="#F56C6C"
                     id="elMenu">
              <el-menu-item index="/home" style="margin-left:500px">Home</el-menu-item>
              <el-menu-item index="/browser">Browser</el-menu-item>
              <el-menu-item index="/search">Search</el-menu-item>
              <el-menu-item index="/ana">Analysis</el-menu-item>
              <el-menu-item index="/contact">Contact us</el-menu-item>
            </el-menu>
    <el-container style="padding:0;">
      <el-main id="mainContent" style="margin-top: 50px;padding:0;">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: this.$router.path,
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

body{
  padding: 0px;
  margin: 0px;
}


</style>
