<template>
  <div class="Assets">
    <div class="bk191D24 px-1 fixed top-0 w-full z-10 h350 pt-1 Assets-bg">
      <!-- <div class="flex items-center justify-between clffffff fs30">
        <span>TGC00125191</span>
        <nuxt-link :to="`/${locale}/HashRate`">
          <span>闪兑</span>
        </nuxt-link>
      </div> -->
      <div class="relative w-full h-full pt-1">
        <img
          class="h270 w-full absolute"
          src="~/assets/image/assets/assets_bg.png"
          alt=""
        >
        <nuxt-link :to="`/${locale}/Assets/AutoBreakThrough`">
          <div class="absolute right-0 z-10">
            <img
              class="w-12 h-3"
              src="~/assets/svg/homebutton.svg"
              alt=""
            >
            <span class="absolute clffffff right-0 top-0 fs28 leading-3 pr-1 shadow-xl">自动闯关</span>
          </div>
        </nuxt-link>
        <div class="py-1 px-2 fs24 absolute w-full">
          <div class="flex items-center cl9CC1FF fs24">
            <span>总账户资产折合(USDT)</span>
            <!-- <img
              class="wh036 ml-1"
              src="~/assets/svg/icon_display.svg"
              alt=""
            > -->
          </div>
          <p class="fs36 clffffff font-bold">
            <ICountUp
              :delay="0.6"
              :options="CountUpOptions"
              :endVal="countBalance"
            ></ICountUp>
          </p>
          <p class="fs24 clffffff">
            ≈ <ICountUp
              :delay="0.6"
              :options="CountUpOptions"
              :endVal="countBalance * exchangeRateData"
            ></ICountUp> CYN</p>
          <div class="flex items-center space-x-1 cl3FCFBA text-center fs28 mt-1">
            <nuxt-link
              class="border bc-co3FCFBA rounded-sm w-1/3 py-0100"
              :to="`/${locale}/Assets/Recharge`"
            >
              充值
            </nuxt-link>
            <nuxt-link
              class="border bc-co3FCFBA rounded-sm w-1/3 py-0100"
              :to="`/${locale}/Assets/Withdrawal`"
            >
              提现
            </nuxt-link>
            <nuxt-link
              class="border bc-co3FCFBA rounded-sm w-1/3 py-0100"
              :to="`/${locale}/Assets/Transfer`"
            >
              转账
            </nuxt-link>
            <!-- <nuxt-link
              class="border bc-co3FCFBA rounded-sm w-1/3 py-0100"
              :to="`/${locale}/Public/Transfer`"
            >
              划转
            </nuxt-link> -->
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="bk191D24 relative t-270 coinpool-wap-Content w-full mt-3 z-50"> -->
    <div class="bk191D24 coinpool-wap-Content w-full mt-12">
      <!-- <van-tabs
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
          </template> -->

      <div class="bk1D088B rounded-t-md mx-1 pt-2">
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

          <div class="pt0025">
            <!-- <div class="fs24 py-1 cl868D9A px-1 border-b-020">
              <p>币币总资产折合(BTC)</p>
              <div class="flex items-center">
                <span class="fs40 clffffff">0.00000000</span>
                <span class="ml-1">≈0.00 CYN</span>
              </div>
            </div> -->
            <ul class="mt-1">
              <li
                v-for="(item, index) in balanceData"
                :key="index"
                class="cl868D9A my-1 border-b bc-487DC6 px-1"
              >
                <nuxt-link :to="`/${locale}/Assets/CoinDetails/${item.coinName}`">
                  <p class="fs32 cl02AD8F">{{item.coinName}}</p>
                  <div class="flex items-center justify-between fs24 cl868D9A py-0125">
                    <div>
                      <p>可用</p>
                      <p class="fs32 font-bold">
                        <ICountUp
                          :delay="0.6"
                          :options="CountUpOptions"
                          :endVal="Number(item.balance)"
                        ></ICountUp>
                      </p>
                    </div>
                    <div>
                      <p>冻结</p>
                      <p class="fs32 font-bold">
                        <ICountUp
                          :delay="0.6"
                          :options="CountUpOptions"
                          :endVal="Number(item.forzenBalance)"
                        ></ICountUp>
                      </p>
                    </div>
                    <div class="text-right">
                      <p>折合(CYN)</p>
                      <p class="fs32 font-bold">
                        <ICountUp
                          :delay="0.6"
                          :options="CountUpOptions"
                          :endVal="Number(item.rmbBalance)"
                        ></ICountUp>
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>

        </van-pull-refresh>
      </div>
      <!-- </van-tab>
      </van-tabs> -->
    </div>

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
      active: 0,
      paymentMethodIndex: 0,//收款方式索引
      typeList: [
        {
          name: '现货',
        },
        {
          name: 'C2C',
        }
      ],
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
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
      balanceData: [],
      countBalance: 0,
      exchangeRateData: ""
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
      this.balance()
      this.exchangeRate()
    },
    // 获取当前汇率
    exchangeRate () {
      this.$api.main.exchangeRate().then(res => {
        if (res.type == "success") {
          this.exchangeRateData = res.data
        }
      })
    },
    // 获取个人资产
    balance () {
      this.$api.userAccount.balance().then(res => {
        if (res.type == "success") {
          this.balanceData = res.data
          if (this.balanceData.length) {
            this.balanceData.forEach(item => {
              this.countBalance = this.countBalance + Number(item.balance)
            });
          }
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
.Assets {
  .coinpool-wap-Content {
    // padding-bottom: 0.98rem;
  }
  .van-search__content {
    background-color: #2a303c;
    .van-icon {
      color: #fff;
    }
  }
  .van-tabs {
    // .van-tabs__nav{
    //   background: $co21252F;
    //   border-radius: 0.2rem 0.2rem 0 0;
    //   z-index: 30;
    //   position: relative;
    // }
    .van-tabs__wrap {
      position: fixed;
      top: 3.5rem;
      width: 100%;
      z-index: 30;
      background: $co21252F;
      border-bottom: 1px solid $co487DC6;
      box-shadow: 0px -15px 30px -10px #000000;
    }
  }
}
</style>
