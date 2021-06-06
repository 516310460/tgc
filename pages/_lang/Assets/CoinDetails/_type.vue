<template>
  <div class="CoinDetails">
    <van-nav-bar
      class="bk191D24-05 clffffff h092 fixed top-0 w-full z-10"
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
        <span class="fs32 font-bold clffffff">{{type}}</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 relative chartContentHeight overflow-auto"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div class="border-b bc-487DC6 pb-075 px-1 mt-1">
        <p class="fs24 cl868D9A">总资产({{type}})</p>
        <p class="fs48 clffffff font-bold">{{Number(balanceDetailData.total)}}</p>
      </div>
      <div class="flex items-center jy p-1">
        <div class="w-1/3">
          <p class="fs24 cl868D9A">可用({{type}})</p>
          <p class="fs36 clffffff font-bold">{{Number(balanceDetailData.balance)}}</p>
        </div>
        <div class="w-1/3">
          <p class="fs24 cl868D9A">冻结({{type}})</p>
          <p class="fs36 clffffff font-bold">{{Number(balanceDetailData.forzenBalance)}}</p>
        </div>
        <div class="w-1/3">
          <p class="fs24 cl868D9A">折合(CNY)</p>
          <p class="fs36 clffffff font-bold">{{Number(balanceDetailData.rmbBalance)}}</p>
        </div>
      </div>
      <div class="p-1">
        <p class="fs32 clffffff font-semibold">
          交易明细
        </p>
        <div class="mt-1 grid grid-cols-1 gap-1">
          <div
            v-for="(item, index) in balanceDetailData.detail"
            :key="index"
            class="bk21252F p-1"
          >
            <div class="flex items-center justify-between cl868D9A">
              <span class="fs24">类型</span>
              <span class="fs24">数量</span>
            </div>
            <div class="flex items-center justify-between clffffff">
              <span class="fs24">{{item.flowingTypeStr}}</span>
              <span
                :class="item.flowingStatus == 'OUT'
                ? 'clCB374E'
                : 'cl67d852'"
                class="
                fs24
                font-bold"
              >{{item.flowingStatus == "OUT" ? "-" : "+"}}{{item.changeAmount}}{{item.coinName}}</span>
            </div>
            <div class="flex items-center justify-between cl868D9A">
              <span class="fs18">{{item.createTime}}</span>
              <span class="fs18 font-bold cl02AD8F">
                <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
                <span class="ml-075">成功</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="p-1">
        <p class="fs32 clffffff font-semibold">
          去交易
        </p>
        <div class="mt-1 grid grid-cols-2 gap-1">
          <div
            v-for="index in 6"
            :key="index"
            class="bk21252F p-1"
          >
            <div class="fs28 cl868D9A">BTC/<span class="fs24">USDT</span></div>
            <div class="flex items-center justify-between fs28">
              <span class="clCB374E">14,832</span>
              <span class="clCB374E">-0.65%</span>
            </div>
          </div>
        </div>
      </div> -->
    </van-pull-refresh>

    <div class="bk21252F p-1 fs28 cl868D9A shadow-lg fixed w-full bottom-0">
      <div class="flex items-center space-x-1">
        <nuxt-link
          :to="`/${locale}/Assets/Recharge`"
          class="flex-1"
        >
          <div class="button button-2xl fs32 bk02AD8F clffffff flex-1">
            充值
          </div>
        </nuxt-link>
        <nuxt-link
          :to="`/${locale}/Assets/Withdrawal`"
          class="flex-1"
        >
          <div class="button button-2xl fs32 bk02AD8F clffffff">
            提现
          </div>
        </nuxt-link>
        <nuxt-link
          :to="`/${locale}/Assets/Transfer`"
          class="flex-1"
        >
          <div class="button button-2xl fs32 bk02AD8F clffffff flex-1">
            转账
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      type: this.$route.params.type,
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
      balanceDetailData: {
        total: 0,
        balance: 0,
        forzenBalance: 0,
        rmbBalance: 0,
        detail: [],
      }
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.balanceDetail()
  },
  methods: {
    balanceDetail () {
      let params = {
        coinName: this.type
      }
      this.$api.userAccount.balanceDetail(params).then(res => {
        if (res.type == "success") {
          this.balanceDetailData = res.data
        }
      })
    },
    // 下拉刷新
    onRefresh () {
      this.flowRecorList()
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    //复制成功
    onCopy () {
      this.$Toast("复制成功");
    },
    // 加载更多
    onLoad () {
      this.finished = true
    }
  },
}
</script>
<style lang="scss" scoped>
</style>