<template>
    <div id="publish-article">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="发文章" />
        <div class=""><field v-model="val" rows="4" type="textarea" :border="false" maxlength="50" show-word-limit clearable placeholder="您想分享什么呢" class="textarea" /></div>
        <div class="uploader">
            <uploader
                v-model="fileList"
                preview-size="2.85rem"
                :after-read="afterRead"
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
export default {
    name: 'publish-article',
    components: {
        Field,
        Uploader,
        Button
    },
    data () {
        return {
            val: '',
            fileList: [],
            loading: false
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        afterRead () {},
        publish () {
            this.loading = true
            this.$toast('发布成功')
        },
        onOversize (file) {
            // console.log(file)
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
