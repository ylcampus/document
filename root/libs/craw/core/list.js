/**
 * @name 爬取商品列表数据
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
const request = require('request')
const j = request.jar()
let co = require('co')
let config = require('../config')
let util = require('../util')
let crawGoodsDetailData = require('./detail')

// 基础配置信息-获取商品列表接口
let options = {
  url: config.list.defaultUrl,
  headers: config.list.headers,
  jar: j
}
/**
 * @name 获取url
 * @param hostname - 域名
 * @param shopId - 店铺id
 * @param p - 页码
 * @returns url
 * @desc 为了尽量模拟浏览器浏览行为，生成尽量逼真的url
 */
let getUrl = (hostname, shopId, suid, p) => {
  let uri = config.list.uri
  let query = uri.query
  query.spm = getSpm()
  query.shop_id = shopId
  query.callback = 'jsonp_1' + util.generateMixedNumber(7)
  query.suid = suid
  query.p = p
  let arr = []
  for (let idx in query) {
    let qStr = idx.trim() + '=' + query[idx].trim()
    arr.push(qStr)
  }
  let serch = arr.join('&')
  // 拼接url
  let uarr = []
  uarr.push(uri.protocol)
  uarr.push('://')
  uarr.push(hostname)
  uarr.push(':' + uri.port)
  uarr.push(uri.pathname)
  return uarr.join('') + '?' + serch
}

/**
 * @name 获取spm
 * @returns spm
 */
let getSpm = () => {
  let arr = []
  arr.push(util.generateMixedString(5))
  arr.push(util.generateMixedNumber(7))
  arr.push(0)
  arr.push(0)
  arr.push(util.generateMixedString(14))
  return arr.join('.')
}

/**
 * @name 为url生成cookie
 * @param url 资源定位符
 */
let setCookieToUrl = (url) => {
  let realCookie = config.list.cookie
  realCookie.cna = util.generateMixedString(24)
  realCookie.tk_trace = '1'
  realCookie._m_h5_tk = util.generateString(32) + '_1' + util.generateMixedNumber(12)
  realCookie._m_h5_tk_enc = util.generateString(32)
  realCookie.isg = util.generateMixedChars(64)
  // 为url这是cookie
  for (let idx in realCookie) {
    let cStr = idx.trim() + '=' + realCookie[idx].trim()
    let cok = request.cookie(cStr)
    j.setCookie(cok, url)
  }
}

/**
 * @name 获取json对象 jsonStr
 * @param jsonp 对象
 * @returns
 */
let getJsonFromJsonp = (jsonp) => {
  let len = jsonp.trim().length
  let jsonStr = jsonp.trim().substring(15, len - 1)
  return JSON.parse(jsonStr)
}

/**
 * @name 从数据库中获取商品时间戳
 * @param goodsId 商品id
 * @returns
 */
let getGoodsTimeStampFromDB = (goodsId) => {
  return new Promise((resolve, reject) => {
    resolve({
      code: 0,
      data: 12345
    })
  })
}

/**
 * @name 爬取单页商品数据
 * @param hostname - 域名
 * @param shopId - 店铺id
 * @param p - 页码
 * @returns
 */
let crawGoodsListData = (hostname, shopId, suid, p) => {
  /**
   * 获取cookie
   * cookie生成策略：首先检测全局变量是否有真实cookie，若有则直接使用真实cookie;
   * 若无则模拟淘宝cookie生成策略生成一个模拟的cookie。获取分页数据接口本身也可以获取cookie值并适用于商品详情接口
   * 在此采取的策略为：新获取的cooie值覆盖默认数据；一方面生成最新cookie适用于商品详情接口；另一方面覆盖全局变量
   */
  options.url = getUrl(hostname, shopId, suid, p) // 获取url
  setCookieToUrl(options.url)
  // 发送请求
  return new Promise((resolve, reject) => {
    co(function *() {
      request.get(options, function (error, response, body) {
        if (error) {
          return resolve({
            code: 'craw.list.001',
            message: '获取商品列表失败'
          })
        }
        if (!error && response.statusCode === 200) {
          let jsonObj = getJsonFromJsonp(body)
          let cacheObj = JSON.parse(JSON.stringify(jsonObj))
          delete cacheObj.items
          let glist = jsonObj.items
          let resultMap = {
            p: p,
            total: glist.length,
            succeed: [], // 成功结果
            failed: [], // 失败结果
            add: 0 // 新增结果
          }
          // 批量爬取商品
          co(function *() {
            for (let row of glist) {
              // 把函数的执行推迟一个随机时间
              let time = util.getRandomTime(config.policy, config.detail.min)
              yield util.delay(time)
              row.timeStamp = (new Date()).getTime()
              delete row.quantity
              delete row.titleUnderIconList
              let flag = true
              let gMsg = yield getGoodsTimeStampFromDB(row.item_id)
              if (gMsg.code * 1 === 0) {
                let timeStamp = parseInt(gMsg.data) || 0
                let nowTime = (new Date()).getTime()
                flag = ((nowTime - timeStamp) > config.timeStamp)
              }
              // 只有商品抓取时间超过配置时间才对商品更新
              if (flag) {
                // 爬取单个商品
                // let result = yield crawGoodsDetailData()
                // let sendMap = {
                //   shop_id: cacheObj.shop_id,
                //   shop_title: cacheObj.shop_title,
                //   goods_id: row.item_id,
                //   title: row.title,
                //   isSuccess: false,
                //   flag: 'fresh'
                // }
                // if (result.code * 1 === 0) {
                //   sendMap.isSuccess = true
                //   util.emitMsg('craw', 'detail', sendMap)
                //   resultMap.succeed.push(result.data)
                // } else {
                //   sendMap.isSuccess = true
                //   util.emitMsg('craw', 'detail', sendMap)
                //   resultMap.failed.push(result.data)
                // }
                // 临时测试
                let sendMap = {
                  shop_id: cacheObj.shop_id,
                  shop_title: cacheObj.shop_title,
                  goods_id: row.item_id,
                  title: row.title,
                  isSuccess: true,
                  flag: 'fresh'
                }
                console.log(sendMap)
                util.emitMsg('craw', 'detail', sendMap)
              } else {
                console.log('商品:' + row.title + '不需要更新' + (new Date()).toString())
              }
            }
            return resultMap
          }).then((res) => {
            // 需不需要执行日志
            cacheObj.result = resultMap
            resolve({
              code: 0,
              data: cacheObj
            })
          }).catch(() => {
            resolve({
              code: 'craw.list.001',
              message: '获取商品列表失败'
            })
          })
        }
      })
    })
  })
}
// 导出模块
module.exports = crawGoodsListData
