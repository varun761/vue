import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            meta: { requireAuth: false },
            component: () => import('./views/Home.vue'),
        },
        {
            path: '/login',
            name: 'login',
            meta: { requireAuth: false },
            component: () => import('./views/Login.vue'),
        },
        {
            path: '/forgot',
            name: 'forgot',
            meta: { requireAuth: false },
            component: () => import('./views/ForgotPassword.vue'),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            meta: { requireAuth: true },
            component: () => import('./views/Dashboard.vue'),
        },
        {
            path: '*',
            name: 'Not Found',
            meta: { requireAuth: false },
            component: () => import('./views/NotFound.vue'),
        },

    ]
})
router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(to.name)
    if (to.meta.requireAuth === true && store.getters['user/currentUser'] === null) {
        next({ path: 'login' })
    } else if (store.getters['user/currentUser'] !== null && (to.name === 'login' || to.name === 'forgot')) {
        next({ path: 'dashboard' })
    } else {
        console.log(store.getters['user/currentUser'])
        next()
    }
})

export default router