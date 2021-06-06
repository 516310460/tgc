<template>
  <div class="OrderList">
    <van-nav-bar class="bk191D24 clffffff h092 fixed top-0 w-full z-10" left-arrow>
      <template #left>
        <van-icon @click="$router.back()" class="clffffff fs32" name="arrow-left" />
      </template>
      <template #title>
        <span class="fs32 font-bold clffffff">订单列表</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh class="t-092 relative px-1" v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        class="w-full h-full"
      >
        <nuxt-link :to="`/${locale}/Trade/SuccessInfo`">
          <div class="bk21252F rounded-sm shadow-lg p-1 cl868D9A mb-1" v-for="index in 20" :key="index">
            <div class="flex items-center justify-between">
              <div class="flex items-center clffffff fs32">
                <span class="cl02AD8F">购买</span>
                <span class="ml-075">BTC</span>
              </div>
              <div class="fs28 flex items-center">
                <span class="cl02AD8F">交易成功</span>
                <van-icon class="fs28 ml-1" name="arrow" />
              </div>
            </div>
            <div class="fs24 flex items-center justify-between">
              <span>单价  ￥319,567.89</span>
              <span class="fs20">06-30 09:50:34</span>
            </div>
            <div class="fs24 flex items-center justify-between">
              <span>数量  0.02553837 BTC</span>
              <span class="fs28 font-bold clffffff">￥ 10,000.00</span>
            </div>
          </div>
        </nuxt-link>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    //复制成功
    onCopy(){
      this.$Toast("复制成功");
    },
    // 加载更多
    onLoad(){
      this.finished = true
    }
  },
}
</script>
<style lang="scss" scoped>
  
</style>