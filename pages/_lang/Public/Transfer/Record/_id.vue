<template>
  <div class="RAndWRecord">
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
        <span class="fs32 font-bold clffffff">充提记录</span>
      </template>
    </van-nav-bar>

    <div class="bk191D24 relative t-092 w-full">
      <div class="bk191D24">
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

            <ul class="mt-1 px-1">
              <li
                v-for="index in 10"
                :key="index"
                class="cl868D9A bk21252F rounded-sm my-1 p-1"
              >
                <div class="flex items-center justify-between clffffff">
                  <span class="fs28">USDT</span>
                  <span class="fs28 font-bold">30.596195</span>
                </div>
                <div class="flex items-center justify-between cl868D9A">
                  <span class="fs24">2021-01-07 22:51:22</span>
                  <span class="fs24 font-bold">
                    <span>现货 &nbsp;>&nbsp;</span>
                    <span>C2C</span>
                  </span>
                </div>
              </li>
            </ul>

          </van-list>

        </van-pull-refresh>
      </div>
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
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
      })
    })
  },
  methods: {
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
