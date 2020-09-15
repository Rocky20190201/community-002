<template>
    <div v-if="isShow" id="privacy">
        <div class="box">
            <h1>用户协议与隐私政策</h1>
            <div class="text">
                为保障正常使用app，我们将通过<router-link to="/privacy">《隐私政策》</router-link>与<router-link to="/agreement">《用户协议》</router-link>帮助您了解我们收集、使用、储存和共享个人信息的情况，及您所享有的相关权利。
                <br><br>您选择[同意]即表示充分阅读、理解并接受<router-link to="/privacy">《隐私政策》</router-link>与<router-link to="/agreement">《用户协议》</router-link>。
            </div>
            <van-row
                type="flex"
                justify="between"
                align="center"
                class="button"
            >
                <div @click="close">同意</div>
                <div style="color:#666;"><router-link to="/login">不同意</router-link></div>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'privacy-alter',
    props: {
    },
    data () {
        return {
            isShow: !localStorage.getItem('isShosPrivacy')
        }
    },
    created () {
    },
    methods: {
        close () {
            this.isShow = false
            localStorage.setItem('isShosPrivacy', false)
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
  margin: 20px 0 0px;
  padding-bottom: 10px;
  font-size: 34px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
#privacy {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7)
}
.box {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 70%;
  height: 530px;
  // height: 85%;
  margin: auto;
  border-radius: 10px;
  // padding: 20px;
  background: #fff;
  overflow: auto;
  .text {
    font-size: 28px;
    line-height: 1.5;
    padding: 20px 20px 100px;
    // height: 90%;
    overflow: auto;
    color: #222;
    a {
      color: #0084ff;
    }
  }
}
.button {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  font-size: 32px;
  text-align: center;
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 1px;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #e6e6e6;
  }
  > div {
    flex: 1 1;
    height: 80px;
    line-height: 80px;
  }
}
</style>
