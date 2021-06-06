<template>
  <div class="CoinMarket">
    <van-nav-bar class="bk191D24-05 clffffff h092 fixed top-0 w-full z-10">
      <template #left>
        <van-icon
          @click="$router.back()"
          class="clffffff fs32"
          name="arrow-left"
        />
      </template>
      <template #title>
        <span class="fs36 clffffff">闯关</span>
      </template>
      <template #right>
        <nuxt-link :to="`/${locale}/CoinMarket/RAndWRecord`">
          <div class="fs30 text-right">我的闯关</div>
        </nuxt-link>
      </template>
    </van-nav-bar>

    <van-pull-refresh
      class="t-092 relative ContentHeight overflow-auto"
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

      <div class="p-1 bg-png">
        <div>
          <img
            class="w-2/3 mx-auto"
            src="~/assets/image/CoinMarket/title.png"
            alt=""
          >
        </div>
        <div class="">
          <div
            v-for="(item, index) in gamesData"
            :key="index"
            class="relative clffffff"
          >
            <img
              class="w-full"
              src="~/assets/image/CoinMarket/details.png"
              alt=""
            >
            <p class="absolute top-0 w-full text-center pt-1 leading-4 fs30">{{title}}</p>
            <div class="fs28 clffffff text-center absolute t-120 w-full">
              <div class="flex items-center justify-between px-3 mt-1">
                <div class="fs30 clffffff flex items-center">
                  <span class="cl02AD8F fs24 font-black">| </span>
                  <!-- <span class="ml-075">第{{item.gameIndex}}关</span> -->
                  <div class="border bc-co02AD8F cl02AD8F rounded-sm ml-1 px-1 py-05 fs18">
                    第{{item.gameIndex}}关
                  </div>
                </div>
                <span class="fs24 bk3A53B8 clffffff rounded-sm p-01">{{item.state == 0 ? '待开启' : (item.state == 1 ? '已开启' : (item.state == 2 ? '已售罄' : (item.state == 3 ? '已退款' : (item.state == 4 ? '已结算' : '已售罄'))))}}</span>
              </div>
              <div class="flex items-center justify-between mt-1 mx-3 pb-1 cl3A53B8 fs26 border-b bc-3A53B8 space-x-2">
                <div class="w-1/3">
                  <van-circle
                    v-model="item.currentRate"
                    layer-color="#3A53B8"
                    color="#12b4ff"
                    :rate="100"
                    :speed="100"
                  >
                    <template #default>
                      <div class="flex items-center justify-center h-full cl3A53B8 fs38">
                        <ICountUp
                          :delay="0.6"
                          :options="CountUpOptions"
                          :endVal="(item.completed / item.targetAmount * 100)"
                        ></ICountUp>%
                      </div>
                    </template>
                  </van-circle>
                </div>
                <div class="w-2/3">
                  <div class="flex items-center">
                    <span>闯关金额： </span>
                    <span class="clffffff">
                      <ICountUp
                        :delay="0.6"
                        :options="CountUpOptions"
                        :endVal="item.targetAmount"
                      ></ICountUp>
                      USDT
                    </span>
                  </div>
                  <div class="flex items-center">
                    <span>已&nbsp; 完&nbsp; 成： </span>
                    <span class="clffffff">
                      <ICountUp
                        :delay="0.6"
                        :options="CountUpOptions"
                        :endVal="item.completed"
                      ></ICountUp> USDT
                    </span>
                  </div>
                  <div class="flex items-center">
                    <span>可投金额： </span>
                    <span class="clffffff">1~
                      <ICountUp
                        :delay="0.6"
                        :options="CountUpOptions"
                        :endVal="item.maxAmount"
                      ></ICountUp> USDT</span>
                  </div>
                  <div class="flex items-center">
                    <span>每期收益： </span>
                    <span class="clffffff">
                      <ICountUp
                        :delay="0.6"
                        :options="CountUpOptions"
                        :endVal="item.interestRate"
                      ></ICountUp>%
                    </span>
                  </div>
                  <div class="flex items-center">
                    <span>燃烧TGC： </span>
                    <span class="clffffff">
                      <ICountUp
                        :delay="0.6"
                        :options="CountUpOptions"
                        :endVal="item.serviceCharge"
                      ></ICountUp>%
                    </span>
                  </div>
                </div>
              </div>
              <div class="fs22 cl3A53B8 py-1">起止时间：{{item.startTime}} 至 {{item.endTime}}</div>

              <div
                @click="item.state == 1 ? ReadShow = true : '', playGameData.gameId = item.id"
                :class="item.state == 1 ? 'bk02AD8F' : 'bk2F3441'"
                class="button button-2xl fs30 clffffff mx-6"
              >
                参与闯关
              </div>
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
        确定参与闯关？
      </div>
      <van-field
        v-model="playGameData.quantity"
        class="input-label input-label-select fs26 bk191D24-05 rounded-sm shadow-lg p-1 w-2/3 my-1 mx-auto"
        center
        placeholder="请输入闯关数量"
      >
      </van-field>
      <div class="flex items-center mt-2 mb-1 px-1 space-x-2">
        <div
          @click="ReadShow = false, playGameData.quantity = ''"
          class="button button-xl fs32 bk2E3743 border bc-co535E6D clffffff flex-1"
        >
          取消
        </div>
        <div
          @click="playGame"
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
      currentRate: 0,
      id: this.$route.params.id,
      title: this.$route.query.title,
      ReadShow: false,
      // 下拉刷新
      isLoading: false,
      gamesData: [],
      playGameData: {
        "gameId": "",// "游戏id"
        "quantity": "",// "参与数量"
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
    this.games()
  },
  methods: {
    // 参与闯关
    playGame () {
      if (!this.playGameData.quantity) {
        return this.$Toast("数量不能为空")
      }
      this.ReadShow = false
      this.$api.game.playGame(this.playGameData).then(res => {
        if (res.type == "success") {
          this.$Toast("参与成功")
          this.ReadShow = false
          this.games()
        }
      })
    },
    // 获取游戏
    games () {
      let params = {
        "roomId": this.id,// "roomId"
      }
      this.$api.main.games(params).then(res => {
        if (res.type == "success") {
          this.gamesData = res.data
          if (this.gamesData.length) {
            this.gamesData.forEach(item => {
              item.currentRate = item.completed / item.targetAmount * 100
            });
          }
        }
      })
    },
    // 下拉刷新
    onRefresh () {
      this.games()
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  },
}
</script>
<style lang="scss" scoped>
.CoinMarket {
  height: 100%;
  width: 100%;
  .bg-png {
    background: url('../../../../assets/image/CoinMarket/bg.png');
    background-size: 100% 100%;
  }
}
</style>