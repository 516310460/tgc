<template>
  <div class="RAndWRecord">
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
        <span class="fs32 font-bold clffffff">认购</span>
      </template>
    </van-nav-bar>

    <div class="bk191D24 relative t-092 w-full mt-3">
      <van-tabs
        class="transparent"
        v-model="active"
        @click="onClick"
      >
        <van-tab
          v-for="(item, index) in typeList"
          :key="index"
        >
          <template #title>
            <div class="fs28">
              <p>{{item.name}}</p>
            </div>
          </template>

          <div class="bk191D24">
            <van-pull-refresh
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

              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                class="w-full h-full"
              >
                <template #finished>
                  <div class="fs22">
                    没有更多了
                  </div>
                </template>
                <template #loading>
                  <div class="fs22 flex items-center justify-center">
                    <van-loading color="#02AD8F" />
                    <span class="ml-1">加载中...</span>
                  </div>
                </template>

                <div class="pt0025">
                  <ul
                    v-if="active == 0"
                    class="mt-1 px-1"
                  >
                    <li
                      v-for="(item, index) in nodeListData"
                      :key="index"
                      class="cl868D9A bk21252F rounded-sm my-1 p-1"
                    >
                      <!-- <nuxt-link :to="`/${locale}/Home/NodeApplication/RAndWRecord/Details/123123?type=${active}`"> -->
                      <div class="flex items-center justify-between pb-075 border-b bc-487DC6">
                        <div class="clffffff flex items-center">
                          <span class="cl02AD8F fs24 font-black">| </span>
                          <span class="ml-075">{{item.pnumber}}</span>
                        </div>
                      </div>
                      <div class="flex items-center justify-between pt-1">
                        <div>
                          <div class="fs26">
                            <span>认购份额：</span>
                            <span class="clffffff">{{item.quantity}}TGC</span>
                          </div>
                          <div class="fs26">
                            <span>认&nbsp; 购&nbsp; 价：</span>
                            <span class="clffffff">{{item.price}}USDT</span>
                          </div>
                          <div class="fs26">
                            <span>认购名额：</span>
                            <span class="clffffff">{{item.quota}}人</span>
                          </div>
                          <div class="fs26">
                            <span>认购总额：</span>
                            <span class="clffffff">{{item.quantity * item.price}}USDT</span>
                          </div>
                        </div>
                        <div
                          @click="item.state == 1 ? (ReadShow = true, currentItem = item) : ''"
                          :class="item.state == 1 ? 'bk02AD8F' : 'bk2F3441'"
                          class="button button-2xl fs26 clffffff"
                        >
                          立即认购
                        </div>
                      </div>
                      <!-- </nuxt-link> -->
                    </li>
                  </ul>
                  <ul
                    v-if="active == 1"
                    class="mt-1 px-1"
                  >
                    <li
                      v-for="(item, index) in nodeListByUserData"
                      :key="index"
                      class="cl868D9A bk21252F rounded-sm my-1 p-1"
                    >
                      <p class="cl02AD8F font-bold fs28">{{item.pnumber}}</p>
                      <div class="flex items-center justify-between clffffff">
                        <span class="fs28">USDT</span>
                        <span class="fs28 font-bold">{{item.quantity * item.price}}USDT</span>
                      </div>
                      <div class="flex items-center justify-between cl868D9A">
                        <span class="fs24">{{item.createTime}}</span>
                        <span class="fs24 font-bold cl02AD8F">
                          <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
                          <span class="ml-075">成功</span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

              </van-list>

            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 确定弹窗 -->
    <van-popup
      class="bk2E3743 rounded-sm w-3/4"
      v-model="ReadShow"
    >
      <div class="fs28 cl9FA9C0 m-1 text-center">
        确定将认购该矿机？
      </div>
      <div class="pb-1 text-center cl02AD8F w-full px-4">
        <div class="flex items-center fs26 leading-2 w-full">
          <span>认购份额：</span>
          <span>{{currentItem.quantity}}USDT</span>
        </div>
        <div class="flex items-center fs26 w-full">
          <span>认购价：</span>
          <span>{{currentItem.price}}GHS</span>
        </div>
        <div class="flex items-center fs26 w-full">
          <span>认购总额：</span>
          <span>{{currentItem.quantity * currentItem.price}}USDT</span>
        </div>

        <van-field
          v-model="payPassword"
          class="input-label input-label-select fs26 bk191D24-05 rounded-sm shadow-lg p-1 mt-1 mx-auto"
          center
          type="password"
          placeholder="请输入支付密码"
        >
        </van-field>
      </div>
      <div class="flex items-center my-1 px-1 space-x-2">
        <div
          @click="ReadShow = false"
          class="button button-xl fs32 bk2E3743 border bc-co535E6D clffffff flex-1"
        >
          取消
        </div>
        <div
          @click="nodeSubscription"
          class="button button-xl fs32 bk02AD8F clffffff flex-1"
        >
          确定
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      ReadShow: false,
      currentItem: {
        id: "",
        quantity: "",
        price: "",
      },
      value: '',
      active: 0,
      paymentMethodIndex: 0,//收款方式索引
      payPassword: '',
      typeList: [
        {
          name: '节点认购',
        },
        {
          name: '我的认购',
        }
      ],
      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,
      nodeListData: [],
      nodeListByUserData: [],
    };
  },
  computed: {
    ...mapState(['locale'])
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.nodeList()
      this.nodeListByUser()
    },
    // 认购节点
    nodeSubscription () {
      let params = {
        nodeId: this.currentItem.id,
        payPassword: this.$md5(this.payPassword)
      }
      this.$api.node.nodeSubscription(params).then(res => {
        if (res.type == "success") {
          this.init()
          this.$Toast("认购成功")
          this.ReadShow = false
        }
      })
    },
    // 获取用户认购的节点
    nodeListByUser () {
      this.$api.node.nodeListByUser().then(res => {
        if (res.type == "success") {
          this.nodeListByUserData = res.data
        }
      })
    },
    // 获取认购节点
    nodeList () {
      this.$api.node.nodeList().then(res => {
        if (res.type == "success") {
          this.nodeListData = res.data
        }
      })
    },
    onClick (name, title) {
      // this.$Toast(title);
      // console.log(name, title)
    },
    // 下拉刷新
    onRefresh () {
      this.init()
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    // 加载更多
    onLoad () {
      this.finished = true
    }
  }
};
</script>
<style lang="scss">
.RAndWRecord {
  .coinpool-wap-Content {
    padding-bottom: 0.98rem;
  }
  .van-search__content {
    background-color: #191d24;
    .van-icon {
      color: #fff;
    }
  }
  .van-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 0.92rem;
      width: 100%;
      z-index: 30;
      background: $co191D24;
      border-bottom: 1px solid $co487DC6;
    }
  }
}
</style>
