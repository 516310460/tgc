<template>
  <div>
    <van-nav-bar
      class="bk191D24-05 clffffff h092"
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
        <span class="fs32 font-bold clffffff">充值</span>
      </template>
      <template #right>
        <nuxt-link :to="`/${locale}/Assets/RAndWRecord`">
          <img
            class="wh036"
            src="~/assets/svg/icon_recording.svg"
            alt=""
          >
        </nuxt-link>
      </template>
    </van-nav-bar>

    <div class="ContentHeight overflow-auto">
      <div
        @click="coinListBox = true"
        class="flex items-center justify-between py035 border-b bc-co0C0E11"
      >
        <div class="flex items-center pl-1">
          <img
            class="w-2 h-2"
            src="~/assets/svg/btc.svg"
            alt=""
          >
          <span class="ml-1 fs32 clffffff">{{currentCoin.coinName}}</span>
        </div>
        <van-icon
          class="cl868D9A fs28 pr-1"
          name="arrow"
        />
      </div>
      <div class="px-1 cl868D9A border-b bc-co0C0E11">
        <p class="fs28 mt-1">选择主网：</p>
        <div class="flex items-center mt015">
          <div class="bk373D4A px-2 py010 cl02AD8F border bc-co02AD8F relative">
            {{currentCoin.mainNet}}
            <img
              class="w-1 h-1 absolute bottom-0 right-0"
              src="~/assets/svg/icon_Check.svg"
              alt=""
            >
          </div>
          <!-- <div class="bk373D4A px-2 py010 border bc-co373D4A ml-1">
            BEP20(BSC)
          </div> -->
        </div>

        <div class="mt-2 text-center">
          <QrcodeVue
            style="padding: 0.1rem; background: white;"
            :value="currentCoin.address"
            class="w-10 mx-auto flex items-center justify-center"
          ></QrcodeVue>
          <div
            @click="savePic"
            class="w-10 mx-auto mt-1 py003-px010 bk0070F3 clffffff"
          >保存图片</div>
        </div>

        <div class="flex items-center justify-between fs28 mt-1 cl868D9A">
          <span>{{currentCoin.coinName}}充值地址</span>
        </div>
        <p class="mt-1 fs28 clffffff">{{currentCoin.address}}</p>
        <div
          v-clipboard:copy="currentCoin.address"
          v-clipboard:success="onCopy"
          class="bk191D24 clffffff fs32 text-center h150 mt-1"
        >
          <div class="bk02AD8F rounded-sm py-1">
            复制地址
          </div>
        </div>
      </div>
      <div class="fs24 cl868D9A px-1">
        <div class="flex items-center justify-between fs24 mt-1 cl868D9A">
          <span>注意：</span>
        </div>
        <p class="mt-01">*需要 <span class="clCD7728">6</span> 个网络才能到账。</p>
        <p>*任何 <span class="clCD7728">非{{currentCoin.coinName}}</span> 资产充值到{{currentCoin.coinName}}地址后不可找回！</p>
      </div>
    </div>

    <!-- 币种列表 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="coinListBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092 fixed top-0 w-full z-10"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="coinListBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">币种列表</span>
        </template>
      </van-nav-bar>

      <van-pull-refresh
        class="t-092 relative px-1 pb-6"
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

        <div
          @click="clickCoin(item)"
          v-for="(item, index) in getAddressData"
          :key="index"
          class="my-1 clffffff border-b bc-487DC6 pb-1"
        >
          <div
            @click="coinListBox = false"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <img
                class="w-2"
                src="~/assets/svg/btc.svg"
                alt=""
              >
              <div class="fs32 font-bold ml-1">{{item.coinName}}</div>
            </div>
            <div class="fs32 font-bold">
              <span>所属主网：{{item.mainNet}}</span>
            </div>
          </div>
        </div>

      </van-pull-refresh>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      value: '',
      coinListBox: false,
      isLoading: false,
      isLoading: false,
      currentCoin: {
        coinName: '',
        mainNet: '',
        address: '',
      },
      getAddressData: []
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.getAddress()
  },
  methods: {
    clickCoin (item) {
      this.currentCoin = {
        coinName: item.coinName,
        mainNet: item.mainNet,
        address: item.address,
      }
    },
    // 获取地址
    getAddress () {
      this.$api.userAccount.getAddress().then(res => {
        if (res.type == "success") {
          this.getAddressData = res.data
          if (this.getAddressData.length) {
            this.currentCoin = {
              coinName: this.getAddressData[0].coinName,
              mainNet: this.getAddressData[0].mainNet,
              address: this.getAddressData[0].address,
            }
          }
        }
      })
    },
    // 保存图片（APP）
    savePic () {
      //imgUrl 图片网络路径
      let that = this
      let timestamp = (new Date()).valueOf();
      let downLoader = plus.downloader.createDownload("http://192.168.1.88:3000/img/Home/banner1.png", {
        method: 'GET',
        filename: '_downloads/image/' + timestamp + '.png'
      }, function (download, status) {
        if (status == 200) {
          let fileName = download.filename;
          /**
           * 保存至本地相册
           */
          plus.gallery.save(fileName, function () {
            that.$Toast("保存成功");
          }, function () {
            that.$Toast("保存失败，请重试");
          });
        } else {
          that.$Toast("下载失败，请重试");
        }
      });
      downLoader.start();
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
    }
  },
}
</script>
<style lang="scss" scoped>
</style>