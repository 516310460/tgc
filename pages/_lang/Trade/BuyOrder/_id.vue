<template>
  <div class="BuyOrder">
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
        <span class="fs32 font-bold clffffff">{{tradeType == 'true' ? '购买' : '出售'}}BTC</span>
      </template>
    </van-nav-bar>

    <div class="mx-1 relative t-092">
      <div class="flex items-center fs24 mt-1">
        <span class="cl868D9A">单价</span>
        <span class="ml-1 cl02AD8F">￥122,150.90 USDT</span>
      </div>
      <div class="flex items-center fs24">
        <span class="cl868D9A">限额</span>
        <span class="ml-1 clffffff font-semibold">￥61,300.00 -1,158,000.00 </span>
      </div>
      <div class="bk21252F rounded-sm my-1 fs28 cl868D9A shadow-lg">
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
                <p>{{item.name}}</p>
              </div>
            </template>
            <div class="mx-1 pb-1">
              <van-field
                v-if="coinListIndex == 0"
                class="mt-1 bk2E3743 input-label input-label-w2 font-semibold fs40"
                v-model="value"
                placeholder="100起"
              >
                <template #label>
                  <span class="fs32 clffffff">￥</span>
                </template>
              </van-field>
              <van-field
                v-if="coinListIndex == 1"
                v-model="value"
                class="mt-1 bk2E3743 input-label input-label-w2 font-semibold fs40"
                center
                :placeholder="tradeType == 'true' ? '请输入购买数量' : '请输入出售数量'"
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
                <span class="cl868D9A">数量</span>
                <span>-BTC</span>
              </div>
              <nuxt-link :to="`/${locale}/Trade/BuyOrder/BuyAndSell/111?tradeType=${tradeType}`">
                <div class="button button-2xl fs32 bk02AD8F clffffff mt-1">
                  {{tradeType == 'true' ? '免手续费购买' : '免手续费出售'}}
                </div>
              </nuxt-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <div class="bk21252F rounded-sm my-1 p-1 fs28 cl868D9A shadow-lg">
        <div class="flex items-center justify-between pb-1">
          <span class="fs32 clffffff">交易信息</span>
        </div>
        <div class="flex items-center justify-between">
          <span>付款时限</span>
          <div class="clffffff flex items-center">
            <span>20分钟</span>
          </div>
        </div>
        <div class="flex items-center justify-between my-1">
          <span>交易信息</span>
          <div class="clffffff flex items-center">
            <span class="underline">币币圈迩</span>
            <van-icon
              class="fs28 ml-1"
              name="arrow"
            />
          </div>
        </div>
        <div class="flex items-center justify-between mt-1">
          <span>交易方式</span>
          <div class="clffffff flex items-center space-x-1">
            <img
              class="w-2"
              src="~/assets/svg/zfb.svg"
              alt=""
            >
            <img
              class="w-2"
              src="~/assets/svg/wx.svg"
              alt=""
            >
            <img
              class="w-2"
              src="~/assets/svg/yhk.svg"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      value: '',
      coinListIndex: 0,
      coinList: [
        {
          name: this.$route.query.tradeType == 'true' ? '按金额购买' : '按金额出售'
        },
        {
          name: this.$route.query.tradeType == 'true' ? '按数量购买' : '按数量出售'
        }
      ],
      tradeType: this.$route.query.tradeType,
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  methods: {
    onClick (name, title) {
      // this.$Toast(title);
      this.coinListIndex = name
    },
  },
}
</script>
<style lang="scss">
.BuyOrder .van-tabs .van-tabs__wrap {
  border-bottom: 1px solid #383e4d;
}
</style>