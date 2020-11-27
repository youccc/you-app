import Vue from 'vue'
import App from './App.vue'
import router from './router'//vue路由管理
import store from './store'  //vue状态管理
import './plugins'           //插件管理

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#you-app')
