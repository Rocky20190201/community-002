<template>
    <div id="my">
        <div class="bg" />
        <user-info :user-id="userId" />
        <tabs class="tab" v-model="active" color="#30b9c3" background="#fff" title-inactive-color="#000" title-active-color="#000" sticky swipeable animated >
            <tab title="动态">
                <article-list />
            </tab>
            <tab title="作品">
                <album-list />
            </tab>
            <tab title="赞过">
                <article-list />
            </tab>
        </tabs>
        <basic-footer />
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import UserInfo from '../components/user-Info'
import ArticleList from '../components/article-list'
import AlbumList from '../components/album-list'
import AV from 'leancloud-storage'

export default {
    name: 'my',
    components: {
        UserInfo,
        Tab,
        Tabs,
        ArticleList,
        AlbumList
    },
    data () {
        return {
            active: 0,
            userId: AV.User.current().id
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
    }
}
</script>
<style lang="scss">
#my {
    .van-hairline--top-bottom::after {
        display: none;
    }
}
</style>
<style lang="scss" scoped>
#my {
    background: #fff;
}
.bg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 230px;
    background: #202528;
}
</style>
