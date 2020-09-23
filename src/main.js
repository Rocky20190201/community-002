import './styles/reset.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueGlobal from './vue-global'
import 'lib-flexible'
import { api } from './utils/api'
import { isPC } from './utils/index'
import { Row, Col, Icon, NavBar, Lazyload, Image } from 'vant'
import AV from 'leancloud-storage'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

if (isPC && document.documentElement.clientWidth > 450) {
    document.getElementById('app').style.display = 'none'
    var ifrm = document.createElement('iframe')
    ifrm.setAttribute('src', window.location.href)
    ifrm.style.width = '100%'
    ifrm.style.height = '100%'
    ifrm.style.border = '0'
    document.body.appendChild(ifrm)
} else {
    AV.init({
        appId: 'L8Aqrdx47CJ2Xwy1xTSUyKRL-MdYXbMMI',
        appKey: 'NuT2f2SdqmhIza5kYck9Q5jR'
        // serverURLs: 'https://aliasapi.luckms.com'
    })

    Vue.config.productionTip = false
    VueGlobal.init(Vue)

    Vue.use(VueQuillEditor, {
        placeholder: '请输入内容'
    })

    // 封装的axios添加到原型链上
    Vue.prototype.$api = api

    // ui插件
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Icon)
    Vue.use(NavBar)
    Vue.use(Image)
    Vue.use(Lazyload)

    window.vueApp = new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
}
