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
        <span class="fs32 font-bold clffffff">消息</span>
      </template>
    </van-nav-bar>
    <div class="t-092 relative ContentHeight overflow-y-auto px-1 clffffff">
      消息详情
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
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
</style>