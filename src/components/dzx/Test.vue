<template>
  <div>
    <el-form :inline="true" :model="gene" class="demo-form-inline">
      <el-form-item label="Gene">
        <el-input v-model="gene" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addGene">Add</el-button>
      </el-form-item>
    </el-form>

    <p v-for="gene in geneLsit">{{gene}}</p>

  </div>
</template>

<script>
  export default {
    name: "Test",
    data() {
      return {
        gene: '',
        geneLsit: []
      }
    },
    methods: {
      addGene() {
        this.geneLsit.push(this.gene);
      }
    }
  }
</script>

<style scoped>

</style>
