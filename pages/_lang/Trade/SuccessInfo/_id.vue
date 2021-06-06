<template>
  <div class="SuccessInfo">
    <van-nav-bar
      class="bk02AD8F clffffff h092 fixed top-0 w-full z-10"
      left-arrow
    >
      <template #left>
        <van-icon
          @click="$router.back()"
          class="clffffff fs32"
          name="arrow-left"
        />
      </template>
      <template #right>
        <nuxt-link :to="`/${locale}/Public/Chart`">
          <img
            class="mx-auto w-2"
            src="~/assets/svg/chat.svg"
            alt=""
          >
        </nuxt-link>
      </template>
    </van-nav-bar>

    <div class="bk02AD8F flex items-center justify-between p-2 pb-4 t-092 relative">
      <div>
        <p class="fs40 clffffff font-bold">交易成功</p>
        <p class="fs24 clD7F5F0">您已成功售出29.44 USDT</p>
      </div>
      <img
        class="w-2"
        src="~/assets/svg/icon_Successfultransaction.svg"
        alt=""
      >
    </div>

    <div class="bk21252F relative mx-2 rounded-sm mt-1">
      <div class="bk21252F mx-1">
        <div class="bk21252F rounded-sm my-1 py-1 fs28 cl868D9A">
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
      </div>
    </div>

    <div class="bk21252F relative mx-2 rounded-sm px-1">
      <div class="bk21252F rounded-sm py-1 fs28 cl868D9A shadow-lg">
        <div class="flex items-center justify-between">
          <span class="clffffff">支付宝账号</span>
          <div class="clffffff flex items-center">
            <span>18784596790</span>
          </div>
        </div>
        <div class="flex items-center justify-between mt-1">
          <span class="clffffff">收款二维码</span>
          <div class="clffffff flex items-center">
            <img
              @click="showQRcode = true"
              class="wh036"
              src="~/assets/svg/QRcode.svg"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>

    <div class="bk21252F relative mx-2 mt-1 rounded-sm p-1">
      <div class="flex items-center justify-between clffffff">
        <span>联系客服</span>
        <div class="clffffff flex items-center">
          <van-icon
            class="fs28 ml-1"
            name="arrow"
          />
        </div>
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
export default {
  data () {
    return {
      showQRcode: false,//是否显示二维码
    }
  },
  methods: {
    //复制成功
    onCopy () {
      this.$Toast("复制成功");
    },
  },
}
</script>
<style lang="scss" scoped>
</style>