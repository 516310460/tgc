<template>
  <div class="exchange">
    <van-nav-bar class="bk191D24-05 clffffff h092 fixed top-0 w-full z-10">
      <template #title>
        <span class="fs36 clffffff">TGC矿机</span>
      </template>
      <template #right>
        <nuxt-link :to="`/${locale}/Miner/RAndWRecord`">
          <div class="fs30 text-right">购买记录</div>
        </nuxt-link>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 relative chartContentHeight overflow-y-auto mx-1"
      v-model="isLoading"
      @refresh="onRefresh"
    >

      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <!-- <template #pulling="props">
        <img
          class="doge"
          src="https://img01.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template> -->

      <!-- 释放提示 -->
      <!-- <template #loosing>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
      </template> -->

      <!-- 加载提示 -->
      <template #loading>
        <div class="fs22 pb-2 flex items-center justify-center">
          <van-loading color="#02AD8F" />
          <span class="ml-1">加载中...</span>
        </div>
      </template>
      <div class="title fs24 clffffff relative">
        <img
          class="absolute top-0 w-full h-8"
          src="~/assets/image/Miner/title.png"
          alt=""
        >
        <div class="flex items-center justify-between px-1 py-2 relative">
          <!-- <div class="w-1/2">
            <div class="flex items-center">
              <i class="iconfont icon-wangluo fs24"></i>
              <span class="ml-075">全网总算力（GHS）</span>
            </div>
            <p class="fs30 mt-1">
              <ICountUp
                :delay="0.6"
                :options="CountUpOptions"
                :endVal="powerStatisticsData.qwgsl"
              ></ICountUp>
              GHS
            </p>
          </div> -->
          <!-- <div class="border-l bc-487DC6 w-1/2 pl-2"> -->
          <div>
            <div class="flex items-center">
              <i class="iconfont icon-wode4 fs24"></i>
              <span class="ml-075">我的算力（GHS）</span>
            </div>
            <p class="fs30 mt-1">
              <ICountUp
                :delay="0.6"
                :options="CountUpOptions"
                :endVal="powerStatisticsData.wdsl"
              ></ICountUp>
              GHS
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-1 py-1 text-center">
        <div class="bk1D088B clffffff rounded-sm py-1 h-full">
          <img
            class="px-2 xuanzhun"
            src="~/assets/image/Miner/xz.png"
            alt=""
          >
          <img
            class="px-1 mt-1"
            src="~/assets/image/Miner/line.svg"
            alt=""
          >
          <p class="fs24 cl3A53B8 leading-2">24H 预计产出</p>
          <img
            class="px-1"
            src="~/assets/image/Miner/line.svg"
            alt=""
          >
          <p class="fs28 cl02AD8F leading-2">
            <ICountUp
              :delay="0.6"
              :options="CountUpOptions"
              :endVal="powerStatisticsData.yjcc"
            ></ICountUp>
            TGC
          </p>
          <img
            class="px-1"
            src="~/assets/image/Miner/line.svg"
            alt=""
          >
        </div>
        <div class="bk1D088B clffffff rounded-sm py-1 h-full">
          <img
            class="px-2 xuanzhun"
            src="~/assets/image/Miner/xz.png"
            alt=""
          >
          <img
            class="px-1 mt-1"
            src="~/assets/image/Miner/line.svg"
            alt=""
          >
          <p class="fs24 cl3A53B8 leading-2">24H 加速预估</p>
          <img
            class="px-1"
            src="~/assets/image/Miner/line.svg"
            alt=""
          >
          <p class="fs28 cl02AD8F leading-2">
            <ICountUp
              :delay="0.6"
              :options="CountUpOptions"
              :endVal="powerStatisticsData.jsyg"
            ></ICountUp>
            TGC
          </p>
          <img
            class="px-1"
            src="~/assets/image/Miner/line.svg"
            alt=""
          >
        </div>
        <div class="bk1D088B clffffff rounded-sm py-1 h-full">
          <img
            class="px-2 xuanzhun"
            src="~/assets/image/Miner/xz.png"
            alt=""
          >
          <img
            class="px-1 mt-1"
            src="~/assets/image/Miner/line.svg"
            alt=""
          >
          <p class="fs24 cl3A53B8 leading-2">HASH 剩余算力</p>
          <img
            class="px-1"
            src="~/assets/image/Miner/line.svg"
            alt=""
          >
          <p class="fs28 cl02AD8F leading-2">
            <ICountUp
              :delay="0.6"
              :options="CountUpOptions"
              :endVal="powerStatisticsData.sysl"
            ></ICountUp>
            TGC
          </p>
          <img
            class="px-1"
            src="~/assets/image/Miner/line.svg"
            alt=""
          >
        </div>
      </div>
      <div class="bk1D088B clffffff rounded-t-md p-1">
        <div
          v-for="(item, index) in minerData"
          :key="index"
          class="flex items-center justify-between space-x-1 border-b bc-487DC6 py-1"
        >
          <div class="w-1/4">
            <img
              src="~/assets/image/Miner/list.png"
              alt=""
            >
          </div>
          <div class="w-2/4">
            <p class="fs28 clffffff">
              {{item.mname}}
              <span class="cl02AD8F">
                ({{item.state == 0 ? '已下架' : (item.state == 1 ? '抢购中' : '待上架')}})
              </span>
            </p>
            <div class="flex items-center fs26 leading-2">
              <span>价值：</span>
              <span>
                <ICountUp
                  :delay="0.6"
                  :options="CountUpOptions"
                  :endVal="item.price"
                ></ICountUp>
                USDT
              </span>
            </div>
            <div class="flex items-center fs26">
              <span>算力：</span>
              <span>
                <ICountUp
                  :delay="0.6"
                  :options="CountUpOptions"
                  :endVal="item.ghs"
                ></ICountUp>GHS
              </span>
            </div>
          </div>
          <div class="w-1/4">
            <div
              @click="item.state == 1 && (currentItem = item, ReadShow = true)"
              :class="item.state == 1 ? 'cl02AD8F bc-02AD8F' : 'cl868D9A bc-868D9A'"
              class="border rounded-sm w-3/4 py-0100 text-center float-right"
            >
              抢购
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>

    <!-- 确定弹窗 -->
    <van-popup
      class="bk2E3743 rounded-sm w-3/4"
      v-model="ReadShow"
    >
      <div class="fs28 cl9FA9C0 m-1 text-center">
        确定将抢购该矿机？
      </div>
      <div class="pb-1 text-center cl02AD8F w-full px-4">
        <div class="flex items-center fs26 leading-2 w-full">
          <span>价值：</span>
          <span>{{currentItem.price}}USDT</span>
        </div>
        <div class="flex items-center fs26 w-full">
          <span>算力：</span>
          <span>{{currentItem.ghs}}GHS</span>
        </div>
      </div>
      <div class="flex items-center my-1 px-1 space-x-2">
        <div
          @click="ReadShow = false"
          class="button button-xl fs32 bk2E3743 border bc-co535E6D clffffff flex-1"
        >
          取消
        </div>
        <div
          @click="purchaseMiner"
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
import ICountUp from 'vue-countup-v2';
export default {
  components: {
    ICountUp
  },
  data () {
    return {
      ReadShow: false,
      // 下拉刷新
      isLoading: false,
      minerData: [],
      currentItem: {
        id: "",
        price: 0,
        ghs: 0,
      },
      powerStatisticsData: {
        jsyg: 0,
        qwgsl: 0,
        sysl: 0,
        wdsl: 0,
        yjcc: 0,
      },
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
    this.init()
  },
  methods: {
    init () {
      this.miner()
      this.powerStatistics()
    },
    // 抢购矿机
    purchaseMiner () {
      let params = {
        "minerId": this.currentItem.id,// "矿机id"
      }
      this.$api.miner.purchaseMiner(params).then(res => {
        if (res.type == "success") {
          this.$Toast("矿机抢购成功")
          this.ReadShow = false
        }
      })
    },
    powerStatistics () {
      this.$api.miner.powerStatistics().then(res => {
        if (res.type == "success") {
          this.powerStatisticsData = res.data
        }
      })
    },
    miner () {
      let params = {
        "typeId": "",// "typeId"
      }
      this.$api.main.miner(params).then(res => {
        if (res.type == "success") {
          this.minerData = res.data
        }
      })
    },
    // 下拉刷新
    onRefresh () {
      this.init()
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  },
}
</script>
<style lang="scss" scoped>
.exchange {
  height: 100%;
  width: 100%;
  background: url('../../../assets/image/home/bg.png');
  background-size: 100% 100%;
  // .title {
  //   background: url('../../../assets/image/Miner/title.png');
  //   background-size: 100% 100%;
  // }
  .xuanzhun {
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotate 3s linear infinite;
    -moz-animation: rotate 3s linear infinite;
    -o-animation: rotate 3s linear infinite;
    animation: rotate 3s linear infinite;
  }
  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-moz-keyframes rotate {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(359deg);
    }
  }
  @-o-keyframes rotate {
    from {
      -o-transform: rotate(0deg);
    }
    to {
      -o-transform: rotate(359deg);
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
}
</style>