/*
* 用户 store
*
* */
const state = {
  tenentId: '',
  userId: '',
  userName: '',
  userType: '',
  auth: []
}

// mutations
const mutations = {
  setData (state, payload) {
    state.tenentId = payload.tenentId
    state.userId = payload.userId
    state.userName = payload.userName
    state.userType = payload.userType
    state.auth = payload.auth
  },
  clearData (state, payload) {
    state.tenentId = ''
    state.userId = ''
    state.userName = ''
    state.userType = ''
    state.auth = ''
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
