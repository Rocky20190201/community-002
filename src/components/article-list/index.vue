<template>
    <pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" id="article-list">
        <list
            v-if="listData.length !== 0 || !finished"
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <template v-if="listData.lenght !== 0">
                <div v-if="type === 1">
                    <img class="recommend_img" src="../../assets/recommend.png" alt="">
                    <div class="tui_img">
                        <div>
                            <img src="../../assets/tuijian1.png" alt="">
                            <p>#女性如何在婚姻中保持自我#</p>
                        </div>
                        <div>
                            <img src="../../assets/tuijian2.png" alt="">
                            <p>#用周杰伦专辑命名5亿年前三叶虫#</p>
                        </div>
                        <div>
                            <img src="../../assets/tuijian3.png" alt="">
                            <p>#用周杰伦专辑命名5亿年前三叶虫#</p>
                        </div>
                    </div>
                </div>
                <div v-for="item in listData" :key="item.id" @click="$router.push(`/details/${type}/${item.id}`)" class="item">
                    <van-row type="flex" align="center" class="name-time">
                        <div @click.stop="$router.push(`/user-page/${item.userId }`)"><van-image fit="cover" :src="item.userImage" class="avatar" /></div>
                        <div @click.stop="$router.push(`/user-page/${item.userId }`)">
                            <p class="name">{{ item.userName }}</p>
                            <p class="time">{{ format(item.updatedAt,'YYYY-MM-dd HH:mm') }}</p>
                        </div>
                        <div v-if="item.userId !== userId && isShowWatch && type !==0" class="attention" @click.stop="watch(item)">
                            <span v-if="item.isWatch" class="active">已关注</span>
                            <span v-else >关注</span>
                        </div>
                    </van-row><div v-if="type !==2  && imgUrlFun(item.content)" class="img-1">
                        <van-image width="100%" lazy-load :src="imgUrlFun(item.content)" />
                        <!-- <img :src="imgUrlFun(item.content)" alt=""> -->
                    </div>
                    <van-row v-else tyep="flex" class="imgs">
                        <van-image v-for="imgItem in item.imageList" :key="imgItem" class="img" fit="cover" lazy-load :src="imgItem" />
                    </van-row>
                    <p class="text van-multi-ellipsis--l2">{{ repalceHtml(item.content) }}</p>
                    <van-row type="flex"  align="center" class="information">
                        <div class="like" @click.stop="like(item)">
                            <van-icon v-if="!item.isLike" color="#6c7b8a" name="good-job-o" />
                            <van-icon v-else color="#30b9c3" name="good-job" />
                            &nbsp;{{ item.likeNumber }}点赞</div>
                        <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;0评论</div>
                        <div class="read"><img style="width:13.5px" src="../../assets/read.png" alt="">{{ item.readNumber }}阅读</div>
                    </van-row>
                </div>
            </template>
        </list>
        <Empty v-else description="暂未发布相关内容" />
    </pull-refresh>
</template>

<script>
import { List, PullRefresh, Empty } from 'vant'
import { format } from '../../utils/index'
import AV from 'leancloud-storage'

export default {
    name: 'article-list',
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
        },
        type: {
            type: Number,
            default: 0 // 0:文章 2:说说
        },
        isShowWatch: {
            type: Boolean,
            default: true // 0:文章 2:说说
        }
    },
    data () {
        return {
            listData: [],
            isLoading: true,
            isRefreshLoading: false,
            finished: false,
            pageIndex: 0,
            pageSize: 20,
            userLikeList: [],
            userWatchList: [],
            userId: AV.User.current() ? AV.User.current().id : null
        }
    },
    async created () {
        if (AV.User.current()) {
            await this.getUserData()
            // this.getUserWatchList()
        } else this.isLoading = false
    },
    methods: {
        async onLoad () {
            console.log(1)
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
            if (listData.length === 0) this.finished = true
            console.log(this.finished)
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
                console.log(data.get('likeList'))
                this.userLikeList = data.get('likeList')
                this.userWatchList = data.get('watchList')
            })
            this.isLoading = false
        },
        // 是否已关注
        isWatch (id) {
            const list = this.userWatchList.filter(i => {
                return i.id === id
            })
            return list.length > 0
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
.recommend_img{
    width: 100%;
    margin-top: 20px;
}
.tui_img{
    display:flex;
    >div{
        position: relative;
        display: flex;
        align-items: center;
        margin: 20px;
        width: 207px;
        height: 136px;
        color: #fff;
        p{
            opacity: .7;
        }
    }
    img{
        width: 207px;
        position: absolute;
        top: 0;
        z-index: -1;
    }
}
.read{
    img{
        vertical-align: middle;
        margin-right: 8px;
    }
}
.item {
    margin-top: 20px;
    background-color: #ffffff;
    box-shadow: 0px 5px 20px 0px rgba(50, 51, 94, 0.18);
    // border-radius: 20px;
    .name-time {
        padding: 40px 40px 27px 40px;
        .avatar {
            display: block;
            width: 67px;
            height: 67px;
            margin-right: 30px;
            border-radius: 5px;
            overflow: hidden;
            // background: #30b9c3;
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
                background-color: #f7b233;
                border-radius: 24px;
                border: solid 1px #f7b233;
                font-size: 24px;
                color: #fff;
                text-align: center;
                line-height: 48px;
            }
            .active {
                background: #f7b233;
                color: #fff;
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
        >div{
            margin-right: 40px;
        }
    }
}
</style>
