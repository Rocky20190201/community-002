<template>
    <div id="message-list">
        <van-row type="flex" justify="space-between" align="center" class="topic">
            <router-link to=""><img @click="onClick" src="../assets/message-bg-1.png" alt=""></router-link>
            <router-link to=""><img @click="onClick" src="../assets/message-bg-2.png" alt=""></router-link>
            <router-link to=""><img @click="onClick" src="../assets/message-bg-3.png" alt=""></router-link>
        </van-row>
        <collapse v-model="activeNames" class="list" >
            <collapse-item title="系统消息" name="1" :is-link="false" class="item red">欢迎加入币心～</collapse-item>
        </collapse>
        <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list> -->
        <basic-footer />
    </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant'
export default {
    name: 'message-list',
    components: {
        Collapse,
        CollapseItem
    },
    data () {
        return {
            activeNames: []
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        onClick () {
            this.$toast('板块即将开放，敬请期待')
        }
    }
}
</script>
<style lang="scss">
#message-list {
    .red {
        .van-cell__title::after {
            content: ' ';
            position: absolute;
            top: 0;
            bottom: 0;
            right: 20px;
            margin: auto;
            width: 15px;
            height: 15px;
            border-radius: 100%;
            background:#FF6461;
        }
    }
}
</style>
<style lang="scss" scoped>
.topic {
    margin: 20px;
    img {
        width: 220px;
    }
}
.list {
    margin: 20px;
    background-color: #ffffff;
    box-shadow: 0px 5px 20px 0pxrgba(50, 51, 94, 0.18);
    border-radius: 20px;
    overflow: hidden;
}

</style>
