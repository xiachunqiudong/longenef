<template>
  <div id="samples">

  </div>
</template>

<script>
  export default {
    name: "SampleSta",
    data() {
      return{

      }
    },
    methods: {
      chartInit() {
        this.$echarts.init(document.getElementById("samples")).setOption({

        });
      }
    },

  }
</script>

<style scoped>

</style>
