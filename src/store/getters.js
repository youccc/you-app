export default {
  nameInfo (state) {
    switch (state.userStatus) {
      case 0:
        return '普通用户'
      case 1:
        return 'vip用户'
      case 2:
        return '高级v' + state.vipLevel + '用户'
      default:
        return '您不是会员'
    }
  }
}
