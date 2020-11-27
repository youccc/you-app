/**
 * 状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state' // 数据仓库
import mutations from './mutations' // 用来修改数据的 同步操作
import getters from './getters' // 用来获取数据的 自动 相当于过滤 相当于vuex里的计算属性
import actions from './actions' // 用来提交mutations 异步操作

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
	// modules 如果state 过多  可以 分模块 a：{里面还是上面那四个对象} b：{里面还是上面那四个对象}
  modules: {
  }
})
