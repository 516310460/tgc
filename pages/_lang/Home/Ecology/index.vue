<template>
  <div class="Ecology">
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
        <span class="fs32 font-bold clffffff">TGC生态</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 relative ContentHeight overflow-y-auto"
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

      <div class="px-1 pb-1 cl3A53B8 fs24">
        <img
          src="~/assets/img/Home/ecology_title.png"
          alt=""
        >
        <div class="text-center py-1">
          <p class="fs28 clffffff mt-1">区块链内容生态应用</p>
          <p>BLockchain cintent ecological application</p>
        </div>
        <div class="bk1D088B rounded-sm">
          <p class="cl02AD8F fs28 py-1 text-center">异数联盟六大生态</p>
          <div class="flex items-center justify-between text-center pb-2">
            <div>
              <p>区块链 4D游戏《闯关》</p>
              <p class="py-1">流动性挖矿生态</p>
              <p>DEFI去中心化借贷生态</p>
            </div>
            <img
              class="w-8 px-010"
              src="~/assets/img/Home/ecology_1.png"
              alt=""
            >
            <div>
              <p>IPFS公共矿池生态</p>
              <p class="py-1">智能合约量化生态</p>
              <p>公链开发技术生态</p>
            </div>
          </div>
        </div>
        <div class="text-center py-1">
          <p class="fs28 clffffff mt-1">去中心操作系统</p>
          <p>De centralized operating system</p>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <div class="bk1D088B rounded-sm p-1">
            <img
              class="w-2 mx-auto"
              src="~/assets/img/Home/icon_xingneng.png"
              alt=""
            >
            <p class="fs26 cl02AD8F text-center mt-01">高性能</p>
            <p class="mt-1">全球服务节点部署，打破单一区块部署，提升系统吞吐量，满足交易高并发需求</p>
          </div>
          <div class="bk1D088B rounded-sm p-1">
            <img
              class="w-2 mx-auto"
              src="~/assets/img/Home/icon_links.png"
              alt=""
            >
            <p class="fs26 cl02AD8F text-center mt-01">高性能</p>
            <p class="mt-1">两个不同的记账系统可以通过第三方“连接器”或“验证”机器来互相自由的传输货币</p>
          </div>
          <div class="bk1D088B rounded-sm p-1">
            <img
              class="w-2 mx-auto"
              src="~/assets/img/Home/icon_anquan.png"
              alt=""
            >
            <p class="fs26 cl02AD8F text-center mt-01">高性能</p>
            <p class="mt-1">区块链技术的普及应用保障数据存储、数据传输和数据应用等多个方面的隐私保护</p>
          </div>
          <div class="bk1D088B rounded-sm p-1">
            <img
              class="w-2 mx-auto"
              src="~/assets/img/Home/icon_mokuai.png"
              alt=""
            >
            <p class="fs26 cl02AD8F text-center mt-01">高性能</p>
            <p class="mt-1">两个不同的记账系统可以通过第三方“连接器”或“验证”机器来互相自由的传输货币</p>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 下拉刷新
      isLoading: false,
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  },
}
</script>