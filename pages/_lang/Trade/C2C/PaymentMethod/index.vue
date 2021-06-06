<template>
  <div class="PaymentMethod">
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
        <span class="fs32 font-bold clffffff">C2C收款方式</span>
      </template>
    </van-nav-bar>

    <div class="relative t-092 coinpool-wap-Content w-full">
      <van-pull-refresh
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

        <div class="mt-2 px-1">
          <div class="bk21252F cl868D9A rounded-sm p-1 fs24">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img
                  src="~/assets/svg/zfb.svg"
                  alt=""
                  class="wh04"
                >
                <span class="fs28 clffffff ml-1">支付宝</span>
              </div>
              <img
                class="wh04"
                src="~/assets/svg/icon-modify-18.svg"
                alt=""
              >
            </div>
            <div class="flex items-center justify-between mt-1">
              <div>
                <p>张某</p>
                <p>Collin</p>
              </div>
              <img
                class="wh04"
                src="~/assets/svg/QRcode-1.svg"
                alt=""
              >
            </div>
          </div>
        </div>

        <!-- <div class="m-4">
          <img src="~/assets/svg/icon_Emptystate.svg" alt="" class="w-4 mx-auto">
          <p class="fs24 mt01 clA5A9B0 text-center">暂无收款方式</p>
        </div> -->

      </van-pull-refresh>

      <div class="w-full mb-1 px-1 fixed bottom-0">
        <nuxt-link :to="`/${locale}/Trade/C2C/PaymentMethod/SelectPaymentMethod`">
          <div class="button button-2xl fs32 bk02AD8F clffffff">
            添加收款方式
          </div>
        </nuxt-link>
      </div>
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
.PaymentMethod {
  .van-search__content {
    background-color: #2a303c;
    .van-icon {
      color: #fff;
    }
  }
  .van-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 0.92rem;
      width: 100%;
      z-index: 30;
      background: $co191D24;
      border-bottom: 1px solid $co487DC6;
    }
  }
}
</style>
