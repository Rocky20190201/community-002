<template>
    <div id="album-list-page">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="搜索" />
        <sticky :offset-top="46">
        <search class="search" v-model="keys" @search="search" shape="round" placeholder="搜索你感兴趣的内容和用户" />
        </sticky>
        <album-list ref="articleList" :get-list="getRecommend" />
        <!-- <basic-footer /> -->
    </div>
</template>

<script>
import { Search, Sticky } from 'vant'
import AlbumList from '../components/album-list'
import AV from 'leancloud-storage'
export default {
    name: 'album-list-page',
    components: {
        Search,
        AlbumList,
        Sticky
    },
    data () {
        return {
            keys: this.$route.query.keys
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
            const albumList = new AV.Query('AlbumList')
            albumList.skip((index - 1) * size)
            albumList.limit(size)
            albumList.contains('title', this.keys)
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
        },
        search () {
            this.$refs.articleList.onRefresh()
        }
    }
}
</script>
<style lang="scss">
#album-list-page {
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
