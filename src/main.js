import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";
import CKEditor from '@ckeditor/ckeditor5-vue'
Vue.use(CKEditor);

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
    config => {
        let token = window.sessionStorage.getItem('token');
        if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.Authorization = token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    window.sessionStorage.setItem("token", "");
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
                    break;
                default: 
                    break;
            }
        }
        return Promise.reject(error.response.data) 
    }
);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');