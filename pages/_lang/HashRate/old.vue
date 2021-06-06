<template>
  <div class="exchange">
    <van-nav-bar class="bk191D24-05 clffffff h092 fixed top-0 w-full z-10">
      <template #title>
        <span class="fs36 clffffff">兑换</span>
      </template>
      <template #right>
        <nuxt-link :to="`/${locale}/HashRate/RAndWRecord`">
          <div class="fs30 text-right">兑换记录</div>
        </nuxt-link>
      </template>
    </van-nav-bar>
    <div class="t-092 relative chartContentHeight overflow-y-auto bk1D088B clffffff rounded-t-md py-2 px-1 h-full">
      <div class="flex items-center justify-between">
        <div class="fs28">从</div>
        <div
          @click="tradeType = (tradeType == 1 ? 2 : 1), amount = '',switchBalanceData()"
          class="fs28 cl02AD8F"
        >切换兑换</div>
      </div>
      <van-field
        v-model="amount"
        class="input-label input-label-select fs26 bk21252F rounded-sm shadow-lg p-1 w-full mt-1"
        center
        placeholder="请输入兑换数量"
      >
        <template #label>
          <div
            @click="showPicker1 = true"
            class="flex items-center space-x-1"
          >
            <img
              v-if="tradeType == 2"
              class="w-2 rounded-full"
              src="~/assets/image/home/logo1.png"
              alt=""
            >
            <img
              v-if="tradeType == 1"
              class="w-2"
              src="~/assets/img/Coin/ustd@3x.png"
              alt=""
            >
            <span class="fs30 clffffff">{{tradeType == 2 ? 'TGC' : 'USDT' }}</span>
            <!-- <img
              class="w015"
              src="~/assets/img/xl.png"
              alt=""
            > -->
          </div>
        </template>
        <template #button>
          <span
            @click="amount = (tradeType == 1 ? currentToBalance : currentFromBalance)"
            class="fs26 clffffff"
          >
            全部
          </span>
        </template>
      </van-field>
      <div class="fs26 cl3A53B8 pl-1 py-1">可用余额：
        <ICountUp
          :delay="0.6"
          :options="CountUpOptions"
          :endVal="tradeType == 1 ? currentToBalance : currentFromBalance"
        ></ICountUp>
        {{tradeType == 2 ? 'TGC' : 'USDT' }}</div>
      <div class="fs28">至</div>
      <van-field
        v-model="amount"
        class="input-label input-label-select fs26 bk21252F rounded-sm shadow-lg p-1 w-full mt-1"
        center
        disabled
        placeholder=""
      >
        <template #label>
          <div
            @click="showPicker2 = true"
            class="flex items-center space-x-1"
          >
            <img
              v-if="tradeType == 2"
              class="w-2"
              src="~/assets/img/Coin/ustd@3x.png"
              alt=""
            >
            <img
              v-if="tradeType == 1"
              class="w-2 rounded-full"
              src="~/assets/image/home/logo1.png"
              alt=""
            >
            <span class="fs30 clffffff">{{tradeType == 2 ? 'USDT' : 'TGC' }}</span>
            <!-- <img
              class="w015"
              src="~/assets/img/xl.png"
              alt=""
            > -->
          </div>
        </template>
      </van-field>
      <div class="fs26 cl3A53B8 pl-1 py-1">兑换价格：1TGC=1USDT，手续费：0.2%</div>
      <div
        @click="trade"
        class="button button-2xl fs30 bk02AD8F clffffff mt-6"
      >
        立即兑换
      </div>
    </div>

    <!-- 从 -->
    <van-popup
      v-model="showPicker1"
      round
      position="bottom"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm1"
      />
    </van-popup>

    <!-- 至 -->
    <van-popup
      v-model="showPicker2"
      round
      position="bottom"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm2"
      />
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import ICountUp from 'vue-countup-v2';
export default {
  components: {
    ICountUp
  },
  data () {
    return {
      value: '',
      tradeType: 1,//1.买 2.卖
      amount: "",//数量
      coinName1: 'TGC',
      coinName2: 'USDT',
      showPicker1: false,
      showPicker2: false,
      columns: ['BTC', 'ETH', 'USDT'],
      balanceData: [],
      currentToBalance: 0,//当前币种余额
      currentFromBalance: 0,//当前币种余额
      // 数字滚动配置
      CountUpOptions: {
        useEasing: true,  // 过渡动画效果，默认ture
        useGrouping: true,  // 千分位效果，例：1000->1,000。默认true
        decimalPlaces: 2,  // 小数位
        separator: ',',   // 使用千分位时分割符号
        decimal: '.',   // 小数位分割符号
        prefix: '',    // 前置符号
        suffix: ''    // 后置符号，可汉字
      },
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.balance()
  },
  methods: {
    // 获取个人资产
    balance () {
      this.$api.userAccount.balance().then(res => {
        if (res.type == "success") {
          this.balanceData = res.data
          this.switchBalanceData()
        }
      })
    },
    switchBalanceData () {
      if (this.balanceData.length) {
        this.balanceData.forEach(item => {
          if (this.tradeType == 1 && item.coinName == 'USDT') {
            this.currentToBalance = Number(item.balance)
          } else if (this.tradeType == 2 && item.coinName == 'TGC') {
            this.currentFromBalance = Number(item.balance)
          }
        });
      }
    },
    trade () {
      let params = {
        "type": this.tradeType,// "交易类型"  1 买入  2卖出
        "amount": this.amount,// "交易数量"
        "price": 1,// "交易价格：默认1：1"
      }
      this.$api.trade.trade(params).then(res => {
        if (res.type == "success") {
          this.balance()
          this.$Toast("兑换成功")
          this.amount = ""
        }
      })
    },
    onConfirm1 (value, index) {
      this.coinName1 = value
      this.showPicker1 = false
    },
    onConfirm2 (value, index) {
      this.coinName2 = value
      this.showPicker2 = false
    },
  },
}
</script>
<style lang="scss" scoped>
.exchange {
  height: 100vh;
  width: 100%;
  background: url('../../../assets/image/home/bg.png');
  background-size: 100% 100%;
}
</style>