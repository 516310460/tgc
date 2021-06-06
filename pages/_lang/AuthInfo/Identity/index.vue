<template>
  <div class="AuthInfo">
    <van-nav-bar
      class="bk191D24-05 clffffff h092 w-full z-10"
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
        <span class="fs32 font-bold clffffff">身份认证</span>
      </template>
    </van-nav-bar>

    <div class="px-1 pb-6">
      <div class="mt-2">
        <p class="fs28 clA5A9B0">国家地区</p>

        <div class="flex items-center justify-between mt-1 fs28 bk21252F p-1 cl868D9A rounded-sm">
          <span>中国</span>
          <van-icon
            class="fs28"
            name="arrow-down"
          />
        </div>

        <div class="flex items-center justify-between fs24 mt-2 cl868D9A">
          <span>姓名</span>
        </div>
        <van-field
          class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
          v-model="value"
          placeholder="请输入姓名"
        >
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl868D9A">
          <span>身份证号</span>
        </div>
        <van-field
          class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
          v-model="value"
          placeholder="请输入身份证号"
        >
        </van-field>
      </div>
    </div>

    <div class="fixed bottom-0 w-full my-1">
      <nuxt-link :to="`/${locale}/AuthInfo/Identity/step1`">
        <div class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1">
          下一步
          <!-- bk02AD8F/bk2F3441 -->
        </div>
      </nuxt-link>
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
}
</script>
<style lang="scss" scoped>
</style>