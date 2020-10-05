<template>
    <div id="home">
        <search class="search" v-model="keys" shape="round" placeholder="搜索你感兴趣的内容和用户" @search="$router.push(`/article-list?keys=${keys}`)" />
        <tabs class="tab" v-model="active" color="#30b9c3" background="#202528" title-inactive-color="#bfc0c3" title-active-color="#bfc0c3" sticky swipeable animated >
            <tab title="关注">
                <Article-list :get-list="getAttention" :type="0"/>
            </tab>
            <tab title="推荐">
                <Article-list :get-list="getRecommend" :type="0" />
            </tab>
            <tab title="说说">
                <Article-list :get-list="getTalk" :type="2" />
            </tab>
        </tabs>
        <basic-footer />
    </div>
</template>

<script>
import { Search, Tab, Tabs } from 'vant'
import ArticleList from '../components/article-list'
import AV from 'leancloud-storage'
export default {
    name: 'home',
    components: {
        Search,
        Tab,
        Tabs,
        ArticleList
    },
    data () {
        return {
            keys: '',
            active: 1,
            userWatchList: []
        }
    },
    computed: {
    },
    async created () {
        if (AV.User.current()) await this.getUserData()
        // this.getAttention()
    },
    mounted () {
    },
    methods: {
        // 获取用户信息
        async getUserData () {
            const User = AV.Object.createWithoutData('_User', AV.User.current().id)
            await User.fetch().then(data => {
                // this.userLikeList = data.get('likeList')
                console.log(data.get('watchList'))
                const watchList = data.get('watchList')
                watchList.map(i => {
                    this.userWatchList.push(i.id)
                })
                console.log(this.userWatchList)
            })
        },
        async getRecommend (index = 1, size = 10) {
            const articleList = new AV.Query('ArticleList')
            articleList.skip((index - 1) * size)
            articleList.limit(size)
            // console.log(index, size)
            articleList.descending('likeNumber')
            // articleList.addDescending('readNumber')
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
            // articleList.addDescending('readNumber')
            let list = await talkList.find()
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
        async getAttention (index = 1, size = 10) {
            const articleList = new AV.Query('ArticleList')
            articleList.skip((index - 1) * size)
            articleList.limit(size)
            articleList.containedIn('userId', this.userWatchList)
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
        }
    }
}
</script>
<style lang="scss">
#home {
    .search {
        .van-search__content {
            background: #424e55;
        }
        .van-field__left-icon .van-icon {
            color: #fff;
        }
        .van-field__control {
            color: #Fff;
        }
    }
    .van-hairline--top-bottom::after {
        border-width: 0;
    }
    .van-tabs__nav--line {
        padding: 0 100px;
    }
    .van-tabs__line {
        bottom: 13px;
    }
    .van-tabs--line .van-tabs__wrap {
        height: 70px;
    }
}
</style>
<style lang="scss" scoped>
.search {
    background: #202528;
}
.tab {
}
</style>
