import Vue from 'vue'
import zhCN from "~/locales/zh-CN";
import zhTW from "~/locales/zh-TW";
import enUS from "~/locales/en-US";

export default (context, inject) => {
  // 响应信息错误提示
  const ResponseErrMsg = {
    ErrCodeMsg(code) {
      if (code === 3001) {
        context.store.commit("SET_TOKEN", '');
        context.store.commit('SET_LOGINTIMEOUTBRFOREPAGE', context.route.path);
        common(code);
        Vue.bus.emit("user-logout");
        context.app.router.replace({
          path: `/${context.store.state.locale}/Public/Login`
        });
        return;
      }
      common(code);
    }
  };

  function common(code) {
    // 当前的语言..
    switch (context.store.state.locale) {
      case "zh-CN":
        // context.app.$commonFn.TipsMessage(zhCN.Plugins.ResponseErrMsg[`msg${code}`]);
        context.app.$Toast(zhCN.Plugins.ResponseErrMsg[`msg${code}`]);
        break;
      case "zh-TW":
        // context.app.$commonFn.TipsMessage(zhTW.Plugins.ResponseErrMsg[`msg${code}`]);
        context.app.$Toast(zhTW.Plugins.ResponseErrMsg[`msg${code}`]);

        break;
      case "en-US":
        // context.app.$commonFn.TipsMessage(enUS.Plugins.ResponseErrMsg[`msg${code}`]);
        context.app.$Toast(enUS.Plugins.ResponseErrMsg[`msg${code}`]);
        break;
    }
  }

  context.$ResponseErrMsg = ResponseErrMsg;
  inject("ResponseErrMsg", ResponseErrMsg);
}
