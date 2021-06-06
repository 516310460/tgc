<template>
  <div class="Search">
    <div class="bk21252F flex items-center justify-between h092 HashRate-popupLeft-srarch">
      <div class="flex1 center bg-transparent flex-1">
        <van-search
          class="bg-transparent w-full"
          :value="value"
          placeholder="搜索币种"
        />
      </div>
      <span
        @click="$router.back()"
        class="flex-none mr-1 cl02AD8F fs32"
      >取消</span>
    </div>
    <div class="mt-1 px-1">
      <p class="fs28 cl868D9A pb-075 border-b bc-487DC6">热门搜索</p>
      <div class="grid grid-cols-3 gap-1 mt-1">
        <div
          v-for="index in 6"
          :key="index"
          class="bk21252F py-0125 fs28 clffffff text-center"
        >
          ATOM/USDT
        </div>
      </div>
    </div>

    <div class="mt-2 px-1">
      <div class="flex items-center justify-between border-b bc-487DC6">
        <p class="fs28 cl868D9A pb-075">历史搜索</p>
        <img
          class="wh036"
          src="~/assets/svg/icon_delete-1.svg"
          alt=""
        >
      </div>
      <div class="mt-1">
        <nuxt-link
          :to="`/${locale}/HashRate`"
          v-for="index in 3"
          :key="index"
          class="flex item-center justify-between fs32 my-1 line-height-1-2"
        >
          <span class="clffffff flex items-center font-semibold">1INCH <span class="fs24 font-light">&nbsp;/USDT</span> </span>
          <div class="cl02AD8F text-center">
            <p class="fss28 font-semibold">4.4414</p>
            <p class="fs20">1.40%</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>
.Search {
  /deep/.van-search__content {
    background-color: #2a303c;
    .van-icon {
      color: #fff;
    }
  }
}
</style>