<template>
  <div class="buybitHome bk02AD8F C2C-Order">
    <div class="bk191D24">
      <van-tabs
        class="transparent"
        @click="onClick"
      >
        <van-tab
          v-for="(item, index) in coinList"
          :key="index"
        >
          <template #title>
            <div class="fs28">
              <p>{{item.orderType}}</p>
            </div>
          </template>

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

              <ul class="mt-4 px-1">
                <li
                  class="bk21252F rounded-sm shadow-lg p-1 cl868D9A mb-1"
                  v-for="index in 10"
                  :key="index"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center clffffff fs32">
                      <span class="cl02AD8F">购买</span>
                      <span class="ml-075">BTC</span>
                    </div>
                    <div class="fs28 flex items-center">
                      <span class="cl02AD8F">交易成功</span>
                      <van-icon
                        class="fs28 ml-1"
                        name="arrow"
                      />
                    </div>
                  </div>
                  <div class="fs24 flex items-center justify-between">
                    <span>单价 ￥319,567.89</span>
                    <span class="fs20">06-30 09:50:34</span>
                  </div>
                  <div class="fs24 flex items-center justify-between">
                    <span>数量 0.02553837 BTC</span>
                    <span class="fs28 font-bold clffffff">￥ 10,000.00</span>
                  </div>
                </li>
              </ul>

              <!-- 暂无订单 -->
              <!-- <div class="mx-auto my-3 text-center">
               <img src="~/assets/svg/icon_Emptystate.svg" alt="" class="w-4 mx-auto"> 
               <p class="fs24 mt01 clA5A9B0">暂无订单</p>
              </div> -->
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  layout: 'c2c',
  data () {
    return {
      coinList: [
        {
          orderType: '全部',
        },
        {
          orderType: '未付款',
        },
        {
          orderType: '已付款',
        },
        {
          orderType: '已取消',
        },
        {
          orderType: '申诉',
        }
      ],
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
    onClick (name, title) {
      // this.$Toast(title);
    },
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
.C2C-Order {
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
