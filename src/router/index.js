import Vue from 'vue'
import VueRouter from 'vue-router'
import AV from 'leancloud-storage'
// import { Toast } from 'vant'

const authFilter = (to, from, next) => {
    if (!AV.User.current()) {
        next()
    } else {
        next({
            path: '/login'
        })
    }
}

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/topic',
        name: 'tpic',
        component: () => import('../views/Topic.vue')
    },
    {
        path: '/message-list',
        name: 'MessageList',
        component: () => import('../views/MessageList.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/my',
        name: 'My',
        component: () => import('../views/My.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/set',
        name: 'Set',
        component: () => import('../views/Set.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/publish-album',
        name: 'PublishAlbum',
        component: () => import('../views/PublishAlbum.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/publish-talk',
        name: 'PublishTalk',
        component: () => import('../views/PublishTalk.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/publish-article',
        name: 'PublishArticle',
        component: () => import('../views/PublishArticle.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/feedback',
        name: 'Feedback',
        component: () => import('../views/Feedback.vue')
    },
    {
        path: '/details',
        name: 'DetailsPage',
        component: () => import('../views/Details.vue')
    },
    {
        path: '/password-reset',
        name: 'PasswordReset',
        component: () => import('../views/PasswordReset.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue')
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: () => import('../views/privacy-agreement/privacy.vue')
    },
    {
        path: '/agreement',
        name: 'agreement',
        component: () => import('../views/privacy-agreement/agreement.vue')
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
