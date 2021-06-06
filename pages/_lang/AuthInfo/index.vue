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
        <span class="fs32 font-bold clffffff">认证信息</span>
      </template>
    </van-nav-bar>

    <div class="px-1 pb-6">
      <div class="mt-2">
        <div class="bk21252F rounded-sm shadow-lg p-1 cl868D9A mb-1">
          <div class="flex items-center justify-between border-b bc-487DC6 pb-075">
            <div class="clffffff fs32">
              身份认证
            </div>
            <nuxt-link :to="`/${locale}/AuthInfo/Identity`">
              <div class="fs28 flex items-center">
                <img
                  class="wh036"
                  src="~/assets/svg/icon_AuthInfo.svg"
                  alt=""
                >
                <span class="clCB374E ml-075">去认证</span>
                <van-icon
                  class="fs28 ml-1"
                  name="arrow"
                />
              </div>
            </nuxt-link>
          </div>
          <div class="fs24 flex items-center my-05 pt01">
            <div class="wh008 flex-none bkffffff rounded-full"></div>
            <span class="fs20 ml-1">认证后可提升提币额度</span>
          </div>
          <div class="fs24 flex items-center">
            <div class="wh008 flex-none bkffffff rounded-full"></div>
            <span class="fs20 ml-1">认证后可提升提币额度</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['locale'])
  },
}
</script>
<style lang="scss" scoped>
</style>