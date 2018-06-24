import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
  loadingNum: 0,
  windowHeight: document.body.clientHeight,
  windowWidth: document.body.clientWidth
}

// getters
const getters = {
  loaddingNum: status => state.loadingNum
}

// mutations
const mutations = {
  resetLoadNum (state, payload) {
    state.loadingNum = 0
  },
  loadNumPlus (state, payload) {
    state.loadingNum++
  },
  loadNumMinus (state, payload) {
    state.loadingNum--
  },
  resizeWindow (state, payload) {
    state.windowHeight = document.body.clientHeight
    state.windowWidth = document.body.clientWidth
  }
}

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  getters,
  mudules: {
    user: User
  },
  strict: debug
})
