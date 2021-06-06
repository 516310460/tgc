<template>
  <div class="Message">
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
        <span class="fs32 font-bold clffffff">资讯</span>
      </template>
      <!-- <template #right>
        <div
          @click="ReadShow = true"
          class="flex items-center bk0A1121 rounded-sm py003-px010"
        >
          <img
            src="~/assets/svg/icon_Clear.svg"
            alt=""
          >
          <span class="fs24 ml-075 clAFB6C3">全部已读</span>
        </div>
      </template> -->
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 ContentHeight overflow-y-auto relative px-1"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        class="w-full h-full"
      >
        <nuxt-link
          :to="`/${locale}/Public/Message/Details/111`"
          class="flex items-start cl868D9A my-1"
          v-for="(item, index) in newsData"
          :key="index"
        >
          <img
            class="wh036 mt-005"
            src="~/assets/svg/icon_information.svg"
            alt=""
          >
          <div class="ml-1">
            <div class="flex items-center">
              <p class="truncate clffffff fs32">{{item.title}}</p>
              <span class="relative inline-flex rounded-full wh012 bk02AD8F ml-1"></span>
            </div>
            <p class="truncate fs20 cl868D9A">{{item.content}}</p>
            <p class="truncate fs20 cl868D9A mt-1">{{item.createTime}}</p>
          </div>
        </nuxt-link>
      </van-list>
    </van-pull-refresh>

    <!-- 确定弹窗 -->
    <van-popup
      class="bk2E3743 rounded-sm w-3/4"
      v-model="ReadShow"
    >
      <div class="fs28 cl9FA9C0 m-1 pb-1 text-center">
        确定将全部未读消息标记为清除？
      </div>
      <div class="flex items-center my-1 px-1 space-x-2">
        <div
          @click="ReadShow = false"
          class="button button-xl fs32 bk2E3743 border bc-co535E6D clffffff flex-1"
        >
          取消
        </div>
        <div
          @click="ReadShow = false"
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
export default {
  data () {
    return {
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
      ReadShow: false,//是否已读
      newsData: []
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.news()
  },
  methods: {
    news () {
      let params = {
        // 1、公告 2、资讯
        "typeId": 2,// "typeId"
      }
      this.$api.main.news(params).then(res => {
        if (res.type == "success") {
          console.log(res)
          this.newsData = res.data
        }
      })
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    //复制成功
    onCopy () {
      this.$Toast("复制成功");
    },
    // 加载更多
    onLoad () {
      this.finished = true
    }
  },
}
</script>
<style lang="scss" scoped>
</style>