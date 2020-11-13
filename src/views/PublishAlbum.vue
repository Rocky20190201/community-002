<template>
    <div id="publish-album">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="发影集" />
        <div class=""><field v-model="title" :border="false" maxlength="15" show-word-limit clearable placeholder="请输入影集主题" class="text" /></div>
        <div class="uploader">
            <uploader
                v-model="imgaeList"
                preview-size="2.85rem"
                :after-read="imgUploader"
                :max-size="5000 * 1024"
                max-count="20"
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
    name: 'publish-album',
    components: {
        Field,
        Uploader,
        Button
    },
    data () {
        return {
            title: '',
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
            if (this.title && this.imgaeList.length !== 0) {
                this.loading = true
                const userData = AV.User.current()
                const AlbumList = AV.Object.extend('AlbumList')
                const albumList = new AlbumList()
                const imgaeList = []
                this.imgaeList.forEach(i => imgaeList.push(i.url))
                console.log(this.imgaeList, imgaeList, userData.id)
                albumList.set('title', this.title)
                albumList.set('imageList', imgaeList)
                albumList.set('userName', userData.get('username'))
                albumList.set('userId', userData.id)
                albumList.set('userImage', userData.get('userImage'))
                albumList.set('likeNumber', 0)
                albumList.set('readNumber', 0)
                albumList.save().then(() => {
                    this.$toast({
                        message: '发布成功',
                        onClose: () => {
                            this.$router.push('/my')
                        }
                    })
                })
            } else this.$toast('请填写标题，上传图片')
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
#publish-album {
    .van-uploader__wrapper > div {
        margin: 0 0 20px 0;
        &:nth-child(3n + 2){
            margin: 0 20px 20px;
        }
    }
}
</style>
<style lang="scss" scoped>
#publish-album {
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
