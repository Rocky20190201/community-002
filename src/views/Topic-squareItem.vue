<template>
    <div>
        <div class="top">
            <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder :title="title" />
        </div>
        <list finished-text="没有更多了" >
            <template>
                <div class="content" v-for="item in imgList" :key="item.title">
                    <van-image width="2.4rem" height="2.2rem" radius="5px" fit="cover" :src="item.img"/>
                    <div class="text_cont">
                        <div class="text">
                            <h2 style="font-family: PingFangSC-Medium;font-weight: 700;">{{item.title}}</h2>
                            <div class="text_num">
                                <p>{{item.text}}篇内容</p>
                                <p>{{item.join}}参与</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </list>
    </div>
</template>
<script>
import { List } from 'vant'
export default {
    name: 'topic-squareItem',
    components: { List },
    data () {
        return {
            title: '',
            listData: []
        }
    },
    computed: {
    },
    created () {
        this.imgList = [{
                text: '448',
                join: '5550',
                title: '分享我的过去',
                img: require('../assets/topic1.png')
            }, {
                text: '450',
                join: '5550',
                title: '影响我一生的那个人',
                img: require('../assets/topic2.png')
            }, {
                text: '450',
                join: '5550',
                title: '最难忘的是那件事',
                img: require('../assets/topic3.png')
            }, {
                text: '442',
                join: '5550',
                title: '分享我去过的书店',
                img: require('../assets/topic4.png')
            }, {
                text: '350',
                join: '5550',
                title: '老朋友再聚首，回头无望',
                img: require('../assets/topic5.png')
            }]
        switch (this.$route.params.title) {
            case 'tj' : this.title = '推荐'; break
            case 'gz' : this.title = '关注'; break
            case 'yx' : this.title = '影像'; break
            case 'ly' : this.title = '旅行'; break
            case 'qg' : this.title = '情感'; break
            case 'wx' : this.title = '文学'; break
            case 'sh' : this.title = '生活'; break
            case 'sx' : this.title = '思想'; break
            case 'ah' : this.title = '爱好'; break
            case 'jsj' : this.title = '教师节'; break
            case 'zy' : this.title = '职业'; break
            case 'mp' : this.title = '美篇'
        }
    },
    methods: {}
}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.top{
    margin-bottom: 20px;
}
.content{
    margin:0 30px;
    display: flex;
    align-items: center;
}
.text_cont{
    width: 7.6rem;
    padding: 55px 0;
    margin-left: 20px;
    border-bottom: 1px solid #e8e8e8;
}
.text{
    width: 50%;
}
.text_num{
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    color: #999;
    font-family: PingFangSC-Regular;
}
</style>
