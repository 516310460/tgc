<template>
  <div>
    <van-nav-bar
      class="bk191D24 clffffff h092"
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
        <span class="fs32 font-bold clffffff">自动投票</span>
      </template>
      <template #right>
        <span
          @click="setAutoGames"
          class="fs28 font-bold clffffff"
        >保存</span>
      </template>
    </van-nav-bar>
    <div class="fs28 px-1">
      <div class="bk1D088B rounded-sm mt-1 clffffff">
        <div class="p-1 zfb flex items-center justify-between border-b bc-487DC6">
          <span>自动闯关</span>
          <van-switch
            size="0.4rem"
            active-color="#12b4ff"
            v-model="setAutoGamesParams.type"
          />
        </div>
        <div
          :class="actionsValue == 0 && 'border-b bc-487DC6'"
          class="p-1 zfb flex items-center justify-between"
        >
          <span>自动最大额度</span>
          <van-popover
            placement="bottom-end"
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <div class="flex items-center border bc-co3FCFBA cl3FCFBA rounded-sm py010">
                <div class="flex items-center fs18">
                  <span class="ml-1">{{actionsValue == 1 ? '每期最大额度' : '自定义额度'}}</span>
                </div>
                <van-icon
                  class=" px-010"
                  name="arrow-down"
                />
              </div>
            </template>
          </van-popover>
        </div>
        <div
          v-if="actionsValue == 0"
          class="p-1 zfb flex items-center justify-between"
        >
          <div class="flex-none">自定义额度</div>
          <van-field
            v-model="setAutoGamesParams.quantity"
            class="bk1D088B input-label-w2 font-semibold fs28 ml-2 p-0 text-right"
            center
            placeholder="请输入自定义额度"
          >
          </van-field>
        </div>
      </div>
      <p class="fs24 mt-2 cl02AD8F">开启后将自动闯关，未设置额度默认，每期最大额度去闯关，开启</p>
      <p class="fs24 mt-1 cl02AD8F">自定义设置后，最大抢票不超过最大额度</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      checked: false,
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actionsValue: 0,
      actions: [{ text: '每期最大额度', type: 1 }, { text: '自定义额度', type: 0 }],
      setAutoGamesParams: {
        type: false,
        quantity: "",
      }
    }
  },
  created () {
    this.setAutoGamesParams.type = !!this.UserInfo.isAuto
    this.actionsValue = this.UserInfo.isMax
    this.setAutoGamesParams.quantity = this.UserInfo.autoQuantity
  },
  computed: {
    ...mapState(['locale', 'token', 'UserInfo'])
  },
  methods: {
    // 修改自动闯关
    setAutoGames () {
      let params = {
        type: this.setAutoGamesParams.type ? 1 : 0,
        isMax: this.actionsValue,
        quantity: ""
      }
      if (this.actionsValue == 0) {
        params.quantity = this.setAutoGamesParams.quantity
      } else {
        params.quantity = ""
      }
      this.$api.user.setAutoGames(params).then(res => {
        if (res.type == "success") {
          this.$Toast("修改成功")
          this.getUserInfo()
        }
      })
    },
    // 获取用户信息
    getUserInfo () {
      this.$api.user.getUserInfo().then(res => {
        if (res.type == "success") {
          res.data.token = this.token
          this.$store.commit("SET_USERINFO", res.data);
        }
      })
    },
    onSelect (action) {
      this.actionsValue = action.type
    },
  }
}
</script>