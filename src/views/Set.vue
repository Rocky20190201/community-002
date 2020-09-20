<template>
    <div id="set">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="设置" />
        <cell-group>
            <cell title="问题反馈" to="/feedback" is-link />
            <cell title="检查更新" @click="Update" is-link />
            <cell title="修改密码" to="/password-reset" is-link />
            <cell title="用户协议" to="/agreement" is-link />
            <cell title="隐私政策" to="/privacy" is-link />
        </cell-group>
        <div class="button"><Button @click="logOut" round block>退出登陆</Button></div>
    </div>
</template>

<script>
import { Cell, CellGroup, Button } from 'vant'
import AV from 'leancloud-storage'

export default {
    name: 'set',
    components: {
        Cell,
        CellGroup,
        Button
    },
    data () {
        return {
            keys: '',
            active: 0
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        Update () {
            this.$toast.loading({
                message: '检测中请稍后',
                forbidClick: true,
                duration: 2000,
                onClose: () => {
                    this.$toast('当前已是最新系统')
                }
            })
        },
        async logOut () {
            await AV.User.logOut()
            this.$toast('已退出登陆')
            setTimeout(() => this.$router.push('/login'), 2 * 1000)
        }
    }
}
</script>
<style lang="scss">
#set {
}
</style>
<style lang="scss" scoped>
.button {
    padding: 20px 20px;
}
</style>
