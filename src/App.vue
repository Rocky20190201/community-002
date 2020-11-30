<template>
    <div>
        <div id="app-entrance" v-if="visible">
            <router-view />
            <p v-if="caseNumber" class="record">{{ caseNumber }}</p>
            <!-- 底部导航 -->
            <basic-footer v-if="$route.meta.isShowBasicFooter" />
        </div>
        <div v-if="!visible">
            <div class="topic-top">
                <h1>定制你感兴趣的主题</h1>
                <p>当有内容时会在第一时间提醒你 为你精准推荐优质内容</p>
            </div>
            <div class="topic-square">
                <div  class="topic-item" v-for="item in imgList" :key="item.title">
                    <input type="checkbox" name="item" class="input"><label></label>
                    <img :src="item.img" class="img" alt="">
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div class="btn-choice" @click.stop="windL()">
                至少选两项
            </div>
        </div>
    </div>
</template>

<script>
// import AV from 'leancloud-storage'
import { Notify } from 'vant'
export default {
    name: 'app',
    components: {
    },
    data () {
        return {
            visible: true,
            imgList: [],
            list: []
        }
    },
    computed: {
        caseNumber () {
            const domain = document.domain
            let text = null
            switch (domain) {
            case 'www.4jyungou.com':
                text = '陕ICP备20010593号-1'
                break
            }
            return text
        }
    },
    created () {
        // !AV.User.current()
        if (Number(window.performance.navigation.type) !== 1) {
            this.visible = false
            // console.log('首次被加载')
        } else {
            this.visible = true
            // console.log('页面被刷新')
        }
        this.imgList = [{
                name: 'tj',
                title: '推荐',
                img: require('./assets/topic1.png')
            }, {
                name: 'gz',
                title: '关注',
                img: require('./assets/topic2.png')
            }, {
                name: 'yx',
                title: '影像',
                img: require('./assets/topic3.png')
            }, {
                name: 'ly',
                title: '旅行',
                img: require('./assets/topic4.png')
            }, {
                name: 'qg',
                title: '情感',
                img: require('./assets/topic5.png')
            }, {
                name: 'wx',
                title: '文学',
                img: require('./assets/topic6.png')
            }, {
                name: 'sh',
                title: '生活',
                img: require('./assets/topic7.png')
            }, {
                name: 'sx',
                title: '思想',
                img: require('./assets/topic8.png')
            }, {
                name: 'ah',
                title: '爱好',
                img: require('./assets/topic9.png')
            }, {
                name: 'jsj',
                title: '教师节',
                img: require('./assets/topic10.png')
            }, {
                name: 'zy',
                title: '职业',
                img: require('./assets/topic11.png')
            }, {
                name: 'mp',
                title: '美篇',
                img: require('./assets/topic12.png')
            }]
    },
    mounted () {
    },
    methods: {
        windL () {
            this.list = []
            const oInput = document.getElementsByClassName('input')
            for (var i = 0; i < oInput.length; i++) {
                if (oInput[i].checked) {
                    this.list.push(oInput[i].checked)
                }
            }
            if (this.list.length > 1) {
                this.visible = true
                return
            }
            Notify({ type: 'warning', message: '至少选择两项' })
        }
    }
}
</script>
<style lang="scss" scoped>
#app-entrance {
    height: 100%;
}
.record {
    position: relative;
    z-index: 1;
    text-align: center;
    font-size: 28px;
    color: #666;
    margin-bottom: 20px;
}
.topic-top{
    margin-top: 60px;
    text-align: center;
    font-weight: normal;
    font-stretch: normal;
    color: #000;
    font-family: PingFangSC-Regular;
    h1{
        font-size: 42px;
    }
    p{
        font-size: 22px;
        margin: 10px 0 20px;
    }
}
.btn-choice{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 110px;
    color: #ffffff;
    text-align: center;
    line-height: 110px;
    background-color: #f7b233
}
.topic-square{
    text-align: center;
    display: flex;
    padding-top: 40px;
    flex-wrap: wrap;
    justify-content: center;
    .topic-item{
        width: 190px;
        height: 190px;
        position: relative;
        margin-bottom: 60px;
        input{
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
}
.topic-item:nth-of-type(3n-1){
    margin:0 40px;
}
.img{
    width: 100%;
    margin-bottom: 5px;
}
</style>
