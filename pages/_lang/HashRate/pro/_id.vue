<template>
  <div
    id="app"
    class="full HashRate-Pro"
    :class="{ day: background == 'day' }"
    ref="app"
  >
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
        <span class="fs32 font-bold clffffff">{{ symblefrom }}/{{ symbleto }}</span>
      </template>
    </van-nav-bar>

    <van-row class="bk191D24 pb-1">
      <van-col
        class=""
        span="13"
        offset="1"
      >
        <van-col
          class="fs48"
          span="24"
        >
          <span
            class="textNum"
            :class="countData.percent >= 0 ? 'buy' : 'sale'"
          >{{ countData.close || "" }}</span>
        </van-col>
        <van-col
          class="fs24"
          span="24"
        >
          <span class="cl6272a1">≈ {{ countData.cnyClose || "" }} CNY</span>
          <span
            class="textNum"
            :class="countData.percent >= 0 ? 'buy' : 'sale'"
          >&nbsp;&nbsp;{{ countData.percent }}%</span>
        </van-col>
      </van-col>
      <van-col
        class="fs24 cl6272a1"
        span="10"
      >
        <van-col
          class="heightAuto newlines"
          span="24"
        >
          <van-col span="10">{{ $t("HashRate.pro.header.title6") }}:</van-col>
          <van-col
            class="cldbe4fe"
            span="13"
            offset="1"
          >{{
            countData.vol || ""
          }}</van-col>
        </van-col>
        <van-col
          class="heightAuto newlines"
          span="24"
        >
          <van-col span="10">{{ $t("HashRate.pro.header.title3") }}:</van-col>
          <van-col
            class="cldbe4fe"
            span="13"
            offset="1"
          >{{
            countData.high || ""
          }}</van-col>
        </van-col>
        <van-col
          class="heightAuto newlines"
          span="24"
        >
          <van-col span="10">{{ $t("HashRate.pro.header.title4") }}:</van-col>
          <van-col
            class="cldbe4fe"
            span="13"
            offset="1"
          >{{
            countData.low || ""
          }}</van-col>
        </van-col>
      </van-col>
    </van-row>
    <div class="buybit-flex">
      <van-tabs class="transparent">
        <van-tab title="图表">
          <no-ssr>
            <KlineIndex
              :klineParams="klineParams"
              :klineData="klineData"
              ref="callMethods"
              @refreshKlineData="refreshKlineData"
            ></KlineIndex>
          </no-ssr>
        </van-tab>
        <van-tab title="简介">
          <div class="px-1 clffffff fs28">
            <p class="fs32 font-semibold mt-1">ETH 以太坊</p>
            <div class="flex items-center justify-between my-1">
              <span class="cl868D9A">发行时间</span>
              <span>2014-07-24 00:00:00</span>
            </div>
            <div class="flex items-center justify-between my-1">
              <span class="cl868D9A">发行总量</span>
              <span>21000,000</span>
            </div>
            <div class="flex items-center justify-between my-1">
              <span class="cl868D9A">流通总量</span>
              <span>21000,000</span>
            </div>
            <div class="flex items-center justify-between my-1">
              <span class="cl868D9A">众筹价格</span>
              <span>99.00</span>
            </div>

            <div class="my-1 flex items-center justify-between cl868D9A">
              <div class="flex items-center">
                <img
                  class="w-1 h-1"
                  src="~/assets/svg/icon_book.svg"
                  alt=""
                >
                <span class="ml-075">白皮书</span>
              </div>
              <div class="flex items-center">
                <img
                  class="w-1 h-1"
                  src="~/assets/svg/icon_Officialwebsite.svg"
                  alt=""
                >
                <span class="ml-075">官网</span>
              </div>
              <div class="flex items-center">
                <img
                  class="w-1 h-1"
                  src="~/assets/svg/icon_Inquire.svg"
                  alt=""
                >
                <span class="ml-075">区块查询</span>
              </div>
            </div>

            <div class="my-1 fs24 cl868D9A">
              以太坊（Ethereum）是有图灵完备的智能合约功能的公有区块链，Vitalik Buterin 是其创始人。以太坊通过建立终极的抽象的基础层 — 内置有图灵完备编程语言的区块链，使得任何人都能够创建合约和去中心化应用并在其中设立他们自由定义的所有权规则、交易方式和状态转换函数。
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!-- 最新成交 -->
      <div class="latestDeal">
        <div class="latestDeal-list-btn fs28 bk21252F clffffff text-center fixed bottom-0 z-10 w-full">
          <div class="flex items-center justify-between space-x-1 px-1">
            <div
              class="num text-center flex-1"
              :class="'buy'"
            >
              <nuxt-link
                v-if="findConfigsData.isBuyTransaction"
                :to="`/${locale}/HashRate?type=1`"
              >
                <div>
                  {{ $t("HashRate.pro.limit.buy") }}
                </div>
              </nuxt-link>
              <div v-else>{{ $t("HashRate.pro.limit.buy") }}</div>
            </div>
            <div
              class="num text-center flex-1"
              :class="'sale'"
            >
              <nuxt-link
                v-if="findConfigsData.isSaleTransaction"
                :to="`/${locale}/HashRate?type=2`"
              >
                <div>
                  {{ $t("HashRate.pro.limit.sell") }}
                </div>
              </nuxt-link>
              <div v-else>{{ $t("HashRate.pro.limit.sell") }}</div>
            </div>
            <div>
              <van-icon
                class="fs34"
                name="star"
              />
              <p class="fs24 line-h-1">添加自选</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import data from "@/assets/data";

export default {
  name: "pro",
  head () {
    return {
      title: this.$t("HashRate.pro.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("HashRate.Home.headTitle")
        },
        {
          name: "keywords",
          content: this.$t("HashRate.Home.headTitle")
        }
      ]
    };
  },
  components: {
  },
  // computed: {
  //   ordersymble: function () {
  //     if (!this.$route.params.id) return '';
  //     return this.$route.params.id.replace('_', '/');
  //   },
  //   symbleParameArray: function () {
  //     if (!this.$route.params.id) return null
  //     const ary = this.$route.params.id.split('_')
  //     return ary.length != 2 ? null : ary
  //   },
  //   symbleParameString: function () {
  //     if (!this.$route.params.id) return ''
  //     return this.$route.params.id.replace('_', '')
  //   },
  //   //获取产品
  //   symblefrom: function () {
  //     return this.symbleParameArray ? this.symbleParameArray[0].toUpperCase() : '--'
  //   },
  //   //获取货币
  //   symbleto: function () {
  //     return this.symbleParameArray ? this.symbleParameArray[1].toUpperCase() : '--'
  //   },
  //   sub: function () {
  //     return `market.${this.symbleParameString}.detail`
  //   }
  // },
  data () {
    return {
      // /*卸载轮询订阅*/
      // sockettimer: [
      //   this.$socket.url.quotation_marketing_depth_get,
      //   this.$socket.url.quotation_daily_getall,
      //   this.$socket.url.quotation_trading_details_get,
      //   this.$socket.url.quotation_daily_get,
      //   this.$socket.url.quotation_kline_get,
      //   this.$socket.url.trading_order_search
      // ],
      // /*卸载socket订阅*/
      // sockettype: [
      //   this.$socket.type.quotation_marketing_depth_get,
      //   this.$socket.type.quotation_daily_getall,
      //   this.$socket.type.quotation_trading_details_get,
      //   this.$socket.type.quotation_daily_get,
      //   this.$socket.type.quotation_kline_get
      // ],
      klineParams: {
        width: 750,
        height: 500,
        theme: "dark",
        language: "zh-cn",
        ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
        symbol: "BTC",
        symbolName: "BTC/USD",
        intervalTime: 5000,
        depthWidth: 50,
        count: 1,
      },
      klineData: {},

      dcs: {},
      background: false,
      orderType: 1,
      titleCurrency: [],
      currencyMore: [],
      activeStatus: "-1",
      noDataText: false,
      searchtitle: false,
      moreStatus: false,
      storeCion: "", //币种
      searchStr: "",
      //获取用户交易对信息
      tradingDealTo: {
        canuseamount: 0
      },
      tradingDealFrom: {
        canuseamount: 0
      },
      //设置买入卖出价
      entrustBuyRate: "",
      entrustSaleRate: "",
      entrustBuyNum: "",
      entrustSaleNum: "",
      dailyDetail: {},
      title: "",
      fullWidth: "", //屏幕分辨率
      entrustIndex: 1, //盘口和深度标题索引
      hackReset: true,
      isUnlock: false, //是否解锁

      /*
       * 头部
       */
      count: [], //24小时累计
      countData: [], //24小时累计
      ws: null, //websocket对象
      timeInterval: null, //对象
      timeOutInterval: null, //对象
      lockReconnect: false, //避免重复连接
      currentState: true,

      /*
       * 深度
       */
      initBuyState: false, //买单是否初始化了
      initSaleState: false, //卖单是否初始化了
      dotTypeLoading: true,
      entrustsaleFirst: false,
      entrustbuyFirst: false,
      activelisttab: 1,
      dotList: [
        {
          key: 1,
          value: ""
        },
        {
          key: 2,
          value: "2"
        },
        {
          key: 3,
          value: "3"
        },
        {
          key: 4,
          value: "4"
        },
        {
          key: 5,
          value: "5"
        }
      ],
      dotType: 1,
      dotValue: "", //深度切换时需要的值
      lastdotType: 8,
      isshowDot: false,
      buyData: [], //深度买盘数据
      sellData: [], //深度卖盘数据
      newData: {
        open: 0, //开盘价
        platform: 1, //平台
        isBuy: false, //是否买卖
        price: 0, //价格
        priceCNY: 0 //人民币价格
      }, //最新数据
      isLoading: true, //买卖深度数据是否有数据
      findConfigsData: {
        //交易输入配置
        minTradeNum: 0, //交易对最小交易量
        maxTradeNum: 0, //交易对最大交易量
        valuation: 0, //计价币最大数位小数位数
        benchmark: 0, //基准币最大小数位
        rate: 0, //交易对手续百分比
        isBuyTransaction: false, //限价买是否可购买
        isSaleTransaction: false //限价卖是否可购买
      },

      /*
       * 盘口
       */
      //交易明细
      // tradingDetail: {
      //   'new': [],
      //   'own': []
      // },
      // orderType: 'new',
      loading: true,
      detailsub: `market.${this.symbleParameString}.detail`,
      sub: `market.${this.symbleParameString}.trade.detail`,
      pagehidden: false,
      // title: 'BuyBit | ' + '币买-数字资产场外交易平台',
      RealTimeTrade: null, //实时交易对象
      RealTimeTradeData: [], //实时交易数据
      isLoading: true, //实时交易数据是否有数据
      open: 0, //开盘价

      //监听的数据值
      ordersymble: "",
      symbleParameArray: "",
      symbleParameString: "",
      //获取产品
      symblefrom: "",
      //获取货币
      symbleto: "",
      sub: "",

      oldTimestamp: 0, //之前时间戳
      timestamp: 0, //当前时间戳

      background: "",
      otcUrl: "", //otc访问地址
      hashRateUrl: "", //算力交易地址
      token: "",
      locale: "",
      active: 2
    };
  },
  async asyncData ({ store, params, redirect, error }) {
    // const symble = params.id.replace('_', '')
    // const daily = await store.dispatch('quotation_daily_get', { symble: symble })
    // if (daily.code == 0) {
    //   // redirect('/')
    // }
    // return {
    //   dailyDetail: daily.data
    // }
  },
  methods: {
    requestData () {              //方法名任意取
      /*测试用的  请求服务器请用下面的*/
      this.klineData = data;
      if (this.$refs.callMethods.kline && this.$refs.callMethods.kline.chartMgr) {
        this.$refs.callMethods.kline.chartMgr.getChart().updateDataAndDisplay(data.data.lines);
        this.$refs.callMethods.resize(document.body.clientWidth, document.body.clientHeight / 1.5);
      }


      // this.$axios.request({
      //   url: "xxxxx",             //请求地址
      //   method: "POST"
      // }).then(ret => {
      //   this.klineData = ret.data;      // 把返回数据赋值到上面的 klineData,
      //   this.$refs.callMethods.kline.chartMgr.getChart().updateDataAndDisplay(ret.data.data.lines); //强制更改缓存中的lines值,防止显示不同步
      // });
    },
    refreshKlineData (option) {  //你点击页面上的周期会触发这个方法
      if (option === 900000) {   //如果时间等于15分钟
        this.requestData();
      } else if (option === 300000) {//如果5分钟
        console.log("5分钟" + option)
      } else {
        console.log("其他时间" + option) //其他时间
      }
    },
    init () {
      this.locale = this.$store.state.locale;
      this.token = this.$store.state.token;
      this.otcUrl = this.$store.state.otcUrl;
      this.hashRateUrl = this.$store.state.hashRateUrl;
      this.background = this.$store.state.background;
      if (this.$store.state.token) {
        //获取用户设置
        this.getAccountInfo();
      }
      this.getCoinTeamConfig();
      // 获取汇率
      this.getExchangeRate();
    },
    //获取交易配置
    getCoinTeamConfig () {
      let obj = `${this.symblefrom}-${this.symbleto}`;
      this.$api.HashRate.getCoinTeamConfig(obj).then(res => {
        if (res && res.status === 200) {
          //key:配置类型 value:配置内容;1:最小交易量,2:最大交易量,3:价格最大小数位,4:数量最大小数位,5:taker手续分百分比,6:maker手续分百分比,7:限价买是否可购买,8:限价卖是否出售,9:市价买是否可购买，10:市价卖是否可出售
          this.findConfigsData = {
            minTradeNum: res.data.data[1] || 0, //交易对最小交易量
            maxTradeNum: res.data.data[2] || 0, //交易对最大交易量
            valuation: res.data.data[3] || 0, //计价币最大数位小数位数
            benchmark: res.data.data[4] || 0, //基准币最大小数位
            rate: res.data.data[5] || 0, //交易对手续百分比
            isBuyTransaction: res.data.data[7], //限价买是否可购买
            isSaleTransaction: res.data.data[8] //限价卖是否可购买
          };
        }
      });
    },
    async initWebsocket () {
      //获取交易对配置
      this.ws = new WebSocket(
        this.$im.webSocketUrl + "/api/v1/buybit/power/ws/merge"
      );
      this.ws.onopen = () => {
        this.ws.send(
          JSON.stringify({ sub: "TopCount", coinTeam: "XBIT-USDT" })
        );
        this.ws.send(JSON.stringify({ sub: "Depth", coinTeam: "XBIT-USDT" }));
        this.ws.send(JSON.stringify({ sub: "Trade", coinTeam: "XBIT-USDT" }));
        if (this.$store.state.token) {
          this.ws.send(
            JSON.stringify({
              sub: "OrderChange",
              coinTeam: "XBIT-USDT",
              token: this.$store.state.token
            })
          );
        }
      };
      this.ws.onmessage = event => {
        let reader = new FileReader();
        let that = this;
        reader.readAsText(event.data, "utf-8");
        reader.onload = function (e) {
          that.handleData(e.target.result);
        };
      };
      this.ws.onclose = () => {
        console.log("close");
        this.reconnect();
      };
      this.ws.onerror = err => {
        console.log("error", err);
        this.reconnect();
      };
    },
    //短线重连
    reconnect () {
      if (this.lockReconnect || !this.currentState) return;
      this.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      clearInterval(this.timeOutInterval);
      this.timeOutInterval = setTimeout(() => {
        console.log("没连接上会一直重连，设置延迟避免请求过多");
        // this.init();
        // this.$bus.emit('reconnect');
        //重新加载子组件
        // this.$bus.on('reconnect', () => {
        this.hackReset = false;
        this.$nextTick(() => {
          this.hackReset = true;
        });
        // })
        this.initWebsocket();
        this.lockReconnect = false;
      }, 5000); //这里设置重连间隔(ms)
    },
    // 处理接收到的信息
    handleData (msg) {
      let data = JSON.parse(msg);
      if (data.sub == "TopCount") {
        // console.log('TopCount')
        this.onMessageTopCount(data);
      }
      if (data.sub == "Depth") {
        // console.log('Depth')
        //将深度数据传递
        // this.$bus.emit('DepthHashRateData', data)
        this.onMessageDepth(data);
      }
      if (data.sub == "Trade") {
        // console.log('Trade')
        //将实时成交数据传递
        // this.$bus.emit('TradeHashRateData', data)
        this.onMessageTrade(data);
      }
      if (data.sub == "OrderChange") {
        // console.log('OrderChange')
        //监听订单
        this.$bus.emit("HashRateOrderChange");
      }
    },
    async onMessageTopCount (data) {
      clearInterval(this.timeInterval);
      this.timeInterval = setInterval(() => {
        this.ws.send(
          JSON.stringify({
            ping: new Date().getTime()
          })
        );
      }, 5000);
      if (data.data) {
        let res = data.data;
        this.$nextTick(() => {
          this.$set(this.countData, "close", res.close);
          this.$set(this.countData, "cnyClose", res.cnyClose);
          this.$set(this.countData, "percent", res.percent);
          this.$set(this.countData, "high", res.high);
          this.$set(this.countData, "low", res.low);
          this.$set(this.countData, "vol", res.vol);
          //将最新实时信息发送给深度、实时、限价
          this.newData.isBuy = res.open <= res.close;
          this.newData.open = res.open;
          this.newData.price = res.close;
          this.newData.priceCNY = res.cnyClose;
          this.open = res.open;
        });
      }
    },

    //切换主题颜色
    changeTheme (state) {
      if (state) {
        this.background = "night";
        this.$store.commit("SET_BACKGROUND", "night");
      } else {
        this.background = "day";
        this.$store.commit("SET_BACKGROUND", "day");
      }
      this.$bus.emit("changeTheme");
    },
    //获取用户设置
    async getAccountInfo () {
      let [getAccountInfo] = await Promise.all([
        this.$api.personCenter.getAccountInfo()
      ]);
      // 是否绑定手机 和 是否设置资金密码
      if (
        getAccountInfo.data.data &&
        getAccountInfo.data.data.mobile &&
        getAccountInfo.data.data.capitalStatus
      ) {
        this.isUnlock = true;
      }
    },
    //获取分辨率
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth;
      // this.$refs.callMethods.redraw();
      this.$refs.callMethods.resize(document.body.clientWidth, document.body.clientHeight / 1.5);
    },
    //标题切换
    clickEntrustTitle (index) {
      this.entrustIndex = index;
    },
    // 获取汇率
    getExchangeRate () {
      let obj = {
        key: "USD_CNY"
      };
      this.$api.FixedPrice.getExchangeRate(obj).then(res => {
        if (res && res.data.code == 200) {
          if (Number(res.data.data)) {
            this.$bus.emit("ExchangeRate", Number(res.data.data));
          }
        }
      });
    },
    //设置买入价卖出价
    getEntrustRate (m) {
      this.entrustBuyRate = m.p;
      this.entrustSaleRate = m.p;
      this.entrustBuyNum = this.global_get_tofixed(m.alltotal, this.dcs.a);
      this.entrustSaleNum = this.global_get_tofixed(m.alltotal, this.dcs.a);
    },
    //设置订单类型
    setOrderType (num) {
      this.orderType = num;
    },
    async onMessageDepth (data) {
      if (data.data && data.data.length) {
        let res = data.data;
        let newBuyData = [];
        let newSellData = [];
        for (var i = res.length - 1; i >= 0; i--) {
          if (res[i].isBuy) {
            //判断如果为true就是买就push到买盘数组
            if (res[i].number != 0) {
              newBuyData.push(res[i]);
            }
          } else {
            //判断如果为false就是卖就push到卖盘数组
            if (res[i].number != 0) {
              newSellData.push(res[i]);
            }
          }
        }

        if (res.length == 1) {
          //买单数据 如果没有push数据并且是买单就赋值为空
          if (!newBuyData.length && res[0].isBuy) {
            this.buyData = [];
          }
          //卖单数据 如果没有push数据并且是卖单就赋值为空
          if (!newSellData.length && !res[0].isBuy) {
            this.sellData = [];
          }
        }
        if (res.length) {
          if (res[0].isBuy) {
            //买单数据
            this.buyData = newBuyData.length ? newBuyData : this.buyData;
          } else {
            //卖单数据
            var newCount = 0;
            if (newSellData.length < 38) {
              newCount = 0;
            } else {
              newCount = newSellData.length - 38;
            }
            this.sellData = newSellData.length
              ? newSellData.slice(newCount, newSellData.length)
              : this.sellData;
          }
        }
        if (res[0].isBuy) {
          this.buyData = this.buyData.reverse();
          this.buyData = this.buyData.slice(0, 38);
        }
        if (this.buyData.length && this.sellData.length) {
          this.timestamp = Date.parse(new Date()) / 1000;
          let newTime = this.timestamp - this.oldTimestamp; //计算时间差值
          if (newTime > 15) {
            //每15秒提交一次
            await this.$bus.emit("buyHashRateDepthData", this.buyData);
            await this.$bus.emit("sellHashRateDepthData", this.sellData);
            this.oldTimestamp = this.timestamp; //把时间存储起来
          }
        }
        // if (!this.initBuyState) {
        // 判断买
        if (this.buyData.length) {
          //发送价格和CNY价格到限价
          this.$bus.emit("limitHashRatePriceSellObj", this.buyData[0].price);
          // this.initBuyState = true;
        }
        if (!this.buyData.length) {
          //发送价格和CNY价格到限价
          this.$bus.emit("limitHashRatePriceSellPrice", this.newData.price);
          // this.initBuyState = true;
        }

        // 判断卖
        if (this.sellData.length) {
          //发送价格和CNY价格到限价
          this.$bus.emit(
            "limitHashRatePriceBuyObj",
            this.sellData[this.sellData.length - 1].price
          );
          // this.initBuyState = true;
        }
        if (!this.sellData.length) {
          //发送价格和CNY价格到限价
          this.$bus.emit("limitHashRatePriceBuyPrice", this.newData.price);
          // this.initBuyState = true;
        }
        // if (!this.initSaleState && this.sellData.length) {
        //   //发送价格和CNY价格到限价
        //   this.$bus.emit('limitHashRatePriceObj', {
        //     buy: this.buyData,
        //     sell: this.sellData,
        //     newPrice: this.newData.price
        //   })
        //   this.initSaleState = true;
        // }
        this.isLoading = false;
      }
    },
    getsellprogress (item, all) {
      let newArray = [];
      let maxVal = null;
      for (const childItem of all) {
        newArray.push(childItem.number);
      }
      //获取最大数量
      maxVal = Math.max.apply(null, newArray);
      if (item.number) {
        // 当前数量/最大数量*100
        return this.$Calculation.accMul(
          this.$Calculation.accDiv(item.number, maxVal),
          100
        );
      }
    },
    setDotType (item) {
      /*请求的数据是否加载完*/
      this.buyData = [];
      this.sellData = [];
      this.dotTypeLoading = false;
      this.lastdotType = this.dotType;
      this.dotType = item.key;
      this.dotValue = item.value;
      //取消订阅
      this.subSource.close();
      this.init();
    },
    showDot (val) {
      this.isshowDot = !this.isshowDot;
    },
    //点击盘口列表将价格传递给限价
    clickPrice (item) {
      this.$bus.emit("limitHashRatePrice", item.price);
    },
    onMessageTrade (data) {
      if (data.data && data.data.length) {
        //多条数据
        let res = data.data;
        let newArray = [];
        for (var i = res.length - 1; i >= 0; i--) {
          newArray.push({
            coinTeam: res[i].coinTeam,
            createTime: res[i].createTime,
            dealWay: res[i].dealWay,
            id: res[i].id,
            // isBuy: res[i].price >= Number(this.open) ? true : false,//判断价格是否大于开盘价 大于为涨 小于为false
            isBuy: res[i].isBuy,
            joinOid: res[i].joinOid,
            number: res[i].number,
            oid: res[i].oid,
            poundage: res[i].poundage,
            price: res[i].price,
            remark: res[i].remark,
            totalPrice: res[i].totalPrice,
            uid: res[i].uid
          });
        }
        this.$nextTick(() => {
          this.RealTimeTradeData = newArray.reverse();
        });
      } else if (
        data.data &&
        data.data.coinTeam &&
        this.RealTimeTradeData &&
        this.RealTimeTradeData.length
      ) {
        // "sub":"Trade"
        if (this.RealTimeTradeData.length > 19) {
          this.RealTimeTradeData.pop(); //删除最后一个元素
        }
        this.$nextTick(() => {
          //单条数据并且有历史数据数组存在给第一条数据加入数组
          this.RealTimeTradeData.unshift({
            coinTeam: data.data.coinTeam,
            createTime: data.data.createTime,
            dealWay: data.data.dealWay,
            id: data.data.id,
            // isBuy: data.data.price >= Number(this.open) ? true : false,//判断价格是否大于开盘价 大于为涨 小于为false
            isBuy: data.data.isBuy,
            joinOid: data.data.joinOid,
            number: data.data.number,
            oid: data.data.oid,
            poundage: data.data.poundage,
            price: data.data.price,
            remark: data.data.remark,
            totalPrice: data.data.totalPrice,
            uid: data.data.uid
          });
        });
      } else if (
        data.data &&
        data.data.coinTeam &&
        !this.RealTimeTradeData.length
      ) {
        //单条数据并且没有历史数据数组存在push到RealTimeTradeData对象
        this.RealTimeTradeData.push({
          coinTeam: data.data.coinTeam,
          createTime: data.data.createTime,
          dealWay: data.data.dealWay,
          id: data.data.id,
          // isBuy: data.data.price >= Number(this.open) ? true : false,//判断价格是否大于开盘价 大于为涨 小于为false
          isBuy: data.data.isBuy,
          joinOid: data.data.joinOid,
          number: data.data.number,
          oid: data.data.oid,
          poundage: data.data.poundage,
          price: data.data.price,
          remark: data.data.remark,
          totalPrice: data.data.totalPrice,
          uid: data.data.uid
        });
      }
      // this.busPushData()
      this.isLoading = false;
    },
    //获取到数据都需要调用该方法进行数据传递
    busPushData () {
      let tradeRecordData = {
        newBuyData: [],
        newSellData: []
      };
      for (const item of this.RealTimeTradeData) {
        if (item.isBuy) {
          tradeRecordData.newBuyData.push(item);
        } else {
          tradeRecordData.newSellData.push(item);
        }
      }
      // if (tradeRecordData.newBuyData.length || tradeRecordData.newSellData.length) {
      //   //提交最新实时成交数据
      //   this.$bus.emit('tradeHashRateRecordData', {
      //     data: this.RealTimeTradeData,
      //     buyAndSellData: tradeRecordData
      //   });
      // }
    },
    //设置订单类型
    setOrderType (num) {
      this.orderType = num;
    }
  },
  mounted () {
    this.$nextTick(() => {

      this.refreshKlineData(900000);// 进入页面时执行,默认聚合时间900000毫秒(15分钟)

      setTimeout(() => {
        this.refreshKlineData(180000);// 进入页面时执行,默认聚合时间900000毫秒(15分钟)
        this.$refs.callMethods.redraw();
      }, 10000)

      this.ordersymble = !this.$route.params.id
        ? ""
        : this.$route.params.id.replace("_", "/");
      this.symbleParameArray = !this.$route.params.id
        ? null
        : this.$route.params.id.split("_").length != 2
          ? null
          : this.$route.params.id.split("_");
      this.symbleParameString = !this.$route.params.id
        ? ""
        : this.$route.params.id.replace("_", "");
      //获取产品
      this.symblefrom = this.symbleParameArray
        ? this.symbleParameArray[0].toUpperCase()
        : "--";
      //获取货币
      this.symbleto = this.symbleParameArray
        ? this.symbleParameArray[1].toUpperCase()
        : "--";
      this.sub = `market.${this.symbleParameString}.detail`;
      this.initWebsocket();

      // 注销登录
      this.$bus.on("user-logout", () => {
        this.init();
      });
      // 登录成功
      this.$bus.on("Login-Success", () => {
        this.init();
        if (this.$store.state.token) {
          this.ws.send(
            JSON.stringify({
              sub: "OrderChange",
              coinTeam: "XBIT-USDT",
              token: this.$store.state.token
            })
          );
        }
      });

      window.addEventListener("resize", this.handleResize);
      this.$bus.emit("hideFooter", { isShow: false });
      if (!this.fullWidth) {
        this.fullWidth = document.documentElement.clientWidth;
      }

      document.addEventListener("click", () => {
        this.isshowDot = false;
      });

      // //激活页面
      // document.addEventListener("visibilitychange", () => {
      //   this.pagehidden = document.hidden
      // })

      //最新成交
      this.init();

      //浏览器判断
      // if (this.$commonFn.getOs() == "Firefox") {
      //   document.body.style.marginTop = "-1px";
      //   //修改滚动条
      //   // document.getElementsByClassName("MsgScrollbar")[0].firstChild.style.marginRight = '-17px'
      //   // document.getElementsByClassName("MsgScrollbar")[0].firstChild.firstChild.style.marginRight = '17px'
      //   // document.getElementsByClassName("MsgScrollbar")[1].firstChild.style.marginRight = '-17px'
      // } else {
      //   document.body.style.marginTop = "0px";
      //   document.getElementsByClassName("MsgScrollbar")[0].firstChild.style.marginRight = '0'
      // }
    });
  },
  beforeDestroy () { },
  //离开当前页面就显示底部
  destroyed () {
    clearInterval(this.timeInterval);
    if (this.ws) {
      this.ws.close();
    }
    this.currentState = false;
    this.$bus.emit("hideFooter", { isShow: true });
    this.$bus.emit("destroyedSocket");
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.HashRate-Pro {
  /deep/.van-tabs {
    .van-tabs__wrap {
      border-bottom: 1px solid $co487DC6;
    }
  }
}
.textNum.buy {
  color: $co02AD8F;
}
.textNum.sale {
  color: $coCB374E;
}
#app {
  .AggregatedTransactionExchange-NavBar {
    height: 0.98rem;
    line-height: 0.98rem;

    /deep/ .van-nav-bar__left {
      left: 0.15rem;

      .AggregatedTransaction-NavBar-LeftIcon {
        font-size: 0.48rem;
        padding: 0.25rem 0;
      }
    }

    .AggregatedTransaction-NavBar-LeftIcon {
      margin-right: 0.1rem;
    }
  }
  .kLineHader {
    padding: 0.2rem 0;
    .kLineHader-left {
      .kLineHader-left-bottom {
        margin-top: 0.2rem;
      }
    }
  }
  .bk151b35 {
    /deep/.van-hairline--top-bottom {
      background-color: $co151b35;
      .van-tabs__nav--line {
        background-color: $co151b35;
      }
    }
  }
  .latestDeal {
    .latestDeal-title {
      margin-top: 0.5rem;
      padding-bottom: 0.17rem;
      border-bottom: 0.03rem solid #262d49;
      span {
        border-bottom: 0.03rem solid $codbe4fe;
        padding-bottom: 0.2rem;
      }
    }
    .latestDeal-list {
      padding-bottom: 1.12rem;
      .latestDeal-list-title {
        padding: 0.17rem 0;
      }
      .latestDeal-list-content {
        padding: 0.17rem 0;
        .num.buy {
          color: $co02AD8F;
        }
        .num.sale {
          color: $coCB374E;
        }
      }
    }
    .latestDeal-list-btn {
      padding: 0.14rem 0;
      box-shadow: 0px 0.02rem 0.2rem rgba(0, 0, 0, 0.5);
      // max-width: 750px;
      .num {
        padding: 0.22rem 0;
        border-radius: 0.12rem;
        background: #a9b3b8;
      }
      .num.buy {
        background: $co02AD8F !important;
      }

      .num.sale {
        background: $coCB374E !important;
      }
    }
  }
}
</style>