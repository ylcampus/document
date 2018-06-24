// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/common.scss'
import store from './libs/store'
Vue.use(ElementUI)
Vue.prototype.store = store
Vue.config.productionTip = false
const baseurl = ''

// mock启动
window.mock = '/mock'
window.baseUrl = baseurl
// 请求处理
axios.interceptors.request.use(async function (config) {
  store.commit('loadNumPlus')
  // let url = `${baseurl}${config.url}`
  // get拼接参数
  // if (config.method === 'get' && config.params) {
  //   url += '?'
  //   let keys = Object.keys(config.params)
  //   for (let key of keys) {
  //     url += `${key}=${encodeURIComponent(config.data[key])}&`
  //   }
  //   url = url.substring(0, url.length - 1)
  //   return {...config, url}
  // }
  return {...config}
}, function (error) {
  return Promise.reject(error)
})

// 相应体处理
axios.interceptors.response.use(function (res) {
  // loading
  store.commit('loadNumMinus')
  if (store.state.loaddingNum <= 0) {
    store.commit('resetLoadNum')
  }
  return res.data
}, function (error) {
  // loading
  store.commit('loadNumMinus')
  if (store.state.loaddingNum <= 0) {
    store.commit('resetLoadNum')
  }
  let resData = error.response.data
  Vue.prototype.$message.error(resData.message)
  return Promise.reject(resData)
})

// 调整窗口大小
window.onresize = () => {
  store.commit('resizeWindow')
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
