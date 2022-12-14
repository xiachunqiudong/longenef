<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>Longivity Gene</h3>
      </div>
      <div class="text item">
        <el-table
          :data="genes"
          style="width: 100%">
          <el-table-column
            label="ID"
            width="300">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Symbol"
            width="300">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Option">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="getMore(scope.$index, scope.row)">more</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页组件-->
      <el-pagination
        style="margin: 15px 0px;"
        background
        layout="prev, pager, next, jumper, total, sizes"
        @current-change="findPage"
        @size-change="findSize"
        :page-sizes="[5, 10, 15, 20, 25, 30]"
        :page-size="size"
        :current-page="pageNow"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
      title="Info"
      :visible.sync="dialogVisible"
      width="60%"
      >
      <Result ref="result" :gene="gene"></Result>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">cancel</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Result from "./gene/Result";
export default {
  name: "Broswer",
  components: {Result},
  data() {
    return {
      genes: [
        'APOE', 'FOFX'
      ],
      gene: '',
      size: 10,
      pageNow: 1,
      total: 100,
      dialogVisible: false
    }
  },
  methods: {
    getMore(index, gene) {
      this.gene = gene;
      this.dialogVisible = true;
      this.$refs.result.getGeneInfo(gene);
      this.$http.get(this.api.xdlURL + "/long/gene/addview/" + gene);
    },
    findPage(page) {
      this.pageNow = page;
      this.findAllGenes();
    },
    findSize(size) {
      this.size = size;
      this.findAllGenes();
    },
    findAllGenes(page, size) {
      page = page ? page : this.pageNow;
      size = size ? size : this.size;
      this.$http.get(this.api.xdlURL + "/long/gene/all" + "/" + page + "/" + size).then(res => {
        this.genes = res.data.data;
        this.total = res.data.counts;
      })
    },
  },
  created() {
    this.findAllGenes();
  },
}
</script>

<style scoped>
  .result {
    margin-top: 50px;
  }
</style>
