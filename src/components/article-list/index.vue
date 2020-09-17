<template>
    <pull-refresh v-model="pullRefreshLoading" @refresh="onRefresh" id="article-list">
        <list
            v-model="listLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div class="item">
                <van-row type="flex" align="center" class="name-time">
                    <div><img src="" class="avatar"></div>
                    <div>
                        <p class="name">新疆大街</p>
                        <p class="time">2020-01-02</p>
                    </div>
                    <div class="attention"><span>关注</span></div>
                </van-row>
                <p class="text van-multi-ellipsis--l2">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                <div class="img-1"><van-image width="100%" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" /></div>
                <van-row tyep="flex" class="imgs">
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                </van-row>
                <van-row type="flex" justify="space-between" align="center" class="information">
                    <div class="like">
                        <van-icon color="#6c7b8a" name="good-job-o" />
                        <!-- <van-icon color="#30b9c3" name="good-job" /> -->
                        &nbsp;1333点赞</div>
                    <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;390评论</div>
                    <div class="read">290阅读</div>
                </van-row>
            </div>
            <div class="item">
                <van-row type="flex" align="center" class="name-time">
                    <div><img src="" class="avatar"></div>
                    <div>
                        <p class="name">新疆大街</p>
                        <p class="time">2020-01-02</p>
                    </div>
                    <div class="attention"><span>关注</span></div>
                </van-row>
                <p class="text van-multi-ellipsis--l2">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                <div class="img-1"><van-image width="100%" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" /></div>
                <van-row tyep="flex" class="imgs">
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="img" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
                </van-row>
                <van-row type="flex" justify="space-between" align="center" class="information">
                    <div class="like">
                        <van-icon color="#6c7b8a" name="good-job-o" />
                        <!-- <van-icon color="#30b9c3" name="good-job" /> -->
                        &nbsp;1333点赞</div>
                    <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;390评论</div>
                    <div class="read">290阅读</div>
                </van-row>
            </div>
        </list>
    </pull-refresh>
</template>

<script>
import { List, PullRefresh } from 'vant'

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
        }
    },
    data () {
        return {
            pullRefreshLoading: false,
            listLoading: false,
            finished: false
        }
    },
    methods: {
        onRefresh () {
            this.isLoading = false
        },
        onLoad () {

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
        }

    }
    .text {
        padding: 0 40px 40px;
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
