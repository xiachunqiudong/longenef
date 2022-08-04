<template>
    <div>
        <el-container>
            <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Add Gene</span>
                    </div>
                    <div class="text item">
                        <el-form :model="longene" class="demo-form-inline">
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
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">Submit</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "GeneAdd",
    data() {
        return {
            longene: {
                symbol: '',
                entrezGeneId: '',
                species: '',
                description: '',
                reference: '',
                why: '',
                source: '',
                validated: false
            }
        }
    },
    methods: {
        // 提交基因功能
        onSubmit() {
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
            })
        }
    }
}
</script>

<style scoped>
.text {
    font-size: 14px;
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

.box-card {
    width: 600px;
    margin: 0 auto;

}
</style>
