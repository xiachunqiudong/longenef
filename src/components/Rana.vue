<template>
  <div>
    <el-image
      style="width: 800px; height: 500px"
      :src="'data:image/png;base64,' + msg"
      fit="contain"></el-image>
    <el-button @click="getPic">click</el-button>
    </div>
</template>



<script>
  export default {
    name: "Rana",
    data() {
      return {
        msg: 'hello',
      }
    },
    methods: {
      getPic() {
        this.$http.get(this.api.rURL + "/ana").then(res=>{
          this.msg = res.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>
