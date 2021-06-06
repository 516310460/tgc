// import axios from "axios"
import Vue from 'vue'
import ResponseErrMsg from './../ResponseErrMsg'
import AxiosConfig from './config'
import qs from 'qs'
import Cookie from 'cookie'
import zhCN from '~/locales/zh-CN'
import zhTW from '~/locales/zh-TW'
import enUS from '~/locales/en-US'

export default function ({ $axios, redirect, app, req, store }) {
  Object.assign($axios.defaults, AxiosConfig.config)
  let cookie = null
  let lang = null
  let token = null
  if (process.server) {
    cookie = Cookie.parse(req.headers.cookie ? req.headers.cookie : '')
  } else {
    cookie = ''
  }
  $axios.onRequest(config => {
    lang = cookie['locale'] ? cookie['locale'] : store.state.locale
    token = cookie['token'] ? cookie['token'] : store.state.token || ''
    // // 设置默认语言
    app.i18n.locale = lang
    // 设置请求token
    config.headers['token'] = token
    // 将token提交保存到vuex
    store.commit('SET_TOKEN', token)
    // // 设置请求语言
    config.headers['lan'] = lang
    // 将语言提交保存到vuex
    store.commit('SET_LANG', lang)
    config.data = qs.stringify(config.data)
    return config
  })

  $axios.onResponse(response => {
    if(response.data.code == 500){
      app.$Toast(response.data.message)
    }
    if(response.data.code == 501){
      app.$Toast("登录失效，请重新登录")
      store.commit("SET_TOKEN", "");
      store.commit("SET_USERINFOARRAY", "");
      store.commit("SET_USERINFO", "");
      return app.$commonFn.toUrl('Public/Login')
    }
    return response.data
  })
  $axios.onError(error => {
    app.$Toast("服务器连接失败，请检查网络")
    return {}
  })
}
