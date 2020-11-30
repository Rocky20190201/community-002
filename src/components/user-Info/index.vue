<template>
    <div id="user-Info">
        <div v-if="!isShowAttention" class="set"><router-link to="/set"><van-icon name="setting-o" /></router-link></div>
        <van-row class="name-message-avatar" @click="edit">
            <div><van-image fit="cover" round  :src="userData.userImage" class="avatar" /></div>
            <div class="name-message">
                <div>
                    <field v-model="userData.userName" input-align="center" ref="userName" placeholder="点击编辑用户名" readonly class="name" />
                </div>
                <div class="name-edit">
                    <div v-if="userData.remarks">
                        {{userData.remarks}}
                    </div>
                    <div v-else>点击编辑个性签名</div>
                    <div v-if="!isShowAttention" @click="edit"><img src="../../assets/edit.png" maxlength="10" class="edit" /></div>
                </div>
            </div>
        </van-row>
        <van-row type="flex" justify="space-between" align="center" class="information">
            <div class="item">
                <p class="nub">{{ userData.watchList }}</p>
                <p class="type">关注</p>
            </div>
            <div class="item">
                <p class="nub">0</p>
                <p class="type">粉丝</p>
            </div>
            <div class="item">
                <p class="nub">{{ userData.readNumber }}</p>
                <p class="type">被阅读</p>
            </div>
        </van-row>
        <div v-if="isShowAttention" class="attention" >
            <p v-if="!isWatch" @click="watch(userData)" class="button">关注</p>
            <p v-else @click="watch(userData)" class="button active">已关注</p>
        </div>
    </div>
</template>

<script>
import { Field } from 'vant'
import AV from 'leancloud-storage'

export default {
    name: 'user-Info',
    components: {
        Field
    },
    props: {
        userId: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            userData: {
                userName: '',
                remarks: '',
                readNumber: 0,
                watchList: 0
            },
            isWatch: false
        }
    },
    computed: {
        isShowAttention () {
            if (!AV.User.current()) return true
            else return this.userId !== AV.User.current().id
        }
    },
    async created () {
        await this.getUserData()
        if (AV.User.current()) this.getIsWatch()
    },
    methods: {
        showList () {},
        async getUserData () {
            const User = AV.Object.createWithoutData('_User', this.userId)
            await User.fetch().then(data => {
                this.userData = {
                    userId: data.id,
                    userName: data.get('username') || data.get('mobilePhoneNumber'),
                    remarks: data.get('remarks'),
                    userImage: data.get('userImage'),
                    readNumber: data.get('readNumber') || 0,
                    watchList: data.get('watchList').length
                }
                console.log(this.userData)
            })
        },
        edit () {
            this.$router.push('/edit-user')
        },
        async getIsWatch () {
            let list = []
            const User = AV.Object.createWithoutData('_User', AV.User.current().id)
            await User.fetch().then(data => {
                const userWatchList = data.get('watchList')
                list = userWatchList.filter(i => i.id === this.userId)
            })
            this.isWatch = list.length > 0
        },
        // 关注
        async watch (item) {
            // console.log(item.userId)
            if (!AV.User.current()) {
                this.$router.push('/login')
                return false
            }
            const uesr = AV.Object.createWithoutData('_User', AV.User.current().id)
            const Uesr = AV.Object.createWithoutData('_User', item.userId)
            this.isWatch ? uesr.remove('watchList', Uesr) : uesr.add('watchList', Uesr)
            uesr.save()
            this.getUserData()
            this.isWatch = !this.isWatch
        }
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
    margin: 60px 0 20px;
}
.name-message-avatar {
    padding: 60px 34px 39px;
    text-align: center;
    .name-edit{
        display: flex;
        color: #6c7b8a;
        flex-wrap: wrap;
        justify-content: center;
    }
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
        vertical-align: middle;
        width: 32px;
        margin-left: 25px;
    }
}
.information {
    width: 709px;
    height: 100px;
    margin: 0 20px;
    padding-bottom: 21px;
    background-color: #f4f4f4;
    border-radius: 20px;
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
    border-bottom: 10px solid #f3f3f3;
    .button {
        width: 50%;
        height: 48px;
        margin: auto;
        border: solid 1px #f7b233;
        background-color: #f7b233;
        border-radius: 24px;
        font-size: 24px;
        color: #fff;
        text-align: center;
        line-height: 48px;
        letter-spacing: 3px;
        &.active {
            background: #fff;
            color: #f7b233;
        }
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
