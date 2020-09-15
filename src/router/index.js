import Vue from 'vue'
import VueRouter from 'vue-router'
// import AV from 'leancloud-storage'
// import { Toast } from 'vant'

// const authFilter = (to, from, next) => {
//     if (AV.User.current()) {
//         next()
//     } else {
//         next({
//             path: '/login'
//         })
//     }
// }

const routes = [
    {
        path: '/',
        redirect: '/home'
    }
]

const router = new VueRouter({
    // mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from) => {
    // 跳转页面回到顶部
    window.scrollTo(0, 0)
    document.body.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
})
Vue.use(VueRouter)

export default router
