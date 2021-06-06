<template>
  <div class="C2C-ADList">

    <van-nav-bar
      class="bk21252F clffffff h092 fixed top-0 w-full z-10"
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
        <div class="flex items-center">
          <span class="fs32 clffffff font-semibold">我的广告</span>
        </div>
      </template>
      <template #right>
        <van-icon
          @click="applyADShow = true"
          class="clffffff fs32"
          name="plus"
        />
      </template>
    </van-nav-bar>

    <div class="bk191D24">
      <no-ssr>
        <van-dropdown-menu
          class="SelectList t-092 h076 fixed w-full z-20"
          active-color="#02AD8F"
        >
          <van-dropdown-item
            v-model="coinName"
            :options="coinList"
          />
          <van-dropdown-item
            v-model="buyType"
            :options="typeList"
          />
          <van-dropdown-item
            v-model="stateName"
            :options="stateList"
          />
        </van-dropdown-menu>
      </no-ssr>
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

        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          class="w-full h-full"
        >
          <template #finished>
            <div class="fs22">
              没有更多了
            </div>
          </template>
          <template #loading>
            <div class="fs22 flex items-center justify-center">
              <van-loading color="#02AD8F" />
              <span class="ml-1">加载中...</span>
            </div>
          </template>

          <!-- <ul class="mt-5 px-1">
            <li class="bk21252F rounded-sm shadow-lg p-1 cl868D9A mb-1" v-for="index in 10" :key="index">
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
            </li>
          </ul> -->

          <!-- 暂无订单 -->
          <div>
            <div class="mx-auto mt-12 text-center">
              <img
                src="~/assets/svg/icon_Emptystate.svg"
                alt=""
                class="w-4 mx-auto"
              >
              <p class="fs24 mt01 clA5A9B0">暂无订单</p>
            </div>
            <div
              @click="applyADShow = true"
              class="button button-xl fs28 bk02AD8F clffffff mt-1 w-8 mx-auto"
            >
              发布广告
            </div>
          </div>

        </van-list>
      </van-pull-refresh>
    </div>

    <!-- 申请广告方 -->
    <van-popup
      class="bk2E3743 rounded-sm w-3/4"
      v-model="applyADShow"
    >
      <div class="m-1">
        <img
          class="w-3 h-3 mx-auto"
          src="~/assets/svg/icon_remind.svg"
          alt=""
        >
      </div>
      <div class="fs28 cl9FA9C0 m-1 pb-1 text-center">
        请先申请成为广告方
      </div>
      <div class="flex items-center my-1 px-1 space-x-2">
        <div
          @click="applyADShow = false"
          class="button button-xl fs32 bk2E3743 border bc-co535E6D clffffff flex-1"
        >
          取消
        </div>
        <div
          @click="applyADShow = false"
          class="button button-xl fs32 bk02AD8F clffffff flex-1"
        >
          去申请
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  layout: 'c2c',
  data () {
    return {
      coinName: '',
      buyType: '',
      stateName: '',
      coinList: [
        { text: '所有币种', value: '' },
        { text: 'USDT', value: 'USDT' },
        { text: 'BTC', value: 'BTC' },
        { text: 'XUSD', value: 'XUSD' },
      ],
      typeList: [
        { text: '所有类型', value: '' },
        { text: '购买', value: 'buy' },
        { text: '出售', value: 'sell' },
      ],
      stateList: [
        { text: '所有状态', value: '' },
        { text: '已上架', value: 'upper' },
        { text: '未上架', value: 'lower' },
      ],
      applyADShow: false,
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    // 加载更多
    onLoad () {
      this.finished = true
    }
  }
};
</script>
<style lang="scss">
.C2C-ADList {
  .van-tabs {
    .van-tabs__nav {
      background: $co191D24;
      z-index: 30;
      position: relative;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 30;
      border-bottom: 1px solid $co487DC6;
    }
  }
}
</style>
