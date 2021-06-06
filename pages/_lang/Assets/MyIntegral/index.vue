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
        <span class="fs32 font-bold clffffff">积分</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 relative chartContentHeight overflow-auto"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div class="border-b bc-487DC6 pb-075 px-1 mt-1">
        <p class="fs24 cl868D9A">积分</p>
        <p class="fs48 clffffff font-bold">{{UserInfo.gamePoints}}</p>
      </div>
      <div class="p-1">
        <p class="fs32 clffffff font-semibold">
          积分明细
        </p>
        <div class="mt-1 grid grid-cols-1 gap-1">
          <div
            v-for="(item, index) in RechargeData"
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
    </van-pull-refresh>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
      RechargeData: []
    }
  },
  computed: {
    ...mapState(['locale', 'UserInfo'])
  },
  created () {
    this.flowRecorList()
  },
  methods: {
    // 获取积分
    flowRecorList () {
      let params1 = {
        type: "20",
        coinName: "JF"
      }
      this.$api.flowRecord.flowRecorList(params1).then(res => {
        if (res.type == "success") {
          this.RechargeData = res.data
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