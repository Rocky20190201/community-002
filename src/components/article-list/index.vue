<template>
    <pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" id="article-list">
        <list
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div v-for="item in listData" :key="item.id" @click="$router.push(`/details/${type}/${item.id}`)" class="item">
                <van-row type="flex" align="center" class="name-time">
                    <div><van-image fit="cover" :src="item.userImage" class="avatar" /></div>
                    <div>
                        <p class="name">{{ item.userName }}</p>
                        <p class="time">{{ format(item.updatedAt,'YYYY-MM-dd HH:mm') }}</p>
                    </div>
                    <div class="attention" @click.stop="watch(item)">
                        <span v-if="item.isWatch" class="active">已关注</span>
                        <span v-else >关注</span>
                    </div>
                </van-row>
                <p class="text van-multi-ellipsis--l2">{{ repalceHtml(item.content) }}</p>
                <div v-if="type === 0" class="img-1">
                    <van-image width="100%" lazy-load :src="imgUrlFun(item.content)" />
                    <!-- <img :src="imgUrlFun(item.content)" alt=""> -->
                </div>
                <van-row v-else tyep="flex" class="imgs">
                    <van-image v-for="imgItem in item.imageList" :key="imgItem" class="img" fit="cover" lazy-load :src="imgItem" />
                </van-row>
                <van-row type="flex" justify="space-between" align="center" class="information">
                    <div class="like" @click.stop="like(item)">
                        <van-icon v-if="!item.isLike" color="#6c7b8a" name="good-job-o" />
                        <van-icon v-else color="#30b9c3" name="good-job" />
                        &nbsp;{{ item.likeNumber }}点赞</div>
                    <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;0评论</div>
                    <div class="read">{{ item.readNumber }}阅读</div>
                </van-row>
            </div>
        </list>
    </pull-refresh>
</template>

<script>
import { List, PullRefresh } from 'vant'
import { format } from '../../utils/index'
import AV from 'leancloud-storage'

export default {
    name: 'article-list',
    components: {
        List,
        PullRefresh
    },
    props: {
        isList: {
            type: Boolean,
            default: true
        },
        getList: {
            type: Function,
            default: null
        },
        type: {
            type: Number,
            default: 0 // 0:文章 2:说说
        }
    },
    data () {
        return {
            listData: [],
            isLoading: false,
            isRefreshLoading: false,
            finished: false,
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
        async onLoad () {
            // console.log(this.getList)
            this.pageIndex++
            const listData = await this.getList(this.pageIndex, this.pageSize)
            if (listData.length === 0) this.finished = true
            else {
                listData.map(i => {
                    i.isLike = this.isLike(i.id)
                    i.isWatch = this.isWatch(i.userId)
                })
                this.listData.push.apply(this.listData, listData)
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
                i.isWatch = this.isWatch(i.id)
            })
            this.listData = listData
            this.isRefreshLoading = false
        },
        format (date, fmt) {
            return format(date, fmt)
        },
        imgUrlFun (str) {
            var data = ''
            str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                data = capture
            })
            const ipos = data.indexOf('?')
            // console.log
            return data.substring(0, ipos)
        },
        repalceHtml (str) {
            str = str.replace(/<[^>]+>|&[^>]+;/g, '').trim()// 去掉所有的html标签和&nbsp;之类的特殊符合
            return str.slice(0, 80)
        },
        // 获取用户信息
        async getUserData () {
            const User = AV.Object.createWithoutData('_User', AV.User.current().id)
            await User.fetch().then(data => {
                this.userLikeList = data.get('likeList')
                this.userWatchList = data.get('watchList')
            })
        },
        // 是否已关注
        isWatch (id) {
            const list = this.userWatchList.filter(i => {
                console.log(i.id, id)
                return i.id === id
            })
            return list.length !== 0
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
            const _class = this.type === 0 ? 'ArticleList' : 'TalkList'
            const like = AV.Object.createWithoutData(_class, item.id)
            item.isLike ? item.likeNumber-- : item.likeNumber++
            like.set('likeNumber', item.likeNumber)
            await like.save()
            const uesr = AV.Object.createWithoutData('_User', AV.User.current().id)
            const articleList = AV.Object.createWithoutData(_class, item.id)
            item.isLike ? uesr.remove('likeList', articleList) : uesr.add('likeList', articleList)
            uesr.save()
            this.getUserData()
            item.isLike = !item.isLike
        },
        // 关注
        async watch (item) {
            if (!AV.User.current()) {
                this.$router.push('/login')
                return false
            }
            const uesr = AV.Object.createWithoutData('_User', AV.User.current().id)
            console.log(item.userId)
            const Uesr = AV.Object.createWithoutData('_User', item.userId)
            item.isWatch ? uesr.remove('watchList', Uesr) : uesr.add('watchList', Uesr)
            uesr.save()
            this.getUserData()
            item.isWatch = !item.isWatch
        }
    }
}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.item {
    margin: 20px;
    background-color: #ffffff;
    box-shadow: 0px 5px 20px 0px rgba(50, 51, 94, 0.18);
    border-radius: 20px;
    .name-time {
        padding: 40px 40px 27px 40px;
        .avatar {
            display: block;
            width: 60px;
            height: 60px;
            margin-right: 30px;
            border-radius: 50%;
            overflow: hidden;
            background: #30b9c3;
        }
        .name {
            font-size: 24px;
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
            .active {
                background: #fff;
                color: #30b9c3;
            }
        }

    }
    .text {
        margin: 0 40px 40px;
        font-size: 24px;
        color: rgba(108, 123, 138, 0.7);
    }
    .imgs{
        padding: 0 40px;
        flex-wrap: wrap;
        .img {
            width: 203px;
            height: 203px;
            margin-bottom: 10px;
            border-radius: 10px;
            overflow: hidden;
            &:nth-child(3n+2) {
                margin: 0 10px 10px;
            }
        }
    }
    .information {
        padding: 18px 40px 29px;
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
    }
}
</style>
