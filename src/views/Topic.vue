<template>
    <div id="topic">
        <search class="search" v-model="keys" shape="round" placeholder="圈子" />
        <van-row type="flex" justify="space-between" align="center" class="list">
            <div class="item">
                <router-link to="">
                    <div><img src="../assets/more.png" alt=""></div>
                    <p>更多圈子</p>
                </router-link>
            </div>
            <div class="item">
                <router-link to="">
                    <div><img src="../assets/more.png" alt=""></div>
                    <p>更多圈子</p>
                </router-link>
            </div>
            <div class="item">
                <router-link to="">
                    <div><img src="../assets/more.png" alt=""></div>
                    <p>更多圈子</p>
                </router-link>
            </div>
            <div class="item">
                <router-link to="">
                    <div><img src="../assets/more.png" alt=""></div>
                    <p>更多圈子</p>
                </router-link>
            </div>
            <div class="item">
                <router-link to="">
                    <div><img src="../assets/more.png" alt=""></div>
                    <p>更多圈子</p>
                </router-link>
            </div>
        </van-row>
        <album-list />
        <basic-footer />
    </div>
</template>

<script>
import { Search } from 'vant'
import AlbumList from '../components/album-list'

export default {
    name: 'topic',
    components: {
        Search,
        AlbumList
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
#topic {
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
}
</style>
<style lang="scss" scoped>
.search {
    background: #202528;
}
.list {
    padding: 30px 40px;
    background: #202528;
    line-height: 1;
    img {
        width: 90px;
        height: 90px;
        vertical-align: top;
        margin-bottom: 8px;
    }
    p {
        font-size: 22px;
        color: #fff;
        text-align: center;
    }
}
</style>
