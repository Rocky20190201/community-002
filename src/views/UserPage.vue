<template>
    <div id="my">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="用户信息" />
        <div class="bg" />
        <user-info :user-id="userId" />
        <tabs class="tab" v-model="active" color="#30b9c3" background="#fff" title-inactive-color="#000" title-active-color="#000" sticky swipeable animated >
            <tab title="作品">
                <!-- <album-list /> -->
                <article-list :get-list="getRecommend" :is-show-watch="false" :type="0" />
            </tab>
            <tab title="影集">
                <album-list :get-list="getAlbumList" />
            </tab>
            <tab title="说说">
                <article-list :get-list="getTalk" :is-show-watch="false" :type="2" />
            </tab>
        </tabs>
        <basic-footer />
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import UserInfo from '../components/user-Info'
import ArticleList from '../components/article-list'
import AlbumList from '../components/album-list'
import AV from 'leancloud-storage'

export default {
    name: 'my',
    components: {
        UserInfo,
        Tab,
        Tabs,
        ArticleList,
        AlbumList
    },
    data () {
        return {
            active: 0,
            userId: this.$route.params.id
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        async getRecommend (index = 1, size = 10) {
            const articleList = new AV.Query('ArticleList')
            articleList.skip((index - 1) * size)
            articleList.limit(size)
            // console.log(index, size)
            articleList.descending('likeNumber')
            articleList.equalTo('userId', this.userId)
            let list = await articleList.find()
            // console.log(list)
            list = list.map(item => {
                return {
                    id: item.id,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    ...item.attributes
                }
            })
            // console.log(list)
            return list
        },
        async getTalk (index = 1, size = 10) {
            const talkList = new AV.Query('TalkList')
            talkList.skip((index - 1) * size)
            talkList.limit(size)
            // console.log(index, size)
            talkList.descending('likeNumber')
            talkList.equalTo('userId', this.userId)
            let list = await talkList.find()
            // console.log(list)
            list = list.map(item => {
                return {
                    id: item.id,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    ...item.attributes
                }
            })
            // console.log(list)
            return list
        },
        async getAlbumList (index = 1, size = 10) {
            const albumList = new AV.Query('AlbumList')
            albumList.skip((index - 1) * size)
            albumList.limit(size)
            albumList.equalTo('userId', this.userId)
            // console.log(index, size)
            // albumList.descending('likeNumber')
            // articleList.addDescending('readNumber')
            let list = await albumList.find()
            // console.log(list)
            list = list.map(item => {
                return {
                    id: item.id,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    ...item.attributes
                }
            })
            // console.log(list)
            return list
        }
    }
}
</script>
<style lang="scss">
#my {
    .van-hairline--top-bottom::after {
        display: none;
    }
}
</style>
<style lang="scss" scoped>
#my {
    background: #fff;
    min-height: 100%;
}
.bg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 230px;
    background: #202528;
}
</style>
