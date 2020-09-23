<template>
    <pull-refresh v-model="pullRefreshLoading" @refresh="onRefresh" id="album-list">
        <list
            v-model="listLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div class="left">
                <div class="item">
                    <div class="img-1"><van-image width="100%" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" /></div>
                    <van-row type="flex" justify="space-between" align="center" class="name-time">
                        <div><img src="" class="avatar"></div>
                        <p class="name">新疆大街</p>
                        <p class="time">12:00</p>
                    </van-row>
                    <p class="text van-multi-ellipsis--l3">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                    <van-row type="flex" justify="space-between" align="center" class="information">
                        <div class="like">
                            <van-icon color="#6c7b8a" name="good-job-o" />
                            <!-- <van-icon color="#30b9c3" name="good-job" /> -->
                            &nbsp;1333</div>
                        <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;390</div>
                        <div class="read">290</div>
                    </van-row>
                </div>
                <div class="item">
                    <div class="img-1"><van-image width="100%" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" /></div>
                    <van-row type="flex" justify="space-between" align="center" class="name-time">
                        <div><img src="" class="avatar"></div>
                        <p class="name">新疆大街</p>
                        <p class="time">12:00</p>
                    </van-row>
                    <p class="text van-multi-ellipsis--l3">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                    <van-row type="flex" justify="space-between" align="center" class="information">
                        <div class="like">
                            <van-icon color="#6c7b8a" name="good-job-o" />
                            <!-- <van-icon color="#30b9c3" name="good-job" /> -->
                            &nbsp;1333</div>
                        <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;390</div>
                        <div class="read">290</div>
                    </van-row>
                </div>
                <div class="item">
                    <div class="img-1"><van-image width="100%" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" /></div>
                    <van-row type="flex" justify="space-between" align="center" class="name-time">
                        <div><img src="" class="avatar"></div>
                        <p class="name">新疆大街</p>
                        <p class="time">12:00</p>
                    </van-row>
                    <p class="text van-multi-ellipsis--l3">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                    <van-row type="flex" justify="space-between" align="center" class="information">
                        <div class="like">
                            <van-icon color="#6c7b8a" name="good-job-o" />
                            <!-- <van-icon color="#30b9c3" name="good-job" /> -->
                            &nbsp;1333</div>
                        <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;390</div>
                        <div class="read">290</div>
                    </van-row>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="img-1"><van-image width="100%" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" /></div>
                    <van-row type="flex" justify="space-between" align="center" class="name-time">
                        <div><img src="" class="avatar"></div>
                        <p class="name">新疆大街</p>
                        <p class="time">12:00</p>
                    </van-row>
                    <p class="text van-multi-ellipsis--l3">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                    <van-row type="flex" justify="space-between" align="center" class="information">
                        <div class="like">
                            <van-icon color="#6c7b8a" name="good-job-o" />
                            <!-- <van-icon color="#30b9c3" name="good-job" /> -->
                            &nbsp;1333</div>
                        <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;390</div>
                        <div class="read">290</div>
                    </van-row>
                </div>
                <div class="item">
                    <div class="img-1"><van-image width="100%" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" /></div>
                    <van-row type="flex" justify="space-between" align="center" class="name-time">
                        <div><img src="" class="avatar"></div>
                        <p class="name">新疆大街</p>
                        <p class="time">12:00</p>
                    </van-row>
                    <p class="text van-multi-ellipsis--l3">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                    <van-row type="flex" justify="space-between" align="center" class="information">
                        <div class="like">
                            <van-icon color="#6c7b8a" name="good-job-o" />
                            <!-- <van-icon color="#30b9c3" name="good-job" /> -->
                            &nbsp;1333</div>
                        <div class="comment"><van-icon color="#6c7b8a" name="chat-o" />&nbsp;390</div>
                        <div class="read">290</div>
                    </van-row>
                </div>
            </div>
        </list>
    </pull-refresh>
</template>

<script>
import { List, PullRefresh } from 'vant'

export default {
    name: 'album-list',
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
#album-list {
    padding: 0 10px;
}
.left,
.right {
    display: inline-block;
    width: 345px;
    margin: 0 10px;
    vertical-align: top;
}
.item {
    // vertical-align: top;
    width: 100%;
    margin: 20px 0 0;
    background-color: #ffffff;
    box-shadow: 0px 5px 20px 0px rgba(50, 51, 94, 0.18);
    border-radius: 20px;
    overflow: hidden;
    .name-time {
        padding: 15px 15px 27px 15px;
        .avatar {
            display: block;
            width: 60px;
            height: 60px;
            margin-right: 10px;
            border-radius: 50%;
            overflow: hidden;
            background: #30b9c3;
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
    }
}
</style>
