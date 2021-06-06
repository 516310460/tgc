<template>
  <div class="AuthInfo">
    <van-nav-bar
      class="bk191D24-05 clffffff h092 w-full z-10"
      left-arrow
    >
      <template #left>
        <van-icon
          @click="$router.back()"
          class="clffffff fs32"
          name="arrow-left"
        />
      </template>
      <template #title>
        <span class="fs32 font-bold clffffff">身份认证</span>
      </template>
    </van-nav-bar>

    <div class="px-1 pb-6">
      <div class="mt-2">
        <div class="flex items-center justify-between fs24 mt-2 cl868D9A">
          <span>上传身份证正面</span>
        </div>
        <div class="flex items-center justify-center bk21252F rounded-sm h320 mt01">
          <van-uploader class="custom">
            <img
              class="w-8"
              src="~/assets/svg/icon_positive.svg"
              alt=""
            >
          </van-uploader>
        </div>

        <div class="flex items-center justify-between fs24 mt-2 cl868D9A">
          <span>上传身份证背面</span>
        </div>
        <div class="flex items-center justify-center bk21252F rounded-sm h320 mt01">
          <van-uploader class="custom">
            <img
              class="w-8"
              src="~/assets/svg/icon_back.svg"
              alt=""
            >
          </van-uploader>
        </div>

      </div>
    </div>

    <div class="fixed bottom-0 w-full my-1">
      <p class="fs28 cl868D9A m-1">信息仅用于身份验证，奇迹TGC保障您的信息安全</p>
      <!-- <div @click="applyErrorShow = true" class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1"> -->
      <nuxt-link :to="`/${locale}/AuthInfo/Identity/stepSuccess`">
        <div class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1">
          提交
          <!-- bk02AD8F/bk2F3441 -->
        </div>
      </nuxt-link>
    </div>

    <!-- 认证失败 -->
    <van-popup
      class="bk2E3743 rounded-sm w-3/4"
      v-model="applyErrorShow"
    >
      <div class="m-1">
        <img
          class="w-3 h-3 mx-auto"
          src="~/assets/svg/icon_failure.svg"
          alt=""
        >
      </div>
      <div class="fs28 cl9FA9C0 m-1 pb-1 text-center">
        认证失败，身份证正面反光
      </div>
      <div class="flex items-center my-1 px-1 space-x-2">
        <div
          @click="applyErrorShow = false"
          class="button button-xl fs32 bk02AD8F clffffff flex-1"
        >
          重新认证
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      value: '',
      applyErrorShow: false
    }
  },
  computed: {
    ...mapState(['locale'])
  },
}
</script>
<style lang="scss" scoped>
</style>