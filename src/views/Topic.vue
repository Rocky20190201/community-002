<template>
    <div id="topic">
        <search class="search" v-model="keys" shape="round" placeholder="请输入想要搜索的影集" @search="$router.push(`/album-list?keys=${keys}`)" />
        <van-row type="flex" justify="space-between" align="center" class="list">
            <div>
                <router-link :to="`/topic-square`">
                    <div><van-image fit="cover" round :src="require('../assets/add2.png')" class="img" /></div>
                    <p>话题广场</p>
                </router-link>
            </div>
            <div v-for="item in userList" :key="item.id" class="item">
                <router-link :to="`/user-page/${item.id }`">
                    <div><van-image fit="cover" round :src="item.userImage" class="img" /></div>
                    <p>{{ item.username }}</p>
                </router-link>
            </div>
        </van-row>
        <album-list :get-list="getAlbumList" />
        <basic-footer />
    </div>
</template>

<script>
import { Search } from 'vant'
import AlbumList from '../components/album-list'
import AV from 'leancloud-storage'

export default {
    name: 'topic',
    components: {
        Search,
        AlbumList
    },
    data () {
        return {
            userList: [],
            keys: '',
            active: 0
        }
    },
    computed: {
    },
    async created () {
        this.userList = await this.getUserList()
    },
    mounted () {
    },
    methods: {
        async getAlbumList (index = 1, size = 10) {
            const albumList = new AV.Query('AlbumList')
            albumList.skip((index - 1) * size)
            albumList.limit(size)
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
        },
        async getUserList () {
            const user = new AV.Query('_User')
            // user.skip((index - 1) * size)
            user.limit(5)
            // console.log(index, size)
            user.descending('likeNumber')
            // articleList.addDescending('readNumber')
            let list = await user.find()
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
#topic {
    .search {
        .van-search__content {
            // background: #dbdbdb;
        }
        .van-field__left-icon .van-icon {
            // color: #fff;
        }
        .van-field__control {
            // color: #Fff;
        }
    }
}
</style>
<style lang="scss" scoped>
.search {
    background: #fff;
}
.list {
    padding: 30px 40px;
    background: #fff;
    line-height: 1;
    .img {
        width: 90px;
        height: 90px;
        vertical-align: top;
        margin-bottom: 8px;
        border-radius: 50%;
    }
    p {
        margin-top: 10px;
        font-size: 22px;
        color: #202528;
        text-align: center;
    }
}
</style>
