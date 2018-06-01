/**
 * @name 爬取整个店铺的数据
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
let co = require('co')
let config = require('../config')
let util = require('../util')
let crawGoodsListData = require('./list')
/**
 * @name 爬取首页数据
 * @param hostname - 域名
 * @param shopId - 店铺id
 * @returns
 */
let crawFirstPageData = (hostname, shopId, suid) => {
  return crawGoodsListData(hostname, shopId, suid, '1')
}

/**
 * @name 爬取整个店铺的数据
 * @param hostname - 域名
 * @param shopId - 店铺id
 * @returns
 */
let crawAllShopData = (hostname, shopId, suid) => {
  // 待返回数据模型
  let backMap = {
    shop_id: shopId,
    shop_title: null,
    total_page: null,
    current_page: '1',
    page_size: '24',
    total_results: null,
    succeed: 0, // 成功的
    failed: 0, // 失败的
    fresh: 0, // 更新的
    add: 0 // 新增的
  }
  // 发送请求
  return new Promise((resolve, reject) => {
    co(function *() {
      // 爬取首页数据
      let firstPageData = yield crawFirstPageData(hostname, shopId, suid)
      if (firstPageData.code * 1 === 0) {
        let rdata = firstPageData.data
        backMap.shop_id = rdata.shop_id
        backMap.shop_title = rdata.shop_title
        backMap.total_page = rdata.total_page
        backMap.page_size = rdata.page_size
        backMap.total_results = rdata.total_results || 0
        backMap.succeed += rdata.result.succeed.length || 0
        backMap.failed += rdata.result.failed.length || 0
        backMap.add += rdata.result.add
        util.emitMsg('craw', 'list', backMap)
      } else {
        let map = {
          code: 'craw.shop.001',
          message: '获取店铺数据失败'
        }
        util.emitMsg('craw', 'list', map)
        return resolve(map)
      }
      // 爬取剩余数据
      let currentPage = parseInt(backMap.current_page)
      // const totalPage = parseInt(backMap.total_page)
      const totalPage = 1
      for (let i = 2; i <= totalPage; i++) {
        backMap.current_page = (++currentPage).toString()
        // 反扒延时策略
        let time = util.getRandomTime(config.policy, config.shop.min)
        yield util.delay(time)
        let result = yield crawGoodsListData(hostname, shopId, suid, backMap.current_page)
        if (result.code * 1 === 0) {
          let odata = result.data
          backMap.succeed += odata.result.succeed.length || 0
          backMap.failed += odata.result.failed.length || 0
          backMap.add += odata.result.add
          util.emitMsg('craw', 'list', backMap)
        } else {
          backMap.failed += parseInt(backMap.page_size)
          util.emitMsg('craw', 'list', backMap)
        }
      }
      // 到这个位置当前店铺所有商品爬取完毕
      let total = parseInt(backMap.total_results)
      backMap.fresh = total - backMap.succeed - backMap.failed - backMap.add
      return backMap
    }).then((res) => {
      resolve({
        code: 0,
        data: res
      })
    }).catch(() => {
      resolve({
        code: 'craw.shop.001',
        message: '获取店铺数据失败'
      })
    })
  })
}
// 还要增加一个大致时间计算功能
// 导出模块
module.exports = crawAllShopData
