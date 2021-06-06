<template>
  <div class="BuyInfo">
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
        <span class="fs32 font-bold clffffff">{{tradeType == 'true' ? '购买BTC' : '出售BTC'}}</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 relative px-1 pb-6"
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

      <div v-if="orderState == 1">
        <div class="flex items-center justify-between">
          <div>
            <p class="fs44 clffffff font-bold">￥10,000.00</p>
            <div class="flex items-center fs24">
              <span class="cl727988">剩余付款时间:</span>
              <span class="cl02AD8F">19：48</span>
            </div>
          </div>
        </div>

        <div class="bk21252F rounded-sm my-1 p-1 fs28 cl868D9A shadow-lg">
          <div class="flex items-center clffffff fs36">
            <span class="cl02AD8F">{{tradeType == 'true' ? '购买' : '出售'}}</span>
            <span class="ml-075">BTC</span>
          </div>
          <div class="flex items-center justify-between my-1">
            <span>交易总价</span>
            <div class="clffffff flex items-center fs36 cl02AD8F font-bold">
              ￥ 10,000.00
            </div>
          </div>
          <div class="flex items-center justify-between my-1">
            <span>交易单价</span>
            <div class="clffffff flex items-center">
              ￥ 391,341.51
            </div>
          </div>
          <div class="flex items-center justify-between my-1 pb-1 border-b bc-487DC6">
            <span>数量</span>
            <div class="clffffff flex items-center">
              0.02555312 BTC
            </div>
          </div>
          <div class="flex items-center justify-between my-1">
            <span>订单号</span>
            <div class="clffffff flex items-center">
              <span>20211015689468467486</span>
              <img
                class="w-1 ml-1"
                v-clipboard:copy="'1111'"
                v-clipboard:success="onCopy"
                src="~/assets/svg/icon_copy.svg"
                alt=""
              >
            </div>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span>创建时间</span>
            <div class="clffffff flex justify-end">
              2021-06-23 17:51:35
            </div>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span>卖家昵称</span>
            <div class="clffffff flex items-center">
              <span class="underline">币币圈迩</span>
              <van-icon
                class="fs28 ml-1"
                name="arrow"
              />
            </div>
          </div>
        </div>

        <div class="bk21252F rounded-sm my-1 p-1 fs28 cl868D9A shadow-lg">
          <div class="flex items-center justify-between">
            <span>收款方式</span>
            <div class="clffffff flex items-center space-x-1">
              <img
                class="w-2"
                src="~/assets/svg/zfb.svg"
                alt=""
              >
              <img
                class="w-2"
                src="~/assets/svg/wx.svg"
                alt=""
              >
              <img
                class="w-2"
                src="~/assets/svg/yhk.svg"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>

    <div class="bk21252F p-1 fs28 cl868D9A shadow-lg fixed w-full bottom-0">
      <div class="flex items-center space-x-1">
        <div
          v-if="orderState == 1"
          @click="orderState = 4"
          class="button button-2xl fs32 bk2E3743 clffffff flex-none"
        >
          取消订单
        </div>
        <div
          v-if="orderState == 1"
          @click="fastShow = true"
          class="button button-2xl fs32 bk02AD8F clffffff flex-1"
        >
          选择支付方式
        </div>
        <nuxt-link
          v-if="orderState == 4"
          :to="`/${locale}/Trade`"
        >
          <div class="button button-2xl fs32 bk02AD8F clffffff flex-1">
            重新下单
          </div>
        </nuxt-link>
      </div>
    </div>

    <van-popup
      class="bk21252F clffffff"
      v-model="fastShow"
      round
      position="bottom"
    >
      <div class="flex items-center justify-between p-1">
        <span class="fs32">{{tradeType == 'true' ? '确认购买' : '确认出售'}}</span>
        <van-icon
          class="fs32 cl727988"
          @click="fastShow = false"
          name="cross"
        />
      </div>
      <div>
        <div class="mx-1 fs28">
          <p class="my-1">{{tradeType == 'false' ? '选择收款方式' : '选择付款方式'}}</p>
          <div class="grid grid-cols-2 gap-1">
            <div
              @click="paymentMethodIndex = 0"
              class="bk363C4A rounded-sm p-1 flex items-center relative"
            >
              <img
                class="w-2"
                src="~/assets/svg/icon_bank_32px.svg"
                alt=""
              >
              <span class="ml-1">银行卡转账</span>
              <img
                v-if="paymentMethodIndex == 0"
                class="absolute right-0 bottom-0"
                src="~/assets/svg/icon_Check.svg"
                alt=""
              >
            </div>
            <div
              @click="paymentMethodIndex = 1"
              class="bk363C4A rounded-sm p-1 flex items-center relative"
            >
              <img
                class="w-2"
                src="~/assets/svg/icon_zhifubao_32px.svg"
                alt=""
              >
              <span class="ml-1">支付宝转账</span>
              <img
                v-if="paymentMethodIndex == 1"
                class="absolute right-0 bottom-0"
                src="~/assets/svg/icon_Check.svg"
                alt=""
              >
            </div>
            <div
              @click="paymentMethodIndex = 2"
              class="bk363C4A rounded-sm p-1 flex items-center relative"
            >
              <img
                class="w-2"
                src="~/assets/svg/icon_wechat_32px.svg"
                alt=""
              >
              <span class="ml-1">微信转账</span>
              <img
                v-if="paymentMethodIndex == 2"
                class="absolute right-0 bottom-0"
                src="~/assets/svg/icon_Check.svg"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
      <nuxt-link :to="`/${locale}/Trade/${tradeType == 'true' ? 'BuyInfo' : 'SellInfo'}`">
        <div
          @click="fastShow = true"
          class="button button-2xl fs32 bk02AD8F my-2 mx-1"
        >
          {{tradeType == 'true' ? '确认购买' : '确认出售'}}
        </div>
      </nuxt-link>
    </van-popup>

  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      orderState: 1,//1.待付款 2.确认付款 3.订单申诉 4.订单取消 5.订单完成
      // 下拉刷新
      isLoading: false,
      fastShow: false,
      paymentMethodIndex: 0,
      tradeType: this.$route.query.tradeType,
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