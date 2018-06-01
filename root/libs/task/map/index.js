/**
 * @name 定时任务执行函数地图
 * @author dongjiguo2008123@126.com
 * @date 2018-05
 */
'use strict'
const CommonTask = require('./common')
const CrawTask = require('./craw')
const FinanceTask = require('./finance')
const OrderTask = require('./order')
const ShopTask = require('./shop')
module.exports.commonTask = new CommonTask() // 公共类定时任务
module.exports.crawTask = new CrawTask() // 爬虫类定时任务
module.exports.financeTask = new FinanceTask() // 财务类定时任务
module.exports.orderTask = new OrderTask() // 订单类定时任务
module.exports.shopTask = new ShopTask() // 店铺类定时任务

// 可不可以在这里面做文章
