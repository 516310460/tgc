import Vue from "vue";
import Router from 'vue-router';
const AppVue = new Vue({});
export default function ({
  app,
  store
}) {
  //解决报错 Uncaught (in promise) NavigationDuplicated
  Vue.use(Router);
  // 添加这下面一段代码，就可以解决报错
  const originalPush = Router.prototype.push;
  Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  };
  AppVue.$bus.on("Error", () => {
    app.router.push(`/${store.state.locale}/public/ServiceMaintenance`);
  });
  app.router.beforeEach((to, from, next) => {
    if (store.state.isMaintain) {
      if (to.path.indexOf("/Public/ServiceMaintenance") <= -1) {
        app.router.push(`/${store.state.locale}/Public/ServiceMaintenance`);
      } else {
        next();
      }
    } else {
      next();
    }
  });
}
