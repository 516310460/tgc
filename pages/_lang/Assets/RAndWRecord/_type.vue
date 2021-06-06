<template>
  <div class="RAndWRecord">
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
        <span class="fs32 font-bold clffffff">充提记录</span>
      </template>
    </van-nav-bar>

    <div class="bk191D24 relative t-092 w-full mt-3">
      <van-tabs
        class="transparent"
        v-model="active"
        @click="onClick"
      >
        <van-tab
          v-for="(item, index) in typeList"
          :key="index"
        >
          <template #title>
            <div class="fs28">
              <p>{{item.name}}</p>
            </div>
          </template>

          <div class="bk191D24">
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

                <div class="pt0025">
                  <ul
                    v-if="active == 0"
                    class="mt-1 px-1"
                  >
                    <li
                      v-for="(item, index) in RechargeData"
                      :key="index"
                      class="cl868D9A bk21252F rounded-sm my-1 p-1"
                    >
                      <!-- <nuxt-link :to="`/${locale}/Assets/RAndWRecord/Details/123123?type=${active}`"> -->
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
                      <!-- </nuxt-link> -->
                    </li>
                  </ul>
                  <ul
                    v-if="active == 1"
                    class="mt-1 px-1"
                  >
                    <li
                      v-for="(item, index) in WithdrawalData"
                      :key="index"
                      class="cl868D9A bk21252F rounded-sm my-1 p-1"
                    >
                      <!-- <nuxt-link :to="`/${locale}/Assets/RAndWRecord/Details/123123?type=${active}`"> -->
                      <div class="flex items-center cl868D9A">
                        <div class="fs28 w-1/3">币种</div>
                        <div class="fs28 w-1/3 text-center">状态</div>
                        <div class="fs28 w-1/3 text-right">数量</div>
                      </div>
                      <div class="flex items-center clffffff">
                        <div class="fs28 w-1/3">{{item.coinName}}</div>
                        <div class="fs28 w-1/3 text-center">{{item.state == 0 ? '待审核' : (item.state == 1 ? '审核通过' : item.state == 2 ? '已完成' : item.state == 3 ? '审核拒绝' : '')}}</div>
                        <div class="fs28 w-1/3 font-bold text-right">{{item.amount}}</div>
                      </div>
                      <div
                        v-if="item.state == 2"
                        class="flex items-center justify-between cl868D9A"
                      >
                        <span class="fs24">{{item.createTime}}</span>
                        <span class="fs24 font-bold cl02AD8F">
                          <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
                          <span class="ml-075">成功</span>
                        </span>
                      </div>
                      <!-- </nuxt-link> -->
                    </li>
                  </ul>
                </div>

              </van-list>

            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
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
          name: '充值',
        },
        {
          name: '提现',
        }
      ],
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
      RechargeData: [],
      WithdrawalData: [],
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.flowRecorList()
      this.myWithDraw()
    },
    flowRecorList () {
      // 流水类型：1-充值 2-提现 3-内部转账 4-币种兑换 5-手续费 6-购买矿机 7-参与游戏 8-游戏收益 9-矿机收益 10-社区奖励-游戏 
      // 11-矿机加速收益 12-节点认购 13-节点收益 14-节点退款 15-提现退款 16-推广收益 17-游戏退款 18-社区奖励-矿机
      let params1 = {
        type: "1"
      }
      this.$api.flowRecord.flowRecorList(params1).then(res => {
        if (res.type == "success") {
          this.RechargeData = res.data
        }
      })
    },
    // 获取提币记录
    myWithDraw () {
      this.$api.userAccount.myWithDraw().then(res => {
        if (res.type == "success") {
          this.WithdrawalData = res.data
        }
      })
    },
    onClick (name, title) {
      // this.$Toast(title);
      // console.log(name, title)
    },
    // 下拉刷新
    onRefresh () {
      this.init()
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
