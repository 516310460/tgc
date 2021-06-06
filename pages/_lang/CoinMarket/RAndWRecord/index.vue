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
        <span class="fs32 font-bold clffffff">闯关记录</span>
      </template>
      <!-- <template #right>
        <nuxt-link :to="`/${locale}/CoinMarket/RandWRecord/ProfitCenter`">
          <span class="fs28 font-bold clffffff">收益</span>
        </nuxt-link>
      </template> -->
    </van-nav-bar>

    <div class="relative ContentHeight t-092 w-full">
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
              class="w-full h-full mt-4"
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

              <ul
                v-if="active == 0"
                class="px-1"
              >
                <li
                  v-for="(item, index) in myPlayGameData"
                  :key="index"
                  class="cl868D9A bk21252F rounded-sm my-1 p-1"
                >
                  <!-- <nuxt-link :to="`/${locale}/CoinMarket/RAndWRecord/Details/123123?type=${active}`"> -->
                  <p class="fs32 cl02AD8F">{{item.roomIndex}}号游戏厅-第{{item.gameIndex}}关</p>
                  <div class="flex items-center justify-between fs24 cl868D9A">
                    <div>
                      <p>参与数量</p>
                      <p class="fs32 font-bold clffffff">{{item.quantity}}USDT</p>
                    </div>
                    <div>
                      <p>收益率</p>
                      <p class="fs32 font-bold clffffff">{{item.interestRate}}%</p>
                    </div>
                    <div class="text-right">
                      <p>总收益数量</p>
                      <p class="fs32 font-bold clffffff">{{item.profit}}USDT</p>
                    </div>
                  </div>
                  <p>{{item.joinTime}}</p>
                  <!-- <div class="flex items-center justify-between clffffff">
                      <span class="fs28">USDT</span>
                      <span class="fs28 font-bold">30.596195</span>
                    </div>
                    <div class="flex items-center justify-between cl868D9A">
                      <span class="fs24">2021-01-07 22:51:22</span>
                      <span class="fs24 font-bold cl02AD8F">
                        <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
                        <span class="ml-075">成功</span>
                      </span>
                    </div> -->
                  <!-- </nuxt-link> -->
                </li>
              </ul>

              <div v-if="active == 1">
                <div class="relative clffffff">
                  <img
                    class="w-full"
                    src="~/assets/image/CoinMarket/details.png"
                    alt=""
                  >
                  <p class="absolute top-0 w-full text-center pt-1 leading-4 fs30">奇迹TGC</p>
                  <div class="fs28 clffffff text-center absolute t-120 w-full">
                    <div class="flex items-center justify-between px-3 mt-1">
                      <div>
                        <p>{{gameTjData.ztrs}}/{{gameTjData.ztyxrs}}</p>
                        <p class="fs20 cl3A53B8">直推/有效人数</p>
                      </div>
                      <div>
                        <p>{{gameTjData.tdrs}}/{{gameTjData.tdyxrs}}</p>
                        <p class="fs20 cl3A53B8">团队人数/有效人数</p>
                      </div>
                      <span class="fs24 bk3A53B8 clffffff rounded-sm p-01">{{gameTjData.level}}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-1 mt-1 mx-3 pb-1 fs26 border-b bc-3A53B8">
                      <div class="bk1D088B rounded-sm py-1">
                        <p>{{gameTjData.tdljzyj}}</p>
                        <p class="fs20 cl3A53B8">团队累计总业绩(USDT)</p>
                      </div>
                      <div class="bk1D088B rounded-sm py-1">
                        <p>{{gameTjData.xqljzyj}}</p>
                        <p class="fs20 cl3A53B8">小区累计总业绩(USDT)</p>
                      </div>
                      <div class="bk1D088B rounded-sm py-1">
                        <p>{{gameTjData.zrtdljzyj}}</p>
                        <p class="fs20 cl3A53B8">昨日团队总业绩(USDT)</p>
                      </div>
                      <!-- <div class="bk1D088B rounded-sm py-1">
                        <p>{{gameTjData.zrxqljzyj}}</p>
                        <p class="fs20 cl3A53B8">昨日小区总业绩(USDT)</p>
                      </div> -->
                      <div class="bk1D088B rounded-sm py-1">
                        <p>{{gameTjData.zrsy}}</p>
                        <p class="fs20 cl3A53B8">昨日收益(USDT)</p>
                      </div>
                      <div class="bk1D088B rounded-sm py-1">
                        <p>{{gameTjData.ljsy}}</p>
                        <p class="fs20 cl3A53B8">累计收益(USDT)</p>
                      </div>
                    </div>
                  </div>

                  <div class="fs30 clffffff flex items-center pt-1 px-1">
                    <span class="cl02AD8F fs24 font-black">| </span>
                    <span class="ml-075">社区收益</span>
                  </div>

                  <div
                    v-for="(item, index) in gameListData"
                    :key="index"
                    class="cl868D9A bk21252F rounded-sm m-1 p-1"
                  >
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
      myPlayGameData: [],
      gameTjData: [],
      gameListData: []
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.myPlayGame()
    this.gameTj()
  },
  methods: {
    init () {
      this.myPlayGame()
      this.gameTj()
    },
    // 获取游戏社区
    gameTj () {
      // 流水类型：1-充值 2-提现 3-内部转账 4-币种兑换 5-手续费 6-购买矿机 7-参与游戏 8-游戏收益 9-矿机收益 10-社区奖励-游戏 
      // 11-矿机加速收益 12-节点认购 13-节点收益 14-节点退款 15-提现退款 16-推广收益 17-游戏退款 18-社区奖励-矿机
      let params = {
        type: 10
      }
      this.$api.game.gameTj(params).then(res => {
        if (res.type == "success") {
          this.gameTjData = res.data.tj
          this.gameListData = res.data.gameList
        }
      })
    },
    // 获取我的闯关
    myPlayGame () {
      this.$api.game.myPlayGame().then(res => {
        if (res.type == "success") {
          this.myPlayGameData = res.data
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
