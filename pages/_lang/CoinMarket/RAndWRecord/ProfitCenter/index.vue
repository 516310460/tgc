<template>
  <div class="RAndWRecord">
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
        <span class="fs32 font-bold clffffff">收益记录</span>
      </template>
    </van-nav-bar>

    <div class="relative ContentHeight t-092 w-full">
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

          <div class="px-1">
            <!-- <div class="clffffff bk21252F rounded-sm my-1 py-2 text-center fs36">
              累计总收益：0USDT
            </div> -->

            <div class="">
              <div
                v-for="(item, index) in communityData"
                :key="index"
                class="clffffff bk21252F rounded-sm p-1 my-1"
              >
                <!-- <div class="fs24 text-center">
                  <p class="fs32">1号通天塔</p>
                  <p class="cl868D9A">累计收益：0USDT</p>
                </div> -->
                <div class="flex items-center justify-between cl868D9A">
                  <span class="fs28">币种</span>
                  <span class="fs28">数量</span>
                </div>
                <div class="flex items-center justify-between clffffff">
                  <span class="fs28">{{item.coinName}}</span>
                  <span class="fs28 font-bold">{{item.changeAmount}}</span>
                </div>
                <div class="flex items-center justify-between cl868D9A">
                  <span class="fs24">{{item.createTime}}</span>
                  <span class="fs24 font-bold cl02AD8F">
                    <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
                    <span class="ml-075">成功</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </van-list>
      </van-pull-refresh>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      value: '',
      active: 0,
      paymentMethodIndex: 0,//收款方式索引
      typeList: [
        {
          name: '我的闯关',
        },
        {
          name: '闯关社区',
        }
      ],
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
      communityData: []
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.flowRecorList()
  },
  methods: {
    flowRecorList () {
      // 流水类型：1-充值 2-提现 3-内部转账 4-币种兑换 5-手续费 6-购买矿机 7-参与游戏 8-游戏收益 9-矿机收益 10-社区奖励-游戏 
      // 11-矿机加速收益 12-节点认购 13-节点收益 14-节点退款 15-提现退款 16-推广收益 17-游戏退款 18-社区奖励-矿机
      let params = {
        type: "18"
      }
      this.$api.flowRecord.flowRecorList(params).then(res => {
        if (res.type == "success") {
          this.communityData = res.data
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
    // 加载更多
    onLoad () {
      this.finished = true
    }
  }
};
</script>
<style lang="scss">
.RAndWRecord {
  .coinpool-wap-Content {
    padding-bottom: 0.98rem;
  }
  .van-search__content {
    background-color: #191d24;
    .van-icon {
      color: #fff;
    }
  }
  .van-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 0.92rem;
      width: 100%;
      z-index: 30;
      background: $co191D24;
      border-bottom: 1px solid $co487DC6;
    }
  }
}
</style>
