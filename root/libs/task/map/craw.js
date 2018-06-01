/**
 * @name 爬虫类定时任务
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
let co = require('co')
let evtObj = require('../../event')
let craw = require('../../craw')
let log = require('../../log')
let util = require('../util')
module.exports = class crawTask {
  constructor () {
    this.isRuning = false // 是否有定时任务在运行
    this.basePath = 'static/log/goods'
  }
  // 爬取所有商品 --- 这个爬取所有商品数据的定时任务 -- 删除
  craw (taskId) {
    return () => {
      console.log('定时任务已开始运行')
      console.log(taskId)
      if (this.isRuning) {
        throw new Error('存在运行中的爬虫任务，请等待')
      }
      this.isRuning = true
      let falipath = this.basePath + '/002/2018年6月份爬取商品执行日志.txt'
      // 创建一个日志文件并写入日志信息
      let crawLog = log.create(falipath)
      crawLog.openSync()
      evtObj.register('craw', (msg) => {
        console.log((new Date()).toJSON())
        crawLog.appendLine(msg)
      })
      // 爬取所有商品数据
      co(function * () {
        let Task = require('../index')
        yield util.updateTaskStatua(taskId) // 更新定时任务到runing状态
        let result = yield util.getShopList() // 获取店铺列表
        if (result.code * 1 === 0) {
          let shops = result.data || []
          if (shops.length) {
            let crawResult = yield craw.crawAllData(shops)
            crawLog.appendLine(crawResult)
            console.log(Task)
            Task.toPending(taskId) // 更新定时任务到挂起状态
            yield util.updateTaskStatua(taskId) // 更新定时任务到pending状态 -- 不需要
            crawLog.appendLine('定时任务运行结束')
            evtObj.remove('craw') // 移除监听函数
            this.isRuning = false // 设置运行状态
            crawLog.closeSync() // 关闭日志
            console.log('定时任务运行结束')
          }
        }
      })
    }
  }
}
