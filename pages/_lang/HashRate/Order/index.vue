<template>
  <div class="HashRate-Order">
    <van-nav-bar
      class="bk191D24 px-1 fixed top-0 w-full z-10 h092"
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
        <span class="fs32 font-bold clffffff">现货</span>
      </template>
    </van-nav-bar>

    <div class="bk191D24 relative t-092 coinpool-wap-Content w-full mt-3">
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

          <div class="">
            <div
              v-if="active == 0"
              class="py-0175 px-1 flex items-center justify-between fs24 cl727988 fixed w-full t-171 z-30 bk191D24"
            >
              <van-popover
                theme="dark"
                v-model="showEntrustPopover"
                trigger="click"
              >
                <template #reference>
                  <div class="flex items-center">
                    <span>{{showEntrustValue}}</span>
                    <img
                      class="w015 ml-075"
                      src="~/assets/svg/icon_dropdown.svg"
                      alt=""
                    >
                  </div>
                </template>
                <div class="fs24 p-1">
                  <div
                    v-for="item in showEntrustList"
                    :key="item"
                    @click="clickEntrustValue(item)"
                    :class="showEntrustValue == item ? 'cl02AD8F' : ''"
                    class="py-0125"
                  >
                    {{item}}
                  </div>
                </div>
              </van-popover>
              <span class="bk2E3743 rounded-sm py003-px010 clffffff">撤销全部</span>
            </div>

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

                <div
                  :class="active == 0 ? 'mt-3' : ''"
                  class="px-1"
                >
                  <ul v-if="active == 0">
                    <li
                      v-for="index in 10"
                      :key="index"
                      class="cl727988 py-1 border-b bc-487DC6"
                    >
                      <div class="flex items-center justify-between">
                        <div class="fs28">
                          <p class="font-semibold clffffff">1BTC/USDT</p>
                          <div class="flex items-center">
                            <span class="clffffff">限价</span>
                            <span class="font-semibold cl02AD8F">买入</span>
                          </div>
                        </div>
                        <div class="fs20">
                          <p class="font-semibold cl727988">2021-04-09 14:34:09</p>
                          <span class="font-semibold cl02AD8F py003-px010 bk0B3D34 rounded-sm float-right">完全成交</span>
                        </div>
                      </div>
                      <div class="flex items-center justify-between fs20 mt-1">
                        <span>数量</span>
                        <span class="clffffff">2.3/<span class="cl727988">2.3</span></span>
                      </div>
                      <div class="flex items-center justify-between fs20">
                        <span>价格</span>
                        <span class="clffffff">4.4295</span>
                      </div>
                    </li>
                  </ul>
                  <ul v-if="active == 1">
                    <li
                      v-for="index in 10"
                      :key="index"
                      class="cl727988 py-1 border-b bc-487DC6"
                    >
                      <div class="flex items-center justify-between">
                        <div class="fs28">
                          <p class="font-semibold clffffff">1BTC/USDT</p>
                          <div class="flex items-center">
                            <span class="clffffff">限价</span>
                            <span class="font-semibold cl02AD8F">买入</span>
                          </div>
                        </div>
                        <div class="fs20">
                          <p class="font-semibold cl727988">2021-04-09 14:34:09</p>
                          <span class="font-semibold cl02AD8F py003-px010 bk0B3D34 rounded-sm float-right">完全成交</span>
                        </div>
                      </div>
                      <div class="flex items-center justify-between fs20 mt-1">
                        <span>数量</span>
                        <span class="clffffff">2.3/<span class="cl727988">2.3</span></span>
                      </div>
                      <div class="flex items-center justify-between fs20">
                        <span>价格</span>
                        <span class="clffffff">4.4295</span>
                      </div>
                    </li>
                  </ul>
                  <ul v-if="active == 2">
                    <li
                      v-for="index in 10"
                      :key="index"
                      class="cl727988 py-1 border-b bc-487DC6"
                    >
                      <div class="flex items-start justify-between">
                        <div class="fs28">
                          <p class="font-semibold clffffff">1BTC/USDT</p>
                          <div class="flex items-center">
                            <span class="clffffff">限价</span>
                            <span class="font-semibold cl02AD8F">买入</span>
                          </div>
                        </div>
                        <div class="fs20">
                          <p class="font-semibold cl727988">2021-04-09 14:34:09</p>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cl727988 fs20 mt-1">
                        <span>价格(USDT)</span>
                        <span class="clffffff">2.3</span>
                      </div>
                      <div class="flex items-center justify-between cl727988 fs20">
                        <span>成交数量(1BTC)</span>
                        <span class="clffffff">4.4295</span>
                      </div>
                      <div class="flex items-center justify-between cl727988 fs20">
                        <span>手续费(1BTC)</span>
                        <span class="clffffff">4.4295</span>
                      </div>
                      <div class="flex items-center justify-between cl727988 fs20">
                        <span>总量(USDT)</span>
                        <span class="clffffff">4.4295</span>
                      </div>
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
      showEntrustPopover: false,
      showEntrustValue: '所有委托',//所有委托、买入委托、卖出委托
      showEntrustList: [
        '所有委托',
        '买入委托',
        '卖出委托'
      ],
      value: '',
      active: 0,
      paymentMethodIndex: 0,//收款方式索引
      typeList: [
        {
          name: '当前委托',
        },
        {
          name: '历史委托',
        },
        {
          name: '成交历史',
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
      setTimeout(() => {
      })
    })
  },
  methods: {
    clickEntrustValue (value) {
      this.showEntrustValue = value
      this.showEntrustPopover = false
    },
    onClick (name, title) {
      // this.$Toast(title);
      // console.log(name, title)
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
.HashRate-Order {
  .van-search__content {
    background-color: #2a303c;
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
