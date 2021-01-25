import Vue from 'vue'
import App from './App.vue'
import router from './router'//vue路由管理
import store from './store'  //vue状态管理
import './plugins'           //插件管理
import '@/styles/base.css'

Vue.config.productionTip = false

//给div 绑 resize 事件 监听宽高变化 用于echart resize
Vue.directive('resize', {
  bind(el, binding) {
    let width = '', height = '';
    function get() {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value({width, height});
      }
      width = style.width;
      height = style.height;
    }

    el.__vueReize__ = setInterval(get, 200);
  },
  unbind(el) {
    clearInterval(el.__vueReize__);
  },
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#you-app')
