<template>
  <div class="bk191D24 Chart">
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
        <span class="fs32 font-bold clffffff">对方名称</span>
      </template>
    </van-nav-bar>

    <div class="bk21252F clffffff px-1 h120 t-092 fixed w-full z-20 border-t bc-487DC6">
      <div class="flex items-center justify-between fs24 mt-016">
        <span class="cl868D9A">交易总额</span>
        <span>19:59</span>
      </div>
      <div class="flex items-center justify-between fs34 font-bold cl02AD8F mt-01">
        <span>￥800.00</span>
        <span>请付款</span>
      </div>
    </div>

    <div class="bk191D24 rounded-t-md shadow-2xl mt-212 min-h100-calc-266 pb-8">
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

          <ul class="mt-1">
            <li class="mb-1 pb-1 px-1 clffffff">
              <div class="text-center">
                <p class="fs24 cl868D9A my-1">2021-04-09 15:54:38</p>
                <span class="fs24 cl697080 my-1 bk21252F rounded-sm p-01">您已成功下单，请及时支付</span>
              </div>
            </li>
            <!-- 对方消息 -->
            <li class="mb-1 pb-1 px-1 clffffff">
              <div class="flex items-start">
                <div class="w-3 h-3 fs32 bk02AD8F flex items-center justify-center rounded-full flex-none">中</div>
                <div class="mx-1 fs30 p-1 rounded-tr-md rounded-b-md fs30 bk21252F">
                  1、账户实名付款。不是实名转款扣除手续费，2、转账不要填备注，否则取消订单！！！，3、感谢理解，祝老板发大财。
                </div>
              </div>
            </li>

            <!-- 自己消息 -->
            <li class="mb-1 pb-1 px-1 clffffff">
              <div class="flex items-start">
                <div class="mx-1 fs30 p-1 rounded-tl-md rounded-b-md fs30 bk21252F">
                  1、账户实名付款。不是实名转款扣除手续费，2、转账不要填备注，否则取消订单！！！，3、感谢理解，祝老板发大财。
                </div>
                <div class="w-3 h-3 fs32 bk02AD8F flex items-center justify-center rounded-full flex-none">中</div>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>

    <div class="bk21252F h120 fixed bottom-0 z-30 w-full px-1 flex items-center">
      <van-field
        class="bk2F3543 input-label input-label-Login font-semibold fs28 rounded-sm"
        v-model="value"
        placeholder="请输入消息"
      >
        <template #button>
          <img
            class="w-2"
            src="~/assets/svg/icon_img.svg"
            alt=""
          >
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  layout: 'c2c',
  data () {
    return {
      value: '',
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
    };
  },
  computed: {
    ...mapState(['locale', 'orderTakingState'])
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
.Chart {
  .van-nav-bar__right {
    padding: 0;
  }
  .van-tabs {
    .van-tabs__nav {
      background: $co21252F;
      border-radius: 0.2rem 0.2rem 0 0;
      z-index: 30;
      position: relative;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 1.68rem;
      width: 100%;
      z-index: 30;
      background: #02ad8f;
      border-bottom: 1px solid $co487DC6;
    }
  }
}
</style>
