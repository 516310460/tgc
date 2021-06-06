<template>
  <div class="RAndWRecord">
    <van-nav-bar
      class="bk191D24-05 clffffff h092 fixed top-0 w-full z-10"
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
        <span class="fs32 font-bold clffffff">兑换记录</span>
      </template>
    </van-nav-bar>

    <div class="ContentHeight overflow-auto relative t-092 w-full">
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

        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          class="w-full h-full"
        >
          <template #finished>
            <div class="fs22">
              没有更多了
            </div>
          </template>
          <template #loading>
            <div class="fs22 flex items-center justify-center">
              <van-loading color="#02AD8F" />
              <span class="ml-1">加载中...</span>
            </div>
          </template>

          <ul class="px-1">
            <li
              v-for="(item, index) in tradeListByUserData"
              :key="index"
              class="cl868D9A bk21252F rounded-sm my-1 p-1"
            >
              <!-- <nuxt-link :to="`/${locale}/HashRate/RAndWRecord/Details/123123?type=${active}`"> -->
              <p class="cl02AD8F font-bold fs28">{{item.type == 1 ? "购买" : "出售"}}</p>
              <div class="flex items-center justify-between clffffff">
                <span class="fs28">{{item.type == 1 ? 'USDT' : 'TGC'}}</span>
                <span class="fs28 font-bold">{{item.totalPrice}}{{item.type == 1 ? 'USDT' : 'TGC'}}</span>
              </div>
              <div class="flex items-center justify-between cl868D9A">
                <span class="fs24">{{item.createTime}}</span>
                <span class="fs24 font-bold cl02AD8F">
                  <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
                  <span class="ml-075">成功</span>
                </span>
              </div>
              <!-- </nuxt-link> -->
            </li>
          </ul>
        </van-list>

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
      active: 0,
      paymentMethodIndex: 0,//收款方式索引
      typeList: [
        {
          name: '充值',
        },
        {
          name: '提现',
        }
      ],
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
      tradeListByUserData: []
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.tradeListByUser()
  },
  methods: {
    tradeListByUser () {
      this.$api.trade.tradeListByUser().then(res => {
        if (res.type == "success") {
          this.tradeListByUserData = res.data
        }
      })
    },
    // 下拉刷新
    onRefresh () {
      this.tradeListByUser()
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
.RAndWRecord {
  .coinpool-wap-Content {
    padding-bottom: 0.98rem;
  }
  .van-search__content {
    background-color: #191d24;
    .van-icon {
      color: #fff;
    }
  }
  .van-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 0.92rem;
      width: 100%;
      z-index: 30;
      background: $co191D24;
      border-bottom: 1px solid $co487DC6;
    }
  }
}
</style>
