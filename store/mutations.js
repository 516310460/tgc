import * as jsCokie from "js-cookie";
import {
  Locale
} from "vant";
import enLocale from "vant/lib/locale/lang/en-US";
import zhLocale from "vant/lib/locale/lang/zh-CN";
import twLocale from "vant/lib/locale/lang/zh-TW";
export default {
  //设置个人中心显示与否
  SET_PERSONALCENTER(state, flag) {
    state.personalCenter = flag;
  },
  // 导航显示状态
  SET_TABBARSTATE(state, tabbarState) {
    state.tabbarState = tabbarState;
  },

  // 版本号
  SET_VERSION(state, varsion) {
    state.varsion = varsion;
  },

  SET_ORDERTAKINGSTATE(state, orderTakingState) {
    state.orderTakingState = orderTakingState;
  },

  // 多种语言版本
  SET_LOCALES(state, locales) {
    state.locales = locales;
    // jsCokie.remove("locale");
  },

  SET_USER(state, user) {
    state.authUser = user;
  },

  // 系统时间
  SET_SYSINITTIME(state, sysInitTime) {
    state.sysInitTime = sysInitTime;
  },

  SET_ISMAINTAIN(state, isMaintain) {
    state.isMaintain = isMaintain;
  },

  //wap端页面导航index
  SET_PAGEACTIVE(state, pageActive) {
    state.pageActive = pageActive;
  },

  //wap端页面导航index
  SET_C2C_PAGEACTIVE(state, c2cPageActive) {
    state.c2cPageActive = c2cPageActive;
  },

  // 切换语言
  SET_LANG(state, locale) {
    // locales中存在相应的语言即设置其为locale
    if (state.locales.includes(locale)) {
      state.locale = locale;
      jsCokie.set("locale", locale);
      if (locale == "zh-CN") {
        Locale.use("zh-CN", zhLocale);
      } else if (locale == "zh-TW") {
        Locale.use("zh-TW", twLocale);
      } else if (locale == "en-US") {
        Locale.use("en-US", enLocale);
      }
    }
  },

  // 环境名称
  SET_ENV_NAME(state, env_name) {
    state.env_name = env_name
  },

  // token值
  SET_TOKEN(state, token) {
    state.token = token;
    jsCokie.set("token", token);
    if (!state.token) {
      state.UserInfo = {
        businessCertified: 0,
        isFixedPrice: false,
        certified: '',
        capitalStatus: '',
        mobileStatus: '',
      };
    }
  },

  REMOVE_TOKEN(state) {
    state.token = "";
    jsCokie.remove("token");
  },

  // 直接覆盖用户的数组
  SET_COVER_USERINFOARRAY(state, UserInfoArray) {
    state.UserInfoArray = UserInfoArray;
  },

  // 切换用户的数组
  SET_USERINFOARRAY(state, UserInfoArray) {
    if(UserInfoArray){
      state.UserInfoArray.push(UserInfoArray);
    }else{
      state.UserInfoArray = [];
    }
  },

  // 用户信息
  SET_USERINFO(state, userInfo) {
    state.UserInfo = userInfo;
  },

  // 邀请码
  SET_FROMINVITAIONCODE(state, fromInvitationCode) {
    state.fromInvitationCode = fromInvitationCode;
  },

  // 一口价
  SET_FIXPIRCE(state, FixPrice) {
    state.FixPirce = FixPrice;
  },

  // 币种信息
  SET_COININFO(state, CoinInfo) {
    state.CoinInfo = CoinInfo;
  },

  // 聊天消息数据
  SET_CHATDATA(state, chat) {
    state.chatData = chat;
  },

  //设置所有消息数量
  SET_ALLINFONUM(state, num) {
    state.allInfoNum = num
  },

  //设置登录超时之前所在的页面
  SET_LOGINTIMEOUTBRFOREPAGE(state, str) {
    state.loginTimeoutBeforePage = str
  },

  //设置集合竞价基准币种索引
  SET_ATCOINTYPEINDEX(state, ATCoinTypeIndex) {
    state.ATCoinTypeIndex = ATCoinTypeIndex
  },

  //设置集合竞价基准币种索引
  SET_ATCOINTYPEBASICINDEX(state, ATCoinTypeBasicIndex) {
    state.ATCoinTypeBasicIndex = ATCoinTypeBasicIndex
  },

};
