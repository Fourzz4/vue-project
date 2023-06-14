//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route
import Login from '../views/static/login.vue'
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/static/login.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/static/login.vue')
    },
    {
        path: '/ums-admin',
        name: 'ums-admin',
        component: () => import('../views/static/ums-admin.vue')
    },
    {
        path: '/ums-role',
        name: 'ums-role',
        component: () => import('../views/static/ums-role.vue')
    },
    {
        path: '/ums-permission',
        name: 'ums-permission',
        component: () => import('../views/static/ums-permission.vue')
    },
    {
        path: '/ums-resource',
        name: 'ums-resource',
        component: () => import('../views/static/ums-resource.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue')
    }

]
//创建路由管理 router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

// 添加重定向逻辑
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated && to.name !== 'login') {
        ElMessage.warning('请先登录');
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
