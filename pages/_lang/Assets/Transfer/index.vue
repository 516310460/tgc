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
        <span class="fs32 font-bold clffffff">转账</span>
      </template>
      <!-- <template #right>
        <nuxt-link :to="`/${locale}/Assets/RAndWRecord`">
          <img
            class="wh036"
            src="~/assets/svg/icon_recording.svg"
            alt=""
          >
        </nuxt-link>
      </template> -->
    </van-nav-bar>

    <div class="ContentButtonHeight overflow-auto">
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
      <div class="px-1 pb-1 cl868D9A border-b bc-co0C0E11">
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

        <div class="flex items-center justify-between fs24 mt-2 cl868D9A">
          <span>用户名</span>
        </div>
        <van-field
          class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
          v-model="currentCoin.username"
          placeholder="请输入用户名"
        >
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl868D9A">
          <span>转账金额</span>
        </div>
        <van-field
          class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
          v-model="currentCoin.balance"
          placeholder="请输入转账金额"
        >
          <template #button>
            <span class="fs28 cl868D9A font-light">
              {{currentCoin.coinName}}
            </span>
            <span
              @click="allBalance"
              class="fs28 cl02AD8F ml-1"
            >全部转账</span>
          </template>
        </van-field>

        <div class="flex items-center justify-between fs24 mt-01 cl868D9A">
          <span>可用余额：{{currentBalance}}{{currentCoin.coinName}}</span>
        </div>
        <div class="flex items-center justify-between fs24 mt-01 cl868D9A">
          <span>最小转账数量：{{currentCoin.minPayAmount}}{{currentCoin.coinName}}</span>
        </div>
        <div class="flex items-center justify-between fs24 mt-01 cl868D9A">
          <span>最大转账数量：{{currentCoin.maxPayAmount}}{{currentCoin.coinName}}</span>
        </div>

        <div class="flex items-center justify-between fs24 pt-1 cl02AD8F">
          <span>支付密码</span>
        </div>
        <van-field
          v-model="currentCoin.payPassword"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          type="password"
          placeholder="请输入支付密码"
        >
        </van-field>
      </div>

      <div class="fs24 cl868D9A px-1">
        <div class="flex items-center justify-between fs24 mt-1 cl868D9A">
          <span>注意：</span>
        </div>
        <p class="mt-01">为了保障资金安全，请仔细输入用户。</p>
      </div>
    </div>

    <div class="bk21252F p-1 fs28 cl868D9A shadow-lg fixed w-full bottom-0">
      <div class="flex items-center space-x-1">
        <div class="flex-1 fs24 cl868D9A">
          <!-- <p>实际到账：</p> -->
          <p>手续费：</p>
          <!-- <p class="fs32 clffffff font-bold">{{currentCoin.balance ? currentCoin.balance - (currentCoin.balance * currentCoin.fee / 100) : 0}}{{currentCoin.coinName}}</p> -->
          <p class="fs32 clffffff font-bold">{{currentCoin.balance ? (Number(currentCoin.balance) * Number(currentCoin.fee) / 100).toFixed(2) : 0}} {{currentCoin.coinName}}</p>
        </div>
        <div
          :to="`/${locale}/Assets/Recharge`"
          class="flex-none"
        >
          <div
            @click="transfer"
            class="button button-2xl fs32 bk02AD8F clffffff flex-1"
          >
            转账
          </div>
        </div>
      </div>
    </div>

    <!-- 转账地址管理 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="withdrawalAddressBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="withdrawalAddressBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">转账地址管理</span>
        </template>
        <template #right>
          <img
            @click="addWithdrawalAddressBox = true"
            class="wh04"
            src="~/assets/svg/icon_edit.svg"
            alt=""
          >
        </template>
      </van-nav-bar>

      <div class="py-1 ContentButtonHeight overflow-auto">
        <div
          @click="withdrawalAddressBox = false"
          v-for="index in 3"
          :key="index"
          class="bk21252F p-1 clffffff fs32 mt-1"
        >
          <div class="flex items-center justify-between">
            <span>备注名称</span>
            <img
              class="wh036"
              src="~/assets/svg/icon_delete.svg"
              alt=""
            >
          </div>
          <div class="flex items-start mt-1">
            <img
              class="w-2 h-2"
              src="~/assets/svg/btc.svg"
              alt=""
            >
            <div class="ml-1">
              <p>BTC</p>
              <p class="fs24 cl868D9A">0xdce8013708a5a41cdd38d9a937c2d97ac4d74499</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bk191D24 clffffff fs32 text-center fixed bottom-0 w-full h150">
        <div class="bk02AD8F rounded-sm py-1 m-1">
          添加转账地址
        </div>
      </div>
    </van-popup>

    <!-- 添加转账地址 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="addWithdrawalAddressBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="addWithdrawalAddressBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">添加转账地址</span>
        </template>
      </van-nav-bar>

      <div class="ContentButtonHeight overflow-auto">
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
            <span class="ml-1 fs32">BTC</span>
          </div>
          <van-icon
            class="cl868D9A fs28 pr-1"
            name="arrow"
          />
        </div>
        <div class="px-1 cl868D9A">
          <p class="fs28 mt-1">选择主网：</p>
          <div class="flex items-center mt015">
            <div class="bk373D4A px-2 py010 cl02AD8F border bc-co02AD8F relative">
              ERC20
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

          <div class="flex items-center justify-between fs24 mt-2 cl868D9A">
            <span>钱包备注</span>
          </div>
          <van-field
            class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
            v-model="value"
            placeholder="请输入钱包备注"
          >
          </van-field>

          <div class="flex items-center justify-between fs24 mt-2 cl868D9A">
            <span>地址</span>
          </div>
          <van-field
            class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
            v-model="value"
            placeholder="请输入地址"
          >
          </van-field>
        </div>
      </div>

      <div class="bk191D24 clffffff fs32 text-center fixed bottom-0 w-full h150">
        <div class="bk02AD8F rounded-sm py-1 m-1">
          保存
        </div>
      </div>
    </van-popup>

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
          v-for="(item, index) in enableCoinsData"
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
      withdrawalAddressBox: false,
      addWithdrawalAddressBox: false,
      coinListBox: false,
      isLoading: false,
      isLoading: false,
      currentCoin: {
        coinName: '',
        mainNet: '',
        username: '',
        balance: 0,
        payPassword: '',
        maxPayAmount: 0,
        minPayAmount: 0,
        fee: 0
      },
      balanceData: [],
      enableCoinsData: [],
      currentBalance: 0,//当前币种余额
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  async created () {
    await this.balance()
    await this.enableCoins()
  },
  methods: {
    async enableCoins () {
      await this.$api.userAccount.enableCoins().then(res => {
        if (res.type == "success") {
          this.enableCoinsData = res.data
          if (this.enableCoinsData.length) {
            this.currentCoin = {
              coinName: this.enableCoinsData[0].coinName,
              mainNet: this.enableCoinsData[0].mainNet,
              maxPayAmount: this.enableCoinsData[0].maxPayAmount,
              minPayAmount: this.enableCoinsData[0].minPayAmount,
              fee: this.enableCoinsData[0].fee
            }
            this.switchBalanceData(this.currentCoin.coinName)
          }
        }
      })
    },
    allBalance () {
      this.$set(this.currentCoin, 'balance', this.currentBalance)
    },
    transfer () {
      if (Number(this.currentCoin.balance) > this.currentBalance) {
        return this.$Toast("转账不能大于余额")
      }
      if (!this.currentCoin.username) {
        return this.$Toast("地址不能为空")
      }
      if (!this.currentCoin.payPassword) {
        return this.$Toast("资金密码不能为空")
      }
      if (Number(this.currentCoin.balance) < Number(this.currentCoin.minPayAmount)) {
        return this.$Toast("转账数量不能小于最小转账")
      }
      if (Number(this.currentCoin.balance) > Number(this.currentCoin.maxPayAmount)) {
        return this.$Toast("转账数量不能大于最大转账")
      }
      let params = {
        "amount": this.currentCoin.balance,// "	交易数量"
        "coinName": this.currentCoin.coinName,// "币种名称"
        "targetUserName": this.currentCoin.username,// "目标用户名称"
        "payPassword": this.$md5(this.currentCoin.payPassword),//资金密码
      }
      this.$api.userAccount.transfer(params).then(res => {
        if (res.type == "success") {
          this.$Toast("转账成功")
        }
      })
    },
    // 获取个人资产
    async balance () {
      await this.$api.userAccount.balance().then(res => {
        if (res.type == "success") {
          this.balanceData = res.data
        }
      })
    },
    switchBalanceData (coinName) {
      if (this.balanceData.length) {
        this.balanceData.forEach(item => {
          if (item.coinName == coinName) {
            this.currentBalance = item.balance
          }
        });
      }
    },
    clickCoin (item) {
      this.currentCoin = {
        coinName: item.coinName,
        mainNet: item.mainNet,
        maxPayAmount: item.maxPayAmount,
        minPayAmount: item.minPayAmount,
        fee: item.fee
      }
      this.switchBalanceData(this.currentCoin.coinName)
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