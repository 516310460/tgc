<template>
  <div class="Notice">
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
        <span class="fs32 font-bold clffffff">公告</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 relative ContentHeight overflow-auto px-1"
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
          :to="`/${locale}/Public/Notice/Details/${item.id}`"
          class="bk21252F rounded-sm shadow-lg p-1 cl868D9A mb-1 flex items-center"
          v-for="(item, index) in newsData"
          :key="index"
        >
          <img
            class="wh03"
            src="~/assets/svg/icon-announcement.svg"
            alt=""
          >
          <p class="truncate ml-1">{{item.title}}</p>
        </nuxt-link>
      </van-list>
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
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
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
        "typeId": 1,// "typeId"
      }
      this.$api.main.news(params).then(res => {
        if (res.type == "success") {
          this.newsData = res.data
        }
      })
    },
    // 下拉刷新
    onRefresh () {
      this.news()
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
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