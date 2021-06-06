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
        <span class="fs32 font-bold clffffff">社区</span>
      </template>
      <template #right>
        <nuxt-link :to="`/${locale}/CoinMarket/RandWRecord/ProfitCenter`">
          <span class="fs28 font-bold clffffff">收益记录</span>
        </nuxt-link>
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

          <div class="relative clffffff">
            <div class="fs28 clffffff text-center w-full px-1">
              <p class="text-left mt-1">上级推荐码：{{minnerTjData.sjtjm}}</p>
              <div class="flex items-center justify-between mt-1">
                <div>
                  <p>{{minnerTjData.ztrs}}/{{minnerTjData.ztgmrs}}</p>
                  <p class="fs20 cl3A53B8">直推/有效人数</p>
                </div>
                <div>
                  <p>{{minnerTjData.tdrs}}/{{minnerTjData.tdgmrs}}</p>
                  <p class="fs20 cl3A53B8">团队人数/有效人数</p>
                </div>
                <span class="fs24 bk3A53B8 clffffff rounded-sm p-01">{{minnerTjData.level}}</span>
              </div>
              <div class="grid grid-cols-2 gap-1 mt-1 pb-1 fs26">
                <div class="bk1D088B rounded-sm py-1">
                  <p>{{minnerTjData.tdrgyj}}</p>
                  <p class="fs20 cl3A53B8">团队认购业绩(USDT)</p>
                </div>
                <div class="bk1D088B rounded-sm py-1">
                  <p>{{minnerTjData.xqyj}}</p>
                  <p class="fs20 cl3A53B8">小区业绩(USDT)</p>
                </div>
              </div>
            </div>

            <div class="fs30 clffffff flex items-center pt-1 px-1">
              <span class="cl02AD8F fs24 font-black">| </span>
              <span class="ml-075">直推人数</span>
            </div>

            <div
              v-for="(item, index) in userListData"
              :key="index"
              class="cl868D9A bk21252F rounded-sm m-1 p-1"
            >
              <!-- <div class="flex items-center justify-between fs24 cl868D9A">
                <div>
                  <p>可用</p>
                  <p class="fs32 font-bold">11111</p>
                </div>
                <div>
                  <p>冻结</p>
                  <p class="fs32 font-bold">11111</p>
                </div>
                <div class="text-right">
                  <p>折合(CYN)</p>
                  <p class="fs32 font-bold">11111</p>
                </div>
              </div> -->
              <div class="flex items-center justify-between cl868D9A">
                <span class="fs28">用户</span>
                <span class="fs28">人数</span>
              </div>
              <div class="flex items-center justify-between clffffff">
                <span class="fs28">{{item.userName}}</span>
                <span class="fs28 font-bold">{{item.count}}</span>
              </div>
              <!-- <div class="flex items-center justify-between cl868D9A">
                <span class="fs24">{{item.createTime}}</span>
                <span class="fs24 font-bold cl02AD8F">
                  <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
                  <span class="ml-075">成功</span>
                </span>
              </div> -->
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
      minnerTjData: [],
      userListData: []
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.minnerTj()
  },
  methods: {
    minnerTj () {
      this.$api.main.minnerTj().then(res => {
        if (res.type == "success") {
          this.minnerTjData = res.data.tj
          this.userListData = res.data.userList
        }
      })
    },
    // 下拉刷新
    onRefresh () {
      this.minnerTj()
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
