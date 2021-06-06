<template>
  <div class="bk02AD8F MerchantCenter">
    <van-nav-bar
      class="bk02AD8F clffffff h092 fixed top-0 w-full z-10"
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
        <div class="flex items-center">
          <span class="fs32 clffffff font-semibold">Collin</span>
        </div>
      </template>
    </van-nav-bar>

    <div class="clffffff mt-092">
      <div class="bk02AD8F flex items-start py-1 px-2">
        <div class="w-3 h-3 flex items-center justify-center bkffffff cl02AD8F fs42 rounded-full">C</div>
        <div class="ml-1">
          <p class="fs32">Collin</p>
          <div class="fs20">
            <div class="fs20 flex items-center line-height-1">
              <img
                src="~/assets/svg/icon_Certification.svg"
                alt=""
              >
              <div class="flex items-center">
                <span class="mr-075">认证广告方</span>
                <span class="border-l pl-075">保证金 15,000 BUSD</span>
              </div>
            </div>
            <div class="fs24 flex items-center mt-1 space-x-2">
              <div class=" flex items-center">
                <span>手机</span>
                <img
                  class="wh024 ml-075"
                  src="~/assets/svg/icon_Unchecked-1.svg"
                  alt=""
                >
              </div>
              <div class=" flex items-center">
                <span>邮箱</span>
                <img
                  class="wh024 ml-075"
                  src="~/assets/svg/icon_Unchecked-1.svg"
                  alt=""
                >
              </div>
              <div class=" flex items-center">
                <span>身份</span>
                <img
                  class="wh024 ml-075"
                  src="~/assets/svg/icon_Unchecked-1.svg"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bk21252F rounded-t-lg h-full">
        <div class="p-2 border-b bc-487DC6">
          <div class="flex items-center justify-between fs44">
            <span>16890</span>
            <span>99.78%</span>
          </div>
          <div class="flex items-center justify-between fs28 my-1 cl868D9A">
            <span>30日成单数</span>
            <span>30日成单率</span>
          </div>
          <div class="flex items-center justify-between fs28 my-1">
            <span class="cl868D9A">30日评价放币时间</span>
            <span class="clffffff">0.27 分钟</span>
          </div>
          <div class="flex items-center justify-between fs28">
            <span class="cl868D9A">30日评价放币时间</span>
            <span class="clffffff">0.27 分钟</span>
          </div>
        </div>
        <div class="p-2 pr-0">
          <div class="flex items-center justify-between fs32">
            <span>在线广告</span>
          </div>

          <!-- 购买广告 -->
          <div class="mt-2 flex items-center justify-between fs24 pb-075 border-b bc-487DC6">
            <span class="cl868D9A">在线出售广告</span>
          </div>
          <ul>
            <li
              v-for="index in 3"
              :key="index"
              class="my-1 cl868D9A"
            >
              <div class="flex items-center">
                <img
                  class="w-2 h-2"
                  src="~/assets/img/Coin/ustd@3x.png"
                  alt=""
                >
                <span class="fs32 clffffff ml-1 font-bold">USDT</span>
              </div>
              <div class="flex items-center my-1">
                <span>单价</span>
                <span class="fs44 clffffff ml-1 font-bold">USDT</span>
              </div>
              <div class="flex items-center justify-between my-1">
                <div>
                  <div class="flex items-center">
                    <span>数量</span>
                    <span class="fs28 clffffff ml-1">61.56 USDT</span>
                  </div>
                  <div class="flex items-center">
                    <span>限额</span>
                    <span class="fs28 clffffff ml-1">￥100.00-￥424.56</span>
                  </div>
                </div>
                <div class="pr-1">
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
                  <nuxt-link :to="`/${locale}/Trade/BuyOrder/111?tradeType=true`">
                    <div class="button button-xl bk02AD8F clffffff mt-1">
                      向TA购买
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </li>
          </ul>

          <!-- 出售广告 -->
          <div class="mt-2 flex items-center justify-between fs24 pb-075 border-b bc-487DC6">
            <span class="cl868D9A">在线购买广告</span>
          </div>
          <ul>
            <li
              v-for="index in 3"
              :key="index"
              class="my-1 cl868D9A"
            >
              <div class="flex items-center">
                <img
                  class="w-2 h-2"
                  src="~/assets/img/Coin/ustd@3x.png"
                  alt=""
                >
                <span class="fs32 clffffff ml-1 font-bold">USDT</span>
              </div>
              <div class="flex items-center my-1">
                <span>单价</span>
                <span class="fs44 clffffff ml-1 font-bold">USDT</span>
              </div>
              <div class="flex items-center justify-between my-1">
                <div>
                  <div class="flex items-center">
                    <span>数量</span>
                    <span class="fs28 clffffff ml-1">61.56 USDT</span>
                  </div>
                  <div class="flex items-center">
                    <span>限额</span>
                    <span class="fs28 clffffff ml-1">￥100.00-￥424.56</span>
                  </div>
                </div>
                <div class="pr-1">
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
                  <nuxt-link :to="`/${locale}/Trade/BuyOrder/111?tradeType=true`">
                    <div class="button button-xl bkCB374E clffffff mt-1">
                      向TA出售
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="text-center fs24 clffffff p-1">
      <van-divider class="fs24 clffffff">奇迹TGC风控</van-divider>
      <p>为了降低您的交易风险</p>
      <p>认证广告方已向平台缴纳保证金，请放心交易</p>
    </div>
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
    ...mapState(['locale'])
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
.MerchantCenter {
  .van-nav-bar__right {
    padding: 0;
  }
}
</style>
