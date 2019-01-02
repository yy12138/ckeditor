import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/banner'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                },
                {
                    path: '/banner',
                    component: resolve => require(['../components/page/Banner.vue'], resolve),
                    meta: { title: 'banner图管理' }
                },
                {
                    path: '/manager',
                    component: resolve => require(['../components/page/Manager.vue'], resolve),
                    meta: { title: '管理员' }
                },
                {
                    path: '/basemanage',
                    component: resolve => require(['../components/page/Basemanage.vue'], resolve),
                    meta: { title: '基础信息管理' }
                },
                {
                    path: '/customer',
                    component: resolve => require(['../components/page/Customer.vue'], resolve),
                    meta: { title: '客户管理' }
                },
                {
                    path: '/team',
                    component: resolve => require(['../components/page/Team.vue'], resolve),
                    meta: { title: '顾问管理' }
                },
                {
                    path: '/news',
                    component: resolve => require(['../components/page/News.vue'], resolve),
                    meta: { title: '新闻管理' }
                },
                {
                    path: '/newsclassify',
                    component: resolve => require(['../components/page/Newsclassify.vue'], resolve),
                    meta: { title: '新闻分类管理' }
                },
                {
                    path: '/information',
                    component: resolve => require(['../components/page/Information.vue'], resolve),
                    meta: { title: '问答管理' }
                },
                {
                    path: '/customerapply',
                    component: resolve => require(['../components/page/CustomerApply.vue'], resolve),
                    meta: { title: '客户申请管理' }
                },
                {
                    path: '/test',
                    component: resolve => require(['../components/page/test.vue'], resolve),
                    meta: { title: '测试' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
