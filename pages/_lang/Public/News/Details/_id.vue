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
        <span class="fs32 font-bold clffffff">{{newInfoData.title}}</span>
      </template>
    </van-nav-bar>
    <div class="t-092 relative px-1 clffffff">
      {{newInfoData.content}}
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      id: this.$route.params.id,
      newInfoData: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.newInfo()
  },
  methods: {
    // 获取消息详情
    newInfo () {
      let params = {
        "id": this.id,// "typeId"
      }
      this.$api.main.newInfo(params).then(res => {
        if (res.type == "success") {
          this.newInfoData = res.data
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>