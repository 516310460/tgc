<template>
  <div
    id="app"
    class="full"
    :class="{ day: background == 'day' }"
    ref="app"
  >
    <div class="relative">
      <div class="kLineHader fixed w-full bk191D24 z-10">
        <div class="flex items-center justify-between px-1">
          <div class="flex items-center">
            <!-- @click="show = true, getOnRefreshHeight()" -->
            <img
              class="wh04"
              src="~/assets/svg/icon_Switch·.svg"
              alt=""
            >
            <span class="clffffff fs32 font-bold ml-1">TGC/USDT</span>
            <!-- <span class="cl02AD8F fs24 ml-075">0.85%</span> -->
            <!-- <span class="clCB374E fs24 ml-075">-0.85%</span> -->
          </div>
          <!-- <div
            class="fs18 cldbe4fe"
            span="8"
          >
            <div
              class="flex items-center justify-end space-x-1"
              span="24"
            >
              <nuxt-link :to="`/${locale}/HashRate/pro/xbit_usdt`">
                <img
                  class="wh04"
                  src="~/assets/svg/icon-k-line diagram.svg"
                  alt
                />
              </nuxt-link>
            </div>
          </div> -->
        </div>
      </div>
      <van-pull-refresh
        class="relative t-092"
        v-model="isLoading"
        @refresh="onRefresh"
      >

        <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
        <!-- <template #pulling="props">
          <img
            class="doge"
            src="https://img01.yzcdn.cn/vant/doge.png"
            :style="{ transform: `scale(${props.distance / 80})` }"
          />
        </template> -->

        <!-- 释放提示 -->
        <!-- <template #loosing>
          <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
        </template> -->

        <!-- 加载提示 -->
        <template #loading>
          <div class="fs22 pb-2 flex items-center justify-center">
            <van-loading color="#02AD8F" />
            <span class="ml-1">加载中...</span>
          </div>
        </template>
        <div class="trade fs24 cl606d82 bk21252F rounded-t-md pt-1 pb-4">
          <van-row>
            <van-col
              span="22"
              offset="1"
            >
              <van-col span="14">
                <van-col
                  span="24"
                  class="tc"
                >
                  <van-col
                    span="11"
                    class="trade-title-btn bk2E3743 buy title text-center"
                    :class="{ active: buyAndSellIndex == 1 }"
                    @click.native="clickBuyAndSell(1)"
                  >{{ $t("HashRate.Home.buy") }}</van-col>
                  <van-col
                    span="11"
                    offset="1"
                    class="trade-title-btn bk2E3743 sell title text-center"
                    :class="{ active: buyAndSellIndex == 2 }"
                    @click.native="clickBuyAndSell(2)"
                  >{{ $t("HashRate.Home.sell") }}</van-col>
                </van-col>
                <!-- 价格 -->
                <van-col
                  span="24"
                  class="tc"
                >
                  <van-col
                    class="limitAndMaker cldbe4fe tl fs28"
                    span="11"
                    @click.native="limitAndMakerState = true"
                  >{{
                      limitAndMakerVal == 1
                        ? $t("HashRate.Home.xianjiajiaoyi")
                        : $t("HashRate.Home.shijiajiaoyi")
                    }}</van-col>
                </van-col>
                <van-col
                  span="24"
                  class="tc trade-row"
                >
                  <van-col
                    v-if="limitAndMakerVal == 2"
                    span="23"
                    class="trade-title-btn bk2E3743 input px-1"
                  >{{ $t("HashRate.Home.zuiyoujiage") }}</van-col>
                  <van-col
                    v-if="limitAndMakerVal == 1"
                    span="23"
                    class="trade-title-btn bk2E3743 input"
                  >
                    <van-col
                      span="18"
                      offset="1"
                      class="trade-title-btn cldbe4fe bk2E3743 input"
                    >
                      <van-cell-group>
                        <van-field
                          v-if="buyAndSellIndex == 1"
                          class="bknull cldbe4fe"
                          v-model="copeEntrustBuyRate"
                          @input="inputCopeEntrustBuyRate"
                          :placeholder="$t('HashRate.Home.price')"
                        />
                        <van-field
                          v-if="buyAndSellIndex == 2"
                          class="bknull cldbe4fe"
                          v-model="copeEntrustSaleRate"
                          @input="inputCopeEntrustSaleRate"
                          :placeholder="$t('HashRate.Home.price')"
                        />
                      </van-cell-group>
                    </van-col>
                    <van-col
                      span="4"
                      class="trade-title-btn cldbe4fe bk2E3743 heightAuto input"
                    >USDT</van-col>
                    <van-col
                      span="24"
                      class="tl"
                    >
                      ≈
                      {{
                        buyAndSellIndex == 1
                          ? this.$commonFn.limitInputNum(
                              this.$np.times(copeEntrustBuyRate, exchangeRateData),
                              9,
                              2
                            )
                          : this.$commonFn.limitInputNum(
                              this.$np.times(copeEntrustSaleRate, exchangeRateData),
                              9,
                              2
                            )
                      }}
                      CNY
                    </van-col>
                  </van-col>
                </van-col>
                <!-- 数量 -->
                <van-col
                  span="24"
                  class="tc trade-title-num trade-row"
                >
                  <van-col
                    span="23"
                    class="trade-title-btn bk2E3743 input"
                  >
                    <van-col
                      span="18"
                      offset="1"
                      class="trade-title-btn cldbe4fe bk2E3743 input"
                    >
                      <van-cell-group>
                        <van-field
                          v-if="buyAndSellIndex == 1 && limitAndMakerVal == 1"
                          class="bknull cldbe4fe"
                          v-model="copeEntrustBuyNum"
                          @input="inputCopeEntrustBuyNum(true)"
                          :placeholder="$t('HashRate.Home.mairuliang')"
                        />
                        <van-field
                          v-if="buyAndSellIndex == 1 && limitAndMakerVal == 2"
                          class="bknull cldbe4fe"
                          v-model="copeEntrustBuyMoney"
                          @input="inputCopeEntrustBuyMoney(true)"
                          :placeholder="$t('HashRate.Home.jine')"
                        />
                        <van-field
                          v-if="buyAndSellIndex == 2"
                          class="bknull cldbe4fe"
                          v-model="copeEntrustSaleNum"
                          @input="inputCopeEntrustSaleNum(false)"
                          :placeholder="$t('HashRate.Home.maichuliang')"
                        />
                      </van-cell-group>
                    </van-col>
                    <van-col
                      span="4"
                      class="trade-title-btn cldbe4fe bk2E3743 heightAuto input"
                    >{{
                        buyAndSellIndex == 1 && limitAndMakerVal == 2
                          ? "USDT"
                          : "TGC"
                      }}</van-col>
                    <van-col
                      span="24"
                      class="tl"
                    >{{ $t("HashRate.Home.keyong") }}:
                      {{
                        buyAndSellIndex == 1
                          ? `${buyBalance} USDT`
                          : `${saleBalance} TGC`
                      }}</van-col>
                  </van-col>
                </van-col>
                <!-- 滑块 -->
                <van-col
                  span="23"
                  class="tc trade-title-num slider"
                >
                  <buybit-slider
                    v-if="buyAndSellIndex == 1"
                    :dotColor="'buy'"
                    :dec="getbuydec"
                    :numdecimals="buyProportion"
                    @slider:change="getEntrustBuyNum"
                  ></buybit-slider>
                  <buybit-slider
                    v-if="buyAndSellIndex == 2"
                    :dotColor="'sell'"
                    :dec="getsaledec"
                    :numdecimals="saleProportion"
                    @slider:change="getEntrustSaleNum"
                  ></buybit-slider>
                  <van-col span="23">
                    <van-col
                      span="12"
                      class="tl"
                    >0%</van-col>
                    <van-col
                      span="12"
                      class="text-right"
                    >100%</van-col>
                  </van-col>
                </van-col>
                <!-- 金额 -->
                <van-col
                  span="24"
                  class="tc trade-title-price trade-row"
                >
                  <van-col
                    span="23"
                    class="trade-title-btn bk2E3743 input"
                    v-if="limitAndMakerVal == 1"
                  >
                    <van-col
                      span="18"
                      offset="1"
                      class="trade-title-btn cldbe4fe input"
                    >
                      <van-cell-group>
                        <van-field
                          class="bknull cldbe4fe"
                          v-if="buyAndSellIndex == 1"
                          v-model="copeEntrustBuyMoney"
                          @input="inputCopeEntrustBuyMoney(true)"
                          :placeholder="$t('HashRate.Home.jine')"
                        />
                        <van-field
                          class="bknull cldbe4fe"
                          v-if="buyAndSellIndex == 2"
                          v-model="copeEntrustSaleMoney"
                          @input="inputCopeEntrustSaleMoney"
                          :placeholder="$t('HashRate.Home.jine')"
                        />
                      </van-cell-group>
                    </van-col>
                    <van-col
                      span="4"
                      class="trade-title-btn cldbe4fe heightAuto input"
                    >USDT</van-col>
                  </van-col>
                </van-col>
                <van-col
                  span="24"
                  class="tc trade-title-btns trade-row"
                >
                  <!-- @click.native="BuyAndSellState() != 'bk59' && clickBuyAndSellSubmit(2)" -->
                  <van-col
                    span="23"
                    class="trade-title-btn clffffff title input active text-center"
                    :class="buyAndSellIndex == 1 ? 'bk02AD8F' : 'bkCB374E'"
                    @click.native="placeOrder"
                  >{{
                      token
                        ? buyAndSellIndex == 1
                          ? $t("HashRate.Home.buy")
                          : $t("HashRate.Home.sell")
                        : $t("HashRate.Entrust.login")
                    }}</van-col>
                </van-col>
              </van-col>
              <van-col
                class="trade-Depth"
                span="10"
              >
                <van-col
                  class="trade-Depth-title"
                  span="24"
                >
                  <van-col span="12">{{ $t("HashRate.Home.price") }}</van-col>
                  <van-col
                    class="text-right"
                    span="12"
                  >{{
                    $t("HashRate.Home.number")
                  }}</van-col>
                </van-col>
                <van-col
                  class="trade-Depth-sell"
                  span="24"
                >
                  <van-col span="24">
                    <van-col
                      v-for="(item, index) in sellData"
                      :key="index"
                      @click.native="clickPrice(item)"
                      span="24"
                    >
                      <section
                        class="sell progress"
                        :style="{
                          width: `calc(${getsellprogress(item, sellData)}%)`
                        }"
                      ></section>
                      <van-col
                        class="textNum sale"
                        span="12"
                      >{{
                        item.price
                      }}</van-col>
                      <van-col
                        class="text-right"
                        span="12"
                      >{{ item.number }}</van-col>
                    </van-col>
                  </van-col>
                </van-col>
                <van-col
                  class="trade-Depth-center"
                  span="24"
                >
                  <van-col span="12">
                    <span
                      class="new-money-dot textNum fs28"
                      :class="
                        orderDepthData.price == 0
                          ? 'cldbe4fe'
                          : newData.isBuy
                          ? 'buy'
                          : 'sale'
                      "
                    >{{ orderDepthData.price }}</span>
                  </van-col>
                  <van-col
                    class="text-right"
                    span="12"
                  >
                    <span class="tip textNum fs22 cldbe4fe">≈ {{ orderDepthData.price * exchangeRateData }}CNY</span>
                  </van-col>
                </van-col>
                <van-col
                  class="trade-Depth-buy"
                  span="24"
                >
                  <van-col
                    v-for="(item, index) in buyData"
                    :key="index"
                    @click.native="clickPrice(item)"
                    span="24"
                  >
                    <section
                      class="buy progress"
                      :style="{
                        width: `calc(${getsellprogress(item, buyData)}%)`
                      }"
                    ></section>
                    <van-col
                      class="textNum buy"
                      span="12"
                    >{{
                      item.price
                    }}</van-col>
                    <van-col
                      class="text-right"
                      span="12"
                    >{{ item.number }}</van-col>
                  </van-col>
                </van-col>
              </van-col>
            </van-col>
          </van-row>
          <div class="mt-1 px-1 fs28">
            <!-- <div class="flex items-center justify-between border-b bc-co383E4D">
              <div class="flex items-center clffffff space-x-1">
                <span
                  @click="typeRecord = 1"
                  :class="typeRecord == 1 ? 'bc-02AD8F' : 'bc-null'"
                  class="border-b pb-075"
                >当前委托</span>
                <span
                  @click="typeRecord = 2"
                  :class="typeRecord == 2 ? 'bc-02AD8F' : 'bc-null'"
                  class="border-b pb-075"
                >交易记录</span>
              </div>
              <nuxt-link :to="`/${locale}/HashRate/Order`">
                <div class="flex items-center fs24 clffffff pb-075">
                  <img
                    class="w-1"
                    src="~/assets/svg/icon_All.svg"
                    alt=""
                  >
                  <span class="ml-075">全部</span>
                </div>
              </nuxt-link>
            </div> -->
            <van-tabs
              class="transparent"
              v-model="activeTypeList"
            >
              <van-tab
                v-for="item in typeRecordList"
                :key="item"
              >
                <template #title>
                  <div class="fs28">
                    <p>{{item}}</p>
                  </div>
                </template>
                <div
                  v-if="activeTypeList == 0"
                  class="py-075"
                >
                  <div
                    v-for="(item, index) in orderOneListData"
                    :key="index"
                    class="bk1D088B p-1 my-1 rounded-sm"
                  >
                    <div class="fs28">
                      <span :class="item.isBuy ? 'cl02AD8F' : 'clCB374E'">{{item.isBuy ? '买单' : '卖单'}}</span>
                      <span>TGC/USDT</span>
                    </div>
                    <div class="flex items-center justify-center cl868D9A">
                      <span class="fs24 w-1/4">价格</span>
                      <span class="fs24 w-1/4 text-center">数量</span>
                      <span class="fs24 w-1/4 text-right">状态</span>
                      <div
                        @click="ReadShow = true, oid = item.id"
                        class="w-1/4 ml-4 border rounded-sm fs12 text-center float-right bk02AD8F clffffff bc-02AD8F BtnSizeMini"
                      >
                        撤单
                      </div>
                    </div>
                    <div class="flex items-center justify-center clffffff mt-01">
                      <span class="fs24 w-1/4">{{item.price}}</span>
                      <span class="fs24 w-1/4 text-center">{{item.number}}</span>
                      <span class="fs24 w-1/4 text-right">{{orderStateSwitch(item.state)}}</span>
                      <div class="w-1/4 ml-4 rounded-sm fs12 text-center float-right bknull">
                      </div>
                    </div>
                    <div class="flex items-center justify-between cl868D9A">
                      <span class="fs18">{{item.createTime}}</span>
                      <span class="fs18 font-bold cl02AD8F">
                        <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
                        <span class="ml-075">成功</span>
                      </span>
                    </div>
                  </div>
                  <!-- <div class="mx-auto my-3 text-center">
                    <img
                      class="w-4 mx-auto"
                      src="~/assets/svg/icon_Emptystate.svg"
                      alt=""
                    >
                    <p class="fs24 mt01">暂无记录</p>
                  </div> -->
                </div>
                <div
                  v-if="activeTypeList == 1"
                  class="py-075"
                >
                  <div
                    v-for="(item, index) in orderTwoListData"
                    :key="index"
                    class="bk1D088B p-1 my-1 rounded-sm"
                  >
                    <div class="fs28">
                      <span :class="item.isBuy ? 'cl02AD8F' : 'clCB374E'">{{item.isBuy ? '买单' : '卖单'}}</span>
                      <span>TGC/USDT</span>
                    </div>
                    <div class="flex items-center justify-center cl868D9A">
                      <span class="fs24 w-1/3">价格</span>
                      <span class="fs24 w-1/3 text-center">数量</span>
                      <span class="fs24 w-1/3 text-right">状态</span>
                    </div>
                    <div class="flex items-center justify-center clffffff">
                      <span class="fs24 w-1/3">{{item.price}}</span>
                      <span class="fs24 w-1/3 text-center">{{item.number}}</span>
                      <span class="fs24 w-1/3 text-right">{{orderStateSwitch(item.state)}}</span>
                    </div>
                    <div class="flex items-center justify-between cl868D9A">
                      <span class="fs18">{{item.createTime}}</span>
                      <span class="fs18 font-bold cl02AD8F">
                        <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
                        <span class="ml-075">成功</span>
                      </span>
                    </div>
                  </div>
                  <!-- <div class="mx-auto my-3 text-center">
                    <img
                      class="w-4 mx-auto"
                      src="~/assets/svg/icon_Emptystate.svg"
                      alt=""
                    >
                    <p class="fs24 mt01">暂无记录</p>
                  </div> -->
                </div>
              </van-tab>
            </van-tabs>
          </div>
          <!-- 底部弹出框 -->
          <van-action-sheet
            v-model="limitAndMakerState"
            :actions="limitAndMaker"
            :cancel-text="$t('H5common.cancel')"
            @select="onSelect"
          />

          <van-dialog
            class="xbitFeeTipsDialog"
            v-model="sumbitTipsState"
            :closeOnClickOverlay="true"
          >
            <van-row class="TipsDialog">
              <van-col
                class="TipsDialog-Title brBottom-cl324170"
                span="24"
              >
                <!-- 标题 -->
                <van-col
                  class="tl cldbe4fe fs32"
                  span="18"
                >{{
                  $t("HashRate.Home.cancle")
                }}</van-col>
              </van-col>
              <van-col
                class="TipsDialog-Content fs28 tl"
                span="24"
              >
                <p>{{ $t("HashRate.Home.cancleTitle") }}？</p>
              </van-col>
              <van-col
                class="TipsDialog-Botton"
                span="24"
              >
                <van-col
                  class="tl"
                  span="11"
                >
                  <section
                    @click="sumbitTipsState = false"
                    class="TipsDialog-Botton-Cancel br-cl67d852 cl67d852"
                  >
                    {{ $t("H5common.cancel") }}
                  </section>
                </van-col>
                <van-col
                  class="tl"
                  span="11"
                  offset="2"
                >
                  <section
                    @click="revocation()"
                    class="TipsDialog-Botton-Submit buttonLinearGradient clffffff"
                  >
                    <span>{{ $t("H5common.sure") }}</span>
                  </section>
                </van-col>
              </van-col>
            </van-row>
          </van-dialog>
        </div>
      </van-pull-refresh>
    </div>

    <van-popup
      class="h-full bk21252F clffffff HashRate-popupLeft w-4/5 fixed"
      v-model="show"
      position="left"
    >
      <div class="overflow-auto h-full">
        <div class="bk21252F flex items-center justify-between px-1 fixed top-0 w-full z-10 h092 HashRate-popupLeft-title">
          <p class="clffffff fs38 font-semibold">现货交易</p>
        </div>
        <div class="bk21252F flex items-center justify-between fixed t-092 w-full z-10 h092 HashRate-popupLeft-srarch">
          <div class="flex1 center bg-transparent w-full">
            <van-search
              class="bg-transparent w-full"
              :value="value"
              placeholder="搜索币种"
            />
          </div>
        </div>

        <div class="bk21252F relative t-184 coinpool-wap-Content w-full">
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

              <div class="bk21252F">

                <div class="py-1 px-1 flex items-center justify-between fs24 cl868D9A fixed w-full t-248 z-30 bk21252F mt-016 HashRate-popupLeft-listTitle">
                  <div class="flex items-center">
                    <span>名称/成交量</span>
                    <img
                      class="w012 ml-075"
                      src="~/assets/svg/icon-Sort by.svg"
                      alt=""
                    >
                  </div>
                  <div class="flex items-center">
                    <div class="flex items-center">
                      <span>最新价</span>
                      <img
                        class="w012 ml-075"
                        src="~/assets/svg/icon-Ascending.svg"
                        alt=""
                      >
                    </div>
                    <span>&nbsp;/&nbsp;</span>
                    <div class="flex items-center">
                      <span>24h涨跌</span>
                      <img
                        class="w012 ml-075"
                        src="~/assets/svg/icon-Descending.svg"
                        alt=""
                      >
                    </div>
                  </div>
                </div>

                <van-pull-refresh
                  class="pt01 relative t-125"
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

                  <ul
                    class="mt-1"
                    :style="{height: onRefreshHeight + 'px'}"
                  >
                    <li
                      v-for="index in 20"
                      :key="index"
                      :class="index == 1 ? 'bk303541' : ''"
                      class="flex items-center justify-between cl868D9A px-1 py-0125"
                    >
                      <!-- <div class="w-1/3 fs24">
                        <div class="flex items-center">
                          <span class="font-bold fs32 clffffff">TGC{{index}}</span>
                          <span>/USDT</span>
                        </div>
                        <p>成交量1,317.56</p>
                      </div>
                      <div class="w-1/3 text-center">
                        <p class="fs32 font-bold cl02AD8F">1,592.88</p>
                        <p class="fs24">￥10,401,17</p>
                      </div>
                      <div class="w-1/3 text-right">
                        <span class="flex-none bk02AD8F clffffff p-01 rounded-xs fs28">+10.00%</span>
                      </div> -->
                      <div class="clffffff">
                        <span class="fs32 font-semibold">1INCH</span>
                        <span class="fs24 ml-075">/USDT</span>
                      </div>
                      <div class="clCB374E">
                        <p class="fs28 font-semibold">4.4414</p>
                        <p class="fs20">-1.40%</p>
                      </div>
                    </li>
                  </ul>

                </van-pull-refresh>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </van-popup>

    <!-- 撤单 -->
    <van-popup
      class="bk2E3743 rounded-sm w-3/4"
      v-model="ReadShow"
    >
      <div class="fs28 cl9FA9C0 m-1 text-center">
        确定撤销该订单？
      </div>
      <div class="flex items-center my-1 px-1 space-x-2">
        <div
          @click="ReadShow = false"
          class="button button-xl fs32 bk2E3743 border bc-co535E6D clffffff flex-1"
        >
          取消
        </div>
        <div
          @click="cancelOrder"
          class="button button-xl fs32 bk02AD8F clffffff flex-1"
        >
          确定
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import slider from "@/components/Public/slider";
import { mapState, mapMutations } from 'vuex'

export default {
  name: "pro",
  components: {
    "buybit-slider": slider
  },
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
  data () {
    return {
      onRefreshHeight: 0,
      active: 0,
      show: false,
      coinList: [
        {
          coinName: 'TGC',
          zhCN: '比特币'
        },
        {
          coinName: 'ETH',
          zhCN: '以太坊'
        },
        {
          coinName: 'BCB',
          zhCN: '币池币'
        },
        {
          coinName: 'USDT',
          zhCN: '泰达币'
        },
      ],
      // 下拉刷新
      isLoading: false,
      value: '',
      active: 0,
      paymentMethodIndex: 0,//收款方式索引
      typeList: [
        {
          name: '自选',
        },
        {
          name: 'USDT',
        },
        {
          name: 'TGC',
        },
        {
          name: 'BCB',
        },
        // {
        //   name: '合约',
        // },
        // {
        //   name: '板块',
        // }
      ],
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,

      buyAndSellIndex: 1, //1.买 2.卖
      value: "",
      getbuydec: 0, //买小数
      getsaledec: 0,
      copeEntrustBuyRate: "", //买单价格
      copeEntrustSaleRate: "", //卖单价格
      copeEntrustBuyNum: "", //买单数量
      copeEntrustSaleNum: "", //卖单数量
      copeEntrustBuyMoney: "", //买单金额
      copeEntrustSaleMoney: "", //卖单金额
      buyProportion: 0, //买单数量比例值取值0到100
      saleProportion: 0, //卖单数量比例值取值0到100
      buyBalance: 0, //买单的可用余额 基准币 TGC-USDT USDT
      saleBalance: 0, //卖单的可用余额 非基准币 TGC-USDT TGC
      isBuyInputState: false, //买单输入中状态
      isSaleInputState: false, //卖单输入中状态

      limitAndMakerState: false,
      limitAndMakerVal: 1, //1.为限价 2.市价
      limitAndMaker: [
        { name: "限价交易", value: 1 },
        { name: "市价交易", value: 2 }
      ],
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
        isSaleTransaction: false, //限价卖是否可购买
        isMarketBuyTransaction: false, //市价买是否可购买
        isMarketSaleTransaction: false //市价卖是否可购买
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
      active: 2,
      oldBuyData: [],
      oldSellData: [],
      RateVal: 0, //汇率值
      limitBuyPriceInitState: false, //限价买单价格初始化
      limitSellPriceInitState: false, //限价卖单价格初始化
      pageCurrentData: [], //当前委托数据
      total: 0,
      pageSize: 7, //当前条数
      pageNo: 1, //当前页
      sumbitTipsState: false,
      revocationId: "", //撤销id

      typeRecord: 1,
      typeRecordList: ['当前委托', '交易记录'],
      activeTypeList: 0,

      balanceData: [],
      currentToBalance: 0,//当前币种余额
      currentFromBalance: 0,//当前币种余额

      orderListData: [],
      orderDepthData: [],
      orderOneListData: [],
      orderTwoListData: [],
      ReadShow: false,
      oid: "",
      exchangeRateData: 0,
      timer: null
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
  computed: {
    ...mapState(['locale', 'token'])
  },
  destroyed () {
    clearInterval(this.timer)
  },
  created () {
    this.HashInit()
  },
  methods: {
    HashInit () {
      this.copeEntrustBuyNum = ""
      this.copeEntrustSaleNum = ""
      this.copeEntrustBuyRate = ""
      this.copeEntrustSaleRate = ""
      this.copeEntrustBuyMoney = ""; //买单金额
      this.copeEntrustSaleMoney = ""; //卖单金额
      this.balance()
      this.orderList(1)
      this.orderList(2)
      this.exchangeRate()
      clearInterval(this.timer)
      this.timer = null
      this.timer = setInterval(() => {
        this.orderDepth()
      }, 3000)
    },
    // 获取当前汇率
    exchangeRate () {
      this.$api.main.exchangeRate().then(res => {
        if (res.type == "success") {
          this.exchangeRateData = res.data
        }
      })
    },
    // 用户撤单
    cancelOrder () {
      let params = {
        oid: this.oid
      }
      this.$api.order.cancelOrder(params).then(res => {
        if (res.type == "success") {
          this.$Toast("撤单成功")
          this.ReadShow = false
          this.HashInit()
        }
      })
    },
    // 订单深度数据
    orderDepth () {
      let params = {
        coinTeam: "TGC-USDT",//默认：TGC-USDT
      }
      this.sellData = []
      this.buyData = []
      this.$api.order.orderDepth(params).then(res => {
        if (res.type == "success") {
          this.orderDepthData = res.data
          for (let index of Object.keys(res.data.sells)) {
            this.sellData.push({
              number: res.data.sells[index],
              price: index
            })
          }
          for (let index of Object.keys(res.data.buys)) {
            this.buyData.push({
              number: res.data.buys[index],
              price: index
            })
          }
        }
      })
    },
    // 用户订单详情
    orderDetail () {
      let params = {
        oid: ""
      }
      this.$api.order.orderDetail(params).then(res => {
      })
    },
    // 用户订单记录
    orderList (state) {
      let params = {
        type: state,//查询类型：1-当前委托 2-历史委托
      }
      this.$api.order.orderList(params).then(res => {
        if (res.type == "success") {
          if (state == 1) {
            this.orderOneListData = res.data
          } else {
            this.orderTwoListData = res.data
          }
        }
      })
    },
    // 用户下单
    placeOrder () {
      if (this.buyAndSellIndex == 1) {
        if (!this.copeEntrustBuyRate) {
          return this.$Toast("价格不能为空")
        }
        if (!this.copeEntrustBuyNum) {
          return this.$Toast("数量不能为空")
        }
      } else {
        if (!this.copeEntrustSaleRate) {
          return this.$Toast("价格不能为空")
        }
        if (!this.copeEntrustSaleNum) {
          return this.$Toast("数量不能为空")
        }
      }
      let params = {
        coinTeam: "TGC-USDT",//交易对,默认:TGC-USDT
        isBuy: this.buyAndSellIndex == 1 ? 1 : 0,//是否是买单：0-卖单 1-买单
        //1.为限价 2.市价
        isMarket: this.limitAndMakerVal == 1 ? 0 : 1,//是否是市价：0-否 1-是
        amount: this.buyAndSellIndex == 1 ? this.copeEntrustBuyNum : this.copeEntrustSaleNum,//交易数量
        price: this.buyAndSellIndex == 1 ? this.copeEntrustBuyRate : this.copeEntrustSaleRate,//交易价格
      }
      console.log(this.buyAndSellIndex == 1 ? this.copeEntrustBuyNum : this.copeEntrustSaleNum)
      console.log(this.copeEntrustBuyNum, this.copeEntrustSaleNum)
      this.$api.order.placeOrder(params).then(res => {
        if (res.type == "success") {
          this.$Toast("下单成功")
          this.HashInit()
        }
      })
    },
    // （0挂单，1部分成交，2全部成交，3已撤销，4撤销申请，5,异常订单）
    orderStateSwitch (state) {
      let str = ""
      switch (state) {
        case 0:
          str = "挂单"
          break;
        case 1:
          str = "部分成交"
          break;
        case 2:
          str = "全部成交"
          break;
        case 3:
          str = "已撤销"
          break;
        case 4:
          str = "撤销申请"
          break;
        case 5:
          str = "异常订单"
          break;
        default:
          break;
      }
      return str
    },
    // 获取个人资产
    balance () {
      this.$api.userAccount.balance().then(res => {
        if (res.type == "success") {
          this.balanceData = res.data
          this.switchBalanceData()
        }
      })
    },
    switchBalanceData () {
      if (this.balanceData.length) {
        this.balanceData.forEach(item => {
          if (item.coinName == 'USDT') {
            this.buyBalance = Number(item.balance)
          } else if (item.coinName == 'TGC') {
            this.saleBalance = Number(item.balance)
          }
        });
      }
    },
    getOnRefreshHeight () {
      this.$nextTick(() => {
        let titleHeight = document.getElementsByClassName("HashRate-popupLeft-title")[0].clientHeight
        let srarchHeight = document.getElementsByClassName("HashRate-popupLeft-srarch")[0].clientHeight
        let tabs__wrap = document.getElementsByClassName("van-tabs__wrap")[0].clientHeight
        let listTitle = document.getElementsByClassName("HashRate-popupLeft-listTitle")[0].clientHeight
        this.onRefreshHeight = document.body.clientHeight - titleHeight - srarchHeight - tabs__wrap - listTitle
      })
    },
    // 加载更多
    onLoad () {
      this.finished = true
    },
    // 下拉刷新
    onRefresh () {
      this.HashInit()
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    onClick (name, title) {
      // this.$Toast(title);
      // console.log(name, title)
      if (name == 1) {
        this.$router.push(`/${this.locale}/Trade`)
      }
    },
    init () {
      if (this.$route.query.type) {
        this.buyAndSellIndex = Number(this.$route.query.type);
      }
      // this.locale = this.$store.state.locale;
      this.token = this.$store.state.token;
      this.otcUrl = this.$store.state.otcUrl;
      this.hashRateUrl = this.$store.state.hashRateUrl;
      this.background = this.$store.state.background;
      if (this.$store.state.token) {
        //获取用户设置
        this.getAccountInfo();
        this.findByAssetNames();
        this.currentOrder();
      } else {
        this.pageCurrentData = [];
        this.total = 0;
      }
      // 获取汇率
      this.getExchangeRate();
      //获取交易配置
      this.getCoinTeamConfig();
    },
    //获取当前委托订单
    currentOrder () {
      let obj = {
        size: this.pageSize, //当前条数
        current: this.pageNo //当前页
      };
      this.$api.HashRate.currentOrder(obj).then(res => {
        if (res && res.data.code === 200) {
          this.pageCurrentData = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    },
    //切换买卖
    clickBuyAndSell (index) {
      this.buyAndSellIndex = index;
      // this.copeEntrustBuyRate = 0, //买单价格
      // this.copeEntrustSaleRate = 0, //卖单价格
      this.copeEntrustBuyNum = 0; //买单数量
      this.copeEntrustSaleNum = 0; //卖单数量
      this.copeEntrustBuyMoney = 0; //买单金额
      this.copeEntrustSaleMoney = 0; //卖单金额
      this.$bus.emit("ProportionVal", 0);
      // this.limitBuyPriceInitState = false;//限价买单价格初始化
      // this.limitSellPriceInitState = false;//限价卖单价格初始化
      // 判断买
      if (this.buyData.length) {
        this.copeEntrustSaleRate = this.buyData[0].price;
      }
      if (!this.buyData.length) {
        this.copeEntrustSaleRate = this.newData.price;
      }
      // 判断卖
      if (this.sellData.length) {
        this.copeEntrustBuyRate = this.sellData[this.sellData.length - 1].price;
      }
      if (!this.sellData.length) {
        this.copeEntrustBuyRate = this.newData.price;
      }
    },
    BuyAndSellState () {
      if (this.limitAndMakerVal == 1) {
        if (
          this.buyAndSellIndex == 1 &&
          this.findConfigsData.isBuyTransaction
        ) {
          return "buy";
        } else if (
          this.buyAndSellIndex == 2 &&
          this.findConfigsData.isSaleTransaction
        ) {
          return "sell";
        } else {
          return "bk59";
        }
      }
      if (this.limitAndMakerVal == 2) {
        if (
          this.buyAndSellIndex == 1 &&
          this.findConfigsData.isMarketBuyTransaction
        ) {
          return "buy";
        } else if (
          this.buyAndSellIndex == 2 &&
          this.findConfigsData.isMarketSaleTransaction
        ) {
          return "sell";
        } else {
          return "bk59";
        }
      }
    },
    //获取交易配置
    getCoinTeamConfig () {
      let obj = `TGC-USDT`;
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
            isSaleTransaction: res.data.data[8], //限价卖是否可购买
            isMarketBuyTransaction: res.data.data[9], //市价买是否可购买
            isMarketSaleTransaction: res.data.data[10] //市价卖是否可购买
          };
        }
      });
    },
    //输入买单价格
    inputCopeEntrustBuyRate () {
      //处理金额小数位
      this.copeEntrustBuyRate = this.$commonFn.limitInputNum(
        this.copeEntrustBuyRate,
        9,
        this.findConfigsData.valuation || 2
      );
      if (!Number(this.copeEntrustBuyRate) || !Number(this.copeEntrustBuyNum)) {
        //如果当前价格不存在就设置金额为空
        this.copeEntrustBuyMoney = 0;
        this.buyProportion = 0;
      }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (this.buyBalance && Number(this.copeEntrustBuyRate)) {
        let newVal =
          this.$np.round(
            this.$np.divide(
              Number(
                this.$np.times(
                  Number(this.copeEntrustBuyNum),
                  Number(this.copeEntrustBuyRate)
                )
              ),
              Number(this.buyBalance)
            ),
            6
          ) * 100;
        this.buyProportion = newVal > 100 ? 100 : newVal;
      }
      if (Number(this.copeEntrustBuyRate) && Number(this.copeEntrustBuyNum)) {
        //判断数量存在就进行计算金额
        this.copeEntrustBuyMoney = this.$np.times(
          this.copeEntrustBuyRate,
          this.copeEntrustBuyNum
        );
      }
    },
    //输入买单数量
    inputCopeEntrustBuyNum (state) {
      this.isBuyInputState = true;
      this.copeEntrustBuyNum = this.$commonFn.limitInputNum(
        this.copeEntrustBuyNum,
        9,
        this.findConfigsData.benchmark
      );
      //如果数量不存在那么金额也就不存在
      if (!Number(this.copeEntrustBuyRate) || !Number(this.copeEntrustBuyNum)) {
        this.copeEntrustBuyMoney = 0;
        this.buyProportion = 0;
      }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (this.buyBalance && Number(this.copeEntrustBuyRate)) {
        let newVal =
          this.$np.round(
            this.$np.divide(
              Number(
                this.$np.times(
                  Number(this.copeEntrustBuyNum),
                  Number(this.copeEntrustBuyRate)
                )
              ),
              Number(this.buyBalance)
            ),
            6
          ) * 100;
        this.buyProportion = newVal > 100 ? 100 : newVal;
      }
      if (
        state &&
        Number(this.copeEntrustBuyRate) &&
        Number(this.copeEntrustBuyNum)
      ) {
        //如果当前价格存在并且当前数量也存在
        this.copeEntrustBuyMoney = this.$np.times(
          this.copeEntrustBuyNum,
          this.copeEntrustBuyRate
        );
      }
    },
    //输入买单金额
    inputCopeEntrustBuyMoney (state) {
      this.isBuyInputState = true;
      this.copeEntrustBuyMoney = this.$commonFn.limitInputNum(
        this.copeEntrustBuyMoney,
        9,
        this.findConfigsData.valuation || 2
      );
      //如果买单金额不存在 滚动条为0 数量为0
      if (!Number(this.copeEntrustBuyMoney)) {
        this.copeEntrustBuyNum = 0;
        this.buyProportion = 0;
      }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (state && this.buyBalance) {
        // let newVal = this.$np.round(this.$np.divide(Number(this.$np.times(Number(this.copeEntrustBuyNum), Number(this.copeEntrustBuyRate))), Number(this.buyBalance)), 6) * 100
        let newVal =
          this.$np.round(
            this.$np.divide(
              Number(this.copeEntrustBuyMoney),
              Number(this.buyBalance)
            ),
            6
          ) * 100;
        this.buyProportion = newVal > 100 ? 100 : newVal;
      }
      //如果为true代表目前手动输入
      if (
        state &&
        Number(this.copeEntrustBuyMoney) &&
        Number(this.copeEntrustBuyRate)
      ) {
        //判断当前金额存在
        this.copeEntrustBuyNum = this.$np.round(
          this.$np.divide(
            this.copeEntrustBuyMoney,
            Number(this.copeEntrustBuyRate)
          ),
          this.findConfigsData.benchmark
        );
      }
      //如果为true代表目前手动输入
      if (
        state &&
        Number(this.copeEntrustBuyMoney) &&
        !Number(this.copeEntrustBuyRate)
      ) {
        //判断当前金额存在并且价格为0 数量直接为0
        this.copeEntrustBuyNum = 0;
      }
      //如果为false代表目前自动输入
      if (
        !state &&
        Number(this.copeEntrustBuyRate) &&
        Number(this.copeEntrustBuyNum)
      ) {
        //如果当前价格存在并且当前数量也存在
        this.copeEntrustBuyMoney = this.$np.round(
          this.$np.times(this.copeEntrustBuyNum, this.copeEntrustBuyRate),
          this.findConfigsData.valuation || 2
        );
      }
    },
    //卖单价格
    inputCopeEntrustSaleRate () {
      //处理金额小数位
      this.copeEntrustSaleRate = this.$commonFn.limitInputNum(
        this.copeEntrustSaleRate,
        9,
        this.findConfigsData.valuation || 2
      );
      if (
        !Number(this.copeEntrustSaleRate) ||
        !Number(this.copeEntrustSaleNum)
      ) {
        //如果当前价格不存在就设置金额为空
        this.copeEntrustSaleMoney = 0;
        this.saleProportion = 0;
      }
      if (Number(this.copeEntrustSaleNum) && Number(this.copeEntrustSaleRate)) {
        //乘 小数四舍五入保留基准币位数
        this.copeEntrustSaleMoney = this.$np.times(
          this.copeEntrustSaleNum,
          this.copeEntrustSaleRate
        );
      }
    },
    //卖单数量
    inputCopeEntrustSaleNum (state) {
      this.isSaleInputState = true;
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      this.copeEntrustSaleNum = this.$commonFn.limitInputNum(
        this.copeEntrustSaleNum,
        9,
        this.findConfigsData.benchmark
      );
      if (
        !Number(this.copeEntrustSaleRate) ||
        !Number(this.copeEntrustSaleNum)
      ) {
        //如果当前价格不存在就设置金额为空
        this.copeEntrustSaleMoney = 0;
        this.saleProportion = 0;
      }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (this.saleBalance && Number(this.copeEntrustSaleNum)) {
        let newVal =
          this.$np.round(
            this.$np.divide(
              Number(this.copeEntrustSaleNum),
              Number(this.saleBalance)
            ),
            6
          ) * 100;
        this.saleProportion = newVal > 100 ? 100 : newVal;
      }
      if (
        !state &&
        Number(this.copeEntrustSaleNum) &&
        Number(this.copeEntrustSaleRate)
      ) {
        //乘 小数四舍五入保留基准币位数
        // this.copeEntrustSaleMoney = this.$np.round(this.$np.times(Number(this.copeEntrustSaleNum), Number(this.copeEntrustSaleRate)), this.findConfigsData.valuation)
        this.copeEntrustSaleMoney = this.$np.times(
          Number(this.copeEntrustSaleNum),
          Number(this.copeEntrustSaleRate)
        );
      }
    },
    //卖单金额
    inputCopeEntrustSaleMoney (val) {
      this.isSaleInputState = true;
      //处理金额小数位
      this.copeEntrustSaleMoney = this.$commonFn.limitInputNum(
        this.copeEntrustSaleMoney,
        9,
        this.findConfigsData.valuation || 2
      );
      //如果卖单金额为空数量就设置为空
      if (!Number(this.copeEntrustSaleMoney)) {
        this.copeEntrustSaleNum = 0;
        this.saleProportion = 0;
      }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (this.saleBalance && Number(this.copeEntrustSaleNum)) {
        let newVal =
          this.$np.round(
            this.$np.divide(
              Number(this.copeEntrustSaleNum),
              Number(this.saleBalance)
            ),
            6
          ) * 100;
        this.saleProportion = newVal > 100 ? 100 : newVal;
      }
      if (
        Number(this.copeEntrustSaleMoney) &&
        Number(this.copeEntrustSaleRate)
      ) {
        //除 小数四舍五入保留计价币位数
        this.copeEntrustSaleNum = this.$np.round(
          this.$np.divide(this.copeEntrustSaleMoney, this.copeEntrustSaleRate),
          this.findConfigsData.benchmark
        );
      }
      //如果为true代表目前手动输入
      if (
        Number(this.copeEntrustSaleMoney) &&
        !Number(this.copeEntrustSaleRate)
      ) {
        //判断当前金额存在并且价格为0 数量直接为0
        this.copeEntrustSaleNum = 0;
      }
    },
    //设置买入量
    getEntrustBuyNum (num) {
      this.BuyNum = num;
      // if (this.buyBalance && !this.isBuyInputState && num != 1) {
      // if (this.buyBalance && !this.isBuyInputState) {
      if (this.buyBalance) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变金额
        this.copeEntrustBuyMoney = this.$np.times(num, this.buyBalance);
        this.copeEntrustBuyMoney = this.$commonFn.limitInputNum(
          this.copeEntrustBuyMoney,
          9,
          this.findConfigsData.valuation || 2
        );
        //如果为true代表目前手动输入
        if (
          Number(this.copeEntrustBuyMoney) &&
          Number(this.copeEntrustBuyRate)
        ) {
          //判断当前金额存在
          this.copeEntrustBuyNum = this.$np.divide(
            this.copeEntrustBuyMoney,
            Number(this.copeEntrustBuyRate)
          );
          this.copeEntrustBuyNum = this.$commonFn.limitInputNum(
            this.copeEntrustBuyNum,
            9,
            this.findConfigsData.benchmark
          );
        }
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变金额
        if (Number(this.copeEntrustBuyNum) && Number(this.copeEntrustBuyRate)) {
          this.copeEntrustBuyMoney = this.$np.times(
            Number(this.copeEntrustBuyNum),
            Number(this.copeEntrustBuyRate)
          );
          this.copeEntrustBuyMoney = this.$commonFn.limitInputNum(
            num == 1 ? this.buyBalance : this.copeEntrustBuyMoney,
            9,
            this.findConfigsData.valuation || 2
          );
        }
        //如果为true代表目前手动输入
        if (
          !Number(this.copeEntrustBuyMoney) ||
          !Number(this.copeEntrustBuyRate)
        ) {
          //判断当前金额存在并且价格为0 数量直接为0
          this.copeEntrustBuyNum = 0;
        }
      }
      if (num == 0) {
        this.copeEntrustBuyNum = "";
        this.copeEntrustBuyMoney = "";
      }
      // this.isBuyInputState = false;
    },
    //设置卖出量
    getEntrustSaleNum (num) {
      this.SaleNum = num;
      // if (this.saleBalance && !this.isSaleInputState) {
      if (this.saleBalance) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变数量
        this.copeEntrustSaleNum = this.$np.times(num, this.saleBalance);
        this.copeEntrustSaleNum = this.$commonFn.limitInputNum(
          num == 1 ? this.saleBalance : this.copeEntrustSaleNum,
          9,
          this.findConfigsData.benchmark
        );
        if (
          Number(this.copeEntrustSaleNum) &&
          Number(this.copeEntrustSaleRate)
        ) {
          //判断数量存在就进行计算金额
          this.copeEntrustSaleMoney = this.$np.times(
            this.copeEntrustSaleRate,
            this.copeEntrustSaleNum
          );
          this.copeEntrustSaleMoney = this.$commonFn.limitInputNum(
            this.copeEntrustSaleMoney,
            9,
            this.findConfigsData.valuation || 2
          );
        }
        if (
          !Number(this.copeEntrustSaleNum) ||
          !Number(this.copeEntrustSaleRate)
        ) {
          this.copeEntrustSaleMoney = 0;
        }
      }
      if (num == 0) {
        this.copeEntrustSaleNum = "";
        this.copeEntrustSaleMoney = "";
      }
      // this.isSaleInputState = false;
    },
    onSelect (item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.limitAndMakerState = false;
      this.limitAndMakerVal = item.value;
      this.copeEntrustBuyNum = 0; //买单数量
      this.copeEntrustSaleNum = 0; //卖单数量
      this.copeEntrustBuyMoney = 0; //买单金额
      this.copeEntrustSaleMoney = 0; //卖单金额
      this.$bus.emit("ProportionVal", 0);
    },
    async initWebsocket () {
      //获取交易对配置
      this.ws = new WebSocket(
        this.$im.webSocketUrl + "/api/v1/buybit/power/ws/merge"
      );
      this.ws.onopen = () => {
        this.ws.send(
          JSON.stringify({ sub: "TopCount", coinTeam: "TGC-USDT" })
        );
        this.ws.send(JSON.stringify({ sub: "Depth", coinTeam: "TGC-USDT" }));
        this.ws.send(JSON.stringify({ sub: "Trade", coinTeam: "TGC-USDT" }));
        if (this.$store.state.token) {
          this.ws.send(
            JSON.stringify({
              sub: "OrderChange",
              coinTeam: "TGC-USDT",
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
        // this.$bus.emit("HashRateOrderChange");
        this.pageCurrentData = [];
        this.total = 0;
        if (this.$store.state.token) {
          this.currentOrder();
        }
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
          // this.$bus.emit('HashRateNewTitleData', res)
          this.newData.isBuy = res.open <= res.close;
          // this.newData.isBuy = res.isBuy;
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
          this.RateVal = Number(res.data.data);
          if (Number(res.data.data)) {
            this.$bus.emit("ExchangeRate", Number(res.data.data));
          }
        }
      });
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

        this.oldBuyData = await newBuyData;
        this.oldSellData = await newSellData;

        if (res.length == 1) {
          //买单数据 如果没有push数据并且是买单就赋值为空
          if (!newBuyData.length && res[0].isBuy) {
            this.buyData = await [];
          }
          //卖单数据 如果没有push数据并且是卖单就赋值为空
          if (!newSellData.length && !res[0].isBuy) {
            this.sellData = await [];
          }
        }
        if (res.length) {
          if (res[0].isBuy) {
            //买单数据
            this.buyData = (await newBuyData.length)
              ? newBuyData
              : this.buyData;
          } else {
            //卖单数据
            this.sellData = (await newSellData.length)
              ? newSellData.slice(newSellData.length - 7, newSellData.length)
              : this.sellData;
          }
        }
        if (res[0].isBuy) {
          this.buyData = await this.buyData.reverse();
          this.buyData = await this.buyData.slice(0, 7);
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
        // 判断卖
        if (!this.limitSellPriceInitState) {
          setTimeout(() => {
            if (this.buyData.length) {
              this.copeEntrustSaleRate = this.buyData[0].price;
            }
            if (!this.buyData.length) {
              this.copeEntrustSaleRate = this.newData.price;
            }
          }, 100);
          this.limitSellPriceInitState = true;
        }
        // 判断买
        if (!this.limitBuyPriceInitState) {
          setTimeout(() => {
            if (this.sellData.length) {
              this.copeEntrustBuyRate = this.sellData[
                this.sellData.length - 1
              ].price;
            }
            if (!this.sellData.length) {
              this.copeEntrustBuyRate = this.newData.price;
            }
          }, 100);
          this.limitBuyPriceInitState = true;
        }
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
      // if (typeof val == "boolean") {
      //   this.isshowDot = val
      // } else {
      this.isshowDot = !this.isshowDot;
      // }
    },
    //点击盘口列表将价格传递给限价
    clickPrice (item) {
      this.$bus.emit("limitHashRatePrice", item.price);
      this.copeEntrustBuyRate = item.price;
      this.copeEntrustSaleRate = item.price;
    },
    onMessageTrade (data) {
      if (data.data && data.data.length) {
        //多条数据
        let res = data.data;
        let newArray = [];
        // console.log(res[0].createTime, res[1].createTime, res[2].createTime, res[3].createTime)
        for (var i = res.length - 1; i >= 0; i--) {
          newArray.push({
            coinTeam: res[i].coinTeam,
            createTime: res[i].createTime,
            dealWay: res[i].dealWay,
            id: res[i].id,
            isBuy: res[i].price >= Number(this.open) ? true : false, //判断价格是否大于开盘价 大于为涨 小于为false
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
        if (this.RealTimeTradeData.length > 21) {
          this.RealTimeTradeData.pop(); //删除最后一个元素
        }
        this.$nextTick(() => {
          //单条数据并且有历史数据数组存在给第一条数据加入数组
          this.RealTimeTradeData.unshift({
            coinTeam: data.data.coinTeam,
            createTime: data.data.createTime,
            dealWay: data.data.dealWay,
            id: data.data.id,
            isBuy: data.data.price >= Number(this.open) ? true : false, //判断价格是否大于开盘价 大于为涨 小于为false
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
          isBuy: data.data.price >= Number(this.open) ? true : false, //判断价格是否大于开盘价 大于为涨 小于为false
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
    },
    clickBuyAndSellSubmit () {
      if (this.token) {
        if (this.isUnlock) {
          if (this.limitAndMakerVal == 1) {
            if (
              this.buyAndSellIndex == 1 &&
              this.findConfigsData.isBuyTransaction
            ) {
              this.buyDeal();
            } else if (
              this.buyAndSellIndex == 2 &&
              this.findConfigsData.isSaleTransaction
            ) {
              this.saleDeal();
            }
          } else {
            if (
              this.buyAndSellIndex == 1 &&
              this.findConfigsData.isMarketBuyTransaction
            ) {
              this.marketBuyDeal();
            } else if (
              this.buyAndSellIndex == 2 &&
              this.findConfigsData.isMarketSaleTransaction
            ) {
              this.marketSaleDeal();
            }
          }
        } else {
          return this.$Toast(this.$t("common.Transfer.h1"));
        }
      } else {
        this.$router.push(`/${this.locale}/Public/Login`);
      }
    },
    //买入交易
    buyDeal () {
      if (this.buyState) return;
      //购买价格不能为0
      if (!Number(this.copeEntrustBuyRate)) {
        return this.$Toast(this.$t("HashRate.pro.limit.notBuyPrice"));
      }
      //购买数量不能为0
      if (!Number(this.copeEntrustBuyNum)) {
        return this.$Toast(this.$t("HashRate.pro.limit.notBuyNum"));
      }
      //购买总金额不能为0
      if (!Number(this.copeEntrustBuyMoney)) {
        return this.$Toast(this.$t("HashRate.pro.limit.notBuyMoney"));
      }
      //不能小于最小量
      if (
        Number(this.copeEntrustBuyNum) <
        Number(this.findConfigsData.minTradeNum)
      ) {
        return this.$Toast(this.$t("HashRate.pro.limit.notBuyMinNum"));
      }
      //判断购买金额是否大于可用余额
      if (Number(this.copeEntrustBuyMoney) > this.buyBalance) {
        return this.$Toast(this.$t("HashRate.pro.limit.notBuyMaxMoney"));
      }
      this.buyState = true;
      let obj = {
        isBuy: true, //买or卖
        price: this.copeEntrustBuyRate, //价格
        number: Number(this.copeEntrustBuyNum), //数量
        total: Number(this.copeEntrustBuyMoney), //总金额
        coinTeam: `${this.symblefrom}-${this.symbleto}`, //交易对
        isMarket: false //市价or限价
        // platform: 1,//平台：1是自己，2是火币，3okey，4币安
      };
      this.$api.HashRate.insert(obj).then(res => {
        if (res && res.data.code === 200) {
          // this.copeEntrustBuyRate = 0
          this.copeEntrustBuyNum = 0;
          this.copeEntrustBuyMoney = 0;
          this.buyProportion = 0;
          this.$bus.emit("ProportionVal", 0);
          //重新获取资产余额
          if (this.$store.state.token) {
            this.findByAssetNames();
            this.currentOrder();
          }
          this.$Toast("提交成功");
        }
        this.buyState = false;
      });
    },
    //卖出交易
    saleDeal () {
      if (this.saleState) return;
      //卖出价格不能为0
      if (!Number(this.copeEntrustSaleRate)) {
        return this.$Toast(this.$t("HashRate.pro.limit.notSellPrice"));
      }
      //卖出数量不能为0
      if (!Number(this.copeEntrustSaleNum)) {
        return this.$Toast(this.$t("HashRate.pro.limit.notSellNum"));
      }
      //卖出总金额不能为0
      if (!Number(this.copeEntrustSaleMoney)) {
        return this.$Toast(this.$t("HashRate.pro.limit.notSellMoney"));
      }
      //不能小于最小量
      if (
        Number(this.copeEntrustSaleNum) <
        Number(this.findConfigsData.minTradeNum)
      ) {
        return this.$Toast(this.$t("HashRate.pro.limit.notSellMinNum"));
      }
      //判断卖出金额是否大于可用余额
      if (Number(this.copeEntrustSaleNum) > this.saleBalance) {
        return this.$Toast(this.$t("HashRate.pro.limit.notSellMaxMoney"));
      }
      this.saleState = true;
      let obj = {
        isBuy: false, //买or卖
        price: this.copeEntrustSaleRate, //价格
        number: Number(this.copeEntrustSaleNum), //数量
        total: Number(this.copeEntrustSaleMoney), //总金额
        coinTeam: `${this.symblefrom}-${this.symbleto}`, //交易对
        isMarket: false //市价or限价
        // platform: 1,//平台：1是自己，2是火币，3okey，4币安
      };
      this.$api.HashRate.insert(obj).then(res => {
        if (res && res.data.code === 200) {
          // this.copeEntrustSaleRate = 0
          this.copeEntrustSaleNum = 0;
          this.copeEntrustSaleMoney = 0;
          this.saleProportion = 0;
          this.$bus.emit("ProportionVal", 0);
          //重新获取资产余额
          if (this.$store.state.token) {
            this.findByAssetNames();
            this.currentOrder();
          }
          this.$Toast("提交成功");
        }
        this.saleState = false;
      });
    },
    //买入交易
    marketBuyDeal () {
      if (this.buyState) return;
      //计算最小加入金额
      let newNum = this.$np.divide(
        Number(this.copeEntrustBuyMoney),
        Number(this.newData.price) > 0 ? Number(this.newData.price) : 1
      );
      //购买总金额不能为0
      if (!Number(this.copeEntrustBuyMoney)) {
        return this.$Toast(this.$t("HashRate.pro.Market.notBuyMoney"));
      }
      //不能小于最小量
      if (Number(newNum) < Number(this.findConfigsData.minTradeNum)) {
        return this.$Toast(this.$t("HashRate.pro.Market.minPrice"));
      }
      //判断购买金额是否大于可用余额
      if (Number(this.copeEntrustBuyMoney) > this.buyBalance) {
        return this.$Toast(this.$t("HashRate.pro.Market.notBuyMaxMoney"));
      }

      this.buyState = true;
      let obj = {
        isBuy: true, //买or卖
        total: Number(this.copeEntrustBuyMoney), //总金额
        coinTeam: `${this.symblefrom}-${this.symbleto}`, //交易对
        isMarket: true //市价or限价
      };
      this.$api.HashRate.insert(obj).then(res => {
        if (res && res.data.code === 200) {
          this.copeEntrustBuyRate = 0;
          this.copeEntrustBuyNum = 0;
          this.copeEntrustBuyMoney = 0;
          this.buyProportion = 0;
          this.$bus.emit("ProportionVal", 0);
          //重新获取资产余额
          if (this.$store.state.token) {
            this.findByAssetNames();
            this.currentOrder();
          }
          this.$Toast("提交成功");
        }
        this.buyState = false;
      });
    },
    //卖出交易
    marketSaleDeal () {
      if (this.saleState) return;
      //卖出数量不能为0
      if (!Number(this.copeEntrustSaleNum)) {
        return this.$Toast(this.$t("HashRate.pro.Market.notSellNum"));
      }
      //不能小于最小量
      if (
        Number(this.copeEntrustSaleNum) <
        Number(this.findConfigsData.minTradeNum)
      ) {
        return this.$Toast(this.$t("HashRate.pro.Market.notSellMinNum"));
      }
      //判断卖出金额是否大于可用余额
      if (Number(this.copeEntrustSaleNum) > this.saleBalance) {
        return this.$Toast(this.$t("HashRate.pro.Market.notSellMaxMoney"));
      }
      this.saleState = true;
      let obj = {
        isBuy: false, //买or卖
        number: Number(this.copeEntrustSaleNum), //数量
        coinTeam: `${this.symblefrom}-${this.symbleto}`, //交易对
        isMarket: true //市价or限价
      };
      this.$api.HashRate.insert(obj).then(res => {
        if (res && res.data.code === 200) {
          this.copeEntrustSaleRate = 0;
          this.copeEntrustSaleNum = 0;
          this.copeEntrustSaleMoney = 0;
          this.saleProportion = 0;
          this.$bus.emit("ProportionVal", 0);
          //重新获取资产余额
          if (this.$store.state.token) {
            this.findByAssetNames();
            this.currentOrder();
          }
          this.$Toast("提交成功");
        }
        this.saleState = false;
      });
    },
    //获取用户多个币种资产
    findByAssetNames () {
      let obj = [`${this.symbleto}`, `${this.symblefrom}`];
      //如果是数据的形式就需要使用JSON.stringify处理下
      obj = JSON.stringify(obj);
      this.$api.HashRate.findByAssetNames(obj).then(res => {
        if (res && res.status === 200) {
          this.allBalance = res.data.data;
          if (this.allBalance.length) {
            this.allBalance.forEach((item, index) => {
              if (item.assetName == this.symbleto) {
                this.buyBalance = item.availableBalance;
              }
              if (item.assetName == this.symblefrom) {
                this.saleBalance = item.availableBalance;
              }
            });
          }
        }
      });
    },
    //撤销当前订单
    revocation () {
      if (this.revocationId) {
        this.$api.HashRate.revocation(this.revocationId).then(res => {
          if (res && res.data.code === 200) {
            this.pageNo = 1;
            this.total = 0;
            this.sumbitTipsState = false;
            this.$Toast("撤销成功");
            this.currentOrder();
            this.findByAssetNames();
          }
        });
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.ordersymble = !this.$route.params.id
      //   ? ""
      //   : this.$route.params.id.replace("_", "/");
      // this.symbleParameArray = !this.$route.params.id
      //   ? null
      //   : this.$route.params.id.split("_").length != 2
      //     ? null
      //     : this.$route.params.id.split("_");
      // this.symbleParameString = !this.$route.params.id
      //   ? ""
      //   : this.$route.params.id.replace("_", "");
      // //获取产品
      // // this.symblefrom = this.symbleParameArray
      // //   ? this.symbleParameArray[0].toUpperCase()
      // //   : "--";
      // this.symblefrom = "XBIT";
      // //获取货币
      // // this.symbleto = this.symbleParameArray
      // //   ? this.symbleParameArray[1].toUpperCase()
      // //   : "--";
      // this.symbleto = "USDT";

      // this.sub = `market.${this.symbleParameString}.detail`;

      // this.initWebsocket();

      // // 注销登录
      // this.$bus.on("user-logout", () => {
      //   this.init();
      // });
      // // 登录成功
      // this.$bus.on("Login-Success", () => {
      //   this.init();
      //   if (this.$store.state.token) {
      //     this.ws.send(
      //       JSON.stringify({
      //         sub: "OrderChange",
      //         coinTeam: "XBIT-USDT",
      //         token: this.$store.state.token
      //       })
      //     );
      //   }
      // });

      // window.addEventListener("resize", this.handleResize);
      // this.$bus.emit("hideFooter", { isShow: false });
      // if (!this.fullWidth) {
      //   this.fullWidth = document.documentElement.clientWidth;
      // }

      // document.addEventListener("click", () => {
      //   this.isshowDot = false;
      // });

      // //最新成交
      // this.init();
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
.HashRate-popupLeft {
  overflow: hidden;
  /deep/.van-search__content {
    background-color: #2a303c;
    .van-icon {
      color: #fff;
    }
  }
  /deep/.van-tabs .van-tabs__wrap {
    position: fixed;
    top: 1.84rem;
    width: 100%;
    z-index: 30;
    background: #21252f;
    border-bottom: 1px solid #383e4d;
  }
  .van-pull-refresh {
    overflow: auto;
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

    .heightAuto {
      img {
        width: 0.45rem;
        height: 0.4rem;
      }
    }
  }

  .bk151b35 {
    /deep/ .van-hairline--top-bottom {
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
      position: fixed;
      bottom: 0;
      max-width: 750px;

      .num.buy {
        padding: 0.22rem 0;
        border-radius: 0.12rem;
        background: $co02AD8F;
      }

      .num.sale {
        padding: 0.22rem 0;
        border-radius: 0.12rem;
        background: $coCB374E;
      }
    }
  }

  .trade {
    .trade-row {
      height: 0.8rem;
    }

    .trade-title-btn {
      border-radius: 0.12rem;
      height: 0.6rem;
      line-height: 0.6rem;

      &.title {
        &.buy.active {
          background: $co02AD8F;
          color: $coffffff;
        }

        &.sell.active {
          background: $coCB374E;
          color: $coffffff;
        }
      }

      &.input {
        height: 0.8rem !important;
        line-height: 0.8rem !important;

        .van-cell-group {
          height: 100%;
          background-color: rgba(0, 0, 0, 0);

          .bknull.van-cell {
            padding: 0 0.1rem;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.26rem;

            /deep/ .van-cell__value {
              .van-field__body {
                input {
                  color: $codbe4fe !important;
                }
              }
            }
          }
        }
      }
    }

    .trade-Depth {
      height: 8.1rem;

      .trade-Depth-title {
        // padding-bottom: 0.13rem;
        height: 0.5rem;
        line-height: 0.5rem;
      }

      .trade-Depth-center {
        // padding: 0.13rem 0;
        height: 0.6rem;
        line-height: 0.6rem;
        font-weight: 900;
      }

      .trade-Depth-buy,
      .trade-Depth-sell {
        position: relative;
        overflow: auto;
        height: 3.5rem;

        .buy.progress {
          background: rgba(3, 191, 123, 0.1);
        }

        .sell.progress {
          background: rgba(235, 77, 92, 0.1);
        }

        .progress {
          position: absolute;
          height: 100%;
          right: 0;
          top: 0;
          z-index: 0;
        }
      }

      .trade-Depth-buy {
        & > div {
          position: relative;
          height: 0.5rem;
          line-height: 0.5rem;
        }
      }

      .trade-Depth-sell {
        & > div {
          position: absolute;
          bottom: 0;

          & > div {
            position: relative;
            height: 0.5rem;
            line-height: 0.5rem;
          }
        }
      }
    }

    .trade-title-num {
      margin-top: 0.8rem;

      &.slider {
        /deep/ .block_slider_dot {
          background-color: #12b4ff;
        }

        /deep/ .van-slider__button {
          width: 0.3rem !important;
          height: 0.3rem !important;
        }

        /deep/ .van-slider {
          background-color: #5e6573;

          .van-slider__bar {
            background: #12b4ff;
          }
        }
      }
    }

    .trade-title-price {
      margin-top: 0.2rem;
    }

    .trade-title-btns {
      margin-top: 0.6rem;
    }

    .tradeOrder {
      .tradeOrder-listNoData {
        img {
          width: 4rem;
        }

        p {
          padding: 0.6rem 0 0.4rem;
        }
      }

      .tradeOrder-list {
        padding: 0.2rem 0;
        border-bottom: 0.02rem solid #2e3759;

        .tradeOrder-list-title {
          padding-bottom: 0.2rem;

          .imgMiddle {
            img {
              width: 0.2rem;
            }
          }

          .tradeOrder-list-title-type {
            width: 0.45rem;
            color: #ffffff;
            padding: 0.05rem;
            border-radius: 0.1rem;

            &.buy {
              background: $co02AD8F;
            }

            &.sell {
              background: $coCB374E;
            }
          }
        }

        .tradeOrder-list-content {
          .cl93a4da {
            padding-top: 0.1rem;
          }
        }
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.limitAndMaker {
  position: relative;
  padding: 0.3rem 0;

  &::after {
    position: absolute;
    top: 50%;
    right: 0.3rem;
    margin-top: -5px;
    border: 3px solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: 0.8;
    content: '';
  }
}
</style>