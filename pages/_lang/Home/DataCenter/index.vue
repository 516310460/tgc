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
        <span class="fs32 font-bold clffffff">数据中心</span>
      </template>
    </van-nav-bar>

    <div class="relative ContentHeight t-092 w-full">
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

          <div class="px-1">
            <!-- <div class="clffffff bk21252F rounded-sm my-1 py-2 text-center fs36">
              累计总收益：0USDT
            </div> -->
            <div class="grid grid-cols-2 gap-1">
              <div class="clffffff bk21252F rounded-sm p-1">
                <div class="fs24 text-center">
                  <p class="fs32">496463</p>
                  <p class="cl868D9A">全网区块高度</p>
                </div>
              </div>
              <div class="clffffff bk21252F rounded-sm p-1">
                <div class="fs24 text-center">
                  <p class="fs32">496463</p>
                  <p class="cl868D9A">全网销毁</p>
                </div>
              </div>
              <div class="clffffff bk21252F rounded-sm p-1">
                <div class="fs24 text-center">
                  <p class="fs32">496463</p>
                  <p class="cl868D9A">全网总产量</p>
                </div>
              </div>
              <div class="clffffff bk21252F rounded-sm p-1">
                <div class="fs24 text-center">
                  <p class="fs32">496463</p>
                  <p class="cl868D9A">全网幸运奖金池</p>
                </div>
              </div>
              <nuxt-link :to="`/${locale}/Home/DataCenter/ProfitCenter`">
                <div class="clffffff bk21252F rounded-sm p-1 flex items-center justify-between">
                  <div class="fs24 text-center flex-1">
                    <p class="fs32">496463</p>
                    <p class="cl868D9A">基金合伙人(累计)</p>
                  </div>
                  <van-icon
                    class="cl02AD8F flex-none"
                    name="arrow"
                  />
                </div>
              </nuxt-link>
              <nuxt-link :to="`/${locale}/Home/DataCenter/ProfitCenter`">
                <div class="clffffff bk21252F rounded-sm p-1 flex items-center justify-between">
                  <div class="fs24 text-center flex-1">
                    <p class="fs32">496463</p>
                    <p class="cl868D9A">倒叙分红池(累计)</p>
                  </div>
                  <van-icon
                    class="cl02AD8F flex-none"
                    name="arrow"
                  />
                </div>
              </nuxt-link>
              <div class="clffffff bk21252F rounded-sm p-1">
                <div class="fs24 text-center">
                  <p class="fs32">496463</p>
                  <p class="cl868D9A">昨日总产量</p>
                </div>
              </div>
            </div>
          </div>

          <div class="fs30 clffffff flex items-center pt-1 px-1">
            <span class="cl02AD8F fs24 font-black">| </span>
            <span class="ml-075">基金合伙人排行</span>
          </div>

          <div class="clffffff bk21252F rounded-sm m-1 p-1">
            <div class="flex items-center justify-between fs24 clffffff">
              <div class="flex items-center">
                <img
                  class="w-2"
                  src="~/assets/svg/icon_positive.svg"
                  alt=""
                >
                <span class="ml-1">用户名</span>
              </div>
              <div class="text-right">
                奖励收益：2077.9USDT
              </div>
            </div>
          </div>

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
          name: '我的闯关',
        },
        {
          name: '闯关社区',
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
    onClick (name, title) {
      // this.$Toast(title);
      // console.log(name, title)
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
