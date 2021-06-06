<template>
  <div class="Notice">
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
        <span class="fs32 font-bold clffffff">资讯</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 relative px-1"
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
          :to="`/${locale}/Public/News/Details/${item.id}`"
          class="my-1 pb-1 flex items-center justify-between border-b bc-487DC6"
          v-for="(item, index) in informationData"
          :key="index"
        >
          <div class="pr-2">
            <p class="fs28 clffffff">{{item.title}}</p>
            <p class="fs20 cl3A53B8 mt01">{{item.createTime}}</p>
          </div>
          <img
            class="w-10 h-4"
            :src="item.image"
            alt=""
          >
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
      informationData: []
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
          this.informationData = res.data
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