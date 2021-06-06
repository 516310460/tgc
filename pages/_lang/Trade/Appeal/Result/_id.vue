<template>
  <div class="Result">
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
        <span class="fs32 font-bold clffffff">先与对方协商解决</span>
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

      <div class="flex items-center shadow-lg rounded-sm p-1 bk21252F mt-1 fs24 cl6A7B98">
        <img
          class="w-1"
          src="~/assets/svg/Annotation.svg"
          alt=""
        >
        <span class="ml-1">平台建议参考以下内容先与对方协商解决</span>
      </div>

      <div class="shadow-lg rounded-sm p-1 bk222A37 mt-1 fs28 cl6A7B98">
        <p class="cl868D9A fs28">申诉原因：</p>
        <p class="clffffff fs28 mt-1">我的钱付错人了</p>
      </div>

      <div class="shadow-lg rounded-sm p-1 bk222A37 mt-1 fs28 cl6A7B98">
        <p class="cl868D9A fs28">平台建议：</p>
        <p class="clffffff fs28 mt-1">请点击“继续申诉”，<span class="clCB374E">向工作人员提交您付错人的平台订单号、付款凭证以及原路退款账号信息</span></p>
      </div>

    </van-pull-refresh>

    <div class="bk21252F p-1 fs28 cl868D9A shadow-lg fixed w-full bottom-0">
      <div class="flex items-center space-x-1">
        <div
          @click="$router.replace(`/${locale}/Trade/Appeal`)"
          class="button button-2xl fs32 bk191D24 cl02AD8F border bc-02AD8F flex-1"
        >
          继续申诉
        </div>
        <div class="button button-2xl fs32 bk02AD8F clffffff flex-1">
          联系对方
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