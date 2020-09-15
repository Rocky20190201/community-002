<template>
    <div id="app-entrance">
        <router-view/>
        <p v-if="caseNumber" class="record">{{ caseNumber }}</p>
        <!-- 底部导航 -->
        <basic-footer v-if="$route.meta.isShowBasicFooter" />
    </div>
</template>

<script>

export default {
    name: 'app',
    components: {
    },
    data () {
        return {
        }
    },
    computed: {
        caseNumber () {
            const domain = document.domain
            let text = null
            switch (domain) {
            case 'www.4jyungou.com':
                text = '陕ICP备20010593号-1'
                break
            }
            return text
        }
    },
    async created () {
    },
    mounted () {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
#app-entrance {
    height: 100%;
}
.record {
    position: relative;
    z-index: 1;
    text-align: center;
    font-size: 28px;
    color: #666;
    margin-bottom: 20px;
}
</style>
