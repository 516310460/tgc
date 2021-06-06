<template>
  <div class="ChangeMoney">
    <van-nav-bar
      class="bk21252F clffffff h092 fixed top-0 w-full z-10"
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
        <span class="fs32 font-bold clffffff">选择法币</span>
      </template>
    </van-nav-bar>

    <div class="t-092 relative pb-6">

      <div class="bk21252F p-1">
        <van-search
          class="bg-transparent w-full p-0"
          :value="value"
          placeholder="搜索币种"
        />
      </div>

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

        <van-index-bar :index-list="indexList">
          <van-index-anchor
            class="clffffff"
            index="A"
          />
          <div class="bk21252F p-1">
            <div
              v-for="index in 20"
              :key="index"
              class="flex items-center pl-1"
            >
              <div class="fs24 cl868D9A">ARS$</div>
              <div class="border-b bc-487DC6 w-full fs32 clffffff ml-1 py-0175">ARS</div>
            </div>
          </div>
          <van-index-anchor
            class="clffffff"
            index="B"
          />
          <div class="bk21252F p-1">
            <div
              v-for="index in 20"
              :key="index"
              class="flex items-center pl-1"
            >
              <div class="fs24 cl868D9A">R$</div>
              <div class="border-b bc-487DC6 w-full fs32 clffffff ml-1 py-0175">BRL</div>
            </div>
          </div>
          <van-index-anchor
            class="clffffff"
            index="C"
          />
          <div class="bk21252F p-1">
            <div
              v-for="index in 20"
              :key="index"
              class="flex items-center pl-1"
            >
              <div class="fs24 cl868D9A">￥</div>
              <div class="border-b bc-487DC6 w-full fs32 clffffff ml-1 py-0175">CNY</div>
            </div>
          </div>
        </van-index-bar>
      </van-pull-refresh>
    </div>

  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      value: '',
      indexList: ['A', 'B', 'C'],
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
<style lang="scss" scoped>
.ChangeMoney {
  /deep/.van-search__content {
    background-color: #2a303c;
    .van-icon {
      color: #fff;
    }
  }
}
</style>