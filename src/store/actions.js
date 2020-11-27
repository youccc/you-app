export default {
  buyVip ({ commit }, v) {
    return new Promise((resolve, reject) => {
      commit('setshenfen', {
        userStatus: v.userStatus,
        vipLevel: v.vipLevel
      })
      resolve('购买成功')
    })
  },
  getFreeVip ({ commit, state }) {
    // 格式就是這样 commit state 下面都用到了
    // (resolve, reject) 格式
    return new Promise((resolve, reject) => {
      if (state.userStatus === 0) {
        commit('setshenfen', {
          userStatus: 1,
          vipLevel: 0
        })
        // resolve 返回值 能打印
        resolve(' 分享成功 获得vip')
      } else {
        resolve(' 分享成功 ')
      }
    })
  }
}
