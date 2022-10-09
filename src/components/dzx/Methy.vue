<template>
  <div>
    {{cancers}}
    {{methyList}}
  </div>
</template>

<script>
  export default {
    name: "Methy",
    data() {
      return {
        methyList: [],
        cancers: [],
      }
    },
    methods: {
      getMethyByGene(gene) {
        this.$http.get(this.api.dzxURL + '/methy/' + gene).then(res => {
          this.methyList = res.data;
          let methys = res.data;
          for(let i = 0; i < methys.length; i++) {
            let methy = methys[i];
            if(methy != null) {
              let id = methy.id;
              let cg = id.split("_");
              let cancer = cg[0];
              let gene = cg[1];
              this.cancers.append(cancer);
              let datas = methy.datas;
              methy.dataList = datas.split("#");
              methy.datas = "";
              console.log(methy)
            }
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>
