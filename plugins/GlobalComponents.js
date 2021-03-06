import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import QrcodeVue from 'qrcode.vue'
Vue.component('QrcodeVue', QrcodeVue)

import VueVirtualScroller from 'vue-virtual-scroller'
Vue.use(VueVirtualScroller);


//自动注册组件
const requireComponent = require.context(
  '../components',
  true,
  /[\w-]+\.vue$/
)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName
        .replace(/^\.\/_/, '')
        .replace(/\.\w+$/, '')
    )
  )
  
  Vue.component(componentName, componentConfig.default || componentConfig)
})
