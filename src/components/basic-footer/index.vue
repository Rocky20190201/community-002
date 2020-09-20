<template>
    <div id="nav-footer">
        <tabbar route fixed border placeholder>
            <tabbar-item to="/home">
                <template #icon="props">
                    <img class="icon-img" :src="props.active ? require('../../assets/icon-home-tab-1-active.png') : require('../../assets/icon-home-tab-1.png')" />
                </template>
                <span>首页</span>
            </tabbar-item>
            <tabbar-item to="/topic">
                <template #icon="props">
                    <img class="icon-img" :src="props.active ? require('../../assets/icon-home-tab-2-active.png') : require('../../assets/icon-home-tab-2.png')" />
                </template>
                <span>圈子</span>
            </tabbar-item>
            <tabbar-item @click="showActionSheet = true">
                <template>
                    <img class="icon-img-2" src="../../assets/icon-home-tab-5.png" />
                </template>
            <!-- <span>我要赚钱</span> -->
            </tabbar-item>
            <tabbar-item to="/message-list">
                <template #icon="props">
                    <img class="icon-img" :src="props.active ? require('../../assets/icon-home-tab-3-active.png') : require('../../assets/icon-home-tab-3.png')" />
                </template>
                <span>消息</span>
            </tabbar-item>
            <tabbar-item to="/my">
                <template #icon="props">
                    <img class="icon-img" :src="props.active ? require('../../assets/icon-home-tab-4-active.png') : require('../../assets/icon-home-tab-4.png')" />
                </template>
                <span>我的</span>
            </tabbar-item>
        </tabbar>
        <share-sheet v-model="showActionSheet" :options="options" @select="onSelect" />
    </div>
</template>

<script>
import { Tabbar, TabbarItem, ShareSheet } from 'vant'

export default {
    name: 'basic-footer',
    components: {
        Tabbar,
        TabbarItem,
        ShareSheet
    },
    data () {
        return {
            active: 0,
            showActionSheet: false,
            options: [
                { name: '文章', icon: require('../../assets/wenzhang.png') },
                { name: '影集', icon: require('../../assets/yingji.png') },
                { name: '说说', icon: require('../../assets/shuoshuo.png') }
            ]
        }
    },
    methods: {
        showList () {},
        onSelect (option) {
            console.log(option)
            let url = ''
            switch (option.name) {
            case '文章':
                url = '/publish-article'
                break
            case '影集':
                url = '/publish-album'
                break
            case '说说':
                url = '/publish-talk'
                break
            }
            this.$router.push(url)
        }
    }
}
</script>
<style lang="scss">
#nav-footer {
    .van-tabbar--fixed {
        height: 120px;
        box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.06);
    }
    .van-tabbar-item__icon {
        // margin-bottom: 0px;
    }
    .van-tabbar-item__text {
        position: relative;
        // top: -15px;
        font-size: 22px;
        // letter-spacing: 3px;
        color: #140f26;
        text-align: center;
    }
    .van-tabbar-item--active {
        .van-tabbar-item__text {
            color: #30b9c3;
        }
    }
}
</style>
<style lang="scss" scoped>
.icon-img {
    display: inline-block;
    max-width: 35px;
    max-height: 35px;
    height: auto;
}
.icon-img-2 {
    position: relative;
    top: 0PX;
    width: 100px;
    height: 100px;
}
</style>
