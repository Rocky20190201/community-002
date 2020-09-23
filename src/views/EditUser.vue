<template>
    <div id="edit-user">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="编辑用户信息" />
        <cell-group class="uploader">
            <uploader
                v-model="imgaeList"
                preview-size="2.85rem"
                :after-read="imgUploader"
                :max-size="1000 * 1024"
                max-count="1"
                @oversize="onOversize"
                multiple />
        </cell-group>
        <cell-group>
            <field v-model="userData.userName" maxlength="8" label="用户名" placeholder="请输入用户名" />
        </cell-group>
        <cell-group>
            <field v-model="userData.remarks" maxlength="15" label="个性签名" placeholder="请输入个性签名" />
        </cell-group>
        <div class="button"><Button @click="submit" :loading="loading" round block color="#30b9c3">提交反馈</Button></div>
    </div>
</template>

<script>
import { Field, Button, CellGroup, Uploader } from 'vant'
import AV from 'leancloud-storage'

export default {
    name: 'edit-user',
    components: {
        Field,
        Button,
        CellGroup,
        Uploader
    },
    data () {
        return {
            val: '',
            loading: false,
            userData: {
                userName: '',
                remarks: '',
                userImage: ''
            },
            imgaeList: []
        }
    },
    computed: {
    },
    async created () {
        await this.getUserData()
    },
    mounted () {
    },
    methods: {
        async getUserData () {
            const User = AV.User.current()
            await User.fetch().then(data => {
                this.userData = {
                    userName: data.get('userName'),
                    remarks: data.get('remarks'),
                    userImage: data.get('userImage'),
                    readNumber: data.get('readNumber') || 0,
                    watchlist: data.get('watchlist').length
                }
            })
        },
        imgUploader (data) {
            data.status = 'uploading'
            data.message = '上传中...'
            const file = new AV.File(data.file.name, data.file)
            file.save().then((file) => {
                data.status = 'done'
                data.url = file.attributes.url
            }, (error) => this.$toast(error))
        },
        onOversize (file) {
            this.$toast('文件大小不能超过 1M')
        },
        submit () {
            if (!this.userData.userName) {
                this.$toast('用户名不能为空')
                return false
            }
            this.loading = true
            const user = AV.Object.createWithoutData('_User', AV.User.current().id)
            user.set('userName', this.userData.userName)
            user.set('remarks', this.userData.remarks)
            if (this.imgaeList[0].url) user.set('userImage', this.imgaeList[0].url)
            user.save().then(() => {
                this.$toast({
                    message: '用户信息更新成功',
                    onClose: () => this.$router.go(-1)
                })
            })
        }
    }
}
</script>
<style lang="scss">
#edit-user {
    .van-uploader__wrapper {
        justify-content: center
    }
    .van-uploader {
        display: block;
    }
}
</style>
<style lang="scss" scoped>

.button {
    padding: 30px;
}
.uploader {
    padding: 16PX;
}
</style>
