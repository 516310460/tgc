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
      <div class="mt-2 text-center">
        <img
          class="w-16 mx-auto"
          src="~/assets/svg/icon_illustration.svg"
          alt=""
        >
        <p class="fs44 cl02AD8F font-semibold mt-1">恭喜</p>
        <p class="fs32 cl868D9A">您的身份认证已完成</p>
      </div>
    </div>

    <div class="fixed bottom-0 w-full my-1">
      <nuxt-link :to="`/${locale}/HashRate`">
        <!-- <div @click="$router.replace(`/${locale}/HashRate`)" class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1"> -->
        <div class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1">
          开始交易
          <!-- bk02AD8F/bk2F3441 -->
        </div>
      </nuxt-link>
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