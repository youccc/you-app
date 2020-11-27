/* 
 * 插件
 */
import Vue from 'vue'
import './element'
import '@/icons'  
import echarts from 'echarts'

// 挂载全局
Vue.prototype.$echarts = echarts
