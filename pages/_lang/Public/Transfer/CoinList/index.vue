<template>
  <div class="CoinList">
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
        <span class="fs32 font-bold clffffff">币种列表</span>
      </template>
    </van-nav-bar>

    <van-pull-refresh
      class="t-092 relative px-1 pb-6"
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

      <div
        v-for="index in 10"
        :key="index"
        class="my-1 clffffff border-b bc-487DC6 pb-1"
      >
        <nuxt-link
          class="flex items-center justify-between"
          :to="`/${locale}/Public/Transfer/EOS`"
        >
          <div class="flex items-center">
            <img
              class="w-2"
              src="~/assets/svg/btc.svg"
              alt=""
            >
            <div class="fs32 font-bold ml-1">111</div>
          </div>
          <div class="fs32 font-bold">0.00</div>
        </nuxt-link>
      </div>

    </van-pull-refresh>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 下拉刷新
      isLoading: false,
      coinList: [
        {
          name: 'BTC'
        },
        {
          name: 'ETH'
        },
        {
          name: 'EOS'
        }
      ]
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  }
}
</script>