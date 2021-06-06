<template>
  <div class="Appeal">
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
        <span class="fs32 font-bold clffffff">申诉</span>
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

      <div class="flex items-center shadow-lg rounded-sm p-1 bk21252F mt-1 fs24 cl6A7B98">
        <img
          class="w-1"
          src="~/assets/svg/Annotation.svg"
          alt=""
        >
        <span class="ml-1">平台建议参考以下内容先与对方协商解决</span>
      </div>

      <div class="shadow-lg rounded-sm p-1 bk222A37 mt-1 fs28 cl6A7B98">
        <p class="cl868D9A fs28">申诉原因</p>
        <van-field
          v-model="value"
          class="input-label input-label-w2 fs32 bk15171E rounded-sm shadow-lg p-1 w-full mt-1"
          center
          placeholder="请输入申诉原因"
        >
        </van-field>
      </div>

      <div class="shadow-lg rounded-sm p-1 bk222A37 mt-1 fs28 cl6A7B98">
        <p class="cl868D9A fs28">问题描述</p>
        <van-field
          class="fs32 bk15171E rounded-sm shadow-lg p-1 w-full mt-1"
          v-model="value"
          rows="4"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入问题描述"
          show-word-limit
        />
      </div>

      <div class="shadow-lg rounded-sm p-1 bk222A37 mt-1 fs28 cl6A7B98">
        <p class="cl868D9A fs28">上传凭证</p>
        <div class="mt-1">
          <van-uploader
            class="bk292E39"
            :after-read="afterRead"
          />
        </div>
      </div>

    </van-pull-refresh>

    <div class="bk21252F p-1 fs28 cl868D9A shadow-lg fixed w-full bottom-0">
      <div class="flex items-center space-x-1">
        <div
          @click="show = true"
          class="button button-2xl fs32 bk02AD8F clffffff flex-1"
        >
          提交申诉
        </div>
      </div>
    </div>

    <van-popup
      class="bk2E3743 rounded-sm w-2/3"
      v-model="show"
    >
      <div class="fs32 cl9FA9C0 p-1 text-center">
        您的申诉已提交，请等待客服处理，稍后可在订单列表查询处理结果。
      </div>
      <div class="my-1 w-1/2 mx-auto">
        <nuxt-link :to="`/${locale}`">
          <div
            @click="show = false"
            class="button button-xl fs32 bk02AD8F clffffff flex-1"
          >
            返回首页
          </div>
        </nuxt-link>
      </div>
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
      show: false,
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