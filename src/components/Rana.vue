<template>
  <div>
    <el-image
      style="width: 800px; height: 500px"
      :src="'data:image/png;base64,' + msg"
      fit="contain"></el-image>
    <el-input v-model="gene"></el-input>
    <el-button @click="getPic()">click</el-button>
    </div>
</template>


<script>
  export default {
    name: "Rana",
    data() {
      return {
        gene: ''
      }
    },
    methods: {
      getPic() {
        this.$http.get(this.api.rURL + "/diffpic/" + this.gene).then(res=>{
          this.msg = res.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>
