<template>
    <div>
        <div class="top">
            <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="话题广场" />
        </div>
        55
    </div>
</template>
<script>
export default {
    name: 'topic-squareItem',
    components: {},
    data () {
        return {
            imgList: []
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
    }
}
</script>
<style lang="scss" scoped>
.top{}
</style>
