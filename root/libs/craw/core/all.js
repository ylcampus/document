/**
 * @name 爬取所有数据
 * @author dongjiguo2008123@126.com  --- 不靠谱 应该删除这个文件
 * @date 2018-04
 */
'use strict'
const co = require('co')
const config = require('../config')
const util = require('../util')
const crawAllShopData = require('./shop')

/**
 * @name 爬取所有数据
 * @param shops - 店铺集合
 * @returns
 */
let crawAllData = (shops) => {
  // 待返回数据模型
  let backMap = {
    total_shop: shops.length,
    current_shop: null,
    total_results: 0,
    succeed: 0, // 成功的
    failed: 0, // 失败的
    item: {
      succeed: 0, // 成功的
      failed: 0, // 失败的
      fresh: 0, // 更新的
      add: 0 // 新增的
    }
  }
  // 发送请求
  return new Promise((resolve, reject) => {
    co(function *() {
      for (let row of shops) {
        // 把函数的执行推迟一个随机时间
        let time = util.getRandomTime(config.policy, config.all.min)
        yield util.delay(time)
        // 爬取单个店铺商品
        let result = yield crawAllShopData(row.hostname, row.shopId, row.suid)
        if (result.code * 1 === 0) {
          let sdata = result.data
          backMap.current_shop = sdata.shop_title
          backMap.total_results += parseInt(sdata.total_results)
          backMap.succeed++
          backMap.item.succeed += sdata.succeed
          backMap.item.failed += sdata.failed
          backMap.item.fresh += sdata.fresh
          backMap.item.add += sdata.add
          util.emitMsg('craw', 'shop', result.data) // 这个可以进行改在
        } else {
          backMap.failed++
          util.emitMsg('craw', 'shop', result)
        }
      }
      return backMap
    }).then((res) => {
      let map = {
        code: 0,
        data: res
      }
      resolve(map)
    }).catch(() => {
      let map = {
        code: 'craw.all.001',
        message: '获取商品失败'
      }
      resolve(map)
    })
  })
}
// 导出模块
module.exports = crawAllData
