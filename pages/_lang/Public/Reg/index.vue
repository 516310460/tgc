<template>
  <div>
    <div class="p-1">
      <div class="flex items-center justify-between">
        <p class="fs44 clffffff">注册</p>
        <span
          @click="$router.replace(`/${locale}/Public/Login`)"
          class="cl02AD8F fs32"
        >登录</span>
      </div>
      <div class="mt-2">
        <div class="flex items-center justify-between fs24">
          <span class="cl02AD8F">助记词(<span class="clCB374E">*请备份好您的助记词</span>)</span>
          <img
            class="w-1"
            v-clipboard:copy="regParams.mnemonic"
            v-clipboard:success="$commonFn.onCopy"
            src="~/assets/svg/icon_copy.svg"
            alt=""
          >
        </div>
        <div class="mt01 bk21252F clffffff p-1 fs28 rounded-sm">
          {{regParams.mnemonic}}
        </div>

        <div class="mt-2 flex items-center justify-between fs24">
          <span class="cl02AD8F">用户名(字母、数字和@.符号组合)</span>
        </div>
        <van-field
          class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
          v-model="regParams.username"
          placeholder="请输入用户名"
        >
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>密码</span>
        </div>
        <van-field
          v-model="regParams.password"
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
          v-model="password"
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

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>推荐人ID (选填)</span>
        </div>
        <van-field
          class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
          v-model="regParams.referralCode"
          placeholder="请输入推荐人ID"
        >
        </van-field>
        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>支付初始密码：123456</span>
        </div>

        <!-- <van-checkbox
          class="mt-2"
          v-model="checked"
          checked-color="#02AD8F"
        >
          <div class="cl02AD8F fs24">
            我已同意并阅读<span class="cl02AD8F">奇迹TGC服务条款</span>
          </div>
        </van-checkbox> -->
      </div>
    </div>
    <!-- <div class="fixed bottom-0 w-full my-1"> -->
    <div class="w-full my-1 pb-1">
      <div
        @click="reg"
        class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1"
      >
        注册
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      password: "",
      isShowPassword: false,
      isShowRegParamsPassword: false,
      checked: false,
      getMnemonicData: "",
      regParams: {
        "username": "",// "用户名"
        "password": "",// "登录密码"
        "mnemonic": "",// "助记词"
        "referralCode": "",// "邀请码"
      }
    }
  },
  computed: {
    ...mapState(['locale', 'UserInfoArray'])
  },
  created () {
    this.getoldMnemonic()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    // 注册时获取助记词
    getoldMnemonic () {
      this.$api.user.getMnemonic().then(res => {
        if (res.type == "success") {
          this.regParams.mnemonic = res.data
        }
      })
    },
    reg () {
      if (!this.regParams.username) {
        return this.$Toast("对不起，用户名不能为空")
      }
      if (!this.regParams.password) {
        return this.$Toast("对不起，登录密码不能为空")
      }
      if (!this.regParams.referralCode) {
        return this.$Toast("对不起，邀请码不能为空")
      }
      if (this.password != this.regParams.password) {
        return this.$Toast("两次密码输入不一致，请重新输入")
      }
      this.regParams.password = this.$md5(this.regParams.password)
      this.$api.user.reg(this.regParams).then(res => {
        if (res.type == "success") {
          this.$Toast("注册成功，跳转登录")
          this.$commonFn.toUrl('Public/Login')
        } else {
          this.regParams.username = ""
          this.regParams.password = ""
        }
      })
    },
  },
}
</script>