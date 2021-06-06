<template>
  <div class="Transfer">
    <van-nav-bar
      class="bk191D24 clffffff h092 fixed top-0 w-full z-10"
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
        <span class="fs32 font-bold clffffff">划转</span>
      </template>
      <template #right>
        <nuxt-link :to="`/${locale}/Public/Transfer/Record/123321`">
          <img
            class="wh036"
            src="~/assets/svg/icon_recording.svg"
            alt=""
          >
        </nuxt-link>
      </template>
    </van-nav-bar>

    <div class="clffffff px-1 t-092 h076 fixed w-full">
      <div class="bk21252F rounded-sm shadow-lg p-1 w-full mt-3 flex items-center justify-between">
        <div class="flex">
          <div>
            <div class="wh008 mt0125 flex-none bk02AD8F rounded-full"></div>
            <div class="wh005 mt0125 flex-none bk868D9A rounded-full"></div>
            <div class="wh005 mt0125 flex-none bk868D9A rounded-full"></div>
            <div class="wh005 mt0125 flex-none bk868D9A rounded-full"></div>
            <div class="wh008 mt0125 flex-none bk0070F3 rounded-full"></div>
          </div>
          <div class="fs28">
            <div class="flex items-center cl868D9A">
              <span class="ml-1">从</span>
              <span class="ml-1">法币账户</span>
            </div>
            <div class="flex items-center mt-1">
              <span class="cl868D9A ml-1">到</span>
              <span class="clffffff font-semibold ml-1">币币账户</span>
            </div>
          </div>
        </div>
        <img
          class="w-2"
          src="~/assets/svg/icon_Switch_36px.svg"
          alt=""
        >
      </div>

      <div class="bk21252F rounded-sm shadow-lg p-1 w-full mt-1">
        <nuxt-link :to="`/${locale}/Public/Transfer/CoinList`">
          <div class="flex items-center justify-between">
            <span class="fs28 clffffff">{{coinName || 'BTC'}}</span>
            <van-icon
              class="fs28"
              name="arrow"
            />
          </div>
        </nuxt-link>
      </div>

      <p class="fs28 clC9CED8 mt-1">数量</p>

      <van-field
        v-model="value"
        class="input-label input-label-w2 fs32 bk21252F rounded-sm shadow-lg p-1 w-full mt-1"
        center
        placeholder="请输入划转数量"
      >
        <template #button>
          <span class="fs32 clffffff font-light">
            USDT
          </span>
          <span class="fs32 cl02AD8F ml-1">
            全部
          </span>
        </template>
      </van-field>

      <p class="fs28 clC9CED8 mt-1">可用资产: 0 BTC</p>
    </div>

    <!-- <div class="flex items-center justify-between mt-1">
      <span>卖家昵称</span>
      <div class="clffffff flex items-center">
        <span class="underline">币币圈迩</span>
        <van-icon class="fs28 ml-1" name="arrow" />
      </div>
    </div> -->

    <div class="bk21252F p-1 fs28 cl868D9A shadow-lg fixed w-full bottom-0">
      <div class="flex items-center space-x-1">
        <div class="button button-2xl fs32 bk02AD8F clffffff flex-1">
          确认划转
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
      value: '',
      coinName: this.$route.params.type
    }
  },
  computed: {
    ...mapState(['locale'])
  },
}
</script>
<style lang="scss" scoped>
</style>