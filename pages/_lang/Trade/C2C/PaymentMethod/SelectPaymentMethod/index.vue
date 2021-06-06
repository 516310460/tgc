<template>
  <div class="SelectPaymentMethod h-screen">
    <van-nav-bar
      class="bk191D24-05 px-1 fixed top-0 w-full z-10 h092"
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
        <span class="fs32 font-bold clffffff">选择收款方式</span>
      </template>
    </van-nav-bar>

    <div class="relative t-092 chartContentHeight overflow-y-auto px-1">
      <van-pull-refresh
        class="h-full"
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

        <div class="bk1D088B rounded-sm px-1 mt-1 clffffff">
          <nuxt-link
            :to="`/${locale}/Trade/C2C/PaymentMethod/AddPaymentMethod/1`"
            class="py-1 wechat flex items-center justify-between border-b bc-487DC6"
          >
            <div class="flex items-center space-x-1 pl-1">
              <img
                class="w-2"
                src="~/assets/svg/wx.svg"
                alt=""
              >
              <span>微信</span>
            </div>
            <van-icon
              class="fs32 mr-1"
              name="arrow"
            />
          </nuxt-link>
          <nuxt-link
            :to="`/${locale}/Trade/C2C/PaymentMethod/AddPaymentMethod/2`"
            class="py-1 zfb flex items-center justify-between border-b bc-487DC6"
          >
            <div class="flex items-center space-x-1 pl-1">
              <img
                class="w-2"
                src="~/assets/svg/zfb.svg"
                alt=""
              >
              <span>支付宝</span>
            </div>
            <van-icon
              class="fs32 mr-1"
              name="arrow"
            />
          </nuxt-link>
          <nuxt-link
            :to="`/${locale}/Trade/C2C/PaymentMethod/AddPaymentMethod/3`"
            class="py-1 bank flex items-center justify-between"
          >
            <div class="flex items-center space-x-1 pl-1">
              <img
                class="w-2"
                src="~/assets/svg/yhk.svg"
                alt=""
              >
              <span>银行卡</span>
            </div>
            <van-icon
              class="fs32 mr-1"
              name="arrow"
            />
          </nuxt-link>
        </div>

      </van-pull-refresh>

    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      showEntrustPopover: false,
      // 下拉刷新
      isLoading: false,
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
      })
    })
  },
  methods: {
    onClick (name, title) {
      // this.$Toast(title);
      // console.log(name, title)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    }
  }
};
</script>
<style lang="scss">
.SelectPaymentMethod {
  .wechat {
    width: 100%;
    height: 1.1rem;
    background-position: center center;
    background: url('~/assets/svg/wechat-bg.svg');
    background-size: 100% 100%;
  }
  .zfb {
    width: 100%;
    height: 1.1rem;
    background-position: center center;
    background: url('~/assets/svg/zfb-bg.svg');
    background-size: 100% 100%;
  }
  .bank {
    width: 100%;
    height: 1.1rem;
    background-position: center center;
    background: url('~/assets/svg/bank-bg.svg');
    background-size: 100% 100%;
  }
}
</style>
