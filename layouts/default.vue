<template>
  <div class="coinpool-wap">
    <img
      class="w-full h-full absolute top-0"
      src="~/assets/image/home/bg.png"
      alt=""
    >
    <nuxt
      :class="{ 'coinpool-wap-Content': tabbarState }"
      class="relative"
      keep-alive
      v-if="$route.meta.keepAlive"
    />
    <nuxt
      class="relative"
      :class="{ 'coinpool-wap-Content': tabbarState }"
      v-else
    />

    <van-tabbar
      v-if="tabbarState"
      class="coinpool-wap-Tabbar bk21252F flex items-center justify-between px-1 fixed w-full z-10 transparent"
      @change="tabbarChange(pageActive)"
      v-model="pageActive"
    >
      <van-tabbar-item class="fs20">
        <template #icon="props">
          <!-- <i
            :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
            class="iconfont icon-shouye fs40"
          ></i> -->
          <img
            v-show="props.active"
            class="wh04"
            src="~/assets/img/icon_shouye2.png"
            alt=""
          >
          <img
            v-show="!props.active"
            class="wh04"
            src="~/assets/img/icon_shouye1.png"
            alt=""
          >
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
        >首页</span>
      </van-tabbar-item>
      <van-tabbar-item class="fs20">
        <template #icon="props">
          <!-- <i
            :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
            class="iconfont icon-ta fs40"
          ></i> -->
          <img
            v-show="props.active"
            class="wh04"
            src="~/assets/img/icon_ta2.png"
            alt=""
          >
          <img
            v-show="!props.active"
            class="wh04"
            src="~/assets/img/icon_ta1.png"
            alt=""
          >
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
        >闯关</span>
      </van-tabbar-item>
      <van-tabbar-item class="fs20">
        <template #icon="props">
          <!-- <i
            :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
            class="iconfont icon-jiaoyi fs40"
          ></i> -->
          <img
            v-show="props.active"
            class="wh04"
            src="~/assets/img/icon_jiaoyi2.png"
            alt=""
          >
          <img
            v-show="!props.active"
            class="wh04"
            src="~/assets/img/icon_jiaoyi1.png"
            alt=""
          >
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
        >交易</span>
      </van-tabbar-item>
      <!-- <van-tabbar-item class="fs20">
        <template #icon="props">
          <img class="wh04" :src="props.active ? '~/assets/svg/contract-1.svg' : '~/assets/svg/contract.svg'" alt="">
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
          >合约</span
        >
      </van-tabbar-item> -->
      <van-tabbar-item class="fs20">
        <template #icon="props">
          <!-- <i
            :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
            class="iconfont icon-wakuang fs40"
          ></i> -->
          <img
            v-show="props.active"
            class="wh04"
            src="~/assets/img/icon_kuanggong2.png"
            alt=""
          >
          <img
            v-show="!props.active"
            class="wh04"
            src="~/assets/img/icon_kuanggong1.png"
            alt=""
          >
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
        >矿工</span>
      </van-tabbar-item>
      <van-tabbar-item class="fs20">
        <template #icon="props">
          <!-- <i
            :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
            class="iconfont icon-wode fs40"
          ></i> -->
          <img
            v-show="props.active"
            class="wh04"
            src="~/assets/img/icon_me2.png"
            alt=""
          >
          <img
            v-show="!props.active"
            class="wh04"
            src="~/assets/img/icon_me1.png"
            alt=""
          >
        </template>
        <span
          slot-scope="props"
          :class="props.active ? 'cl02AD8F' : 'cl3A53B8'"
        >资产</span>
      </van-tabbar-item>
    </van-tabbar>

    <audio
      src="/audio/16sucai_201604121537.wav"
      id="myaudio"
      controls="controls"
      loop="true"
      hidden="true"
    ></audio>
  </div>
</template>

<style scoped rel="stylesheet/scss" lang="scss">
.coinpool-wap {
  .coinpool-wap-Content {
    padding-bottom: 0.98rem;
  }

  .coinpool-wap-Tabbar {
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

.xbitFeeTipsDialog {
  &.inputFocusState {
    top: 35% !important;
  }
  /deep/ .TipsDialog {
    .TipsDialog-Content {
      .TipsDialog-Content-TransferTitle {
        padding: 0 0.22rem;
        margin-bottom: 0.2rem;
      }

      .TipsDialog-Content-Transfer {
        margin-bottom: 0.2rem;
        padding: 0 0.22rem;
        border-radius: 0.12rem;
        height: 1.6rem;

        .TipsDialog-Content-Transfer-Left {
          height: 100%;

          .TipsDialog-Content-Transfer-Left-Top {
            height: 0.8rem;
            line-height: 0.8rem;

            &:before {
              content: '';
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 100%;
              background: $co5fe9ce;
              display: inline-block;
              vertical-align: middle;
              margin: 0 0.1rem;
            }
          }

          .TipsDialog-Content-Transfer-Left-Bottom {
            height: 0.8rem;
            line-height: 0.8rem;

            &:before {
              content: '';
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 100%;
              background: $co0084ff;
              display: inline-block;
              vertical-align: middle;
              margin: 0 0.1rem;
            }
          }
        }

        .TipsDialog-Content-Transfer-Right {
          height: 1.6rem;
          line-height: 1.6rem;
        }
      }

      .TipsDialog-Content-TransferNum {
        position: relative;
        overflow: hidden;

        .van-cell-group {
          background: transparent;

          .van-cell {
            padding: 0;
            background: transparent;

            .van-cell__value {
              color: $codbe4fe !important;
              .van-field__body {
                color: $codbe4fe !important;
                input {
                  font-size: 0.32rem;
                  color: $codbe4fe;
                }
              }
            }
          }
        }

        .TipsDialog-Content-TransferNum-coinName {
          padding-top: 0.01rem;

          span.value {
            position: relative;
            top: 0.02rem;
          }

          span.total {
            display: inline-block;
            padding-left: 5px;
            border-left: 1px solid #6272a1;
          }
        }

        .TipsDialog-Content-TransferNum-btnAll {
          position: relative;
          top: 0.07rem;
          border-left: 1px solid $co6272a1;
        }
      }

      .TipsDialog-Content-autoTransfer {
        margin-top: 0.2rem;

        .TipsDialog-Content-autoTransfer-Content {
          padding: 0.2rem 0;

          .van-switch {
            .van-switch__node {
              background: $co93a4da;
            }
          }
        }
      }
    }
  }
}
</style>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      pageActive: 0,
      routerName: "", //导航路由
      timeout: 3000, //60ms
      timeoutObj: null,

      /*
       * 保证金划转数据
       * */
      TransferState: false, //划转弹窗状态
      TransferNum: "", //划转数量
      autoTransfer: false, //是否开启自动划转
      TransferData: {
        From: {
          coinId: 1, //币种id
          name: "USDT", //币种名称
          availableBalance: 0 //可用余额
        },
        Reach: {
          coinId: 1, //币种id
          name: "BUSD", //币种名称
          availableBalance: 0 //可用余额
        }
      },
      TransferNumTipsState: 0, //划转数量状态 1.划转不能为空或0 2.划转不能大于可用余额
      TransferCoinList: [], //加载支持划转到BUsd的币种
      isShowText: false, //是否显示自动划转
      infoNum: "",

      /*
       * 划转数据
       * */
      TransferNum2: "",
      //显示划转弹窗
      TransferState2: false,
      //账户类型数组
      AccountTypeArr: [],
      //切换数组
      SwitchItemArr: [],
      //切换的对象
      SwitchItemObj: {
        form: "",
        to: ""
      },
      //选中的类型
      activeType: 0,
      //法币账户资产
      OTCBalance: "",
      //币币账户资产
      CoinBalance: "",
      //算力账户资产
      HashRateBalance: "",
      //当前显示的余额
      currentShowBalance: "",
      coinTeam: "BTC-USDT",
      inputFocusState: false //是否获取焦点
    };
  },
  computed: {
    ...mapState(['locale', 'token', 'tabbarState'])
  },
  watch: {
    '$route.path': {
      handler: function (newVal, oldVal) {
        if (newVal == `/${this.$store.state.locale}` || newVal == `/${this.$store.state.locale}/`) {
          this.$store.commit("SET_PAGEACTIVE", 0);
          this.pageActive = 0
          this.$store.commit("SET_TABBARSTATE", true);
        } else if (newVal == `/${this.$store.state.locale}/CoinMarket` || newVal == `/${this.$store.state.locale}/CoinMarket/`) {
          this.$store.commit("SET_PAGEACTIVE", 1);
          this.pageActive = 1
          this.$store.commit("SET_TABBARSTATE", true);
        } else if (newVal == `/${this.$store.state.locale}/HashRate` || newVal == `/${this.$store.state.locale}/HashRate/`) {
          this.$store.commit("SET_PAGEACTIVE", 2);
          this.pageActive = 2
          this.$store.commit("SET_TABBARSTATE", true);
        } else if (newVal == `/${this.$store.state.locale}/Miner` || newVal == `/${this.$store.state.locale}/Miner/`) {
          this.$store.commit("SET_PAGEACTIVE", 3);
          this.pageActive = 3
          this.$store.commit("SET_TABBARSTATE", true);
        } else if (newVal == `/${this.$store.state.locale}/Assets` || newVal == `/${this.$store.state.locale}/Assets/`) {
          this.$store.commit("SET_PAGEACTIVE", 4);
          this.pageActive = 4
          this.$store.commit("SET_TABBARSTATE", true);
        } else {
          this.$store.commit("SET_TABBARSTATE", false);
        }
      },
      immediate: true
    },
  },
  mounted () {
    this.$nextTick(async () => {
      this.init();

      // APP
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady(), false);
      }

      // 判断token是否存在 存在就去获取用户信息
      if (
        !location.pathname.includes("/activity/BTChalved/enter") &&
        !location.pathname.includes("/activity/BTChalved/waitAward") &&
        this.$store.state.token
      ) {
        let getAccountInfo = await this.$api.personCenter.getAccountInfo();
        if (getAccountInfo.data.code == 200) {
          //设置用户信息
          this.$store.commit("SET_USERINFO", getAccountInfo.data.data);
        }
      }

      // 建立websocket连接..
      this.$bus.on("initWebsocket", () => {
        this.init();
      });

      // 取消websocket连接..
      this.$bus.on("cancelWebsocket", () => {
        this.WSockets.close();
      });

      // 获得消息..
      this.$bus.on("changeInfoNum", () => {
        this.$store.state.token && this.getCountNotRead();
      });

      // 清空消息..
      this.$bus.on("clearInfoNum", () => {
        this.infoNum = "";
        this.$store.commit("SET_ALLINFONUM", 0);
      });
    });
  },
  methods: {
    init () {
      // 获取Hbuilder的版本号
      this.getNativeVersion()
      //禁止在ios中点击缩放
      document.documentElement.addEventListener(
        "touchstart",
        function (event) {
          if (event.touches.length > 1) {
            event.preventDefault();
          }
        },
        false
      );
      var lastTouchEnd = 0;
      document.documentElement.addEventListener(
        "touchend",
        function (event) {
          var now = Date.now();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },
        false
      );
      document.addEventListener("gesturestart", function (event) {
        event.preventDefault();
      });
      this.routerName = this.$route.path.split("/")[2];
      // 连接socket
      if (this.token) {
        this.imWebsocket();
      }
    },

    // H5 plus事件处理（APP）
    plusReady () {
      // 设置系统状态栏背景为红色
      var type = plus.os.name;
      if (type == "iOS") {
        plus.navigator.setStatusBarBackground("#191D24");
        plus.navigator.setStatusBarStyle('light');
      } else {
        plus.navigator.setStatusBarBackground("#191D24");
        plus.navigator.setStatusBarStyle('light');
      }
    },

    // 获取版本号（APP）
    getNativeVersion () {
      let that = this;
      document.addEventListener("plusready", function () {
        plus.runtime.getProperty(plus.runtime.appid, function (inf) {
          that.checkupdate(inf.version)  /*  该函数是自己定义，用来获取后台返回的服务器端项目的版本号 */
        });
      });
    },

    //获取后端返回的服务器端的版本号
    checkupdate (version) {
      this.$api.main.getSysInfo().then((res) => {
        if (res.type == "success") {
          if (res.data.androidVersion != version) {   /* 将后台返回的版本号和自己获取的hbuilder进行对比，不相等时说明版本不一致，弹出提示框，提示用户进行升级 */
            that.$dialog.alert({
              title: '提示',
              message: '发现新版本，是否确定升级',
            }).then(() => {
              plus.nativeUI.toast("正在准备环境，请稍后！");
              if (plus.os.name == "iOS") {
                plus.runtime.openURL(res.data.iosDownload);
              } else {
                let dtask = plus.downloader.createDownload(res.data.androidDownload, {}, function (d, status) {
                  if (status == 200) {
                    let path = d.filename;   /* 下载apk */
                    plus.runtime.install(path);   /* 自动安装apk文件 */
                  } else {
                    plus.nativeUI.alert('版本更新失败:' + status);
                  }
                });
                dtask.start();
              }
            })
          }
        }
      })
    },

    //获得所有未读消息数量
    getCountNotRead () {
      // this.$api.wsBuy.countNotRead().then(res => {
      //   if (res.data.code === 200) {
      //     this.infoNum = res.data.data;
      //     this.$store.commit("SET_ALLINFONUM", this.infoNum);
      //   }
      // });
    },

    //建立websocket连接, 实时推送消息
    imWebsocket () {
      this.WSockets = new WebSocket(
        `${this.$im.setting.wsurl}?token=${this.token}&namespace=login_regist`
      );
      this.WSockets.onopen = () => {
        this.WSstart();
      };
      this.WSockets.onmessage = event => {
        this.WSreset(JSON.parse(event.data));
      };
      this.WSockets.onclose = () => {
        console.log("连接已关闭...");
      };
    },

    WSstart () {
      this.timeoutObj = setTimeout(() => {
        this.WSockets.send('{"ping":' + new Date().getTime() + "}");
      }, this.timeout);
    },

    WSreset (data) {
      if (data) {
        if (data.id) {
          let chatData = this.$store.state.chatData;
          let newArray = [];
          if (chatData.length) {
            for (const key in chatData) {
              if (chatData.hasOwnProperty(key)) {
                if (chatData[key].orderId == this.orderId) {
                  chatData[key].total++;
                } else {
                  newArray.push({
                    orderId: chatData[key].orderId,
                    total: chatData[key].total
                  });
                }
              }
            }
          } else {
            chatData = [
              {
                orderId: data.id,
                total: 1
              }
            ];
          }

          this.$store.commit("SET_CHATDATA", chatData);
          //收到数据通知全局通知新消息
          this.$bus.emit("chatData-Update");
        }

        if (!data.pong) {
          this.$store.state.token && this.getCountNotRead();
        }
        let that = this;
        if (data.msgCenterExtendData && data.msgCenterExtendData.toData) {
          if (
            data.orderStatus == 1 &&
            data.msgCenterExtendData.toData.code == "msg_fixprice_006"
          ) {
            setTimeout(() => {
              console.log("我是下单了");
              that.autoPlay();
            }, 2000);
            console.log(JSON.stringify(data));
          }
        }
      }
      clearTimeout(this.timeoutObj);
      this.WSstart();
    },
    autoPlay () {
      var myAuto = document.getElementById("myaudio");
      myAuto.play();
      var t1 = setInterval(function () {
        myAuto.muted = false;
        myAuto.play();
        myAuto.loop = false;
        myAuto.addEventListener(
          "ended",
          function () {
            console.log("over");
            window.clearInterval(t1);
            // myAuto.pause();
          },
          false
        );
      }, 1000);
    },

    tabbarChange (value) {
      this.$store.commit("SET_PAGEACTIVE", value);
      switch (value) {
        case 0:
          this.$router.push(`/${this.$store.state.locale}`);
          break;
        case 1:
          this.$router.push(`/${this.$store.state.locale}/CoinMarket`);
          break;
        case 2:
          this.$router.push(`/${this.$store.state.locale}/HashRate`);
          break;
        case 3:
          this.$router.push(`/${this.$store.state.locale}/Miner`);
          break;
        case 4:
          this.$router.push(`/${this.$store.state.locale}/Assets`);
          break;
        default:
          console.log("导航错误");
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.type-wrap {
  li {
    width: 50%;
    padding: 0.3rem 0 0.2rem;
    border-bottom: 1px solid transparent;
  }

  li.active {
    color: #17bc95 !important;
    border-bottom: 1px solid currentColor;
  }
}
</style>
