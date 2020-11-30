<template>
    <div>
        <div class="top">
            <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="话题广场" />
        </div>
        <div class="topic-square">
                <div  class="topic-item" v-for="item in imgList" :key="item.title">
                    <router-link :to="`/topic-squareItem/${item.name}`">
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
                name: 'tj',
                title: '推荐',
                img: require('../assets/topic1.png')
            }, {
                name: 'gz',
                title: '关注',
                img: require('../assets/topic2.png')
            }, {
                name: 'yx',
                title: '影像',
                img: require('../assets/topic3.png')
            }, {
                name: 'ly',
                title: '旅行',
                img: require('../assets/topic4.png')
            }, {
                name: 'qg',
                title: '情感',
                img: require('../assets/topic5.png')
            }, {
                name: 'wx',
                title: '文学',
                img: require('../assets/topic6.png')
            }, {
                name: 'sh',
                title: '生活',
                img: require('../assets/topic7.png')
            }, {
                name: 'sx',
                title: '思想',
                img: require('../assets/topic8.png')
            }, {
                name: 'ah',
                title: '爱好',
                img: require('../assets/topic9.png')
            }, {
                name: 'jsj',
                title: '教师节',
                img: require('../assets/topic10.png')
            }, {
                name: 'zy',
                title: '职业',
                img: require('../assets/topic11.png')
            }, {
                name: 'mp',
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
