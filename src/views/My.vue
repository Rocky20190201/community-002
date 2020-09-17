<template>
    <div id="my">
        <div class="bg" />
        <user-info />
        <basic-footer />
    </div>
</template>

<script>
import UserInfo from '../components/user-Info'
export default {
    name: 'my',
    components: {
        UserInfo
    },
    data () {
        return {
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
}
</style>
<style lang="scss" scoped>
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
