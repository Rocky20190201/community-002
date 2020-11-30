<template>
    <div id="login">
        <div class="firStep">
            <van-nav-bar
                :border="false"
                @click-left="$router.history.go(-1)"
                placeholder
                left-arrow
            />
            <div class="content">
                <div class="login-h1">
                    <div class="h1-top"><h1>重制密码</h1></div>
                    <div class="h1-bootm"></div>
                </div>
                <div class="content-inner">
                    <div class="label-input">
                        <label class="label">账号</label>
                        <field
                            placeholder="请输入手机号码"
                            type="tel"
                            v-model="phoneNumber"
                            clearable
                        />
                    </div>
                    <div class="label-input">
                        <label class="label">验证码</label>
                        <field
                            type="tel"
                            placeholder="请输入验证码"
                            v-model="smsCode"
                            clearable
                        >
                            <template #button>
                                <Button
                                    :loading="smsCodeLoading"
                                    :disabled="startCountdown"
                                    loading-text="发送中"
                                    @click="getSmsCode"
                                    color="#f7b233"
                                    size="small"
                                    type="primary"
                                >
                                    <template v-if="!startCountdown">获取验证码</template>
                                    <template v-else><count-down class="count-down" :time="60 * 1000" @finish="startCountdown = false" format='ss秒重新获取' /></template>
                                </Button>
                            </template>
                        </field>
                    </div>
                    <div class="label-input">
                        <label class="label">新密码密码</label>
                        <Field
                            :type="inputTypeCon"
                            placeholder="输入8-16位英文与字母构成的密码"
                            v-model="valuePwd"
                        />
                    </div>
                </div>
                <Button
                    color="#f7b233"
                    :disabled="!(phoneTest && valuePwd)"
                    @click="submitButton"
                    :loading="loginLoading"
                    loading-text="登陆中"
                    block
                    type="primary"
                    class="button">重制密码</Button>
                <!-- <p class="tipsBox">登录/注册表示同意<span class="privacy">《用户服务协议》</span></p> -->
                <van-row type="flex" align="center" justify="center" class="tipsBox">
                    <checkbox v-model="checked" checked-color="#f7b233" icon-size="0.38rem" class="checkbox" />
                    <p>我已阅读并同意<router-link class="privacy" to="/privacy">《隐私政策》</router-link>与<router-link class="privacy" to="/agreement">《用户协议》</router-link></p>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Field, Checkbox } from 'vant'
import AV from 'leancloud-storage'

export default {
    name: 'Login',
    components: {
        Button,
        Field,
        Checkbox
    },
    data () {
        return {
            phoneNumber: '',
            smsCode: '',
            eyeCon: true,
            smsCodeLoading: false,
            loginLoading: false,
            startCountdown: false,
            valuePwd: '',
            checked: true
        }
    },
    computed: {
        phoneTest () {
            const PHONE_EXP = /^(((13[0-9])|(14[5-7])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))+\d{8})$/
            const { phoneNumber } = this
            if (!PHONE_EXP.test(phoneNumber)) {
                return false
            } else return true
        },
        inputTypeCon () {
            return this.eyeCon ? 'password' : 'text'
        }
    },
    mounted () {
    },
    methods: {
        async getSmsCode () {
            if (!this.phoneTest) {
                this.$toast('手机号码格式不正确')
                return false
            }
            this.smsCodeLoading = true
            await AV.User.requestPasswordResetBySmsCode(this.phoneNumber)
            this.smsCodeLoading = false
            this.startCountdown = true
            this.$toast('短信验证码已发送')
        },
        async submitButton () {
            const password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
            if (password.test(this.valuePwd)) {
                this.loginLoading = true
                await AV.User.resetPasswordBySmsCode(this.smsCode, this.valuePwd)
                this.$toast('登陆成功，稍后自动跳转')
                setTimeout(() => {
                    this.$router.push('/my')
                }, 2 * 1000)
            } else this.$toast('请输入8-16位密码，需包含字母及数字')
        }
    }
}
</script>
<style lang="scss">
#login {
    .van-nav-bar {
        background: rgba(0,0,0,0);
    }
    .van-nav-bar .van-icon {
        color: #fff;
    }
     .label-input .van-cell {
        padding: 25px;
        background-color: #f5f5f5;
        border-radius: 10px;
        input {
            font-size: 28px;
        }
    }
}
</style>
<style scoped lang="scss">
#login{
    height: 100vh;
    background: url('../assets/login-bg.png') no-repeat;
    background-size: 100% 100%;
    // padding-left: 20px;
    // padding-right: 20px;
}
.content {
    margin: 140px 47px 100px;
    background-color: #ffffff;
    box-shadow: 0px 20px 20px 0pxrgba(0, 0, 0, 0.08);
    border-radius: 13px;
    padding: 37px 65px;
}
.login-h1{
    position: relative;
    width: 200px;
    height: 180px;
    margin: -150px auto 0;
    border-radius: 40px;
    box-shadow: 0px 15px 40px 0 rgba(90, 69, 210, 0.28);
    .h1-top{
        position: absolute;
        top: 0;
        width: 200px;
        height: 180px;
        z-index: 10;
        line-height: 180px;
        text-align: center;
        border-radius: 40px;
        background-color: #f7b233;
    }
    .h1-bootm{
        position: absolute;
        top: 0;
        width: 200px;
        height: 180px;
        transform: rotate(50deg);
        text-align: center;
        border-radius: 40px;
        background-color: #e0c9a0;
        opacity: .4;
    }
    h1 {
        margin-bottom: 90px;
        font-size: 44px;
        color: white;
    }
}
.label-input {
    margin-bottom: 24px;
    .label {
        display: block;
        margin-bottom: 20px;
        font-size: 28px;
        letter-spacing: 1px;
        color: #9b9b9b;
    }
}
.forgotPwd {
    margin: -10px 0 20px;
    display: block;
    text-align: right;
    font-size: 24px;
    color: #666;
}
.button {
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.15);
    border-radius: 32px;
}

.tipsBox {
    margin: 40px 0;
    font-size: 24px;
    color: #909090;
    .checkbox {
        margin-right: 5px;
    }
    a {
        color: #f7b233;
    }
}
</style>
