<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-news"></i>新闻管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="handleAdd">添加</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable">
                <el-table-column prop="article_name" label="新闻标题" width="150">
                </el-table-column>
                <el-table-column prop="article_author" label="作者" width="80">
                </el-table-column>
                <el-table-column prop="is_show_mainpage" label="首页新闻" width="80">
                    <template slot-scope="mainpage">
                        <span>{{mainpage.row.is_show_mainpage === 1 ? '是' : '否'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="is_show_recommendlist" label="推荐资讯" width="80">
                    <template slot-scope="mainpage">
                        <span>{{mainpage.row.is_show_recommendlist === 1 ? '是' : '否'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="is_show_mainpage" label="文章类型" width="100">
                    <template slot-scope="mainpage">
                        <span>{{mainpage.row.article_type === 1 ? '公众号文章' : '普通文章'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="article_intro" label="简介" width="160">
                </el-table-column>
                <el-table-column prop="behits" label="点击量" width="80">
                </el-table-column>
                <el-table-column prop="defined_at" label="发布时间" width="150">
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="formatter">
                    <template slot-scope="status">
                        <span>{{status.row.status === 1 ? '正常' : status.row.status === 2 ? '已删除' : '隐藏'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalNum">
                </el-pagination>
            </div>
        </div>

        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="45%">
            <el-form ref="addForm" :model="addForm" label-width="120px" :rules="addRules">
                <el-form-item label="新闻标题" prop="article_name">
                    <el-input v-model="addForm.article_name" placeholder="请输入新闻标题"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="article_author">
                    <el-input v-model="addForm.article_author"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="article_intro">
                    <el-input v-model="addForm.article_intro" type="textarea" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="article_content">
                    <!-- <el-input v-model="addForm.article_content" type="textarea" :rows="10"></el-input> -->
                    <ckeditor :editor="editor" v-model="addForm.article_content" :config="editorConfig"></ckeditor>
                </el-form-item>
                <el-form-item label="点击量">
                    <el-input v-model="addForm.behits"></el-input>
                </el-form-item>
                <el-form-item label="是否为首页新闻" prop="is_show_mainpage">
                    <el-radio-group v-model="addForm.is_show_mainpage">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否为推荐资讯" prop="is_show_recommendlist">
                    <el-radio-group v-model="addForm.is_show_recommendlist">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="新闻类型" prop="article_type">
                    <el-radio-group v-model="addForm.article_type">
                        <el-radio :label="1">公众号文章</el-radio>
                        <el-radio :label="0">普通文章</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="微信公众号文章链接" prop="article_url">
                    <el-input v-model="addForm.article_url"></el-input>
                </el-form-item>
                <el-form-item label="首页新闻排名" prop="mainpage_order_id">
                    <el-input v-model="addForm.mainpage_order_id"></el-input>
                </el-form-item>
                <el-form-item label="新闻封面图" prop="article_coverimg">
                    <el-upload
                        class="upload-demo"
                        :action="upload" :data="{type: 'image'}"
                        :on-success="handleSuccess" :limit="1" ref="add_image" :on-remove="handleRemove">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="自定义发布时间" prop="defined_at">
                    <el-date-picker
                    v-model="addForm.defined_at"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select
                        v-model="addForm.classify_id" filterable remote clearable placeholder="请输入关键词"
                        :remote-method="remoteMethod" :loading="loading">
                        <el-option
                        v-for="item in remoteData"
                        :key="item.id"
                        :label="item.classify_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="45%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="新闻标题" prop="article_name">
                    <el-input v-model="form.article_name" placeholder="请输入新闻标题"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="article_author">
                    <el-input v-model="form.article_author"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="article_intro">
                    <el-input v-model="form.article_intro" type="textarea" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="article_content">
                    <!-- <el-input v-model="form.article_content" type="textarea" :rows="10"></el-input> -->
                    <ckeditor :editor="editor" v-model="form.article_content" :config="editorConfig"></ckeditor>
                </el-form-item>
                <el-form-item label="点击量">
                    <el-input v-model="form.behits"></el-input>
                </el-form-item>
                <el-form-item label="是否为首页新闻" prop="is_show_mainpage">
                    <el-radio-group v-model="form.is_show_mainpage">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否为推荐资讯" prop="is_show_recommendlist">
                    <el-radio-group v-model="form.is_show_recommendlist">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="新闻类型" prop="article_type">
                    <el-radio-group v-model="form.article_type">
                        <el-radio :label="1">公众号文章</el-radio>
                        <el-radio :label="0">普通文章</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="微信公众号文章链接" prop="article_url">
                    <el-input v-model="form.article_url"></el-input>
                </el-form-item>
                <el-form-item label="首页新闻排名" prop="mainpage_order_id">
                    <el-input v-model="form.mainpage_order_id"></el-input>
                </el-form-item>
                <el-form-item label="新闻封面图" prop="article_coverimg">
                    <el-upload
                        class="upload-demo"
                        :action="upload" :data="{type: 'image'}"
                        :on-success="handleEditSuccess" :limit="1" ref="edit_image" :on-remove="handleEditRemove">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="自定义发布时间" prop="defined_at">
                    <el-date-picker
                    v-model="form.defined_at"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select
                        v-model="form.classify_id" filterable remote clearable placeholder="请输入关键词"
                        :remote-method="remoteEditMethod" :loading="loading">
                        <el-option
                        v-for="item in remoteEditData"
                        :key="item.id"
                        :label="item.classify_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Api from '@/api'; 
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import MyCustomUploadAdapterPlugin from '@ckeditor/defined.js';

    export default {
        name: 'basetable',
        data() {
            return {
                url: Api.news,
                classify: Api.newsClassify,
                base: Api.base,
                upload: Api.upload,
                tableData: [],
                cur_page: 1,
                addVisible: false,
                editVisible: false,
                delVisible: false,
                form: {},
                addForm: {
                    article_name: '',
                    article_content: '',
                    article_intro: ''
                },
                delForm: {},
                addRules: {
                    article_name: [{required: true, message: '请输入标题', trigger: 'blur'}],
                    article_intro: [{required: true, message: '请输入简介', trigger: 'blur'}],
                    article_content: [{required: true, message: '请输入内容', trigger: 'blur'}]
                },
                totalNum: 0,
                currentAddImage: '',
                currentEditImage: '',
                loading: true,
                remoteData: [],
                remoteEditData: [],

                editor: ClassicEditor,
                editorConfig: {
                    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' , 'imageUpload', 'undo', 'redo' ],
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                        ]
                    },
                    extraPlugins: [ MyCustomUploadAdapterPlugin ]
                }
            }
        },
        watch: {
            addVisible: function (val, oldVal) {
                if (!val){
                    this.addForm = {};
                    this.$refs.add_image.clearFiles();
                    this.currentAddImage = '';
                }
            },
            editVisible: function (val, oldVal) {
                if (!val) {
                    this.form = {};
                    this.$refs.edit_image.clearFiles();
                    this.currentEditImage = '';
                }
            },
            delVisible: function (val, oldVal) {
                if (!val) {
                    this.delForm = {};
                }
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                this.$axios.get(this.url + '?page=' + this.cur_page).then((res) => {
                    console.log(res);
                    this.tableData = res.data.results;
                    this.totalNum = res.data.count
                }).catch((err) => {
                    console.log(err);
                    this.$message.error('获取数据失败');
                })
            },
            formatter(row, column) {
                return row.address;
            },
            handleAdd () {
                this.addVisible = true;
            },
            handleEdit(index, row) {
                this.$axios.get(this.url + row.id + '/').then(res => {
                    this.form = res.data;
                    this.editVisible = true;
                }).catch(err => {
                    console.log('banner single err', err);
                    this.$message.error('获取单条数据失败');
                })
            },
            handleDelete(index, row) {
                this.$axios.get(this.url + row.id + '/').then(res => {
                    this.delForm = res.data;
                    this.delVisible = true;
                }).catch(err => {
                    console.log('banner single err', err);
                    this.$message.error('获取单条数据失败');
                })
            },
            saveAdd () {
                if (this.currentAddImage) {
                    this.addForm.article_coverimg = this.currentAddImage;
                }
                if (this.addForm.is_show_mainpage) {
                    this.addForm.is_show_mainpage = Number(this.addForm.is_show_mainpage);
                }
                if (this.addForm.behits) {
                    this.addForm.behits = Number(this.addForm.behits);
                }
                if (this.addForm.mainpage_order_id) {
                    this.addForm.mainpage_order_id = Number(this.addForm.mainpage_order_id);
                }
                if (this.addForm.classify_id) {
                    this.addForm.classify_id = Number(this.addForm.classify_id);
                }
                if (this.addForm.article_type) {
                    this.addForm.article_type = Number(this.addForm.article_type);
                }
                if (this.addForm.is_show_recommendlist) {
                    this.addForm.is_show_recommendlist = Number(this.addForm.is_show_recommendlist);
                }
                console.log(this.addForm.article_content);
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.url, this.addForm).then(res => {
                            // console.log(res);
                            this.$message.success('添加成功');
                            this.addVisible = false;
                            this.addForm = {},
                            this.getData();
                            this.$refs.add_image.clearFiles();
                            this.currentAddImage = '';
                        }).catch(err => {
                            console.log('customer add err', err);
                            this.$message.error('添加失败');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            // 保存编辑
            saveEdit() {
                if (this.currentEditImage) {
                    this.form.article_coverimg = this.currentEditImage;
                }
                if (this.form.is_show_mainpage) {
                    this.form.is_show_mainpage = Number(this.form.is_show_mainpage);
                }
                if (this.form.behits) {
                    this.form.behits = Number(this.form.behits);
                }
                if (this.form.mainpage_order_id) {
                    this.form.mainpage_order_id = Number(this.form.mainpage_order_id);
                }
                if (this.form.classify_id) {
                    this.form.classify_id = Number(this.form.classify_id);
                }
                if (this.form.article_type) {
                    this.form.article_type = Number(this.form.article_type);
                }
                if (this.form.is_show_recommendlist) {
                    this.form.is_show_recommendlist = Number(this.form.is_show_recommendlist);
                }
                this.$axios.patch(this.url + this.form.id + '/', this.form).then(res => {
                    // console.log(res);
                    this.$message.success('修改成功');
                    this.editVisible = false;
                    this.form = {};
                    this.$refs.edit_image.clearFiles();
                    this.currentEditImage = '';
                    this.getData();
                }).catch(err => {
                    console.log('banner edit err', err);
                    this.$message.error('修改失败');
                })
            },
            // 确定删除
            deleteRow(){
                this.$axios.delete(this.url + this.delForm.id + '/').then(res => {
                    this.$message.success('删除成功');
                    this.getData();
                    this.delVisible = false;
                }).catch(err => {
                    console.log('banner delete err', err);
                    this.$message.error('删除失败');
                })
            },
            handleSuccess (response) {
                // console.log(response);
                this.currentAddImage = response.data.url;
            },
            handleRemove (file, fileList) {
                this.currentAddImage = '';
            },
            handleEditSuccess (response) {
                // console.log(response);
                this.currentEditImage = response.data.url;
            },
            handleEditRemove (file, fileList) {
                this.currentEditImage = '';
            },
            remoteMethod (e) {
                // console.log(e);
                this.$axios.get(this.classify + '?classify_name=' + e).then(res => {
                    // console.log(res);
                    this.remoteData = res.data.results;
                    this.loading = false;
                })
            },
            remoteEditMethod (e) {
                this.$axios.get(this.classify + '?classify_name=' + e).then(res => {
                    // console.log(res);
                    this.remoteEditData = res.data.results;
                    this.loading = false;
                })
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    img{
        height: 50px;
    }
</style>
