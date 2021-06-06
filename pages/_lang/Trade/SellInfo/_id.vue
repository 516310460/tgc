<template>
  <div class="BuyInfo">
    <van-nav-bar
      v-if="orderState != 5"
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
        <span class="fs32 font-bold clffffff">出售BTC</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      v-if="orderState != 5"
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
            <p class="fs44 clffffff font-bold">等待买家付款</p>
            <div class="flex items-center fs24 cl727988">
              <span>预计将在 </span>
              <span class="cl02AD8F">3分钟</span>
              <span> 内收到买家付款</span>
            </div>
          </div>
          <nuxt-link :to="`/${locale}/Public/Chart`">
            <img
              class="mx-auto w-2"
              src="~/assets/svg/chat.svg"
              alt=""
            >
            <p class="cl727988 fs24 mt01">联系买家</p>
          </nuxt-link>
        </div>

        <div class="bk21252F rounded-sm my-1 p-1 fs28 cl868D9A shadow-lg">
          <div class="flex items-center clffffff fs36">
            <span class="clCB374E">出售</span>
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
        </div>

        <div class="bk21252F rounded-sm my-1 p-1 fs28 cl868D9A shadow-lg">
          <div class="flex items-center justify-between border-b bc-487DC6 pb-1">
            <span class="clffffff">我的收款方式</span>
            <img
              class="wh036"
              src="~/assets/svg/icon_zhifubao_32px.svg"
              alt=""
            >
          </div>
          <div class="flex items-center justify-between my-1">
            <span>支付宝账号</span>
            <div class="clffffff flex items-center">
              <span>18784596790</span>
            </div>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span>收款二维码</span>
            <div class="clffffff flex items-center">
              <img
                @click="showQRcode = true"
                class="wh036"
                src="~/assets/svg/QRcode.svg"
                alt=""
              >
            </div>
          </div>
          <!-- <div class="flex items-center justify-between my-1">
            <span>支付方式</span>
            <div class="clffffff flex items-center">
              <span>银行卡</span>
            </div>
          </div>
          <div class="flex items-center justify-between my-1">
            <span>支付信息</span>
            <div class="clffffff flex items-center">
              <span>邮储银行(*3299)</span>
            </div>
          </div>
          <div class="flex items-center justify-between my-1">
            <span>收款姓名</span>
            <div class="clffffff flex items-center">
              <span>刘熙熙</span>
            </div>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span>支付时间</span>
            <div class="clffffff flex items-center">
              <span>2021-06-23 17:51:35</span>
            </div>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span>卖家昵称</span>
            <div class="clffffff flex items-center">
              <span class="underline">币币圈迩</span>
              <van-icon class="fs28 ml-1" name="arrow" />
            </div>
          </div> -->
        </div>

        <p class="text-center fs28 clCD7728 py-3">说明：二维码可点击放大查看</p>

      </div>

      <div v-if="orderState == 4">
        <div class="flex items-center justify-between">
          <div>
            <p class="fs44 clffffff font-bold">订单已取消</p>
            <div class="flex items-center fs24 cl02AD8F">
              订单已取消，若有疑问，可联系客服
            </div>
          </div>
          <nuxt-link :to="`/${locale}/Public/Chart`">
            <img
              class="mx-auto w-2"
              src="~/assets/svg/chat.svg"
              alt=""
            >
            <p class="cl727988 fs24 mt01">联系卖家</p>
          </nuxt-link>
        </div>
        <div class="bk21252F rounded-sm my-1 p-1 fs28 cl868D9A shadow-lg">
          <div class="flex items-center clffffff fs36">
            <span class="clCB374E">出售</span>
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
          <div class="flex items-center justify-between my-1">
            <span>创建时间</span>
            <div class="clffffff flex justify-end">
              2021-06-23 17:51:35
            </div>
          </div>
        </div>

        <div class="bk21252F rounded-sm my-1 p-1 fs28 cl868D9A shadow-lg">
          <div class="flex items-center justify-between">
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
      </div>

    </van-pull-refresh>

    <div
      v-if="orderState != 5"
      class="bk21252F p-1 fs28 cl868D9A shadow-lg fixed w-full bottom-0"
    >
      <div class="flex items-center space-x-1">
        <nuxt-link
          :to="`/${locale}/Trade/Appeal`"
          class="flex-1"
        >
          <div
            v-if="orderState == 2"
            class="button button-2xl fs32 bk616A77 clffffff"
          >
            申诉
          </div>
        </nuxt-link>
        <div
          v-if="orderState == 1"
          @click="orderState = 5"
          class="button button-2xl fs32 bk02AD8F clffffff flex-1"
        >
          我已经确认收款
        </div>
      </div>
    </div>

    <div
      v-if="orderState == 5"
      class="fixed w-full h-full clffffff"
    >
      <div class="text-center mt-12">
        <img
          class="mx-auto"
          src="~/assets/svg/Successfullysold.svg"
          alt=""
        >
        <div class="font-bold mt-1">
          <span>￥</span>
          <span class="ml-1 fs68">1900.45</span>
        </div>
        <p class="fs28 mt-1 mb-2">您已成功出售 245.21 USDT</p>
        <nuxt-link :to="`/${locale}`">
          <div class="button button-2xl fs32 bk02AD8F clffffff flex-1 w-12 mx-auto">
            完成
          </div>
        </nuxt-link>
      </div>
    </div>

    <van-popup v-model="showQRcode">
      <div class="p-1">
        <img
          src="~/assets/img/qrcode_localhost.png"
          alt=""
        >
      </div>
    </van-popup>

  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      orderState: 1,//1.确认收款 2.** 3.订单申诉 4.订单取消 5.订单完成
      // 下拉刷新
      isLoading: false,
      showQRcode: false,//是否显示二维码
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