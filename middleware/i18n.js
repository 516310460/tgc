const consola = require('consola')
export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  redirect,
  res,
  req
}) {
  // 如果从热模块替换调用中间件，则忽略它
  if (isHMR) return
  const UrlPathArray = route.path.split('/')[1]
  const UrlPathArrayState = UrlPathArray.includes('-')
  store.commit("SET_VERSION", process.env.version)

  // if(!store.state.token && route.path != `/${store.state.locale}/Public/Login` && route.path != `/${store.state.locale}/Public/Reg` && route.path != `/${store.state.locale}/Public/ForgetPwd`){
  //   return app.router.replace(`/${store.state.locale}/Public/Login`)
  // }

  // 监控底部导航
  if(route.fullPath == `/${UrlPathArray}/` || route.fullPath == `/${UrlPathArray}`){
    store.commit("SET_TABBARSTATE", true);
  }else{
    store.commit("SET_TABBARSTATE", false);
  }

  if (
    UrlPathArray &&
    (UrlPathArray == 'zh-CN' ||
      UrlPathArray == 'zh-TW' ||
      UrlPathArray == 'en-US')
  ) {
    store.commit('SET_LANG', UrlPathArray)
  }
 
  let url = '';
  if (
    !route.path.includes(`/${store.state.locale}`) &&
    store.state.locale !== app.i18n.fallbackLocale
  ) {
    if (UrlPathArrayState) {
      url = route.path.replace(UrlPathArray, store.state.locale)
    } else {
      url = `/${store.state.locale}${route.path}${route.hash}`
    }
    return redirect(url)
  } else {
    if (UrlPathArrayState) {
      return
    } else {
      url = `/${store.state.locale}${route.path}${route.hash}`
    }
    //判断当前二级域名是否是otc 是就加上
    url += req && req.headers && req.headers.host.split('.')[0] == 'otc' ? 'OTC' : ''
    return redirect(url)
  }
}
