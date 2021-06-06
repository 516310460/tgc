<template>
  <div class="CoinMarket">
    <van-nav-bar class="bk191D24-05 clffffff h092 fixed top-0 w-full z-10">
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
      class="t-092 relative chartContentHeight overflow-auto"
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

      <div class="p-1">
        <div>
          <img
            class="w-2/3 mx-auto"
            src="~/assets/image/CoinMarket/title.png"
            alt=""
          >
        </div>
        <div class="grid grid-cols-2 gap-2">
          <!-- <nuxt-link
            :to="`/${locale}/CoinMarket/Details/${1111}`"
            v-for="(item, index) in roomsData"
            :key="index"
            class="relative clffffff"
          > -->
          <div
            @click="clickRoomsData(item)"
            v-for="(item, index) in roomsData"
            :key="index"
            class="relative clffffff"
          >
            <img
              class="w-full"
              src="~/assets/image/CoinMarket/list.png"
              alt=""
            >
            <p class="absolute top-0 w-full text-center py-1 fs16">{{item.title}}</p>
            <div class="fs28 clffffff text-center absolute t-120 w-full">
              <p>{{item.name}}</p>
              <p>
                <ICountUp
                  :delay="0.6"
                  :options="CountUpOptions"
                  :endVal="item.prizePool"
                ></ICountUp>USDT
              </p>
              <p class="cl02AD8F">{{item.sonStatusStr}}</p>
            </div>
          </div>
          <!-- </nuxt-link> -->
        </div>
      </div>
    </van-pull-refresh>
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
      // 下拉刷新
      isLoading: false,
      roomsData: [],
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
    this.getRooms()
  },
  mounted () {
  },
  methods: {
    clickRoomsData (item) {
      if (item.state == 1) {
        this.$router.push(`/${this.locale}/CoinMarket/Details/${item.id}?title=${item.title}`)
      }
    },
    getRooms () {
      this.$api.main.rooms().then(res => {
        if (res.type == "success") {
          this.roomsData = res.data
        }
      })
    },
    // 下拉刷新
    onRefresh () {
      this.getRooms()
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
  background: url('../../../assets/image/CoinMarket/bg.png');
  background-size: 100% 100%;
}
</style>