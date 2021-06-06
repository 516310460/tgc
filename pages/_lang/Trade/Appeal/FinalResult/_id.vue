<template>
  <div class="FinalResult">
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
        <span class="fs32 font-bold clffffff">申诉结果</span>
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

      <div class="flex items-center justify-between mt-1">
        <div class="clffffff fs44">
          申诉已完结
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

      <div class="shadow-lg rounded-sm p-1 bk222A37 mt-1 fs28 cl6A7B98">
        <p class="cl868D9A fs28">申诉原因：</p>
        <p class="clffffff fs28 mt-1">我的钱付错人了</p>
        <p class="cl868D9A fs28 mt-1">具体原因：</p>
        <p class="clffffff fs28 mt-1">联系不上对方</p>
      </div>

      <div class="shadow-lg rounded-sm p-1 bk222A37 mt-1 fs28 cl6A7B98">
        <p class="cl868D9A fs28">具体原因：</p>
        <p class="clffffff fs28 mt-1">Order cancelled,aooeal is no longer required.</p>
      </div>

      <div class="shadow-lg rounded-sm p-1 bk222A37 mt-1 fs28 cl6A7B98">
        <p class="cl868D9A fs28">上传凭证：</p>
        <img
          class="mt-1 w-6"
          src="~/assets/img/qrcode_localhost.png"
          alt=""
        >
      </div>

      <div class="shadow-lg rounded-sm p-1 bk222A37 mt-1 fs28 cl6A7B98">
        <p class="cl868D9A fs28">问题描述：</p>
        <p class="clffffff fs28 mt-1">12313123</p>
      </div>
    </van-pull-refresh>

    <div class="bk21252F p-1 fs28 cl868D9A shadow-lg fixed w-full bottom-0">
      <div class="flex items-center space-x-1">
        <div
          @click="$router.replace(`/${locale}`)"
          class="button button-2xl fs32 bk2E3743 clffffff flex-1"
        >
          返回首页
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
      orderState: 1,//1.待付款 2.确认付款 3.订单申诉 4.订单取消 5.订单完成
      // 下拉刷新
      isLoading: false,
      value: ''
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  },
}
</script>
<style lang="scss" scoped>
</style>