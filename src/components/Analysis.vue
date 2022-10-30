<template>
  <div>
    <el-tabs @tab-click="handleClick" type="border-card" style="border-color: #3a8ee6; border-width: 2px">
      <el-tab-pane label="mRNA Expression">
        <DiffR></DiffR>
      </el-tab-pane>
      <el-tab-pane label="DNA Methylation">
        <methy ref="methy"></methy>
      </el-tab-pane>
      <el-tab-pane label="Mutation">
        <Mut></Mut>
      </el-tab-pane>
      <el-tab-pane label="Copy Number Variance">
        <Cnv></Cnv>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import DiffR from "./dzx/DiffR";
  import Methy from "./dzx/Methy";
  import Mut from "./dzx/Mut";
  import Cnv from "./dzx/Cnv";
  export default {
    name: "Analysis",
    components: {
      DiffR,
      Methy,
      Mut,
      Cnv
    },
    methods: {
      handleClick() {
        this.refs.getMethyByGene();
      }
    },
  }
</script>

<style scoped>

</style>
