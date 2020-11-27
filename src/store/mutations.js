export default {
  // 這个states就是个名字 随便写 但必须要有
  addItem (states, value) {
    states.lists.push(value)
  },
  countAdd () {
    this.state.count += 1
  },
  // 是否登陆
  login (state, v) {
    state.userInfo = v
  },
  // 登陆身份
  setshenfen (state, v) {
    state.userStatus = v.userStatus
    state.vipLevel = v.vipLevel
  }
}
