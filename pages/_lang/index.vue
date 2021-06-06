<template>
  <div class="buybitHome">
    <van-nav-bar class="bk191D24-05 clffffff h092 fixed top-0 w-full z-10">
      <template #left>
        <div
          @click="showPersonalCenter"
          class="flex-none left fs30 clffffff"
        >
          <img
            class="w-2 rounded-full"
            src="~/assets/image/home/logo1.png"
            alt=""
          >
        </div>
      </template>
      <template #title>
        <span class="fs36 clffffff">首页</span>
        <!-- <img
          class="w-2"
          src="~/assets/image/home/logo1.png"
          alt=""
        > -->
      </template>
      <template #right>
        <div class="flex-none relative flex items-center">
          <!-- <nuxt-link :to="`/${locale}/Public/Search`">
            <img
              class="w-2"
              src="~/assets/svg/icon-search.svg"
              alt=""
            >
          </nuxt-link> -->
          <nuxt-link
            class="notice_center ml-1"
            :to="`/${locale}/Public/Notice`"
          >
            <img
              class="w-2"
              src="~/assets/svg/Frame.svg"
              alt=""
            >
            <span class="flex absolute wh015 top-0 right-0">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bk02AD8F opacity-75"></span>
              <span class="relative inline-flex rounded-full wh015 bk02AD8F"></span>
            </span>
          </nuxt-link>
        </div>
      </template>
    </van-nav-bar>

    <van-pull-refresh
      class="t-092 relative chartContentHeight overflow-y-auto"
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

      <div class="banner-wrap px-1 pt-1 rounded">
        <section v-if="bannerData.length">
          <van-swipe
            class="banner-wrap-img"
            :autoplay="7000"
            indicator-color="white"
          >
            <van-swipe-item
              v-for="(item, index) in bannerData"
              :key="index"
            >
              <a
                @click="clickNeedLogin()"
                v-if="item.needLogin && !token"
                href="#"
              >
                <img
                  class="rounded-sm"
                  :src="`${item.imageUrl}`"
                  alt=""
                />
              </a>
              <a
                v-else
                :href="item.linkAddress"
              >
                <img
                  class="rounded-sm"
                  :src="`${item.imageUrl}`"
                  alt=""
                />
              </a>
            </van-swipe-item>
          </van-swipe>
        </section>
        <section v-if="!bannerData.length">
          <van-swipe
            class="banner-wrap-img"
            :autoplay="7000"
            indicator-color="white"
          >
            <van-swipe-item>
              <a>
                <img
                  src="~/assets/image/home/banner2.png"
                  alt=""
                />
              </a>
            </van-swipe-item>
            <van-swipe-item>
              <a>
                <img
                  src="~/assets/image/home/banner3.png"
                  alt=""
                />
              </a>
            </van-swipe-item>
            <van-swipe-item>
              <a>
                <img
                  src="~/assets/image/home/banner4.png"
                  alt=""
                />
              </a>
            </van-swipe-item>
          </van-swipe>
        </section>
      </div>
      <div class="noticeWrap py-0125 px-1 flex items-center">
        <div class="leftHidden">
          <!-- <i class="iconfont icon-tongzhi fs40 clffffff"></i> -->
          <img
            src="~/assets/image/home/icon_notice.png"
            alt=""
          >
        </div>
        <van-swipe
          indicator-color="white"
          :autoplay="3000"
          class="notice flex-1"
          :show-indicators="false"
        >
          <van-swipe-item
            v-for="(item, index) in newsData"
            :key="index"
          >
            <div
              class="singltTips fs24 clffffff"
              @click="toSingleArt(item)"
            >
              {{ item.title }}
            </div>
          </van-swipe-item>
        </van-swipe>
        <nuxt-link :to="`/${locale}/Public/Notice`">
          <div class="rigthHidden">
            <img
              src="~/assets/svg/more.svg"
              alt=""
            >
          </div>
        </nuxt-link>
      </div>

      <div class="bk1D088B rounded-sm">
        <div class="">
          <div class="py-1 flex items-center justify-between text-center border-b bc-487DC6 mx-1">
            <div class="text-left">
              <div class="flex items-center fs24">
                <span class="clffffff font-semibold">BTC/USDT</span>
                <span
                  :class="(Number(BTCData.close) / Number(BTCData.open) - 1) > 0 ? 'cl02AD8F' : 'clCB374E'"
                  class="ml-075"
                >
                  <ICountUp
                    :delay="0.6"
                    :options="CountUpOptions"
                    :endVal="BTCData.close ? (Number(BTCData.close) / Number(BTCData.open) - 1) * 100 : 0"
                  ></ICountUp>
                  %
                </span>
              </div>
              <p
                :class="(Number(BTCData.close) / Number(BTCData.open) - 1) > 0 ? 'cl02AD8F' : 'clCB374E'"
                class="fs40 font-semibold DINAlternate"
              >
                <ICountUp
                  :delay="0.6"
                  :options="CountUpOptions"
                  :endVal="BTCData.close"
                ></ICountUp>
              </p>
              <p class="fs22 cl02AD8F">
                <span>¥ </span>
                <ICountUp
                  :delay="0.6"
                  :options="CountUpOptions"
                  :endVal="BTCData.close * exchangeRateData"
                ></ICountUp>
              </p>
            </div>
            <div class="text-left">
              <div class="flex items-center fs24">
                <span class="clffffff font-semibold">ETH/USDT</span>
                <span
                  :class="(Number(ETHData.close) / Number(ETHData.open) - 1) > 0 ? 'cl02AD8F' : 'clCB374E'"
                  class="ml-075"
                >
                  <ICountUp
                    :delay="0.6"
                    :options="CountUpOptions"
                    :endVal="ETHData.close ? (Number(ETHData.close) / Number(ETHData.open) - 1) * 100 : 0"
                  ></ICountUp>
                  %
                </span>
              </div>
              <p
                :class="(Number(ETHData.close) / Number(ETHData.open) - 1) > 0 ? 'cl02AD8F' : 'clCB374E'"
                class="fs40 font-semibold DINAlternate"
              >
                <ICountUp
                  :delay="0.6"
                  :options="CountUpOptions"
                  :endVal="ETHData.close"
                ></ICountUp>
              </p>
              <p class="fs22 cl02AD8F">
                <span>¥ </span>
                <ICountUp
                  :delay="0.6"
                  :options="CountUpOptions"
                  :endVal="ETHData.close * exchangeRateData"
                ></ICountUp>
              </p>
            </div>
            <div class="text-left">
              <div class="flex items-center fs24">
                <span class="clffffff font-semibold">TGC/USDT</span>
                <span class="cl02AD8F ml-075">
                  <ICountUp
                    :delay="0.6"
                    :options="CountUpOptions"
                    :endVal="0.00"
                  ></ICountUp>
                  %
                </span>
              </div>
              <p class="fs40 font-semibold cl02AD8F DINAlternate">
                <ICountUp
                  :delay="0.6"
                  :options="CountUpOptions"
                  :endVal="orderDepthData.price"
                ></ICountUp>
              </p>
              <p class="fs22 cl02AD8F">
                <span>¥ </span>
                <ICountUp
                  :delay="0.6"
                  :options="CountUpOptions"
                  :endVal="orderDepthData.price * exchangeRateData"
                ></ICountUp>
              </p>
            </div>
          </div>
        </div>

        <div class="py-1 border-b bc-487DC6 mx-1">
          <div class="grid grid-cols-4 gap-x-3 gap-y-1 fs28 clffffff text-center leading-3">
            <nuxt-link :to="`/${locale}/Home/Ecology`">
              <div>
                <img
                  class="w-3/4 mx-auto"
                  src="~/assets/img/home/icon_ecology.png"
                  alt=""
                >
                <p>生态</p>
              </div>
            </nuxt-link>
            <nuxt-link :to="`/${locale}/Home/NodeApplication`">
              <div>
                <img
                  class="w-3/4 mx-auto"
                  src="~/assets/img/home/icon_Promotion.png"
                  alt=""
                >
                <p>节点申请</p>
              </div>
            </nuxt-link>
            <div @click="SuperRebateBox = true">
              <img
                class="w-3/4 mx-auto"
                src="~/assets/img/home/icon_invitation.png"
                alt=""
              >
              <p>邀请好友</p>
            </div>
            <nuxt-link :to="`/${locale}/Home/Community`">
              <div>
                <img
                  class="w-3/4 mx-auto"
                  src="~/assets/img/home/icon_community.png"
                  alt=""
                >
                <p>矿工社区</p>
              </div>
            </nuxt-link>

            <div @click="$Toast('功能开发中')">
              <div>
                <img
                  class="w-3/4 mx-auto"
                  src="~/assets/img/home/icon_defi.png"
                  alt=""
                >
                <p>DEFI</p>
              </div>
            </div>
            <div @click="$Toast('功能开发中')">
              <div>
                <img
                  class="w-3/4 mx-auto"
                  src="~/assets/img/home/icon_FIL.png"
                  alt=""
                >
                <p>FIL</p>
              </div>
            </div>
            <div @click="$Toast('功能开发中')">
              <div>
                <img
                  class="w-3/4 mx-auto"
                  src="~/assets/img/home/icon_XCH.png"
                  alt=""
                >
                <p>XCH</p>
              </div>
            </div>
            <div @click="$Toast('功能开发中')">
              <div>
                <img
                  class="w-3/4 mx-auto"
                  src="~/assets/img/home/icon_SHANGCHDENG.png"
                  alt=""
                >
                <p>商城</p>
              </div>
            </div>
            <!-- <nuxt-link :to="`/${locale}/Home/DataCenter`">
              <div>
                <img
                  class=""
                  src="~/assets/img/home/icon_data.png"
                  alt=""
                >
                <p>数据中心</p>
              </div>
            </nuxt-link> -->
            <!-- <div>
              <img
                class=""
                src="~/assets/svg/home/icon_defi.svg"
                alt=""
              >
              <p>DeFei</p>
            </div> -->
          </div>
          <!-- <nuxt-link :to="`/${locale}/Trade`">
            <div class="px-1 flex items-center justify-between">
              <div class="flex-none">
                <img
                  class="w-3"
                  src="~/assets/svg/Group.svg"
                  alt=""
                >
              </div>
              <div class="text-left flex-1 px-2">
                <p class="fs32 clffffff">快捷买币</p>
                <p class="fs24 cl02AD8F">支持BTC、USDT、ETH等</p>
              </div>
              <div>
                <img
                  class="w-5"
                  src="~/assets/svg/homebutton.svg"
                  alt=""
                >
              </div>
            </div>
          </nuxt-link> -->
        </div>

        <div class="pb-1">
          <div class="px-1">
            <div class="flex items-center justify-between py-1">
              <div class="fs30 clffffff flex items-center">
                <span class="cl02AD8F fs24 font-black">| </span>
                <span class="ml-075">资讯</span>
              </div>
              <nuxt-link :to="`/${locale}/Public/News`">
                <span class="fs26 cl487DC6">更多 ></span>
              </nuxt-link>
            </div>
            <nuxt-link
              :to="`/${locale}/Public/News/Details/${item.id}`"
              v-for="(item, index) in informationData"
              :key="index"
              class="my-1 pb-1 flex items-center justify-between border-b bc-487DC6"
            >
              <div class="pr-2">
                <p class="fs28 clffffff">{{item.title}}</p>
                <p class="fs20 cl3A53B8 mt01">{{item.createTime}}</p>
              </div>
              <img
                class="w-10 h-4"
                :src="item.image"
                alt=""
              >
            </nuxt-link>
            <!-- <van-tabs
              class="transparent"
              @click="changeCoin"
            >
              <van-tab title="涨幅榜">
                <div class="flex items-center justify-between mt-1">
                  <div class="cl02AD8F fs24">交易对</div>
                  <div class="cl02AD8F fs24">最新价</div>
                  <div class="cl02AD8F fs24">涨跌幅</div>
                </div>
                <ul class="mt005">
                  <li
                    class="flex items-center justify-between fs32 my-1"
                    v-for="index in 10"
                    :key="index"
                  >
                    <div class="cl02AD8F fs24"><span class="fs32 clffffff">BTC </span>/USDT</div>
                    <div class="cl02AD8F">$10000.29</div>
                    <div class="flex-none bk02AD8F clffffff px-1 py-05 rounded-xs fs28">+10.00%</div>
                  </li>
                </ul>
              </van-tab>
              <van-tab title="成交额榜">
                <div class="flex items-center justify-between mt-1">
                  <div class="cl02AD8F">交易对</div>
                  <div class="cl02AD8F">最新价</div>
                  <div class="cl02AD8F">涨跌幅</div>
                </div>
              </van-tab>
              <van-tab title="新币榜">
                <div class="flex items-center justify-between mt-1">
                  <div class="cl02AD8F">交易对</div>
                  <div class="cl02AD8F">最新价</div>
                  <div class="cl02AD8F">涨跌幅</div>
                </div>
              </van-tab>
            </van-tabs> -->
          </div>
        </div>
      </div>
    </van-pull-refresh>

    <van-popup
      class="br12 bknull"
      v-model="showHintPop"
    >
      <div class="bk1e2643 br12 hint-pop-wrap">
        <div class="fs32 cldbe4fe title">{{ $t("index.tishi") }}</div>
        <div class="text-wrap ">
          <div class="fs28 cl93a4da ma-t-20">{{ $t("index.descript1") }}。</div>
          <div class="fs28 cl93a4da">{{ $t("index.descript2") }}。</div>
          <div class="fs28 cl93a4da">
            {{ $t("index.descript3") }}
          </div>
        </div>
        <div>
          <van-checkbox
            shape="square"
            v-model="checked"
            checked-color="#17BC95"
            @change="danxuanChecked(checked)"
          >
            <span class="fs28 cl606d82 no-hint">{{
              $t("index.buzaitishi")
            }}</span>
          </van-checkbox>
        </div>
        <div class="ju-sb ma-t-20 btn-wrap">
          <div
            @click="closeHintState"
            class="br12 fs30 tc cl17BC95"
          >
            {{ $t("index.close") }}
          </div>
          <div
            @click="editHintState"
            class="br12 fs30 tc clffffff bk17BC95"
          >
            {{ $t("index.chakanxiangqing") }}
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 个人中心 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="personalCenterBox"
      position="left"
    >
      <div class="p-2">
        <van-icon
          @click="personalCenterBox = false"
          class="clffffff fs40"
          name="arrow-left"
        />
        <div class="flex items-center justify-between mt-2">
          <div
            v-if="!token"
            @click="logOut"
            class="fs48 font-bold w-2/3"
          >登录/注册</div>
          <div
            v-else
            class="w-2/3"
          >
            <div class="flex items-center fs44 clffffff Ellipsis">
              Hi,{{UserInfo.userName}}
            </div>
            <!-- <nuxt-link :to="`/${locale}/AuthInfo`">
              <div class="flex items-center my-05">
                <span class="bk02AD8F rounded-sm py003-px010 clffffff fs24">身份待认证</span>
                <van-icon
                  class="fs36 cl02AD8F ml-075"
                  name="arrow"
                />
              </div>
            </nuxt-link> -->
            <div
              @click="changeUser = true"
              class="flex items-center my-05"
            >
              <span class="bk02AD8F rounded-sm py003-px010 clffffff fs24">切换账号</span>
              <van-icon
                class="fs36 cl02AD8F ml-075"
                name="arrow"
              />
            </div>
            <!-- <p class="fs28 clC5FAF3 mt-1">我的积分:{{UserInfo.gamePoints}}</p> -->
            <p class="fs28 clC5FAF3">ID:{{UserInfo.id}}</p>
          </div>
          <div class="w-1/3">
            <img
              class="h-8"
              src="~/assets/svg/illustration.svg"
              alt=""
            >
          </div>
        </div>
      </div>
      <ul>

        <!-- <li class="border-b bc-487DC6 py-1 cl02AD8F fs32 px-1"> -->
        <li class="cl02AD8F fs32 px-1">
          <!-- <div
            @click="MissionCenterBox = true"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <img
                class="wh04"
                src="~/assets/svg/icon_task.svg"
                alt=""
              >
              <span class="ml-1">任务中心</span>
            </div>
            <van-icon name="arrow" />
          </div> -->
          <!-- <div class="flex items-center justify-between my-1">
            <div class="flex items-center">
              <img class="wh04" src="~/assets/svg/icon_Card.svg" alt="">
              <span class="ml-1">卡劵中心</span>
            </div>
            <van-icon name="arrow" />
          </div> -->
          <nuxt-link
            :to="`/${locale}/Assets/MyIntegral`"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <img
                class="wh04"
                src="~/assets/svg/icon_task.svg"
                alt=""
              >
              <span class="ml-1">我的积分</span>
            </div>
            <van-icon name="arrow" />
          </nuxt-link>
          <nuxt-link
            :to="`/${locale}/Home/Community`"
            class="flex items-center justify-between mt-1"
          >
            <div class="flex items-center">
              <img
                class="wh04"
                src="~/assets/svg/icon_Notice.svg"
                alt=""
              >
              <span class="ml-1">我的社群</span>
            </div>
            <van-icon name="arrow" />
          </nuxt-link>
          <div
            @click="SuperRebateBox = true"
            class="pt-1 flex items-center justify-between"
          >
            <div class="flex items-center">
              <img
                class="wh04"
                src="~/assets/svg/icon-Rebate.svg"
                alt=""
              >
              <span class="ml-1">我的推广</span>
            </div>
            <van-icon name="arrow" />
          </div>
          <!-- <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img class="wh04" src="~/assets/svg/icon_Pay.svg" alt="">
              <span class="ml-1">支付</span>
            </div>
            <van-icon name="arrow" />
          </div> -->
        </li>

        <li class="cl02AD8F fs32 px-1">
          <!-- <nuxt-link :to="`/${locale}/Public/Message`">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img
                  class="wh04"
                  src="~/assets/svg/icon_Notice.svg"
                  alt=""
                >
                <span class="ml-1">通知</span>
              </div>
              <van-icon name="arrow" />
            </div>
          </nuxt-link> -->
          <!-- <nuxt-link :to="`/${locale}/Trade/C2C/PaymentMethod`">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center">
                <img
                  class="wh04"
                  src="~/assets/svg/icon_Receivepayment.svg"
                  alt=""
                >
                <span class="ml-1">收款方式</span>
              </div>
              <van-icon name="arrow" />
            </div>
          </nuxt-link> -->
          <div
            @click="modifyPasswordBox = true"
            class="flex items-center justify-between my-1"
          >
            <div class="flex items-center">
              <img
                class="wh04"
                src="~/assets/svg/icon_Safety.svg"
                alt=""
              >
              <span class="ml-1">修改密码</span>
            </div>
            <van-icon name="arrow" />
          </div>
          <div
            @click="payPasswordBox = true"
            class="flex items-center justify-between my-1"
          >
            <div class="flex items-center">
              <img
                class="wh04"
                src="~/assets/svg/icon_help.svg"
                alt=""
              >
              <span class="ml-1">支付密码</span>
            </div>
            <van-icon name="arrow" />
          </div>
          <!-- <div
            @click="C2CHelpCenterBox = true"
            class="flex items-center justify-between my-1"
          >
            <div class="flex items-center">
              <img
                class="wh04"
                src="~/assets/svg/icon_help.svg"
                alt=""
              >
              <span class="ml-1">C2C帮助中心</span>
            </div>
            <van-icon name="arrow" />
          </div> -->
          <div
            @click="settingBox = true"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <img
                class="wh04"
                src="~/assets/svg/icon_setting.svg"
                alt=""
              >
              <span class="ml-1">设置</span>
            </div>
            <van-icon name="arrow" />
          </div>
        </li>
      </ul>
      <div
        @click="logOut"
        class="bk2F3441 rounded-sm clffffff fs32 text-center mt-2 py-1 mx-1"
      >
        退出登录
      </div>
      <!-- <p class="py-2 px-1 fs20 cl727988">请不要透露密码、短信、和谷歌验证给任何人、包括奇迹TGC的工作人员</p> -->
    </van-popup>

    <!-- 切换账户 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="changeUser"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="changeUser = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">切换账户</span>
        </template>
      </van-nav-bar>

      <div class="bk1D088B rounded-sm mx-1 mt-1 clffffff fs28">
        <van-swipe-cell
          v-for="(item, index) in UserInfoArray"
          :key="index"
        >
          <div
            @click="changeUserInfo(item)"
            :class="index != 0 ? 'border-t bc-487DC6' : ''"
            class="p-1 wechat flex items-center justify-between"
          >
            <span>用户名：{{item.userName}}</span>
            <van-icon
              v-if="item.token == UserInfo.token"
              class="fs32 cl02AD8F"
              name="checked"
            />
          </div>
          <template #right>
            <van-button
              @click="deleteUserInfo(item)"
              square
              type="danger"
              text="删除"
            />
          </template>
        </van-swipe-cell>
        <!-- <div
          @click="changeUserInfo(item)"
          v-for="(item, index) in UserInfoArray"
          :key="index"
          :class="index != 0 ? 'border-t bc-487DC6' : ''"
          class="p-1 wechat flex items-center justify-between"
        >
          <span>{{item.userName}}</span>
          <van-icon
            v-if="item.token == UserInfo.token"
            class="fs32 cl02AD8F"
            name="checked"
          />
        </div> -->
      </div>
      <div class="flex items-center justify-between fs24 mt-1 cl02AD8F px-1">
        <span>向左滑动可选择性删除账户</span>
      </div>
      <nuxt-link :to="`/${locale}/Public/Login?isBack=true`">
        <div class="bk2F3441 rounded-sm clffffff fs32 text-center mt-2 py-1 mx-1">
          添加账户
        </div>
      </nuxt-link>
    </van-popup>

    <!-- 支付密码 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="payPasswordBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="payPasswordBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">支付密码</span>
        </template>
      </van-nav-bar>

      <div class="bk1D088B rounded-sm mx-1 mt-1 clffffff fs28">
        <div
          @click="modifyPayPasswordBox = true"
          class="p-1 wechat flex items-center justify-between border-b bc-487DC6"
        >
          <span>修改支付密码</span>
          <van-icon
            class="fs32"
            name="arrow"
          />
        </div>
        <div
          @click="forgetPayPasswordBox = true"
          class="p-1 zfb flex items-center justify-between"
        >
          <span>忘记支付密码</span>
          <van-icon
            class="fs32"
            name="arrow"
          />
        </div>
      </div>
    </van-popup>

    <!-- 修改支付密码 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="modifyPayPasswordBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="modifyPayPasswordBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">修改支付密码</span>
        </template>
      </van-nav-bar>

      <div class="mt-2 px-1">
        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>旧密码</span>
        </div>
        <van-field
          v-model="changePwdParams.password"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          type="password"
          placeholder="请输入旧密码"
        >
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>新密码</span>
        </div>
        <van-field
          v-model="changePwdParams.newpassword"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          type="password"
          placeholder="请输入新密码"
        >
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>再次输入密码</span>
        </div>
        <van-field
          v-model="changePwdParams.qpassword"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          type="password"
          placeholder="请输入再次输入密码"
        >
        </van-field>
      </div>

      <div class="bk21252F p-1 fs28 cl02AD8F shadow-lg fixed w-full bottom-0">
        <div
          @click="changePwd(2)"
          class="bk02AD8F rounded-sm clffffff fs32 text-center py-1"
        >
          提交
        </div>
      </div>
    </van-popup>

    <!-- 忘记支付密码 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="forgetPayPasswordBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="forgetPayPasswordBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">忘记支付密码</span>
        </template>
      </van-nav-bar>

      <div class="mt-2 px-1">
        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>助记词</span>
        </div>
        <div class="mt01 p-1 bk21252F clffffff fs28 rounded-sm grid grid-cols-4 space-y-1">
          <span
            @click="clickGetoldMnemonicData(item)"
            v-for="(item, index) in getoldMnemonicData"
            :key="index"
            :style="index == 0 ? '--space-y-reverse: 0;margin-top: calc(0.25rem * calc(1 - var(--space-y-reverse)));margin-bottom: calc(0.25rem * var(--space-y-reverse));' : ''"
          >
            <van-badge :content="getoldMnemonicArrayIndex.indexOf(item) >= 0 ? getoldMnemonicArrayIndex.indexOf(item) + 1 : ''">
              <span
                :class="getoldMnemonicArrayIndex.includes(item) && 'bk02AD8F'"
                class="px-010 py-0.5 rounded-sm inline-block"
              >{{item}}</span>
            </van-badge>
          </span>
        </div>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>新密码</span>
        </div>
        <van-field
          v-model="forgetPayPwdParams.newpassword"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          type="password"
          placeholder="请输入新密码"
        >
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>再次输入密码</span>
        </div>
        <van-field
          v-model="forgetPayPwdParams.qpassword"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          type="password"
          placeholder="请输入再次输入密码"
        >
        </van-field>
      </div>

      <div class="bk21252F p-1 fs28 cl02AD8F shadow-lg fixed w-full bottom-0">
        <div
          @click="forgetPayPwd"
          class="bk02AD8F rounded-sm clffffff fs32 text-center py-1"
        >
          提交
        </div>
      </div>
    </van-popup>

    <!-- 修改密码 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="modifyPasswordBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="modifyPasswordBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">修改密码</span>
        </template>
      </van-nav-bar>

      <div class="mt-2 px-1">
        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>旧密码</span>
        </div>
        <van-field
          v-model="changePwdParams.password"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          type="password"
          placeholder="请输入旧密码"
        >
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>新密码</span>
        </div>
        <van-field
          v-model="changePwdParams.newpassword"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          type="password"
          placeholder="请输入新密码"
        >
        </van-field>

        <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
          <span>再次输入密码</span>
        </div>
        <van-field
          v-model="changePwdParams.qpassword"
          class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
          center
          type="password"
          placeholder="请输入再次输入密码"
        >
        </van-field>
      </div>

      <div class="bk21252F p-1 fs28 cl02AD8F shadow-lg fixed w-full bottom-0">
        <div
          @click="changePwd(1)"
          class="bk02AD8F rounded-sm clffffff fs32 text-center py-1"
        >
          提交
        </div>
      </div>
    </van-popup>

    <!-- 账户活动 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="accountActivityBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092 fixed top-0 w-full z-10"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="accountActivityBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">账户活动</span>
        </template>
      </van-nav-bar>
      <van-pull-refresh
        class="t-092 relative px-1 ContentHeight overflow-auto"
        v-model="isLoading"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          class="w-full h-full"
        >
          <div
            class="bk21252F rounded-sm shadow-lg p-1 cl02AD8F mb-1 fs28"
            v-for="index in 20"
            :key="index"
          >
            <div class="flex items-center justify-between cl02AD8F">
              <span>时间：</span>
              <span class="clffffff">2021-04-07 15:54:21</span>
            </div>
            <div class="flex items-center justify-between cl02AD8F my-1">
              <span>来源：</span>
              <span class="clffffff">iOS</span>
            </div>
            <div class="flex items-center justify-between cl02AD8F my-1">
              <span>登录地：</span>
              <span class="clffffff">Chengdu，CN</span>
            </div>
            <div class="flex items-center justify-between cl02AD8F">
              <span>IP地址：</span>
              <span class="clffffff">110.185.17.46</span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </van-popup>

    <!-- 我的推广 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      :class="GeneratePosterCompleteShow ? 'overflow-hidden' : ''"
      v-model="SuperRebateBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="SuperRebateBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs36 clffffff">我的邀请码</span>
        </template>
        <!-- <template #right>
          <van-icon
            @click="RebateInstructionsBox = true"
            class="clffffff fs32"
            name="question-o"
          />
        </template> -->
      </van-nav-bar>

      <div class="absolute ContentHeight overflow-auto t-092 w-full">
        <img
          class="w-full h1070"
          src="~/assets/img/Home/bgimg.png"
          alt=""
        >

        <div class="SuperRebateBox px-1 pb-2">
          <!-- <div class="bk21252F rounded-sm border-t-2 bc-co02AD8F fs20 clDADEE5 py-1">
            <div class="flex items-center">
              <div class="w-1/5">
                <img
                  class="wh04 mx-auto"
                  src="~/assets/svg/icon_invite.svg"
                  alt=""
                >
              </div>
              <div class="w-1/5">
                <img
                  class="w-full mx-auto"
                  src="~/assets/svg/arrow.svg"
                  alt=""
                >
              </div>
              <div class="w-1/5">
                <img
                  class="wh04 mx-auto"
                  src="~/assets/svg/icon_Buddy-1.svg"
                  alt=""
                >
              </div>
              <div class="w-1/5">
                <img
                  class="w-full mx-auto"
                  src="~/assets/svg/arrow.svg"
                  alt=""
                >
              </div>
              <div class="w-1/5">
                <img
                  class="wh04 mx-auto"
                  src="~/assets/svg/icon_reward-1.svg"
                  alt=""
                >
              </div>
            </div>
            <div class="flex items-center justify-between text-center mt015">
              <div class="w-1/5">
                <p>发送邀请</p>
                <p>给好友</p>
              </div>
              <div class="w-1/5">
                <p>好友注册</p>
                <p>并进行交易</p>
              </div>
              <div class="w-1/5">
                <p>活动相应</p>
                <p>比例奖励</p>
              </div>
            </div>
          </div> -->

          <div class="rounded-sm clDADEE5 p-1 mt-1">
            <!-- <div class="flex items-center justify-between">
              <div>我的邀请链接</div>
              <div class="bk0A1121 rounded-sm py003-px010 flex items-center">
                <div class="truncate w-12">https://www.baidu.com/zh-CN/</div>
                <img
                  class="w-1 ml-1"
                  v-clipboard:copy="'https://www.baidu.com/zh-CN/'"
                  v-clipboard:success="onCopy"
                  src="~/assets/svg/icon_copy.svg"
                  alt=""
                >
              </div>
            </div>
            <div class="flex items-center justify-between mt-016">
              <div>我的邀请码</div>
              <div class="bk0A1121 rounded-sm py003-px010 flex items-center">
                <div class="truncate w-12">https://www.baidu.com/zh-CN/</div>
                <img
                  class="w-1 ml-1"
                  v-clipboard:copy="'https://www.baidu.com/zh-CN/'"
                  v-clipboard:success="onCopy"
                  src="~/assets/svg/icon_copy.svg"
                  alt=""
                >
              </div>
            </div> -->
            <div class="mt-016">
              <div>
                <img
                  class="w-2/5 mx-auto"
                  src="~/assets/img/Home/title.png"
                  alt=""
                >
              </div>
              <div class="py-1">
                <!-- style="padding: 0.1rem; background: white;" -->
                <QrcodeVue
                  :value="'https://www.baidu.com/zh-CN/'"
                  class="w-2/5 mx-auto flex items-center justify-center"
                ></QrcodeVue>
              </div>
              <div class="flex items-center justify-center space-x-1">
                <span class="clffffff fs36">{{UserInfo.referralCode}}</span>
                <img
                  class="w-1"
                  v-clipboard:copy="UserInfo.referralCode"
                  v-clipboard:success="onCopy"
                  src="~/assets/img/copy.png"
                  alt=""
                >
              </div>
              <div class="flex items-center justify-center space-x-1 py-1 px-3">
                <div
                  v-clipboard:copy="UserInfo.invitationLink"
                  v-clipboard:success="onCopy"
                  class="w-1/3 button button-xl fs32 bk02AD8F clffffff flex-1"
                >
                  复制链接
                </div>
                <div
                  @click="savePic"
                  class="w-1/3 button button-xl fs32 bk0070F3 clffffff flex-1"
                >
                  保存图片
                </div>
              </div>
              <!-- <div
                @click="GeneratePosterShow = true"
                class="button button-xl fs32 bk02AD8F clffffff flex-1"
              >
                生成邀请海报
              </div>
              <div
                @click="InvitationShow = true"
                class="button button-xl fs32 bk0070F3 clffffff flex-1"
              >
                面对面邀请
              </div> -->
            </div>

            <!-- 生成海报完成 -->
            <van-overlay
              :show="GeneratePosterCompleteShow"
              @click="GeneratePosterCompleteShow = false"
            >
              <div
                class="absolute w-full h-full flex items-center justify-center z-50 bg-Overlay"
                v-show="firstFlag"
              >
                <van-loading
                  size="24px"
                  color="#02AD8F"
                >海报生成中...</van-loading>
              </div>
              <div
                v-if="firstFlag"
                class="flex items-center justify-center w-full h-full relative"
                id="captureId"
              >
                <img
                  class="w-full h-full"
                  :src="posterList[posterListIndex].img"
                  alt=""
                >
                <img
                  class="SuperRebateBox-Img"
                  src="~/assets/img/qrcode_localhost.png"
                  alt=""
                >
              </div>
              <div
                v-if="!firstFlag"
                class="flex items-center justify-center w-full h-full relative"
              >
                <img
                  class="w450 rounded"
                  :src="dataURL"
                  alt=""
                />
              </div>
            </van-overlay>

            <!-- 选择海报 -->
            <van-action-sheet
              class="GeneratePosterShow"
              v-model="GeneratePosterShow"
              title="选择海报"
            >
              <div class="py-1 flex items-center overflow-auto">
                <div
                  v-for="(item, index) in posterList"
                  :key="index"
                  @click="posterListIndex = index"
                  :class="posterListIndex == index ? 'border bc-co02AD8F scale-110' : ''"
                  class="rounded-sm mx-1 transition duration-300 ease-in-out transform"
                >
                  <img
                    class="w-12 rounded-sm"
                    :src="item.img"
                    alt=""
                  >
                </div>
              </div>
              <div class="p-1">
                <p class="fs20 cl727988 my-1">海报生成后，长按图片保存</p>
                <div
                  @click="toImg()"
                  class="button button-2xl fs32 bk02AD8F clffffff flex-1"
                >
                  点击生成海报
                </div>
              </div>
            </van-action-sheet>

            <!-- 面对面邀请 -->
            <van-overlay
              :show="InvitationShow"
              @click="InvitationShow = false"
            >
              <div class="flex items-center justify-center w-full h-full relative">
                <img
                  class="w450"
                  src="~/assets/img/invitationShow.png"
                  alt=""
                >
                <img
                  class="SuperRebateBox-QRcode"
                  src="~/assets/img/qrcode_localhost.png"
                  alt=""
                >
              </div>
            </van-overlay>

          </div>

          <!-- <div class="bk21252F rounded-sm border-t-2 bc-co02AD8F clDADEE5 p-1 mt-1">
            <div
              @click="MyInvitationBox = true"
              class="flex items-center justify-between"
            >
              <span class="fs28">我的邀请</span>
              <van-icon
                class="fs28"
                name="arrow"
              />
            </div>

            <div class="mt-1 flex items-center">
              <div class="w-1/2">
                <p class="fs36 clffffff font-bold">0</p>
                <p class="fs24 cl02AD8F">邀请人数</p>
              </div>
              <div class="w-1/2">
                <p class="fs36 cl02AD8F font-bold">0.00</p>
                <p class="fs24 cl02AD8F">邀请人数</p>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </van-popup>

    <!-- 我的邀请 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="MyInvitationBox"
      position="right"
    >
      <van-nav-bar
        class="bk02AD8F clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="MyInvitationBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">我的邀请</span>
        </template>
        <template #right>
          <van-icon
            @click="RebateInstructionsBox = true"
            class="clffffff fs32"
            name="question-o"
          />
        </template>
      </van-nav-bar>
      <div class="bk02AD8F h120"></div>
      <div class="relative -t-100 px-1">
        <div class="bk21252F rounded p-2">
          <van-tabs class="transparent">
            <van-tab title="邀请人数">
              <p class="clffffff fs48 font-bold py-1">0人</p>
              <div>
                <div class="mx-auto my-3 text-center">
                  <img
                    class="w-4 mx-auto"
                    src="~/assets/svg/icon_Emptystate.svg"
                    alt=""
                  >
                  <p class="fs24 mt01">暂无记录</p>
                </div>
              </div>
            </van-tab>
            <van-tab title="我的返利">
              <p class="clffffff fs48 font-bold py-1">0.00 USDT</p>
              <div>
                <div class="flex items-center justify-center fs32 font-semibold clffffff">
                  <div
                    class="w-1/4"
                    :class="MyRebateListIndex == index ? 'cl02AD8F' : ''"
                    @click="MyRebateListIndex = index"
                    v-for="(item, index) in MyRebateList"
                    :key="index"
                  >{{item.name}}</div>
                </div>
                <div class="mx-auto my-3 text-center">
                  <img
                    class="w-4 mx-auto"
                    src="~/assets/svg/icon_Emptystate.svg"
                    alt=""
                  >
                  <p class="fs24 mt01">暂无记录</p>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </van-popup>

    <!-- 返利说明 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="RebateInstructionsBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="RebateInstructionsBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">返利说明</span>
        </template>
      </van-nav-bar>
      <div>
        返利功能介绍
      </div>
    </van-popup>

    <!-- C2C帮助中心 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="C2CHelpCenterBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="C2CHelpCenterBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">C2C帮助中心</span>
        </template>
      </van-nav-bar>
      <div class="fs32 px-1">
        <div
          @click="CommonProblemBox = true"
          class="flex items-center justify-between my-2"
        >
          <div>常见问题</div>
          <van-icon
            class="cl02AD8F fs28"
            name="arrow"
          />
        </div>
        <div
          @click="CustomerServiceBox = true"
          class="flex items-center justify-between my-2"
        >
          <div>在线客服</div>
          <van-icon
            class="cl02AD8F fs28"
            name="arrow"
          />
        </div>
      </div>
    </van-popup>

    <!-- 常见问题 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="CommonProblemBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="CommonProblemBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">常见问题</span>
        </template>
      </van-nav-bar>
      <div class="fs32 px-1 mt-2">
        <p>常见问题</p>
        <div class="grid grid-cols-2 gap-1 mt-1">
          <div
            @click="CommonProblemChildBox = true"
            class="bk21252F rounded-sm p-1 flex items-center"
          >
            <img
              class="w-2"
              src="~/assets/svg/icon_Account.svg"
              alt=""
            >
            <span class="ml-1">账户功能</span>
          </div>
          <div class="bk21252F rounded-sm p-1 flex items-center">
            <img
              class="w-2"
              src="~/assets/svg/icon_Tutorials.svg"
              alt=""
            >
            <span class="ml-1">用户教程</span>
          </div>
          <div class="bk21252F rounded-sm p-1 flex items-center">
            <img
              class="w-2"
              src="~/assets/svg/icon_btc.svg"
              alt=""
            >
            <span class="ml-1">买币</span>
          </div>
          <div class="bk21252F rounded-sm p-1 flex items-center">
            <img
              class="w-2"
              src="~/assets/svg/icon-Recharge & Withdraw.svg"
              alt=""
            >
            <span class="ml-1">充值&提现</span>
          </div>
        </div>

        <p class="mt-2">公告中心</p>
        <div class="grid grid-cols-2 gap-1 mt-1">
          <div class="bk21252F rounded-sm p-1 flex items-center">
            <img
              class="w-2"
              src="~/assets/svg/icon_Coins.svg"
              alt=""
            >
            <span class="ml-1">账户功能</span>
          </div>
          <div class="bk21252F rounded-sm p-1 flex items-center">
            <img
              class="w-2"
              src="~/assets/svg/icon_announcement.svg"
              alt=""
            >
            <span class="ml-1">用户教程</span>
          </div>
          <div class="bk21252F rounded-sm p-1 flex items-center">
            <img
              class="w-2"
              src="~/assets/svg/icon_Fiatcurrency.svg"
              alt=""
            >
            <span class="ml-1">买币</span>
          </div>
          <div class="bk21252F rounded-sm p-1 flex items-center">
            <img
              class="w-2"
              src="~/assets/svg/icon_activity.svg"
              alt=""
            >
            <span class="ml-1">充值&提现</span>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 常见问题/子项 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="CommonProblemChildBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="CommonProblemChildBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">账户功能 | 奇迹TGC</span>
        </template>
      </van-nav-bar>

      <div class="mt-2 px-1">
        <p class="fs40 font-bold">账户功能</p>
        <p class="fs24 cl02AD8F">账户功能指引</p>
        <div class="mt-2">
          <div
            @click="CommonProblemDetailsBox = true"
            class="flex items-center fs28 px-1 my-1"
          >
            <div class="wh008 flex-none bkffffff rounded-full"></div>
            <span class="ml-1">如何使用手机号注册</span>
          </div>
          <div class="flex items-center fs28 px-1 my-1">
            <div class="wh008 flex-none bkffffff rounded-full"></div>
            <span class="ml-1">如何重置密码</span>
          </div>
          <div class="flex items-center fs28 px-1 my-1">
            <div class="wh008 flex-none bkffffff rounded-full"></div>
            <span class="ml-1">如何将小额资产兑换为BCB</span>
          </div>
          <div class="flex items-center fs28 px-1 my-1">
            <div class="wh008 flex-none bkffffff rounded-full"></div>
            <span class="ml-1">谷歌二次验证操作说明</span>
          </div>
          <div class="flex items-center fs28 px-1 my-1">
            <div class="wh008 flex-none bkffffff rounded-full"></div>
            <span class="ml-1">如何更改邮箱</span>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 常见问题/子项/内容 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed overflow-hidden"
      v-model="CommonProblemDetailsBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092 fixed w-full"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="CommonProblemDetailsBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">如何使用手机号注册</span>
        </template>
      </van-nav-bar>

      <div class="mt-4 px-1 ContentHeight overflow-auto">
        <p class="fs40 font-bold">如何使用手机号注册</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
        <p class="my-1">1、进入奇迹TGC官网（https://www.bicizh.co) , 点击右上角【注册】按钮</p>
      </div>
    </van-popup>

    <!-- 在线客服 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed overflow-auto"
      v-model="CustomerServiceBox"
      position="right"
    >
      <van-nav-bar
        class="bk21252F clffffff h092 w-full z-10"
        left-arrow
      >
        <template #left>
          <div class="flex items-center">
            <img
              class="w-2 h-2 "
              src="~/assets/svg/logo-1.svg"
              alt=""
            >
            <div class="ml-1 text-left line-height-1">
              <p class="fs28 clffffff">奇迹TGC客服</p>
              <p class="fs20 cl02AD8F mt-01">欢迎您来咨询</p>
            </div>
          </div>
        </template>
        <template #right>
          <img
            @click="CustomerServiceBox = false"
            class="wh04"
            src="~/assets/svg/icon_shutdown.svg"
            alt=""
          >
        </template>
      </van-nav-bar>
      <div class="bk191D24 rounded-t-md shadow-2xl chartContentHeight overflow-auto pb-2">
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

            <ul class="mt-1">
              <li class="mb-1 pb-1 px-1 clffffff">
                <div class="text-center">
                  <p class="fs24 cl02AD8F my-1">2021-04-09 15:54:38</p>
                  <span class="fs24 cl697080 my-1 bk21252F rounded-sm p-01">您已成功下单，请及时支付</span>
                </div>
              </li>
              <!-- 对方消息 -->
              <li
                v-for="index in 5"
                :key="index"
                class="mb-1 pb-1 px-1 clffffff"
              >
                <div class="flex items-start">
                  <img
                    class="w-3 h-3"
                    src="~/assets/svg/logo-1.svg"
                    alt=""
                  >
                  <div class="mx-1 fs30 p-1 rounded-tr-md rounded-b-md fs30 bk21252F">
                    1、账户实名付款。不是实名转款扣除手续费，2、转账不要填备注，否则取消订单！！！，3、感谢理解，祝老板发大财。
                  </div>
                </div>
              </li>

              <!-- 自己消息 -->
              <li class="mb-1 pb-1 px-1 clffffff">
                <div class="flex items-start">
                  <div class="mx-1 fs30 p-1 rounded-tl-md rounded-b-md fs30 bk21252F">
                    1、账户实名付款。不是实名转款扣除手续费，2、转账不要填备注，否则取消订单！！！，3、感谢理解，祝老板发大财。
                  </div>
                  <div class="w-3 h-3 fs32 bk02AD8F flex items-center justify-center rounded-full flex-none">中</div>
                </div>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </div>

      <div class="bk21252F h120 fixed bottom-0 z-30 w-full px-1 flex items-center">
        <van-field
          class="bk2F3543 input-label input-label-Login font-semibold fs28 rounded-sm"
          v-model="value"
          placeholder="请输入消息"
        >
          <template #button>
            <img
              class="w-2"
              src="~/assets/svg/icon_img.svg"
              alt=""
            >
          </template>
        </van-field>
      </div>
    </van-popup>

    <!-- 设置 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="settingBox"
      position="right"
    >
      <van-nav-bar
        class="bk191D24 clffffff h092"
        left-arrow
      >
        <template #left>
          <van-icon
            @click="settingBox = false"
            class="clffffff fs32"
            name="arrow-left"
          />
        </template>
        <template #title>
          <span class="fs32 font-bold clffffff">设置</span>
        </template>
        <template #right>
          <span
            @click="updateNickName"
            class="fs28 font-bold clffffff"
          >保存</span>
        </template>
      </van-nav-bar>
      <div class="fs28 px-1">
        <div class="bk1D088B rounded-sm mt-1 clffffff">
          <!-- <div class="p-1 wechat flex items-center justify-between border-b bc-487DC6">
            <span>头像</span>
            <div class="w-3">
              <van-uploader class="custom">
                <img
                  src="~/assets/svg/icon_positive.svg"
                  alt=""
                >
              </van-uploader>
            </div>
          </div> -->
          <div class="p-1 zfb flex items-center justify-between border-b bc-487DC6">
            <div class="flex-none">昵称</div>
            <!-- <span>{{UserInfo.nickName}}</span> -->
            <van-field
              v-model="UserInfo.nickName"
              class="bk1D088B input-label-w2 font-semibold fs28 ml-2"
              center
              placeholder="请输入昵称"
            >
            </van-field>
          </div>
          <div class="p-1 zfb flex items-center justify-between border-b bc-487DC6">
            <span>ID</span>
            <span class="cl727988">{{UserInfo.id}}</span>
          </div>
          <div class="p-1 zfb flex items-center justify-between border-b bc-487DC6">
            <span>账户</span>
            <span class="cl727988">{{UserInfo.userName}}</span>
          </div>
          <div class="p-1 zfb flex items-center justify-between">
            <span>版本号</span>
            <span class="cl727988">{{getSysInfoData.androidVersion}}</span>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 登录 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="loginBox"
      position="right"
    >
      <div class="p-1">
        <div class="flex items-center justify-between">
          <van-icon
            @click="loginBox = false"
            class="fs40 cl02AD8F"
            name="cross"
          />
          <span
            @click="registerBox = true, loginBox = false"
            class="cl02AD8F fs32"
          >注册</span>
        </div>
        <p class="fs44 clffffff mt-3">登录</p>
        <div class="mt-2">
          <div class="flex items-center justify-between fs24">
            <span class="cl02AD8F">手机</span>
            <span class="cl02AD8F">邮箱登录</span>
          </div>
          <van-field
            class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
            v-model="value"
            placeholder="手机号码"
          >
            <template #label>
              <div class="flex items-center border-r pr-1">
                <img
                  class="wh036"
                  src="~/assets/svg/china.png"
                  alt=""
                >
                <span class="fs28 cl02AD8F ml-075">+86</span>
                <img
                  class="wh015 ml-075"
                  src="~/assets/svg/icon_dropd-1.svg"
                  alt=""
                >
              </div>
            </template>
          </van-field>

          <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
            <span>密码</span>
          </div>
          <van-field
            v-model="value"
            class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
            center
            placeholder="请输入登录密码"
          >
            <template #button>
              <img
                class="wh036"
                src="~/assets/svg/icon_display.svg"
                alt=""
              >
              <!-- icon_hide -->
            </template>
          </van-field>

          <div
            @click="forgetPasswordBox = true"
            class="flex items-center justify-between fs24 mt-2 cl02AD8F"
          >
            <span>忘记密码？</span>
          </div>
        </div>
      </div>
      <div class="fixed bottom-0 w-full my-1">

        <!-- <div @click="verificationBox = true,loginBox = false" class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1"> -->
        <div
          @click="imgVerificationBox = true"
          class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1"
        >
          登录
          <!-- bk02AD8F/bk2F3441 -->
        </div>
      </div>

      <!-- 图片旋转滑动验证码 -->
      <van-overlay
        :show="imgVerificationBox"
        @click="imgVerificationBox = false"
      >
        <div class="h-full flex items-center justify-center">
          <div class="bkffffff p-1 rounded">
            <div class="flex items-center justify-between">
              <span class="fs32 cl000f18">安全验证</span>
              <van-icon
                @click="imgVerificationBox = false"
                class="fs32 cl000f18"
                name="cross"
              />
            </div>
            <div @click.stop>
              <PublicDragVerifyImgRotate
                class="mt-1 px-1"
                ref="dragVerify"
                :imgsrc="`/img/qrcode_localhost.png`"
                isPassing.sync="true"
                :showTips="true"
                :width="250"
                :height="40"
                text="请按住滑块拖动"
                successText="验证通过"
                handlerIcon="el-icon-d-arrow-right"
                successIcon="el-icon-circle-check"
                @refresh="reimg"
                @passcallback="passcallback"
                @passfail="passfail"
              >
              </PublicDragVerifyImgRotate>
            </div>
          </div>
        </div>
      </van-overlay>
    </van-popup>

    <!-- 登录后需要的安全验证 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="verificationBox"
      position="right"
    >
      <div class="py-1">
        <div class="flex items-center justify-between px-1">
          <van-icon
            @click="verificationBox = false"
            class="fs40 cl02AD8F"
            name="cross"
          />
        </div>
        <p class="fs44 clffffff mt-3 px-1">安全验证</p>

        <van-tabs class="transparent mt-3">
          <van-tab>
            <template #title>
              <div class="fs28">短信验证</div>
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div class="fs28">邮箱验证</div>
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div class="fs28">谷歌验证</div>
            </template>
          </van-tab>
        </van-tabs>

        <div class="mt-3 px-1">
          <div class="flex items-center justify-between fs24 cl02AD8F">
            <span>将发送验证码到您的187****840</span>
          </div>
          <van-field
            v-model="value"
            class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
            center
            placeholder="手机验证码"
          >
            <template #button>
              <span class="fs28 cl02AD8F">发送验证码</span>
            </template>
          </van-field>

          <div class="mt-4">
            <div class="bk02AD8F rounded-sm clffffff fs32 text-center py-1">
              提交
              <!-- bk02AD8F/bk2F3441 -->
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 注册 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="registerBox"
      position="right"
    >
      <div class="p-1">
        <div class="flex items-center justify-between">
          <van-icon
            @click="registerBox = false"
            class="fs40 cl02AD8F"
            name="cross"
          />
          <span
            @click="registerBox = false, loginBox = true"
            class="cl02AD8F fs32"
          >登录</span>
        </div>
        <p class="fs44 clffffff mt-3">注册</p>
        <div class="mt-2">
          <!-- <div class="flex items-center justify-between fs24">
            <span class="cl02AD8F">手机</span>
            <span class="cl02AD8F">邮箱登录</span>
          </div> -->
          <div class="flex items-center justify-between fs24">
            <span class="cl02AD8F">助记词</span>
          </div>
          <van-field
            class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
            v-model="value"
            placeholder="助记词"
          >
          </van-field>
          <div class="mt-2 flex items-center justify-between fs24">
            <span class="cl02AD8F">用户名</span>
          </div>
          <van-field
            class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
            v-model="value"
            placeholder="用户名"
          >
          </van-field>
          <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
            <span>密码</span>
          </div>
          <van-field
            v-model="value"
            class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
            center
            placeholder="请输入登录密码"
          >
            <template #button>
              <img
                class="wh036"
                src="~/assets/svg/icon_display.svg"
                alt=""
              >
              <!-- icon_hide -->
            </template>
          </van-field>

          <div class="flex items-center justify-between fs24 mt-2 cl02AD8F">
            <span>推荐人ID (选填)</span>
          </div>
          <van-field
            class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
            v-model="value"
            placeholder="请输入推荐人ID"
          >
          </van-field>

          <van-checkbox
            class="mt-2"
            v-model="checked"
            checked-color="#02AD8F"
          >
            <div class="cl02AD8F fs24">
              我已同意并阅读<span class="cl02AD8F">奇迹TGC服务条款</span>
            </div>
          </van-checkbox>
        </div>
      </div>
      <div class="fixed bottom-0 w-full my-1">
        <div class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1">
          注册
          <!-- bk02AD8F/bk2F3441 -->
        </div>
      </div>
    </van-popup>

    <!-- 忘记密码 -->
    <van-popup
      class="h-full bk191D24 clffffff HashRate-popupLeft w-full fixed"
      v-model="forgetPasswordBox"
      position="right"
    >
      <div class="p-1">
        <van-nav-bar
          class="bk191D24 clffffff h092"
          left-arrow
        >
          <template #left>
            <van-icon
              @click="forgetPasswordBox = false"
              class="clffffff fs32"
              name="arrow-left"
            />
          </template>
          <template #title>
            <span class="fs32 font-bold clffffff">忘记密码</span>
          </template>
        </van-nav-bar>
        <div class="mt-2">
          <div class="flex items-center justify-between fs24">
            <span class="cl02AD8F">邮箱或手机号</span>
          </div>
          <van-field
            class="mt01 bk21252F input-label input-label-Login font-semibold fs28 rounded-sm"
            v-model="value"
            placeholder="输入邮箱或手机号"
          >
          </van-field>

          <div class="flex items-center justify-between fs24 mt-2">
            <span class="cl02AD8F">将发送验证码到您的187****840</span>
          </div>
          <van-field
            v-model="value"
            class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
            center
            placeholder="邮箱或手机验证码"
          >
            <template #button>
              <span class="fs28 cl02AD8F">发送验证码</span>
            </template>
          </van-field>

          <div class="flex items-center justify-between fs24 mt-2">
            <span class="cl02AD8F">新密码</span>
          </div>
          <van-field
            v-model="value"
            class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
            center
            placeholder="请输入新密码"
          >
            <template #button>
              <img
                class="wh036"
                src="~/assets/svg/icon_display.svg"
                alt=""
              >
              <!-- icon_hide -->
            </template>
          </van-field>

          <div class="flex items-center justify-between fs24 mt-2">
            <span class="cl02AD8F">确认密码</span>
          </div>
          <van-field
            v-model="value"
            class="mt01 bk21252F input-label input-label-w2 font-semibold fs28"
            center
            placeholder="请输入确认密码"
          >
            <template #button>
              <img
                class="wh036"
                src="~/assets/svg/icon_display.svg"
                alt=""
              >
              <!-- icon_hide -->
            </template>
          </van-field>
        </div>
      </div>
      <div class="fixed bottom-0 w-full my-1">
        <div class="bk02AD8F rounded-sm clffffff fs32 text-center py-1 mx-1">
          提交
          <!-- bk02AD8F/bk2F3441 -->
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ICountUp from 'vue-countup-v2';
import axios from 'axios'
export default {
  components: {
    ICountUp
  },
  data () {
    return {
      value: "",
      nickName: "", //昵称
      //显示提示弹框
      showHintPop: false,
      changeUser: false,//切换账户
      personalCenterBox: false, //个人中心框
      loginBox: false, //登录
      registerBox: false,//注册
      forgetPasswordBox: false, //忘记密码
      payPasswordBox: false,//支付密码窗口
      modifyPayPasswordBox: false,//修改支付密码窗口
      forgetPayPasswordBox: false,//忘记支付密码窗口
      imgVerificationBox: false,//图片旋转
      verificationBox: false,//登录后的安全验证
      settingBox: false,//设置
      langBox: false,//语言
      moneyBox: false,//计价方式
      MissionCenterBox: false,//任务中心
      SuperRebateBox: false,//我的推广
      GeneratePosterShow: false,//选择海报
      GeneratePosterCompleteShow: false,//生成海报完成
      InvitationShow: false,//面对面邀请
      MyInvitationBox: false,//我的邀请
      RebateInstructionsBox: false,//返利说明
      accountActivityBox: false,//账户活动
      modifyPasswordBox: false,//修改密码
      errorInfo: '',//
      showKeyboard: true,//数字输入
      C2CHelpCenterBox: false,//C2C帮助中心
      CommonProblemBox: false,//常见问题
      CommonProblemChildBox: false,//常见问题/子项
      CommonProblemDetailsBox: false,//常见问题/内容
      CustomerServiceBox: false,//在线客服
      withdrawalAddressBox: false,//提现地址
      addWithdrawalAddressBox: false,//添加提现地址
      coinListBox: false,//币种列表
      aboutBox: false,//关于我们
      posterListIndex: 0,//海报
      //海报列表
      posterList: [
        {
          img: '/img/poster/poster1.png'
        },
        {
          img: '/img/poster/poster2.png'
        },
        {
          img: '/img/poster/poster3.png'
        }
      ],
      MyRebateListIndex: 0,
      //我的返利
      MyRebateList: [
        {
          name: '全部'
        },
        {
          name: '昨日'
        },
        {
          name: '本周'
        },
        {
          name: '本月'
        }
      ],
      dataURL: '',
      firstFlag: true,
      // 语言列表
      langList: [
        {
          name: '中文简体',
          value: 'zh-CN',
        },
        {
          name: '中文繁体',
          value: 'zh-TW',
        },
        {
          name: 'English',
          value: 'en',
        },
      ],
      // 计价列表
      moneyList: [
        {
          name: '人名币(CNY)',
          value: 'CNY',
        },
        {
          name: '美元(USD)',
          value: 'USD',
        }
      ],
      //提示是否勾选
      checked: false,
      noticeList: [], //公告消息列表
      bannerList: [], //活动轮播图
      helpers: [
        //帮助中心各个选项
        {
          content1: "BuyBit",
          content2: this.$t("index.PingTai"),
          content3: this.$t("index.hint2"),
          background:
            "linear-gradient(90deg,rgba(31,89,184,1),rgba(63,132,233,1));",
          groupId: "",
          typeId: "201951081456317123",
          type: 3
        },
        {
          content1: this.$t("index.hint4"),
          content2: this.$t("index.hint5"),
          content3: "掌握一口价交易方式",
          background:
            "linear-gradient(90deg,rgba(43,86,255,1),rgba(16,165,179,1));",
          groupId: "201947448354087188",
          typeId: "201951084063740180",
          type: 2
        }
      ],
      XBIT: {},
      powerInfo: {},
      ws: null,
      tradingInfo: {},
      timeInterval: null,
      timeOutInterval: null,
      //避免重复连接
      lockReconnect: false,
      APPDownloadState: true, //是否显示下载窗口
      browser: {},
      bannerData: [],
      imgServerUrl: "",
      // 数字滚动配置
      CountUpOptions: {
        useEasing: true,  // 过渡动画效果，默认ture
        useGrouping: true,  // 千分位效果，例：1000->1,000。默认true
        decimalPlaces: 2,  // 小数位
        separator: ',',   // 使用千分位时分割符号
        decimal: '.',   // 小数位分割符号
        prefix: '',    // 前置符号
        suffix: ''    // 后置符号，可汉字
      },
      endVal: 48888.88,

      // 下拉刷新
      isLoading: false,
      // 数据全部加载完成
      finished: false,
      // 数据全部加载状态
      loading: false,

      newsData: [],
      informationData: [],

      // 修改密码
      changePwdParams: {
        "password": "",// "原始密码"
        "newpassword": "",// "新密码"
        "qpassword": "",// "确认密码"
      },

      getoldMnemonicData: "",
      getoldMnemonicArrayIndex: [],
      getoldMnemonicCount: 0,

      // 忘记支付密码
      forgetPayPwdParams: {
        newpassword: "",//新密码
        qpassword: "",//确认密码
        type: "3",
        mnemonic: "",
      },

      BTCData: {
        amount: 0,
        close: 0,
        count: 0,
        high: 0,
        id: 0,
        low: 0,
        open: 0,
        vol: 0,
      },
      ETHData: {
        amount: 0,
        close: 0,
        count: 0,
        high: 0,
        id: 0,
        low: 0,
        open: 0,
        vol: 0,
      },
      exchangeRateData: 0,
      timer: null,
      getSysInfoData: {
        androidVersion: "1.0.0",
        iosDownload: "",
        androidDownload: "",
      },
      orderDepthData: {
        price: 0
      }
    };
  },
  computed: {
    ...mapState(['locale', 'token', 'UserInfo', 'UserInfoArray'])
  },
  watch: {
    value (value) {
      if (value.length === 6 && value !== '123456') {
        this.errorInfo = '验证码错误';
      } else {
        this.errorInfo = '';
      }
    },
  },
  created () {
    this.init()
  },
  mounted () {
    // this.imgServerUrl =
    //   process.env.imgServerUrl;
    // this.InitData();
    // this.getNoticeData();
    // this.getBanner();
    // this.getXBITProfit();
    // this.initWebsocket();
    // this.getPowerInfo();
    // if (this.token) {
    //   this.getHintState();
    //   this.getUserInfo();
    // } else {
    //   this.$store.commit("SET_PERSONALCENTER", false);
    // }
  },
  methods: {
    init () {
      clearInterval(this.timer)
      this.news(1)
      this.news(2)
      this.getKline('btcusdt')
      this.getKline('ethusdt')
      this.orderDepth()
      this.timer = setInterval(() => {
        this.getKline('btcusdt')
        this.getKline('ethusdt')
        this.orderDepth()
      }, 10000)
      this.exchangeRate()
      this.getoldMnemonic()
      this.getSysInfo()
    },
    reimg () {
      console.log(111)
    },
    // 订单深度数据
    orderDepth () {
      let params = {
        coinTeam: "TGC-USDT",//默认：TGC-USDT
      }
      this.$api.order.orderDepth(params).then(res => {
        if (res.type == "success") {
          this.orderDepthData = res.data
        }
      })
    },
    getSysInfo () {
      this.$api.main.getSysInfo().then((res) => {
        if (res.type == "success") {
          this.getSysInfoData = res.data
        }
      })
    },
    // 切换用户操作
    changeUserInfo (item) {
      if (item.token != this.UserInfo.token) {
        this.$store.commit("SET_USERINFO", item);
        this.$store.commit("SET_TOKEN", item.token);
        // this.personalCenterBox = false
        this.changeUser = false
        clearInterval(this.timer)
      }
    },
    // 删除用户操作
    deleteUserInfo (item) {
      let newUserInfoArray = this.UserInfoArray.filter(n => n !== item)
      this.$store.commit("SET_COVER_USERINFOARRAY", newUserInfoArray);
      if (item.token == this.UserInfo.token) {
        // 如果相等就需要重新登录
        this.$router.replace(`/${this.locale}/Public/Login`)
      }
    },
    // 获取当前汇率
    exchangeRate () {
      this.$api.main.exchangeRate().then(res => {
        if (res.type == "success") {
          this.exchangeRateData = res.data
        }
      })
    },
    // https://api.hadax.com/market/history/kline?period=1day&size=1&symbol=btcusdt
    getKline (coin) {
      axios.get(`https://api.hadax.com/market/history/kline?period=1day&size=1&symbol=${coin}`).then(res => {
        if (res.status == 200 && res.data.data.length) {
          if (coin == 'btcusdt') {
            this.BTCData = res.data.data[0]
          } else {
            this.ETHData = res.data.data[0]
          }
        }
      })
    },
    // 修改昵称
    updateNickName () {
      let params = {
        nickName: this.UserInfo.nickName
      }
      this.$api.user.updateNickName(params).then(res => {
        if (res.type == "success") {
          this.$Toast("昵称修改成功")
          this.settingBox = false
        }
      })
    },
    // 选择助记词
    clickGetoldMnemonicData (item) {
      if (this.getoldMnemonicArrayIndex.includes(item)) {
        this.getoldMnemonicArrayIndex = this.getoldMnemonicArrayIndex.filter(n => n !== item)
      } else {
        this.getoldMnemonicArrayIndex.push(item)
      }
    },
    // 忘记支付密码
    forgetPayPwd () {
      if (!this.forgetPayPwdParams.newpassword) {
        return this.$Toast("请输入新密码")
      }
      if (!this.forgetPayPwdParams.qpassword) {
        return this.$Toast("请输入确认密码")
      }
      if (this.forgetPayPwdParams.newpassword != this.forgetPayPwdParams.qpassword) {
        return this.$Toast("新密码和确认密码不一致")
      }
      if (!this.getoldMnemonicArrayIndex.length) {
        return this.$Toast("请选择助记词")
      }
      if (this.getoldMnemonicArrayIndex.length < this.getoldMnemonicData.length) {
        return this.$Toast("请选择完助记词")
      }
      let params = {
        newpassword: this.$md5(this.forgetPayPwdParams.newpassword),//新密码
        qpassword: this.$md5(this.forgetPayPwdParams.qpassword),//确认密码
        type: "4",
        mnemonic: this.getoldMnemonicArrayIndex.join(" "),
      }
      this.$api.user.forgetPayPwd(params).then(res => {
        if (res.type == "success") {
          this.forgetPayPasswordBox = false
          this.$Toast("支付密码修改成功")
        }
      })
    },
    // 获取乱序助记词
    getoldMnemonic () {
      this.$api.user.getoldMnemonic().then(res => {
        if (res.type == "success") {
          if (res.data.length) {
            this.getoldMnemonicData = res.data.split(" ")
          }
        }
      })
    },
    // 修改登录/支付密码
    changePwd (type) {
      let params = {
        "password": this.$md5(this.changePwdParams.password),// "原始密码"
        "newpassword": this.$md5(this.changePwdParams.newpassword),// "新密码"
        "qpassword": this.$md5(this.changePwdParams.qpassword),// "确认密码"
        "type": type,// "类型(取值：1|2):1=修改登录密码 2=修改支付密码"
      }
      if (!this.changePwdParams.password) {
        return this.$Toast("旧密码不能为空")
      }
      if (!this.changePwdParams.newpassword) {
        return this.$Toast("新密码不能为空")
      }
      if (!this.changePwdParams.qpassword) {
        return this.$Toast("确认密码不能为空")
      }
      if (this.changePwdParams.newpassword != this.changePwdParams.qpassword) {
        return this.$Toast("新密码和确认密码不一致，请重新输入")
      }
      this.$api.user.changePwd(params).then(res => {
        if (res.type == "success") {
          this.$Toast("修改成功")
          this.modifyPasswordBox = false
          this.modifyPayPasswordBox = false
          this.changePwdParams = {
            "password": "",// "原始密码"
            "newpassword": "",// "新密码"
            "qpassword": "",// "确认密码"
          }
        }
      })
    },
    news (type) {
      let params = {
        // 1、公告 2、资讯
        "typeId": type,// "typeId"
      }
      this.$api.main.news(params).then(res => {
        if (res.type == "success") {
          if (type == 1) {
            this.newsData = res.data
          } else {
            this.informationData = res.data
          }
        }
      })
    },
    // 退出登录
    logOut () {
      this.$api.user.logOut().then(res => {
        if (res.type == "success") {
          // if (this.UserInfoArray.length) {
          //   let newUserInfoArray = this.UserInfoArray.filter(item => {
          //     return item.userName != this.UserInfo.userName
          //   })
          //   this.$store.commit("SET_COVER_USERINFOARRAY", newUserInfoArray);
          // }
          this.$store.commit("SET_TOKEN", "");
          // this.$store.commit("SET_USERINFOARRAY", "");
          this.$store.commit("SET_USERINFO", "");
          this.$commonFn.toUrl('Public/Login')
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
    //验证成功
    passcallback () {
      this.imgVerificationBox = true
      this.verificationBox = true
      this.loginBox = false
      console.log('验证成功')
    },
    //验证失败
    passfail () {
      console.log('验证失败')
    },
    InitData () {
      this.browser = {
        versions: (function () {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          return {
            //移动终端浏览器版本信息
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
            iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
            QQbrw: u.indexOf("MQQBrowser") > -1, // QQ浏览器
            iPad: u.indexOf("iPad") > -1, //是否iPad
            webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
          };
        })(),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase()
      };
      if (this.browser.versions.ios) {
        this.APPDownloadState = false;
        return;
      }
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
    },

    changeCoin (name, title) {
      this.$Toast(`${name},${title}`);
    },

    getPowerInfo () {
      // this.$api.FixedPrice.getPowerInfo().then(res => {
      //   if (res.data.code === 200) {
      //     this.powerInfo = res.data.data;
      //   }
      // });
    },
    danxuanChecked (val) {
      this.checked = val;
    },
    /**
     * 展示个人中心浮动框
     */
    showPersonalCenter () {
      this.personalCenterBox = true;
    },
    //获取用户信息
    getUserInfo () {
      // this.$api.BusinessApplication.getAccountSafe().then(res => {
      //   if (res.data.code === 200) {
      //     let data = res.data.data;
      //     this.nickName = data.name;
      //   }
      // });
    },
    // 获取banner信息
    getBanner () {
      this.$api.main.bannnerInfo().then(res => {
        if (res.type == "success") {
          this.bannerData = res.data
        }
      })
    },
    //初始websocket
    initWebsocket () {
      let that = this;
      this.ws = new WebSocket(
        process.env.webSocketUrl +
        "/api/v1/buybit/power/ws/merge"
      );

      this.ws.onopen = () => {
        this.ws.send(
          JSON.stringify({ sub: "TopCount", coinTeam: "XBIT-USDT" })
        );
        this.ws.send(JSON.stringify({ sub: "Depth", coinTeam: "XBIT-USDT" }));
        this.ws.send(JSON.stringify({ sub: "Trade", coinTeam: "XBIT-USDT" }));
      };

      this.ws.onmessage = event => {
        let reader = new FileReader();
        reader.readAsText(event.data, "utf-8");
        reader.onload = function (e) {
          let obj = JSON.parse(e.target.result);
          if (obj.sub === "TopCount") {
            that.tradingInfo = obj.data;
          }
        };
      };

      this.ws.onclose = () => {
        this.reconnect();
      };
      this.ws.onerror = err => {
        this.reconnect();
      };
    },

    //短线重连
    reconnect () {
      if (this.lockReconnect) return;
      this.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      clearInterval(this.timeInterval);
      this.timeInterval = setTimeout(() => {
        console.log("index---没连接上会一直重连，设置延迟避免请求过多");
        this.initWebsocket();
        this.lockReconnect = false;
      }, 5000); //这里设置重连间隔(ms)
    },

    //获取XBIT收益
    getXBITProfit () {
      // this.$api.HashRate.getXBITProfit().then(res => {
      //   if (res.data.code === 200) {
      //     this.XBIT = res.data.data;
      //   }
      // });
    },

    getNoticeData () {
      // //获取公告列表
      // this.$api.Footer.listByState({
      //   pageNum: "1",
      //   pageSize: "20",
      //   lan: this.locale
      // }).then(res => {
      //   this.noticeList = res.data.data.items;
      // });
    },
    // getBanner () {//获取活动土坯啊
    //   this.$api.Notice.getBanner().then(res => {
    //     if (!res.data.data.hasActivities) {
    //       this.bannerList.push({ image: res.data.data.defaultImg })
    //     }
    //     else {
    //       this.bannerList = res.data.data.elementList;
    //     }
    //   })
    // },
    toArt (item) {
      //点击跳转到对应的文章
      if (item.BaiPiShu) {
        window.open(item.BaiPiShu);
      } else if (item.toPage) {
        this.$router.push({ path: item.toPage });
      } else {
        this.$router.push({
          path: `/${this.locale}/Public/WebPageModel`,
          query: {
            title: `${item.content1}${item.content2}`, //文章标齐
            groupId: item.groupId, //列表id
            typeId: item.typeId, //类型id
            articleType: item.type //文章类型
          }
        });
      }
    },
    toSingleArt (item) {
      //点击跳转公告文章
      this.$router.push({
        path: `/${this.locale}/Public/Notice/Details/${item.id}`,
      });
    },
    toSet () {
      //跳转快捷设置
      if (!this.token) {
        this.$toast(this.$t("index.hint10"));
        this.$router.push(`/${this.locale}/Public/Login`);
      } else {
        this.$router.push(`/${this.locale}/PersonalCenter/QuickSet`);
      }
    },
    toActive (item) {
      //跳转到活动页面
      if (item.activityImg) {
        this.$router.push({
          path: `/${this.locale}/Public/Active/halfBTC`,
          query: {
            activityId: item.activityId,
            activityType: item.activityType
          }
        });
      }
    },
    //点击去交易
    toDeal () {
      this.$router.push(`/${this.locale}/HashRate`);
    },
    //获得是否提示状态
    getHintState () {
      // this.$api.Evidence.getHintState().then(res => {
      //   if (res.data.code === 200) {
      //     this.showHintPop = res.data.data;
      //   }
      // });
    },
    closeHintState () {
      if (this.checked) {
        this.$api.Evidence.editHintState().then(res => {
          if (res.data.code === 200) {
            this.showHintPop = false;
          }
        });
      } else {
        this.showHintPop = false;
      }
    },
    //修改显示提示状态
    editHintState () {
      if (this.checked) {
        this.$api.Evidence.editHintState().then(res => {
          if (res.data.code === 200) {
            this.$router.push({
              path: `/${this.locale}/PersonalCenter/XBITEarningsRecord`,
              query: { active: 1 }
            });
          }
        });
      } else {
        this.$router.push({
          path: `/${this.locale}/PersonalCenter/XBITEarningsRecord`,
          query: { active: 1 }
        });
      }
    },
    //判断是否需要登录
    clickNeedLogin () {
      this.$router.push(`/${this.locale}/Public/Login`);
    },
    //复制成功
    onCopy () {
      this.$Toast("复制成功");
    },
    //生成海报
    toImg () {
      this.GeneratePosterCompleteShow = true
      this.GeneratePosterShow = false
      this.firstFlag = true;
      setTimeout(() => {
        let targetDom = document.getElementById("captureId");
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取页面滚动高度
        this.$html2canvas(targetDom, {
          useCORS: true,
          logging: false,
          height: targetDom.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
          width: targetDom.offsetWidth,
          x: 0,
          y: scrollTop, // 用网页滚动的高度定位y轴顶点
          // dpi: window.devicePixelRatio * 2, // 解决图片不清晰问题
          // scale: 2
        })
          .then(canvas => {
            let imgUrl = canvas.toDataURL("image/png");
            this.dataURL = imgUrl;
            setTimeout(() => {
              this.firstFlag = false;
            }, 3000)
          })
          .catch(error => { });
      }, 1000)
    },
  },
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.timeInterval);
    if (this.ws) {
      this.ws.close();
    }
  }
};
</script>
<style scoped lang="scss">
.buybitHome {
  height: 100%;
  width: 100%;
  background: url('../../assets/image/home/bg.png');
  background-size: 100% 100%;
  /deep/.van-search__content {
    background-color: #2a303c;
    .van-icon {
      color: #fff;
    }
  }
  .only-name {
    margin-left: 0.26rem;
    width: 0.54rem;
    height: 0.54rem;
    line-height: 0.54rem;
    border-radius: 50%;
    background: linear-gradient(
      30deg,
      rgba(34, 192, 172, 1),
      rgba(96, 182, 89, 1)
    );
  }
  .APPDownload {
    width: 100%;
    max-width: 750px;
    z-index: 999;
    position: fixed;
    height: 1.2rem;
    line-height: 1.2rem;

    img {
      width: 0.8rem;
    }

    .APPDownload-content {
      line-height: 0.4rem;
      padding: 0.24rem 0;
    }

    .APPDownload-btn {
      margin: 0 auto;
      color: #17bc95;
      border: 1px solid #17bc95;
      border-radius: 0.1rem;
      margin: 0.25rem 0;
      height: 0.7rem;
      line-height: 0.7rem;
    }
  }

  .header {
    padding: 0.15rem 0.2rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: fixed;
    height: 0.98rem;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    max-width: 750px;
    &.APPDownloadState {
      top: 1.2rem;
    }

    .flex1 {
      flex: 1;
    }

    .left {
      text-align: left;
    }

    .center {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 2.13rem;
      }
    }

    .right {
      text-align: right;
    }
  }

  .help {
    margin: 0.3rem 0;
    padding: 0 0.3rem;
    box-sizing: border-box;
    overflow-x: auto;
  }

  .allHelper {
    /*width: auto;*/
    overflow-x: auto;
    padding: 0 0.3rem;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    display: -webkit-box;
    white-space: nowrap;
    margin: 0;

    .singleHelp {
      width: 2.99rem;
      height: 2.15rem;
      background-color: #4324b0;
      border-radius: 0.12rem;
      padding: 0.34rem 0.28rem;
      box-sizing: border-box;
      margin-right: 0.2rem;

      .bottom {
        margin-top: 0.12rem;
        word-break: keep-all;
        overflow-wrap: break-word;
        white-space: pre-wrap;
      }
    }
  }

  .allHelper::-webkit-scrollbar {
    display: none;
  }

  .fastset {
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    img {
      width: 0.72rem;
      height: 0.72rem;
      margin-right: 0.3rem;
    }
  }

  .fastBtn {
    margin: 0 auto;
    margin-top: 0.34rem;
    width: 4rem;
    height: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      90deg,
      rgba(60, 152, 248, 1),
      rgba(14, 215, 216, 1)
    );
  }
}

.van-popup {
  width: 100%;
}

.hint-pop-wrap {
  padding: 0.35rem;

  .title {
    padding-bottom: 0.3rem;
    border-bottom: 1px solid rgba(142, 142, 147, 0.12);
  }

  .text-wrap {
    line-height: 0.45rem;
  }

  /deep/ .van-icon {
    border-radius: 0.1rem;
    border: 1px solid #858585;
  }

  .no-hint {
    position: relative;
    bottom: 0.15rem;
  }

  .btn-wrap {
    div {
      width: 45%;
      height: 0.8rem;
      line-height: 0.8rem;
      border: 1px solid rgba(23, 188, 149, 1);
    }
  }
}
</style>
<style lang="scss">
.buybitHome {
  overflow: hidden;
  .van-tabs {
    .van-tabs__wrap {
      border-bottom: 1px solid $co487DC6;
    }
  }
  .banner-wrap {
    width: 100%;
    height: 2.6rem;
    border-radius: 0.1rem;
    overflow: hidden;

    & > section {
      height: 100%;
    }

    .banner-wrap-img {
      height: 100%;
      a {
        display: block;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    &.APPDownloadState {
      margin-top: 2.2rem;
    }

    & > img {
      width: 6.9rem;
      height: 100%;
    }
  }

  .noticeWrap {
    position: relative;

    .notice {
      height: 0.6rem;
      margin: 0 0.3rem;
      padding-left: 0.3rem;
      box-sizing: border-box;
      border-radius: 0.3rem;

      .van-swipe__track {
        overflow: hidden;

        .van-swipe-item {
          .singltTips {
            height: 0.6rem;
            line-height: 0.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          img {
            width: 5.8rem;
            height: 0.6rem;
          }
        }
      }
    }

    .leftHidden {
      position: absolute;
      width: 0.5rem;
      height: 0.6rem;
      left: 0.2rem;
      border-radius: 0.3rem 0 0 0.3rem;
      z-index: 9;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 0.4rem;
      }
    }

    .rigthHidden {
      img {
        width: 0.35rem;
      }
    }
  }

  .flash-wrap {
    padding: 0 0.3rem;

    .left-area {
      width: 4.6rem;
      padding: 0.2rem;

      .info {
        padding-top: 0.17rem;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid rgba(42, 50, 82, 1);
      }
    }

    .right-area {
      width: 2rem;
      padding: 0.2rem 0;

      .num {
        padding: 0.13rem 0.08rem;
      }

      .deal-btn {
        width: 1.4rem;
        height: 0.48rem;
        line-height: 0.48rem;
        margin: 0.2rem auto 0;
        background: rgba(23, 188, 149, 1);
        border: transparent;
        border-radius: 0.06rem;
      }
    }
  }

  .quick-set-wrap {
    margin: 0.3rem;
    padding: 0.33rem 0.22rem;

    .set-img {
      width: 1.1rem;
      height: 100%;
    }

    .text-info {
      padding-left: 0.3rem;

      .info {
        line-height: 0.4rem;
      }
    }

    .arrow-icon {
      width: 0.13rem;
      height: 0.21rem;
    }
  }
}
</style>
