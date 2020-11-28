<template>
    <pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" id="album-list">
        <list
            v-if="listDataL.length !== 0 || !finished"
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div class="left">
                <div v-for="item in listDataL" :key="item.id" @click="$router.push(`/details/1/${item.id}`)" class="item">
                    <div class="img-1"><van-image width="100%" fit="cover" lazy-load :src="item.imageList[0]" /></div>
                    <van-row @click.stop="$router.push(`/user-page/${item.userId }`)" type="flex" justify="space-between" align="center" class="name-time">
                        <div><van-image fit="cover" :src="item.userImage" class="avatar" /></div>
                        <p class="name">{{ item.userName }}</p>
                        <p class="time">{{ format(item.updatedAt,'HH:mm') }}</p>
                    </van-row>
                    <p class="text van-multi-ellipsis--l3">{{ item.title }}</p>
                    <van-row type="flex" align="center" class="information">
                        <div class="like" @click.stop="like(item)">
                            <van-icon v-if="!item.isLike" color="#6c7b8a" name="good-job-o" />
                            <van-icon v-else color="#30b9c3" name="good-job" />
                            &nbsp;{{ item.likeNumber }}</div>
                        <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;0</div>
                        <div class="read"><img style="width:13.5px" src="../../assets/read.png" alt="">{{ item.readNumber }}阅读</div>
                    </van-row>
                </div>
            </div>
        </list>
        <Empty v-else description="暂未发布相关内容" />
    </pull-refresh>
</template>

<script>
import { List, PullRefresh, Empty } from 'vant'
import { format } from '../../utils/index'
import AV from 'leancloud-storage'

export default {
    name: 'album-list',
    components: {
        List,
        PullRefresh,
        Empty
    },
    props: {
        isList: {
            type: Boolean,
            default: true
        },
        getList: {
            type: Function,
            default: null
        }
    },
    data () {
        return {
            isLoading: false,
            isRefreshLoading: false,
            finished: false,
            listDataL: [],
            listDataR: [],
            pageIndex: 0,
            pageSize: 20,
            userLikeList: [],
            userWatchList: []
        }
    },
    created () {
        if (AV.User.current()) {
            this.getUserData()
            // this.getUserWatchList()
        }
    },
    methods: {
        format (date, fmt) {
            return format(date, fmt)
        },
        async onLoad () {
            // console.log(this.getList)
            this.pageIndex++
            const listData = await this.getList(this.pageIndex, this.pageSize)
            if (listData.length === 0) this.finished = true
            else {
                listData.forEach((i, index) => {
                    i.isLike = this.isLike(i.id)
                    if (index % 2 === 0) this.listDataL.push(i)
                    else if (index % 2 !== 0) this.listDataR.push(i)
                })
                // this.listData.push.apply(this.listData, listData)
            }
            this.isLoading = false
            // console.log(this.listData[0])
        },
        async onRefresh () {
            this.pageIndex = 1
            this.finished = false
            const listData = await this.getList(this.pageIndex, this.pageSize)
            listData.map(i => {
                i.isLike = this.isLike(i.id)
            })
            this.listDataL = []
            this.listDataR = []
            listData.forEach((i, index) => {
                i.isLike = this.isLike(i.id)
                if (index % 2 === 0) this.listDataL.push(i)
                else if (index % 2 !== 0) this.listDataR.push(i)
            })
            // this.listData = listData
            // this.$forceUpdate()
            if (listData.length === 0) this.finished = true
            console.log(this.listData, listData)
            this.isRefreshLoading = false
        },
        // 获取用户信息
        async getUserData () {
            const User = AV.Object.createWithoutData('_User', AV.User.current().id)
            await User.fetch().then(data => {
                this.userLikeList = data.get('likeList')
                this.userWatchList = data.get('watchList')
            })
        },
        // 是否已点赞
        isLike (id) {
            const list = this.userLikeList.filter(i => i.id === id)
            return list.length !== 0
        },
        // 点赞
        async like (item) {
            if (!AV.User.current()) {
                this.$router.push('/login')
                return false
            }
            // console.log(item)
            const like = AV.Object.createWithoutData('AlbumList', item.id)
            item.isLike ? item.likeNumber-- : item.likeNumber++
            like.set('likeNumber', item.likeNumber)
            await like.save()
            const uesr = AV.Object.createWithoutData('_User', AV.User.current().id)
            const articleList = AV.Object.createWithoutData('AlbumList', item.id)
            item.isLike ? uesr.remove('likeList', articleList) : uesr.add('likeList', articleList)
            uesr.save()
            this.getUserData()
            item.isLike = !item.isLike
        }
    }
}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
#album-list {
    padding: 0;
}
.left,
.right {
    margin-bottom: 10px;
    vertical-align: top;
}
.read{
    img{
        vertical-align: middle;
        margin-right: 8px;
    }
}
.item {
    // vertical-align: top;
    width: 100%;
    margin: 20px 0 0;
    background-color: #ffffff;
    box-shadow: 0px 5px 20px 0px rgba(50, 51, 94, 0.18);
    // border-radius: 20px;
    overflow: hidden;
    .name-time {
        padding: 15px 15px 27px 15px;
        .avatar {
            display: block;
            width: 60px;
            height: 60px;
            margin-right: 10px;
            overflow: hidden;
            // background: #30b9c3;
        }
        .name {
            flex: 1;
            font-size: 22px;
            color: #000;
        }
        .time {
            font-size: 22px;
            color: #6c7b8a;
        }
        .attention {
            flex: 1;
            text-align: right;
            span {
                // display: ;
                display: inline-block;
                width: 136px;
                height: 48px;
                background-color: #30b9c3;
                border-radius: 24px;
                border: solid 1px #30b9c3;
                font-size: 24px;
                color: #fff;
                text-align: center;
                line-height: 48px;
            }
        }

    }
    .text {
        padding: 0 15px;
        font-size: 24px;
        color: rgba(108, 123, 138, 0.7);
    }
    .information {
        padding: 20px 15px 20px;
        font-size: 20px;
        color: #140f26;
        text-align: center;
        .van-icon {
            font-size: 32px;
            vertical-align: top;
        }
        .good-job-o {
            color: #6c7b8a;
        }
         >div{
            margin-right: 40px;
        }
    }
    .van-image {
        max-height: 300px;
        overflow: hidden;
    }
}
</style>
