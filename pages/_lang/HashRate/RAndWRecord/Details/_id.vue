<template>
  <div class="BuyInfo">
    <van-nav-bar
      class="bk191D24-05 clffffff h092 fixed top-0 w-full z-10"
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
        <span class="fs32 font-bold clffffff">兑换详情</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 relative ContentHeight overflow-auto px-1 pb-6"
      v-model="isLoading"
      @refresh="onRefresh"
    >

      <!-- 加载提示 -->
      <template #loading>
        <div class="fs22 flex items-center justify-center">
          <van-loading color="#02AD8F" />
          <span class="ml-1">加载中...</span>
        </div>
      </template>

      <div>
        <div class="flex items-center justify-between mt-2">
          <div class="text-center w-full">
            <p class="fs28 clffffff">数量</p>
            <p class="fs44 clffffff font-bold">100.00 <span class="fs28">USDT</span></p>
            <div class="fs24 font-bold cl02AD8F flex items-center justify-center">
              <img
                class="w-1"
                src="~/assets/svg/icon_Successfultransaction.svg"
                alt=""
              >
              <span class="ml-075">成功</span>
            </div>
          </div>
        </div>

        <div
          v-if="type == 0"
          class="bk21252F rounded-sm my-1 p-1 fs28 cl868D9A shadow-lg"
        >
          <div class="flex items-center justify-between my-1">
            <span>确认数</span>
            <div class="clffffff flex items-center fs36 cl02AD8F font-bold">
              50 / 1
            </div>
          </div>
          <div class="flex items-start my-1">
            <div class="w-1/2">地址</div>
            <p class="clffffff w-1/2 break-all text-right">
              assfsfasfasfassdfasfweiuywytiiwebfkjsdbk
            </p>
          </div>
          <div class="flex items-start justify-between my-1">
            <div class="w-1/2">交易嘻哈</div>
            <p class="clffffff w-1/2 break-all text-right">
              assfsfasfasfassdfasfweiuywytiiwebfkjsdbk
            </p>
          </div>
          <div class="flex items-center justify-between my-1">
            <span>日期</span>
            <div class="clffffff flex items-center">
              2021-01-07 22:51:22
            </div>
          </div>
        </div>

        <div
          v-if="type == 1"
          class="bk21252F rounded-sm my-1 p-1 fs28 cl868D9A shadow-lg"
        >
          <div class="flex items-center justify-between my-1">
            <span>确认数</span>
            <div class="clffffff flex items-center fs36 cl02AD8F font-bold">
              1 / 1
            </div>
          </div>
          <div class="flex items-start my-1">
            <div class="w-1/2">地址</div>
            <p class="clffffff w-1/2 break-all text-right">
              assfsfasfasfassdfasfweiuywytiiwebfkjsdbk
            </p>
          </div>
          <div class="flex items-start my-1">
            <div class="w-1/2">标签</div>
            <p class="clffffff w-1/2 break-all text-right">
              111120
            </p>
          </div>
          <div class="flex items-start my-1">
            <div class="w-1/2">手续费</div>
            <p class="clffffff w-1/2 break-all text-right">
              0.25
            </p>
          </div>
          <div class="flex items-start justify-between my-1">
            <div class="w-1/2">交易嘻哈</div>
            <p class="clffffff w-1/2 break-all text-right">
              assfsfasfasfassdfasfweiuywytiiwebfkjsdbk
            </p>
          </div>
          <div class="flex items-center justify-between my-1">
            <span>日期</span>
            <div class="clffffff flex items-center">
              2021-01-07 22:51:22
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>

  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 下拉刷新
      isLoading: false,
      fastShow: false,
      paymentMethodIndex: 0,
      id: this.$route.params.id,
      type: this.$route.query.type,//0.充值 1.提币
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    //复制成功
    onCopy () {
      this.$Toast("复制成功");
    },
  },
}
</script>
<style lang="scss" scoped>
</style>