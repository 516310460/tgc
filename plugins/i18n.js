import Vue from "vue";
import VueI18n from "vue-i18n";
// import Vant from "vant";
import { Locale } from "vant";
import enLocale from "vant/lib/locale/lang/en-US";
import zhLocale from "vant/lib/locale/lang/zh-CN";
import twLocale from "vant/lib/locale/lang/zh-TW";
import zhCN from "~/locales/zh-CN.js";
import zhTW from "~/locales/zh-TW.js";
import enUS from "~/locales/en-US.js";

Vue.use(VueI18n);

export default ({ app, store, route }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: "zh-CN",
    messages: {
      "zh-CN": Object.assign(zhCN, zhLocale),
      "zh-TW": Object.assign(zhTW, twLocale),
      "en-US": Object.assign(enUS, enLocale)
    }
  });

  // Vue.use(Vant, {
  //   i18n: (key, value) => app.i18n.t(key, value)
  // });
  // Locale.use("zh-CN", zhLocale);
  // console.log(store.state.locale);
  // Locale.add(app.i18n.messages);
  if (store.state.locale == "zh-CN") {
    Locale.use("zh-CN", zhLocale);
  } else if (store.state.locale == "zh-TW") {
    Locale.use("zh-TW", twLocale);
  } else if (store.state.locale == "en-US") {
    Locale.use("en-US", enLocale);
  }

  app.i18n.getPath = link => {
    return `/${app.i18n.locale}${link}`;
  };

  store.commit("SET_LOCALES", Object.keys(app.i18n.messages));

  // 切换路由时进行跳转
  store.watch(
    state => state.locale,
    value => {
      app.i18n.locale = value;
    }
  );
};
