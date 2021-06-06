import Cookie from "cookie";
import * as jsCokie from "js-cookie";
import { toDataURL } from "qrcode";

export default {
  async nuxtServerInit({
    dispatch,
    commit,
    state
  }, {
    app,
    req,
    store,
    error
  }) {
    try {
      const cookie = Cookie.parse(req.headers.cookie ? req.headers.cookie : "");
      const lang = cookie["locale"] ? cookie["locale"] : state.locale;
      const token = cookie["token"] ? cookie["token"] : state.token;
      //设置默认语言
      app.i18n.locale = lang;
      commit("SET_LANG", lang);
      //设置token
      app.i18n.token = token;
      commit("SET_TOKEN", token);
      // console.log(process.env);
      // console.log("cookie----对象", cookie)
      // console.log("nuxtServerInit----初始化-----", process.env.NUXT_ENV_PATH)
      // commit("SET_ENV_NAME", process.env.NUXT_ENV_PATH);
      // 判断用户是否登录
      if (token) {
        // await dispatch('user_user');
        // store.dispatch('user_user');
      }
    } catch (e) {
      error("error");
    }
  },
  //获取用户基本信息(如果用户手动清除掉本地缓存就必须去取一次用户信息)
  async user_user({
    commit
  }) {
    let res = await this.$api.personCenter.getAccountInfo();
    if (res.data.code == 200) {
      //设置用户信息
      commit("SET_USERINFO", res.data.data);
    }
  }
};
