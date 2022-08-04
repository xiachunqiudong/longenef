<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>Manager</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">Add Gene</el-menu-item>
              <el-menu-item index="1-2">Add Info</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!--增加与修改Gene-->
        <el-dialog
          title="Add Gene"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleAddGeneClose">
              <el-form size="mini" :model="longene" class="demo-form-inline">
                <el-form-item label="Symbol">
                  <el-input v-model="longene.symbol" placeholder="symbol"></el-input>
                </el-form-item>
                <el-form-item label="entrezGeneId">
                  <el-input v-model="longene.entrezGeneId" placeholder="entrezGeneId"></el-input>
                </el-form-item>
                <el-form-item label="species">
                  <el-input v-model="longene.species" placeholder="species"></el-input>
                </el-form-item>
                <el-form-item label="description">
                  <el-input v-model="longene.description" placeholder="description"></el-input>
                </el-form-item>
                <el-form-item label="reference">
                  <el-input v-model="longene.reference" placeholder="reference"></el-input>
                </el-form-item>
                <el-form-item label="why">
                  <el-input v-model="longene.why" placeholder="why"></el-input>
                </el-form-item>
                <el-form-item label="source">
                  <el-input v-model="longene.source" placeholder="source"></el-input>
                </el-form-item>
                <el-form-item label="validated">
                  <el-radio-group v-model="longene.validated">
                    <el-radio label="true"></el-radio>
                    <el-radio label="false"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addGeneOne">Submit</el-button>
          </span>
          <!--通过文件上传基因-->
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="#"
            accept=".xlsx"
            :auto-upload="false"
            :on-change="uploadGeneList"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">drop file here or <em>click me</em></div>
            <div class="el-upload__tip" slot="tip">Excel File Only...</div>
          </el-upload>
        </el-dialog>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Gene Manager</span>
            <el-button style="float: right; padding: 5px 0;" type="text" @click="dialogVisible = true">Add Gene
            </el-button>
          </div>
          <div class="text item">
            <el-table
              size="medium"
              fit
              :data="genes.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column
                type="index">
              </el-table-column>
              <el-table-column
                label="Symbol"
                prop="symbol">
              </el-table-column>
              <el-table-column
                label="Species"
                prop="species">
              </el-table-column>
              <el-table-column
                label="Reference"
                prop="reference">
              </el-table-column>
              <el-table-column
                label="Validated"
                prop="validated">
              </el-table-column>
              <el-table-column
                label="Committed"
                prop="committed">
              </el-table-column>
              <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="Search"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">Edit
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">Delete
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin: 15px 0px;"
              background
              layout="prev, pager, next, jumper, total, sizes"
              @current-change="findPage"
              @size-change="findSize"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="size"
              :current-page="pageNow"
              :total="total">
            </el-pagination>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "GeneManager",
  data() {
    return {
      // 展示数据
      genes: [],
      // 分页相关
      size: 10,
      pageNow: 1,
      total: 100,
      dialogVisible: false,
      // 增改
      longene: {
        symbol: '',
        entrezGeneId: '',
        species: '',
        description: '',
        reference: '',
        why: '',
        source: '',
        validated: false,
        committed: false,
      }
    }
  },
  methods: {
    findPage(page) {
      this.pageNow = page;
      this.getAllGenes();
    },
    findSize(size) {
      this.size = size;
      this.getAllGenes();
    },
    getAllGenes(page, size) {
      page = page ? page : this.pageNow;
      size = size ? size : this.size;
      this.$http.get("http://localhost:8848/index/gene" + "/" + page + "/" + size).then(res => {
        this.genes = res.data.data;
        this.total = res.data.total;
      });
    },
    handleAddGeneClose(){
      this.dialogVisible = false;
    },
    // 添加新基因
    addGeneOne() {
      this.$http.post("http://localhost:8848/admin/gene", this.longene).then(res => {
        if (res.data.ok) {
          this.$notify({
            title: 'Success',
            message: res.data.msg,
            type: 'success',
            duration: 700,
          });
          this.longene = {};
        } else {
          this.$notify({
            title: 'Fail',
            message: res.data.msg,
            type: 'warning',
            duration: 700,
          });
        }
      });
      this.handleAddGeneClose();
      this.getAllGenes();
    },
    uploadGeneList(item) {
      let formData = new FormData()
      let file = item.raw
      formData.append('file', file)
      this.$http({
        url: 'http://localhost:8848/admin/geneAdd/file', //后端提供的接口
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(({data}) => {
        this.handleAddGeneClose();
        this.getAllGenes();
      })
    },
  },
  created() {
    this.getAllGenes()
  }
}
</script>

<style scoped>

.el-aside {
  text-align: center;
  line-height: 100%;
}

.el-main {
  text-align: center;
  line-height: 100%;
}


/*卡片*/
.text {
  font-size: 16px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>
