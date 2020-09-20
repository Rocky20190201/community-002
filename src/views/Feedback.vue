<template>
    <div id="feedback">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="问题反馈" />
        <div class="textarea"><field v-model="val" type="textarea" rows="10" placeholder="请输入想要反馈的问题" /></div>
        <div class="button"><Button @click="feedback" :loading="loading" round block color="#30b9c3">提交反馈</Button></div>
    </div>
</template>

<script>
import { Field, Button } from 'vant'

export default {
    name: 'feedback',
    components: {
        Field,
        Button
    },
    data () {
        return {
            val: '',
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
        feedback () {
            if (this.val === '') this.$toast('请输入反馈内容')
            else {
                this.loading = true
                setTimeout(() => {
                    this.$toast('已提交到客服人员，感谢您提供的反馈')
                    this.loading = false
                }, 1500)
            }
        }
    }
}
</script>
<style lang="scss">
#set {
}
</style>
<style lang="scss" scoped>
.textarea {
    margin: 30px;
    box-sizing: border-box;
    box-shadow: 0px 2px 20px 0px rgba(50, 51, 94, 0.10);
    border: 1px solid #eee;
}
.button {
    padding: 30px;
}
</style>
