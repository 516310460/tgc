<template>
  <div class="buybitHome bk02AD8F Trade">
    <van-nav-bar
      class="bk02AD8F clffffff h092 fixed top-0 w-full z-10"
      left-arrow
    >
      <template #left>
        <nuxt-link :to="`/${locale}`">
          <van-icon
            class="clffffff fs32"
            name="arrow-left"
          />
        </nuxt-link>
        <nuxt-link :to="`/${locale}/Trade/ChangeMoney`">
          <div class="flex items-center">
            <span class="ml-2 mr-075 fs32">CNY</span>
            <img
              class="w-1"
              src="~/assets/svg/tochange.svg"
              alt=""
            >
          </div>
        </nuxt-link>
      </template>
      <template #right>
        <div class="bkffffff cl02AD8F fs28 py-075 pl-1 rounded-l-full flex items-center">
          <span @click="(tradeMode == 1 ? tradeMode = 2 : tradeMode = 1)">{{tradeMode == 1 ? '快捷区' : '自选区'}}</span>
          <van-icon
            class="fs24 cl02AD8F"
            name="play"
          />
        </div>
      </template>
    </van-nav-bar>

    <div class="flex items-center justify-between bk02AD8F clffffff px-1 t-092 h076 fixed w-full z-20 coinTypeChange">
      <div class="flex items-center fs32 cl94EADB">
        <div
          class="ml-1 transition duration-300 ease-in-out transform"
          @click="tradeType = true"
          :class="tradeType ? 'scale-125 font-bold clffffff' : ''"
        >我要买</div>
        <div
          class="ml-2 transition duration-300 ease-in-out transform"
          @click="tradeType = false"
          :class="!tradeType ? 'scale-125 font-bold clffffff' : ''"
        >我要卖</div>
      </div>
      <div
        v-if="!orderTakingState"
        class="flex items-center"
      >
        <nuxt-link :to="`/${locale}/Trade/OrderList`">
          <img
            class="wh04"
            src="~/assets/svg/order.svg"
            alt=""
          >
        </nuxt-link>
        <van-popover
          placement="bottom-end"
          v-model="showMorePopover"
          trigger="click"
        >
          <template #reference>
            <div class="flex items-center">
              <img
                class="ml-1 wh04"
                src="~/assets/svg/order_admin.svg"
                alt=""
              >
            </div>
          </template>
          <div class="fs24 p-1 w-10">
            <div
              @click="clickMore(1)"
              class="flex items-center"
            >
              <img
                class="wh03"
                src="~/assets/svg/icon_Receivepayment_16px.svg"
                alt=""
              >
              <span class="ml-1">收款方式</span>
            </div>
            <div
              @click="clickMore(2)"
              class="flex items-center my-1"
            >
              <img
                class="wh03"
                src="~/assets/svg/icon_C2CUserCenter_16px.svg"
                alt=""
              >
              <span class="ml-1">C2C用户中心</span>
            </div>
            <div
              @click="clickMore(3)"
              class="flex items-center my-1"
            >
              <img
                class="wh03"
                src="~/assets/svg/icon-Orders.svg"
                alt=""
              >
              <span class="ml-1">接单模式</span>
            </div>
            <a
              href="https://www.baidu.com"
              class="flex items-center inline-block"
            >
              <img
                class="wh03"
                src="~/assets/svg/icon-Community.svg"
                alt=""
              >
              <span class="ml-1">加入社群</span>
            </a>
          </div>
        </van-popover>
      </div>
    </div>

    <div class="bk21252F rounded-t-md shadow-2xl mt-168 min-h100-calc-266">
      <van-tabs
        :class="tradeMode == 2 ? 'tabs-row2' : ''"
        class="transparent"
        @click="onClick"
      >
        <van-tab
          v-for="(item, index) in coinList"
          :key="index"
        >
          <template #title>
            <div class="fs28">
              <p v-if="tradeMode == 2">{{item.zhCN}}</p>
              <p>{{item.coinName}}</p>
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
              v-if="tradeMode == 1"
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

              <ul class="mt-4">
                <li
                  class="mb-1 pb-1 px-1 border-b bc-487DC6 clffffff"
                  v-for="index in 10"
                  :key="index"
                >
                  <nuxt-link :to="`/${locale}/Trade/MerchantCenter`">
                    <div class="flex items-center justify-between fs24">
                      <div>
                        <div class="flex items-center">
                          <span class="h-2 w-2 flex items-center justify-center font-semibold rounded-full bk02AD8F mr-075">东</span>
                          <div class="fs28">东方财富币</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex space-x-1 items-center line-height-03">
                          <span>成单量</span>
                          <span>|</span>
                          <span class="font-bold">99.59%</span>
                        </div>
                      </div>
                    </div>
                  </nuxt-link>
                  <div class="flex items-end justify-between mt-1">
                    <div class="">
                      <div class="fs24">
                        <span class="cl868D9A">单价</span>
                        <span class="cl02AD8F font-semibold">￥<span class="fs34">6.34</span></span>
                      </div>
                      <div class="fs24 mt-1">
                        <span class="cl868D9A">单价</span>
                        <span class="clffffff font-semibold">122,150.90 USDT</span>
                      </div>
                      <div class="fs24">
                        <span class="cl868D9A">限额</span>
                        <span class="clffffff font-semibold">122,150.90 USDT</span>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center space-x-1">
                        <img
                          class="w-1"
                          src="~/assets/svg/wx.svg"
                          alt=""
                        >
                        <img
                          class="w-1"
                          src="~/assets/svg/yhk.svg"
                          alt=""
                        >
                        <img
                          class="w-1"
                          src="~/assets/svg/zfb.svg"
                          alt=""
                        >
                      </div>
                      <nuxt-link :to="`/${locale}/Trade/BuyOrder/111?tradeType=${tradeType ? true : false}`">
                        <div class="button button-xl bk02AD8F mt-1">
                          {{tradeType ? "购买" : '出售'}}
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                </li>
              </ul>
            </van-list>
            <div
              v-if="tradeMode == 2"
              class="mt-8 mx-1 bk21252F rounded-sm shadow-lg p-1 clffffff fs28"
            >
              <div class="flex items-center justify-between">
                <p class="clC9CED8">{{fastType ? (tradeType ? '购买金额' : '出售金额') : (tradeType ? '购买数量' : '出售数量')}}</p>
                <nuxt-link :to="`/${locale}/Public/Transfer`">
                  <span
                    v-if="!tradeType"
                    class="underline cl02AD8F"
                  >划转</span>
                </nuxt-link>
              </div>
              <van-field
                v-if="fastType"
                class="mt-1 bk2E3743 input-label input-label-w2 font-semibold fs40"
                v-model="value"
                placeholder="100起"
              >
                <template #label>
                  <span class="fs32 clffffff">￥</span>
                </template>
              </van-field>
              <van-field
                v-if="!fastType"
                v-model="value"
                class="mt-1 bk2E3743 input-label input-label-w2 font-semibold fs40"
                center
                :placeholder="tradeType ? '请输入购买数量' : '请输入出售数量'"
              >
                <template #button>
                  <span class="fs32 clffffff font-light">
                    USDT
                  </span>
                  <span class="fs32 cl02AD8F ml-1">
                    全部
                  </span>
                </template>
              </van-field>
              <div class="flex items-center justify-between fs24 mt-1">
                <span class="cl868D9A">参考单价：6.62 CYN</span>
                <div
                  @click="changeFastType"
                  class="cl02AD8F flex items-center space-x-1"
                >
                  <span>{{tradeType ? '按数量购买' : '按数量出售'}}</span>
                  <img
                    class="wh025"
                    src="~/assets/svg/tochange-2.svg"
                    alt=""
                  >
                </div>
              </div>
              <div
                @click="fastShow = true"
                class="button button-2xl fs32 bk02AD8F mt-4"
              >
                {{tradeType ? '免手续费购买' : '免手续费出售'}}
              </div>
            </div>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>

    <van-popup
      class="bk21252F clffffff"
      v-model="fastShow"
      round
      position="bottom"
    >
      <!-- <div :class="tradeType ? 'border-b bc-487DC6' : ''" class="flex items-center justify-between p-1"> -->
      <div class="flex items-center justify-between p-1">
        <span class="fs32">{{tradeType ? '确认购买' : '确认出售'}}</span>
        <van-icon
          class="fs32 cl727988"
          @click="fastShow = false"
          name="cross"
        />
      </div>
      <!-- <div v-if="tradeType">
        <div class="flex items-center justify-between fs28 pt-2 px-1">
          <span class="cl727988">价格</span>
          <span>6.88 CNY/USDT</span>
        </div>
        <div class="flex items-center justify-between fs28 pt-1 px-1">
          <span class="cl727988">数量</span>
          <span>14.5968596898 USDT</span>
        </div>
        <div class="flex items-center justify-center cl02AD8F fs28 pt-3">
          <span>￥</span>
          <span class="fs52 font-bold">10000</span>
        </div>
      </div> -->
      <!-- <div v-if="!tradeType"> -->
      <div>
        <div class="text-center fs24 clffffff pb-1 border-b bc-487DC6">
          <div class="font-semibold fs44">29.45 <span class="fs24 ml-1">USDT</span></div>
          <div>我将收到 ￥198.78</div>
        </div>
        <div class="mx-1 fs28">
          <p class="my-1">选择付款方式</p>
          <div class="grid grid-cols-2 gap-1">
            <div
              @click="paymentMethodIndex = 0"
              class="bk363C4A rounded-sm p-1 flex items-center relative"
            >
              <img
                class="w-2"
                src="~/assets/svg/icon_bank_32px.svg"
                alt=""
              >
              <span class="ml-1">银行卡转账</span>
              <img
                v-if="paymentMethodIndex == 0"
                class="absolute right-0 bottom-0"
                src="~/assets/svg/icon_Check.svg"
                alt=""
              >
            </div>
            <div
              @click="paymentMethodIndex = 1"
              class="bk363C4A rounded-sm p-1 flex items-center relative"
            >
              <img
                class="w-2"
                src="~/assets/svg/icon_zhifubao_32px.svg"
                alt=""
              >
              <span class="ml-1">支付宝转账</span>
              <img
                v-if="paymentMethodIndex == 1"
                class="absolute right-0 bottom-0"
                src="~/assets/svg/icon_Check.svg"
                alt=""
              >
            </div>
            <div
              @click="paymentMethodIndex = 2"
              class="bk363C4A rounded-sm p-1 flex items-center relative"
            >
              <img
                class="w-2"
                src="~/assets/svg/icon_wechat_32px.svg"
                alt=""
              >
              <span class="ml-1">微信转账</span>
              <img
                v-if="paymentMethodIndex == 2"
                class="absolute right-0 bottom-0"
                src="~/assets/svg/icon_Check.svg"
                alt=""
              >
            </div>
            <div class="bk363C4A rounded-sm p-1 flex items-center relative">
              <img
                class="w-2"
                src="~/assets/svg/icon_Addto_32px.svg"
                alt=""
              >
              <span class="ml-1">添加收款方式</span>
            </div>
          </div>
          <!-- <p class="fs24 my-1 clCD7728">说明：未满三种方式可添加收款，达到三种后 则隐藏。</p> -->
        </div>
      </div>
      <nuxt-link :to="`/${locale}/Trade/${tradeType ? 'BuyInfo' : 'SellInfo'}`">
        <div
          @click="fastShow = true"
          class="button button-2xl fs32 bk02AD8F my-2 mx-1"
        >
          {{tradeType ? '确认购买' : '确认出售'}}
        </div>
      </nuxt-link>
    </van-popup>

    <!-- 切换到接单模式 -->
    <van-popup
      class="bk2E3743 rounded-sm w-3/4"
      v-model="changeOrderModeShow"
    >
      <div class="fs32 cl9FA9C0 m-1 text-center font-semibold">
        切换到接单模式
      </div>
      <div class="fs28 cl9FA9C0 m-1 pb-1 text-center">
        接单模式适用于有发布广告交易的需求
      </div>
      <div class="flex items-center my-1 px-1 space-x-2">
        <div
          @click="changeOrderModeShow = false"
          class="button button-xl fs32 bk2E3743 border bc-co535E6D clffffff flex-1"
        >
          取消
        </div>
        <div
          @click="$store.commit('SET_ORDERTAKINGSTATE', true),changeOrderModeShow = false"
          class="button button-xl fs32 bk02AD8F clffffff flex-1"
        >
          确定
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
      value: '',
      tradeMode: 1,//1.快捷 2.自选
      tradeType: true,//true、买 false、卖
      fastType: true,//true.金额 false.数量
      fastShow: false,//快捷购买弹窗
      paymentMethodIndex: 0,//收款方式索引
      showMorePopover: false,
      changeOrderModeShow: false,//切换接单模式
      coinList: [
        {
          coinName: 'BTC',
          zhCN: '比特币'
        },
        {
          coinName: 'ETH',
          zhCN: '以太坊'
        },
        {
          coinName: 'BCB',
          zhCN: '奇迹TGC币'
        },
        {
          coinName: 'USDT',
          zhCN: '泰达币'
        },
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
    ...mapState(['locale', 'orderTakingState'])
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    clickMore (state) {
      this.showMorePopover = false
      if (state == 1) {
        //跳转收款方式
        this.$router.push(`/${this.locale}/Trade/C2C/PaymentMethod`)
      } else if (state == 2) {
        //跳转C2C用户中心
        this.$router.push(`/${this.$store.state.locale}/Trade/C2C/My`)
      } else if (state == 3) {
        //接单模式
        this.changeOrderModeShow = true
      }
    },
    changeFastType () {
      this.fastType = !this.fastType
    },
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
.Trade {
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
