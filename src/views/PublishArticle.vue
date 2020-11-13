<template>
    <div id="publish-article">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="发文章" />
        <div class=""><field v-model="title" :border="false" maxlength="15" show-word-limit clearable placeholder="请输入文章标题" class="text" /></div>
        <quill-editor
            v-model="content"
            ref="myQuillEditor">
        </quill-editor>
        <div class="button"><Button @click="publish" :loading="loading" round block color="#30b9c3">发布</Button></div>
    </div>
</template>

<script>
import { Field, Button } from 'vant'
import AV from 'leancloud-storage'
import permission from '../utils/permission'


export default {
    name: 'publish-article',
    components: {
        Field,
        Button
    },
    data () {
        return {
            title: '',
            fileList: [],
            loading: false,
            content: ''
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
        afterRead () {},
        publish () {
            if (this.title && this.content) {
                this.loading = true
                const userData = AV.User.current()
                const ArticleList = AV.Object.extend('ArticleList')
                const articleList = new ArticleList()
                // console.log(this.title, this.content, userData.id)
                articleList.set('title', this.title)
                articleList.set('content', this.content)
                articleList.set('userName', userData.get('username'))
                articleList.set('userId', userData.id)
                articleList.set('userImage', userData.get('userImage'))
                articleList.set('likeNumber', 0)
                articleList.set('readNumber', 0)
                articleList.save().then(() => {
                    this.$toast({
                        message: '发布成功',
                        onClose: () => {
                            this.$router.push('/my')
                        }
                    })
                })
            } else this.$toast('请填写内容或标题')
        },
        onOversize (file) {
            this.$toast('文件大小不能超过 5M')
        }
    }
}
</script>
<style lang="scss">
#ppublish-article {
    .van-uploader__wrapper > div {
        margin: 0 0 20px 0;
        &:nth-child(3n + 2){
            margin: 0 20px 10px;
        }
    }

}
.ql-toolbar.ql-snow,
.ql-container.ql-snow {
    border-color: #eee;
}
.ql-editor {
    min-height: 300px;
    border-color: #eee;
}
</style>
<style lang="scss" scoped>
#publish-article {
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
