<template>
    <div id="user-Info">
        <div class="set"><router-link to="/set"><van-icon name="setting-o" /></router-link></div>
        <van-row type="flex" justify="space-between" align="center" class="name-message-avatar">
            <div><img src="../../assets/more.png" class="avatar"></div>
            <div class="name-message">
                <div>
                    <field v-model="name" placeholder="请输入用户名" readonly class="name" />
                </div>
                <div>
                    <field v-model="message" placeholder="请输入个性签名" readonly class="message" />
                </div>
            </div>
            <div><img src="../../assets/edit.png" maxlength="10" class="edit" /></div>
        </van-row>
        <van-row type="flex" justify="space-between" align="center" class="information">
            <div class="item">
                <p class="nub">2312</p>
                <p class="type">关注</p>
            </div>
            <div class="item">
                <p class="nub">2312</p>
                <p class="type">粉丝</p>
            </div>
            <div class="item">
                <p class="nub">2312</p>
                <p class="type">阅读</p>
            </div>
        </van-row>
        <div class="attention"><p class="button">关注</p></div>
    </div>
</template>

<script>
import { Field } from 'vant'
export default {
    name: 'user-Info',
    components: {
        Field
    },
    data () {
        return {
            name: 'djjeow',
            message: '不知从什么时候开始。我变得连自己都觉到陌生。'
        }
    },
    methods: {
        showList () {}
    }
}
</script>
<style lang="scss">
#user-Info {
    .name-message {
        .van-field {
            padding: 0;
            .van-field__control {
                color: #4a4a4a;
            }
        }
        .message {
            .van-field__control {
                color: #6c7b8a;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
#user-Info {
    position: relative;
    z-index: 1;
    margin: 70px 20px 20px;
    background-color: #ffffff;
    box-shadow: 0px 5px 20px 0px rgba(50, 51, 94, 0.18);
    border-radius: 20px;
}
.name-message-avatar {
    padding: 60px 34px 39px;
    .name-message {
        padding: 0;
        flex: 1;
    }
    .avatar {
        width: 100px;
        height: 100px;
        vertical-align: top;
        margin-right: 18px;
    }
    .name {
        font-size: 34px;
        color: #4a4a4a;
    }
    .message {
        font-size: 22px;
        color: #6c7b8a;
    }
    .edit {
        width: 32px;
        vertical-align: middle;
        margin-left: 10px;
    }
}
.information {
    padding-bottom: 21px;
    .item {
        width: 33.33%;
        text-align: center;
        font-size: 28px;
        color: #000;
        .type {
            font-size: 22px;
            color: #999;
        }
    }
}
.attention {
    position: relative;
    z-index: 2;
    padding: 30px 0;
    box-shadow: 0px 5px 20px 0px rgba(12, 197, 207, 0.18);
    .button {
        width: 50%;
        height: 48px;
        margin: auto;
        background-color: #30b9c3;
        border-radius: 24px;
        font-size: 24px;
        color: #fff;
        text-align: center;
        line-height: 48px;
        letter-spacing: 3px;
    }
}
.set {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 44px;
    color: #666;
}
</style>
