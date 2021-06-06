<template>
  <div class="AddPaymentMethod">
    <van-nav-bar
      class="bk191D24-05 px-1 fixed top-0 w-full z-10 h092"
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
        <span class="fs32 font-bold clffffff">添加{{switchType(type)}}</span>
      </template>
    </van-nav-bar>

    <div
      v-if="type == 1 || type == 2"
      class="relative t-092 chartContentHeight overflow-y-auto"
    >
      <div class="mt-2 bk21252F pl-2 fs28">
        <p class="cl868D9A py-0125">姓名</p>
        <p class="clffffff border-b bc-487DC6 pb-075">张某</p>
      </div>
      <div class="mt-1 pl-2 fs28">
        <p class="cl868D9A py-0125">{{switchType(type)}}账号</p>
        <van-field
          class="bknull p-0 border-b bc-487DC6"
          v-model="value"
          :placeholder="`请输入${switchType(type)}`"
        />
      </div>
      <div class="mt-1 pl-2 fs28">
        <p class="cl868D9A py-0125">收款二维码</p>
        <van-uploader
          class="bk292E39"
          :after-read="afterRead"
        />
      </div>
    </div>

    <div
      v-if="type == 3"
      class="bk191D24 relative t-092 coinpool-wap-Content w-full"
    >
      <div class="mt-2 bk21252F pl-2 fs28">
        <p class="cl868D9A py-0125">姓名</p>
        <p class="clffffff border-b bc-487DC6 pb-075">张某</p>
      </div>
      <div class="mt-1 pl-2 fs28">
        <p class="cl868D9A py-0125">银行账号/卡号</p>
        <van-field
          class="bknull p-0 border-b bc-487DC6"
          v-model="value"
          placeholder="请输入银行账号/卡号"
        />
      </div>
      <div class="mt-1 pl-2 fs28">
        <p class="cl868D9A py-0125">银行名称</p>
        <van-field
          class="bknull p-0 border-b bc-487DC6"
          v-model="value"
          placeholder="请输入您的银行名称"
        />
      </div>
      <div class="mt-1 pl-2 fs28">
        <p class="cl868D9A py-0125">开户支行(选填)</p>
        <van-field
          class="bknull p-0 border-b bc-487DC6"
          v-model="value"
          placeholder="请输入您的开户支行"
        />
      </div>
    </div>

    <div class="w-full mb-1 px-1 fixed bottom-0 bk21252F">
      <p class="fs20 cl868D9A py-1">温馨提示：当您出售数字货币时，您选择的收款方式将向卖方展示，请确保信息无误</p>
      <nuxt-link :to="`/${locale}/Trade/C2C/SelectPaymentMethod`">
        <div class="button button-2xl fs32 bk02AD8F clffffff">
          确认
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
      value: '',
      type: Number(this.$route.params.type)
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
      })
    })
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    switchType (type) {
      let str = ''
      switch (type) {
        case 1:
          str = '微信'
          break;
        case 2:
          str = '支付宝'
          break;
        case 3:
          str = '银行卡'
          break;
        default:
          break;
      }

      return str
    }
  }
};
</script>
<style lang="scss">
.AddPaymentMethod {
}
</style>
