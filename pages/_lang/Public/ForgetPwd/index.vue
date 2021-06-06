<template>
  <div>
    <div class="p-1">
      <div class="flex items-center justify-between">
        <p class="fs44 clffffff">忘记密码</p>
        <span
          @click="$commonFn.toUrl('Public/Login')"
          class="cl02AD8F fs32"
        >登录</span>
      </div>
      <div class="mt-2">
        <div class="flex items-center justify-between fs24">
          <span class="cl02AD8F">用户名(输入用户名获取助记词)</span>
        </div>
        <van-field
          class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
          v-model="forgetLoginPwdParams.userName"
          @blur="forgetLogin"
          placeholder="请输入用户名"
        >
        </van-field>

        <div class="mt-2 flex items-center justify-between fs24">
          <span class="cl02AD8F">助记词(<span class="clCB374E">*请以空格隔开</span>)</span>
        </div>
        <div class="mt01 p-1 bk21252F clffffff fs28 rounded-sm grid grid-cols-4 space-y-1">
          <span
            @click="clickGetoldMnemonicData(item)"
            v-for="(item, index) in getoldMnemonicData"
            :key="index"
            :style="index == 0 ? '--space-y-reverse: 0;margin-top: calc(0.25rem * calc(1 - var(--space-y-reverse)));margin-bottom: calc(0.25rem * var(--space-y-reverse));' : ''"
          >
            <van-badge :content="getoldMnemonicArrayIndex.indexOf(item) >= 0 ? getoldMnemonicArrayIndex.indexOf(item) + 1 : ''">
              <span
                :class="getoldMnemonicArrayIndex.includes(item) && 'bk02AD8F'"
                class="px-010 py-0.5 rounded-sm inline-block"
              >{{item}}</span>
            </van-badge>
          </span>
        </div>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>密码</span>
        </div>
        <van-field
          v-model="forgetLoginPwdParams.newpassword"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          :type="isShowRegParamsPassword ? 'text' : 'password'"
          placeholder="请输入登录密码"
        >
          <template #button>
            <img
              @click="isShowRegParamsPassword = !isShowRegParamsPassword"
              class="wh036"
              src="~/assets/svg/icon_display.svg"
              alt=""
            >
          </template>
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>确认密码</span>
        </div>
        <van-field
          v-model="forgetLoginPwdParams.qpassword"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          :type="isShowPassword ? 'text' : 'password'"
          placeholder="请再次输入登录密码"
        >
          <template #button>
            <img
              @click="isShowPassword = !isShowPassword"
              class="wh036"
              src="~/assets/svg/icon_display.svg"
              alt=""
            >
          </template>
        </van-field>
      </div>
    </div>
    <!-- <div class="fixed bottom-0 w-full my-1"> -->
    <div class="w-full my-1 pb-1">
      <div
        @click="forgetLoginPwd"
        class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1"
      >
        确定
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShowPassword: false,
      isShowRegParamsPassword: false,
      checked: false,
      getoldMnemonicData: "",
      getoldMnemonicArrayIndex: [],
      getoldMnemonicCount: 0,
      forgetLoginPwdParams: {
        "userName": "",// "token"
        "newpassword": "",// "新密码"
        "qpassword": "",// "确认密码"
        "type": "3",// "类型3代表忘记支付密码 4代表忘记登录密码"
        "mnemonic": "",// "助记词"
      }
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    // 获取乱序助记词
    forgetLogin () {
      let params = {
        userName: this.forgetLoginPwdParams.userName
      }
      this.$api.user.forgetLogin(params).then(res => {
        if (res.type == "success") {
          if (res.data.length) {
            this.getoldMnemonicData = res.data.split(" ")
          }
        } else {
          this.getoldMnemonicData = ""
        }
      })
    },
    // 选择助记词
    clickGetoldMnemonicData (item) {
      if (this.getoldMnemonicArrayIndex.includes(item)) {
        this.getoldMnemonicArrayIndex = this.getoldMnemonicArrayIndex.filter(n => n !== item)
      } else {
        this.getoldMnemonicArrayIndex.push(item)
      }
    },
    // 忘记支付密码
    forgetLoginPwd () {
      if (!this.forgetLoginPwdParams.newpassword) {
        return this.$Toast("请输入新密码")
      }
      if (!this.forgetLoginPwdParams.qpassword) {
        return this.$Toast("请输入确认密码")
      }
      if (this.forgetLoginPwdParams.newpassword != this.forgetLoginPwdParams.qpassword) {
        return this.$Toast("新密码和确认密码不一致")
      }
      if (!this.getoldMnemonicArrayIndex.length) {
        return this.$Toast("请选择助记词")
      }
      if (this.getoldMnemonicArrayIndex.length < this.getoldMnemonicData.length) {
        return this.$Toast("请选择完助记词")
      }
      let params = {
        userName: this.forgetLoginPwdParams.userName,
        newpassword: this.$md5(this.forgetLoginPwdParams.newpassword),//新密码
        qpassword: this.$md5(this.forgetLoginPwdParams.qpassword),//确认密码
        type: "3",
        mnemonic: this.getoldMnemonicArrayIndex.join(" "),
      }
      this.$api.user.forgetLoginPwd(params).then(res => {
        if (res.type == "success") {
          this.$commonFn.toUrl('Public/Login')
          this.$Toast("登录密码修改成功")
        }
      })
    },
  },
}
</script>