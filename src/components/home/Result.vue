<template>
  <div>
    <el-card class="box-card" shadow="never">
      <el-image
        :src="s1"
      >
      </el-image>
    </el-card>
  </div>
</template>

<script>
  import s1 from "../../assets/results/s1.png"

  export default {
    name: "Result",
    data() {
      return {
        s1: s1,
      }
    }
  }
</script>

<style scoped>

</style>
