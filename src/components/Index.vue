<template>
    <div>
        <el-carousel :interval="4000" indicator-position="outside" height="450px">
            <el-carousel-item v-for="img in imgs" :key="item">
                <h3 class="medium">
                    <el-image
                        :src="img"
                        style="height: 610px"
                        fit="fill">
                    </el-image>
                </h3>
            </el-carousel-item>
        </el-carousel>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>Longivity Gene</h3>
            </div>
            <div class="text item">
                <el-table
                    :data="genes"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="center" inline class="demo-table-expand">
                                <el-form-item label="Symbol : ">
                                    <span>{{ props.row.symbol }}</span>
                                </el-form-item>
                                <el-form-item label="EntrezGeneId : ">
                                    <span>{{ props.row.entrezGeneId }}</span>
                                </el-form-item>
                                <el-form-item label="Species : ">
                                    <span>{{ props.row.species }}</span>
                                </el-form-item>
                                <el-form-item label="Description : ">
                                    <span>{{ props.row.description }}</span>
                                </el-form-item>
                                <el-form-item label="Reference : ">
                                    <span>{{ props.row.reference }}</span>
                                </el-form-item>
                                <el-form-item label="Why : ">
                                    <span>{{ props.row.why }}</span>
                                </el-form-item>
                                <el-form-item label="Source : ">
                                    <span>{{ props.row.source }}</span>
                                </el-form-item>
                                <el-form-item label="Validated : ">
                                    <span>{{ props.row.validated }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
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
                        label="Validated"
                        prop="validated">
                    </el-table-column>
                    <el-table-column label="Option">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="getMore(scope.$index, scope.row.id)">more
                            </el-button>
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
    </div>
</template>

<script>
import indexImgs1 from "../assets/indexImgs/1.png"
import indexImgs2 from "../assets/indexImgs/2.png"
import indexImgs3 from "../assets/indexImgs/3.png"
import indexImgs4 from "../assets/indexImgs/4.png"

export default {
    name: "Index",
    data() {
        return {
            imgs: [indexImgs1, indexImgs2, indexImgs3, indexImgs4],
            genes: [],
            size: 10,
            pageNow: 1,
            total: 100,
        }
    },
    methods: {
        getMore(index, id){
            this.$notify.info({
                title: '消息',
                message: "index = " + index + "id = " + id
            });
        },
        findPage(page) {
            this.pageNow = page;
            this.findAllGenes();
        },
        findSize(size){
            this.size = size;
            this.findAllGenes();
        },
        findAllGenes(page, size){
            page = page ? page : this.pageNow;
            size = size ? size : this.size;
            this.$http.get(this.api.reqURL + "/index/gene" + "/" + page + "/" + size).then(res => {
                this.genes = res.data.data;
                this.total = res.data.total;
            })
        },
    },
    created() {
        this.findAllGenes()
    },
}
</script>

<style scoped>
/*轮播图*/
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

/*表格*/
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

/* 表格卡片 */
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

.box-card {
    width: 100%;
    margin-top: 50px;
}
</style>
