<template>
  <div class="bk02AD8F C2C-My">
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
          <span class="fs32 clffffff font-semibold">C2C用户中心</span>
        </div>
      </template>
    </van-nav-bar>

    <div class="clffffff t-092 fixed w-full h-full z-20">
      <div class="bk02AD8F flex items-start py-1 px-2 pb-3">
        <div class="w-3 h-3 flex items-center justify-center bkffffff cl02AD8F fs42 rounded-full">C</div>
        <div class="ml-1">
          <p class="fs32">Collin</p>
          <div class="fs20">
            <div class="fs20 flex items-center line-height-1">
              <img
                src="~/assets/svg/icon_Certification.svg"
                alt=""
              >
              <span>认证用户</span>
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
                  src="~/assets/svg/icon_Unchecked.svg"
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
      <div class="bk21252F rounded-t-lg relative -t-050 h-full">
        <div class="p-2 border-b bc-487DC6">
          <div class="flex items-center justify-between fs44">
            <span>3</span>
            <span>80.00%</span>
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
        <div class="p-2">
          <div class="flex items-center justify-between fs28">
            <span class="cl868D9A">账户已创建</span>
            <span class="clffffff">18 天</span>
          </div>
          <div class="flex items-center justify-between fs28 my-1">
            <span class="cl868D9A">首次交易至今</span>
            <span class="clffffff">5 天</span>
          </div>
          <div class="flex items-start justify-between fs28">
            <span class="cl868D9A">总成单数</span>
            <div class="text-right">
              <p class="clffffff">3 次</p>
              <p class="cl868D9A">买7 | 卖2</p>
            </div>
          </div>
        </div>
        <div
          v-if="orderTakingState"
          @click="closeOrderTakingState"
          class="bk2F3441 rounded-sm clffffff fs32 text-center py-0175 m-2"
        >
          切换到“下单模式”
        </div>
      </div>
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
    ...mapState(['locale', 'orderTakingState'])
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    closeOrderTakingState () {
      this.$store.commit("SET_ORDERTAKINGSTATE", false);
      this.$router.replace(`/${this.locale}/Trade`)
    },
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
.C2C-My {
  .van-nav-bar__right {
    padding: 0;
  }
}
</style>
