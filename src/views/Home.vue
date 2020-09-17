<template>
    <div id="home">
        <search class="search" v-model="keys" shape="round" placeholder="搜索你感兴趣的内容和用户" />
        <tabs class="tab" v-model="active" color="#30b9c3" background="#202528" title-inactive-color="#bfc0c3" title-active-color="#bfc0c3" sticky swipeable animated >
            <tab title="关注">
                <Article-list />
            </tab>
            <tab title="推荐">
                <Article-list />
            </tab>
            <tab title="说说">
                <Article-list />
            </tab>
        </tabs>
        <basic-footer />
    </div>
</template>

<script>
import { Search, Tab, Tabs } from 'vant'
import ArticleList from '../components/article-list'

export default {
    name: 'home',
    components: {
        Search,
        Tab,
        Tabs,
        ArticleList
    },
    data () {
        return {
            keys: '',
            active: 0
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
#home {
    .search {
        .van-search__content {
            background: #424e55;
        }
        .van-field__left-icon .van-icon {
            color: #fff;
        }
        .van-field__control {
            color: #Fff;
        }
    }
    .van-hairline--top-bottom::after {
        border-width: 0;
    }
    .van-tabs__nav--line {
        padding: 0 100px;
    }
    .van-tabs__line {
        bottom: 13px;
    }
    .van-tabs--line .van-tabs__wrap {
        height: 70px;
    }
}
</style>
<style lang="scss" scoped>
.search {
    background: #202528;
}
.tab {
}
</style>
