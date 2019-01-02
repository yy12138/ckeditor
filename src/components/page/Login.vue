<template>
    <div class="login-wrap">
        <h2 class="manage-title">映九科技客户管理后台</h2>
        <div class="ms-login">
            <div class="ms-title"><h3>用户登陆</h3></div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
        <p class="login-tips">*推荐使用ie8或以上版本ie浏览器或Chrome内核浏览器访问本站</p>
    </div>
</template>

<script>
import Api from '@/api'; 

    export default {
        data: function(){
            return {
                ruleForm: {
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                login: Api.login
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.login, this.ruleForm).then(res => {
                            // console.log(res);
                            sessionStorage.setItem('token', 'Bearer ' + res.data.data.token);
                            sessionStorage.setItem('role', res.data.data.role);
                            sessionStorage.setItem('is_superuser', res.data.data.is_superuser);
                            this.$message.success('登录成功');
                            this.$router.push('/banner');
                        }).catch(err => {
                            // console.log('err',err);  
                            this.$message.error('登录失败,' + err.message);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        width:100%;
        height:100%;
        /* background-image: url(../../assets/login-bg.jpg); */
        background-color: #fff;
        background-size: 100%;
        text-align: center;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #212121;
        border-bottom: 1px solid #ddd;
    }
    .ms-title > h3{
        font-weight: 500;
        width: 80px;
        font-size: 18px;
        margin: 0 auto;
        position: relative;
    }
    .ms-title > h3::after {
        position: absolute;
        content: '';
        height: 2px;
        width: 100%;
        background-color: #212121;
        bottom: -1px;
        left: 0;;
    }
    .ms-login{
        width:450px;
        margin: 45px auto 15px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
        border: 1px solid #ddd;
        box-shadow: 1px 1px 2px 1px #a8a8a8;
    }
    .manage-title{
        color: #515151;
        margin-top: 30px;
        letter-spacing: 2px;
    }
    .ms-content{
        padding: 30px 80px 80px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
        background-color: #e63c3f;
        border: none;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#a8a8a8;
    }
</style>