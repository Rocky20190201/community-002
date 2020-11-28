<template>
    <div>
        <div class="top">
            <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="话题广场" />
        </div>
        <div class="topic-square">
                <div  class="topic-item" v-for="item in imgList" :key="item.title">
                    <router-link :to="`/topic-squareItem`">
                        <img :src="item.img" class="img" alt="">
                    </router-link>
                    <span>{{item.title}}</span>
                </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'topic-square',
    components: {},
    data () {
        return {
            imgList: []
        }
    },
    computed: {
    },
    created () {
        this.imgList = [{
               title: '推荐',
               img: require('../assets/topic1.png')
            }, {
               title: '关注',
               img: require('../assets/topic2.png')
            }, {
               title: '影像',
               img: require('../assets/topic3.png')
            }, {
               title: '旅行',
               img: require('../assets/topic4.png')
            }, {
               title: '情感',
               img: require('../assets/topic5.png')
            }, {
               title: '文学',
               img: require('../assets/topic6.png')
            }, {
               title: '生活',
               img: require('../assets/topic7.png')
            }, {
               title: '思想',
               img: require('../assets/topic8.png')
            }, {
               title: '爱好',
               img: require('../assets/topic9.png')
            }, {
               title: '教师节',
               img: require('../assets/topic10.png')
            }, {
               title: '职业',
               img: require('../assets/topic11.png')
            }, {
               title: '美篇',
               img: require('../assets/topic12.png')
            }]
    },
    mounted () {
    }
}
</script>
<style lang="scss" scoped>
.topic-square{
    text-align: center;
    display: flex;
    padding-top: 40px;
    flex-wrap: wrap;
    justify-content: center;
}
.topic-item{
    width: 30%;
    margin-bottom: 20px;
}
.topic-item:nth-of-type(3n-1){
    margin:0 20px;
}
.img{
    width: 100%;
    margin-bottom: 15px;
}
</style>
