<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row>
          <el-col span="18" offset="3">
            <!--导航菜单-->
            <el-menu :default-active="activeIndex"
                     mode="horizontal" @select="handleSelect"
                     background-color="#EFFBF1"
                     text-color="#333745"
                     active-text-color="#E63462"
                     id="elMenu">
              <el-menu-item index="/home">Home</el-menu-item>
              <el-menu-item index="/browser">Browser</el-menu-item>
              <el-menu-item index="/search">Search</el-menu-item>
              <el-menu-item index="/download">Download</el-menu-item>
              <el-menu-item index="/help">Help</el-menu-item>
              <el-menu-item index="/geneManager">Manage</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main id="mainContent" style="margin-top: 40px">
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
    },
  }
}
</script>

<style>

body{
  margin: 0px;
  background-color: #EFFBF1;
}

#elMenu{
  margin: auto;
}

#mainContent {
  margin-left:  300px;
  margin-right: 300px;
}

</style>
