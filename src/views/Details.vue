<template>
    <div id="details">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="" />
        <div class="content">
            <h1>为什么你这么爱问为什么？</h1>
            <van-row type="flex" justify="space-between" align="center" class="avatar-name-time">
                <div><img src="../assets/more.png" class="avatar"></div>
                <div class="">
                    <p class="name">名称名称</p>
                    <p class="time"><span class="label">#&nbsp;话题标签</span><span class="time">2020-10-01</span></p>
                </div>
                <div class="button-box"><Button size="mini" color="#30b9c3" class="button">关注</Button></div>
            </van-row>
            <div class="html"></div>
            <div class="shuo-shuo">
                <p class="text">由于杨素破陈有功，加之乐昌公主才色绝代，隋文帝就乱点鸳鸯，将乐昌公主送进杨素家中，赐为杨素小妾。杨素既仰慕乐昌公主的才华，又贪图乐昌公主的美色，因此就更加宠爱，还为乐昌公主专门营造了宅院。然而乐昌公主却终日郁郁寡欢，默无一语。</p>
                <grid :border="false" :column-num="3" :square="true" class="img-list">
                    <grid-item><van-image width="100%" height="100%" fit="cover" lazy-load :src="require('../assets/login-bg.png')" @click="showImg(0)" class="item" /></grid-item>
                </grid>
            </div>
            <div class="album">
                <div class="img"><van-image width="100%" lazy-load :src="require('../assets/login-bg.png')" @click="showImg(0)" alt="" /></div>
            </div>

        </div>
        <div class="comment-list">
            <h3>评论</h3>
            <van-row type="flex" justify="space-between" align="top" class="item">
                <div><img src="../assets/more.png" class="avatar"></div>
                <div class="right">
                    <van-row type="flex" justify="space-between" align="top" class="name-time">
                        <p class="name">Billy Tucker</p>
                        <p class="time">2020-10-01</p>
                    </van-row>
                    <p class="text">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                </div>
            </van-row>
            <van-row type="flex" justify="space-between" align="top" class="item">
                <div><img src="../assets/more.png" class="avatar"></div>
                <div class="right">
                    <van-row type="flex" justify="space-between" align="top" class="name-time">
                        <p class="name">Billy Tucker</p>
                        <p class="time">2020-10-01</p>
                    </van-row>
                    <p class="text">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                </div>
            </van-row>
            <van-row type="flex" justify="space-between" align="top" class="item">
                <div><img src="../assets/more.png" class="avatar"></div>
                <div class="right">
                    <van-row type="flex" justify="space-between" align="top" class="name-time">
                        <p class="name">Billy Tucker</p>
                        <p class="time">2020-10-01</p>
                    </van-row>
                    <p class="text">不知从什么时候开始。我变得连自己都觉到陌生。不得不承认，我们都更喜欢听谎言，即使已经知道真相。</p>
                </div>
            </van-row>
        </div>
        <van-row type="flex" justify="space-between" align="top" class="comment">
            <div @click="showCommentInput = true" class="input">期待你的美评</div>
            <div class="like">
                <p class="like-icon"><van-icon size="0.5rem" color="#6c7b8a" name="good-job-o" /><!-- <van-icon color="#30b9c3" name="good-job" /> --></p>
                <p class="nub">1223</p>
            </div>
        </van-row>
        <popup v-model="showCommentInput" :style="{ height: '100%' }" position="bottom" class="comment-input">
            <van-nav-bar fixed left-arrow @click-left="showCommentInput = false" placeholder title="发布美评" />
            <div class="textarea"><field v-model="val" type="textarea" rows="10" placeholder="请输入发布的美评" /></div>
            <div class="button"><Button @click="comment" :loading="loading" round block color="#30b9c3">提交美评</Button></div>
        </popup>
    </div>
</template>

<script>
import { Button, Grid, GridItem, ImagePreview, Popup, Field } from 'vant'

export default {
    name: 'details-page',
    components: {
        Button,
        Grid,
        GridItem,
        Popup,
        Field
    },
    data () {
        return {
            val: '',
            showCommentInput: false,
            loading: false,
            imgList: {
                images: [require('../assets/login-bg.png'), require('../assets/login-bg.png'), require('../assets/login-bg.png')],
                startPosition: 1
            }
        }
    },
    computed: {
    },
    created () {
        console.log(this.$route)
    },
    mounted () {
    },
    methods: {
        showImg (index) {
            this.imgList.startPosition = index
            ImagePreview(this.imgList)
        },
        comment () {}
    }
}
</script>
<style lang="scss">
#details {
    .html {
        img {
            max-width: 100%;
        }
    }
    .van-grid-item__content {
        padding: 10px 8px;
    }
}
</style>
<style lang="scss" scoped>
#details {
    padding-bottom: 105px;
    .content {
        padding: 0 30px 30px;
        background: #fff;
    }
    h1 {
        padding: 30px 0 40px;
        font-size: 34px;
        line-height: 1;
        text-align: center;
    }
    .avatar-name-time {
        margin-bottom: 20px;
        p  {
            line-height: 1;
        }
        .avatar {
            width: 65px;
            height: 65px;
            margin-right: 20px;
            vertical-align: top;
        }
        .name {
            margin-bottom: 10px;
            font-size: 28px;
            color: #666;
        }
        .time {
            font-size: 24px;
            color: #999;
        }
        .label {
            color: #7bc1ff;
            margin-right: 10px  ;
        }
        .button-box {
            flex: 1;
            text-align: right;
        }
        .button {
            width: 136px;
            height: 48px;
            background-color: #30b9c3;
            border-radius: 24px;
            border: solid 1px #30b9c3;
            font-size: 24px;
            color: #fff;
            line-height: 48px;
        }
    }
    .shuo-shuo .text {
        font-size: 24px;
        color: #000;
        line-height: 1.5;
    }
    .img-list {
        margin-top: 20px;
        // .item {
        //     width: 100%;
        //     height: 100%;
        // }
    }
    .album {
        margin: 0 -30px;
        .img {
            width: 100%;
        }
    }
    .comment-list {
        margin-top: 20px;
        padding: 0 30px;
        background: #fff;
        h3 {
            padding: 10px 0 10px;
            font-size: 24px;
            color: #6c7b8a;
        }
        .item {
            padding-top: 20px;
        }
        .avatar {
            width: 60px;
            height: 60px;
            margin-right: 30px;
        }
        .name {
            font-size: 24px;
            color: #000;
        }
        .time {
            font-size: 24px;
            color: #6c7b8a;
        }
        .text {
            margin-top: 15px;
            margin-right: -30px;
            padding-bottom: 20px;
            padding-right: 30px;
            border-bottom: 1px solid #eee;
            font-size: 24px;
            color: #666;
            line-height: 1.5;
        }
    }
}
.comment {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 25px 18px;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    background: #fff;
    line-height: 1;
    .input {
        flex: 1;
        height: 44px;
        margin-right: 25px;
        padding: 10px 30px;
        // box-sizing: border-box;
        background-color: #bfbfbf;
        border-radius: 27px;
        opacity: 0.38;
        line-height: 1;
        font-size: 24px;
        line-height: 44px;
    }
    .like {
        width: 80px;
        text-align: center;
        .nub {
            font-size: 24px;
            color: #6c7b8a;
        }
    }
}
.comment-input {
    .textarea {
        margin: 30px;
        box-sizing: border-box;
        box-shadow: 0px 2px 20px 0px rgba(50, 51, 94, 0.10);
        border: 1px solid #eee;
    }
    .button {
        padding: 30px;
    }
}

</style>
