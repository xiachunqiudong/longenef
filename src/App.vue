<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo"
                 mode="horizontal" @select="handleSelect">
          <el-menu-item index="/index">Index</el-menu-item>
          <el-menu-item index="/search">Search</el-menu-item>
          <el-menu-item index="/download">Download</el-menu-item>
          <el-menu-item index="/help">Help</el-menu-item>
          <el-menu-item index="/geneManager">Manage</el-menu-item>
        </el-menu>

        <!--导航菜单-->

      </el-header>
      <el-main>
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
      console.log(key, keyPath);
      this.$router.push(key)
    }
  }
}
</script>

<style>
#app{
 margin-left: 400px;
  margin-right: 400px;
}
</style>
