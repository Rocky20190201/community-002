<template>
    <div id="publish-talk">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="发说说" />
        <div class=""><field v-model="content" rows="4" type="textarea" :border="false" maxlength="50" show-word-limit clearable placeholder="您想分享什么呢" class="textarea" /></div>
        <div class="uploader">
            <uploader
                v-model="imgaeList"
                preview-size="2.85rem"
                :after-read="imgUploader"
                :max-size="5000 * 1024"
                max-count="9"
                @oversize="onOversize"
                multiple />
        </div>
        <div class="button"><Button @click="publish" :loading="loading" round block color="#30b9c3">发布</Button></div>
    </div>
</template>

<script>
import { Field, Uploader, Button } from 'vant'
import AV from 'leancloud-storage'
import permission from '../utils/permission'

export default {
    name: 'publish-talk',
    components: {
        Field,
        Uploader,
        Button
    },
    data () {
        return {
            content: '',
            imgaeList: [],
            loading: false
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
        if (window.plus) permission.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE') // 外部存储(含相册)读取权限
    },
    methods: {
        publish () {
            if (this.title || this.imgaeList.length !== 0) {
                this.loading = true
                const userData = AV.User.current()
                const TalkList = AV.Object.extend('TalkList')
                const talkList = new TalkList()
                const imgaeList = []
                this.imgaeList.forEach(i => imgaeList.push(i.url))
                console.log(this.imgaeList, imgaeList, userData.id)
                talkList.set('content', this.content)
                talkList.set('imageList', imgaeList)
                talkList.set('userName', userData.get('username'))
                talkList.set('userId', userData.id)
                talkList.set('userImage', userData.get('userImage'))
                talkList.set('likeNumber', 0)
                talkList.set('readNumber', 0)
                talkList.save().then(() => {
                    this.$toast({
                        message: '发布成功',
                        onClose: () => {
                            this.$router.push('/my')
                        }
                    })
                })
            } else this.$toast('分享内容或图片至少有一个')
        },
        imgUploader (data) {
            let imgAttay = []
            if (Array.isArray(data)) imgAttay = data
            else imgAttay.push(data)
            imgAttay.forEach(i => {
                i.status = 'uploading'
                i.message = '上传中...'
                const file = new AV.File(i.file.name, i.file)
                file.save().then((file) => {
                    i.status = 'done'
                    i.url = file.attributes.url
                }, (error) => this.$toast(error))
            })
        },
        onOversize (file) {
            // console.log(file)
            this.$toast('文件大小不能超过 5M')
        }
    }
}
</script>
<style lang="scss">
#publish-talk {
    .van-uploader__wrapper > div {
        margin: 0 0 20px 0;
        &:nth-child(3n + 2){
            margin: 0 20px 20px;
        }
    }
}
</style>
<style lang="scss" scoped>
#publish-talk {
    height: 100%;
    background: #fff;
    .textarea {
        padding: 45px 30px;
        font-size: 34px;
    }
    .uploader {
        padding: 0 30px;
    }
    .button {
        padding: 30px;
    }
}

</style>
