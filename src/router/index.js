import Vue from 'vue'
import VueRouter from 'vue-router'
import AV from 'leancloud-storage'
// import { Toast } from 'vant'

const authFilter = (to, from, next) => {
    if (AV.User.current()) {
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
        path: '/topic-square',
        name: 'topic-square',
        component: () => import('../views/Topic-square.vue')
    },
    {
        path: '/topic-squareItem',
        name: 'topic-squareItem',
        component: () => import('../views/Topic-squareItem.vue')
    },
    {
        path: '/topic',
        name: 'tpic',
        component: () => import('../views/Topic.vue')
    },
    {
        path: '/topic',
        name: 'tpic',
        component: () => import('../views/Topic.vue')
    },
    {
        path: '/article-list',
        name: 'ArticleList',
        component: () => import('../views/ArticleList.vue')
    },
    {
        path: '/album-list',
        name: 'AlbumList',
        component: () => import('../views/AlbumList.vue')
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
        path: '/user-page/:id',
        name: 'UserPage',
        component: () => import('../views/UserPage.vue')
    },
    {
        path: '/edit-user',
        name: 'EditUser',
        component: () => import('../views/EditUser.vue'),
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
        path: '/details/:type/:id',
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
