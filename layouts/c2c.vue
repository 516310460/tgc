<template>
  <div class="c2c-coinpool-wap">
    <nuxt
      :class="{ 'c2c-coinpool-wap-Content': orderTakingState }"
      class="dddd"
      keep-alive
      v-if="$route.meta.keepAlive"
    />
    <nuxt
      :class="{ 'c2c-coinpool-wap-Content': orderTakingState }"
      v-else
    />

    <van-tabbar
      v-if="orderTakingState"
      class="c2c-coinpool-wap-Tabbar bk2B303D flex items-center justify-between px-1 fixed w-full z-20 transparent"
      @change="tabbarChange(pageActive)"
      v-model="pageActive"
    >
      <van-tabbar-item class="fs20">
        <template #icon="props">
          <img
            class="wh04"
            :src="props.active ? '~/assets/svg/tabbar-c2c-22px-1.svg' : '~/assets/svg/tabbar-c2c-22px.svg'"
            alt=""
          >
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'clffffff' : 'cl868D9A'"
        >C2C</span>
      </van-tabbar-item>
      <van-tabbar-item class="fs20">
        <template #icon="props">
          <img
            class="wh04"
            :src="props.active ? '~/assets/svg/tabbar-Order-1.svg' : '~/assets/svg/tabbar-Order.svg'"
            alt=""
          >
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'clffffff' : 'cl868D9A'"
        >订单</span>
      </van-tabbar-item>
      <van-tabbar-item class="fs20">
        <template #icon="props">
          <img
            class="wh04"
            :src="props.active ? '~/assets/svg/tabbar-advertising-1.svg' : '~/assets/svg/tabbar-advertising.svg'"
            alt=""
          >
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'clffffff' : 'cl868D9A'"
        >广告</span>
      </van-tabbar-item>
      <van-tabbar-item class="fs20">
        <template #icon="props">
          <img
            class="wh04"
            :src="props.active ? '~/assets/svg/tabbar-mine-1.svg' : '~/assets/svg/tabbar-mine.svg'"
            alt=""
          >
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'clffffff' : 'cl868D9A'"
        >我的</span>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      pageActive: 0,
      routerName: "", //导航路由
    };
  },
  computed: {
    ...mapState(['locale', 'token', 'orderTakingState'])
  },
  watch: {
    '$route.path': {
      handler: function (newVal, oldVal) {
        if (newVal == `/${this.$store.state.locale}/Trade` || newVal == `/${this.$store.state.locale}/Trade/`) {
          this.$store.commit("SET_C2C_PAGEACTIVE", 0);
          this.pageActive = 0
        } else if (newVal == `/${this.$store.state.locale}/Trade/C2C/Order` || newVal == `/${this.$store.state.locale}/Trade/C2C/Order/`) {
          this.$store.commit("SET_C2C_PAGEACTIVE", 1);
          this.pageActive = 1
        } else if (newVal == `/${this.$store.state.locale}/Trade/C2C/ADList` || newVal == `/${this.$store.state.locale}/Trade/C2C/ADList/`) {
          this.$store.commit("SET_C2C_PAGEACTIVE", 2);
          this.pageActive = 2
        } else if (newVal == `/${this.$store.state.locale}/Trade/C2C/My` || newVal == `/${this.$store.state.locale}/Trade/C2C/My/`) {
          this.$store.commit("SET_C2C_PAGEACTIVE", 3);
          this.pageActive = 3
        }
      },
      immediate: true
    },
  },
  mounted () {
    this.$nextTick(async () => {
    });
  },
  methods: {
    tabbarChange (value) {
      this.$store.commit("SET_C2C_PAGEACTIVE", value);
      this.pageActive = value;
      switch (value) {
        case 0:
          this.$router.push(`/${this.$store.state.locale}/Trade`);
          break;
        case 1:
          this.$router.push(`/${this.$store.state.locale}/Trade/C2C/Order`);
          break;
        case 2:
          this.$router.push(`/${this.$store.state.locale}/Trade/C2C/ADList`);
          break;
        case 3:
          this.$router.push(`/${this.$store.state.locale}/Trade/C2C/My`);
          break;
        default:
          console.log("导航错误");
      }
    },

  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.c2c-coinpool-wap {
  .c2c-coinpool-wap-Content {
    padding-bottom: 0.98rem;
  }

  .c2c-coinpool-wap-Tabbar {
    height: 0.98rem;

    &::after {
      border-width: 0;
    }

    /deep/ .van-tabbar-item--active {
      .van-tabbar-item__icon {
        .van-icon {
          color: $co2baf88;
        }
      }

      .van-tabbar-item__text {
        color: $co2baf88;
      }
    }

    /deep/ .van-tabbar-item {
      .van-tabbar-item__icon {
        .van-icon {
          font-size: 0.36rem;
          margin-bottom: 0.05rem;
        }
      }
    }
  }
}
</style>