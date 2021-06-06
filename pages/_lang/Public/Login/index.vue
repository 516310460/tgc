<template>
  <div>
    <div class="p-1">
      <div class="flex items-center justify-between">
        <p
          @click="isBack ? $router.back() : ''"
          class="fs44 clffffff flex items-center"
        >
          <van-icon
            v-if="isBack"
            name="arrow-left"
          />
          登录
        </p>
        <span
          @click="$router.replace(`/${locale}/Public/Reg`)"
          class="cl02AD8F fs32"
        >注册</span>
      </div>
      <div class="mt-5">
        <div class="mt-2 flex items-center justify-between fs24">
          <span class="cl02AD8F">用户名</span>
        </div>
        <van-field
          class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
          v-model="loginParams.username"
          placeholder="请输入用户名"
        >
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>密码</span>
        </div>
        <van-field
          v-model="loginParams.password"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          :type="isShowPassword ? 'text' : 'password'"
          placeholder="请输入登录密码"
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

        <div
          @click="$router.replace(`/${locale}/Public/ForgetPwd`)"
          class="flex items-center justify-between fs24 mt-2 cl02AD8F"
        >
          <span>忘记密码？</span>
        </div>
      </div>
    </div>
    <!-- <div class="fixed bottom-0 w-full my-1"> -->
    <div class="w-full my-1 pb-1">
      <div
        @click="login"
        class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1"
      >
        登录
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      isBack: this.$route.query.isBack,
      isShowPassword: false,
      loginParams: {
        "username": "",// "用户名"
        "password": "",// "登录密码"
        "type": "iOS",// "登录方式：IOS、ANDROID"
      }
    }
  },
  computed: {
    ...mapState(['locale', 'UserInfoArray'])
  },
  methods: {
    login () {
      if (!this.loginParams.username) {
        return this.$Toast("用户不能为空")
      }
      if (!this.loginParams.password) {
        return this.$Toast("密码不能为空")
      }
      this.loginParams.password = this.$md5(this.loginParams.password)
      this.$api.user.login(this.loginParams).then(res => {
        if (res.type == "success") {
          this.$Toast("登录成功")
          if (this.UserInfoArray.length) {
            let newUserInfoArray = this.UserInfoArray.filter(item => {
              return item.userName != res.data.userName
            })
            newUserInfoArray.push(res.data)
            this.$store.commit("SET_COVER_USERINFOARRAY", newUserInfoArray);
            this.$store.commit("SET_USERINFO", res.data);
            // this.UserInfoArray.forEach(item => {
            //   if (item.id == res.data.id) {
            //     isTrue = true
            //     this.$store.commit("SET_USERINFOARRAY", res.data);
            //     this.$store.commit("SET_USERINFO", res.data);
            //   }
            // });
          } else {
            this.$store.commit("SET_USERINFOARRAY", res.data);
            this.$store.commit("SET_USERINFO", res.data);
          }
          this.$store.commit("SET_TOKEN", res.data.token);
          this.$router.replace(`/${this.locale}`)
        } else {
          this.loginParams.username = ""
          this.loginParams.password = ""
        }
      })
    },
  }
}
</script>