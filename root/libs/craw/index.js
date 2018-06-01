/**
 * @name 爬取商品模块
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
let socket = require('./socket')
// 爬取商品详情数据
let crawGoodsDetailData = require('./core/detail')
// 爬取商品列表数据
let crawGoodsListData = require('./core/list')
// 爬取整个店铺商品数据
let crawAllShopData = require('./core/shop')
// 爬取所有商品数据
let crawAllData = require('./core/all')
// 启动监听器
// socket.start() // 这个地方不应该做成加载就启动的 ？
// 构造函数
function Craw () {}
/**
 * 创建一个爬虫实例
 * @param t
 * @returns
 */
let createInstance = (option) => {
  return new Craw(option)
}
createInstance()
// ?? 到底应该怎么设计才好？
// 这个地方只需要向外暴露三个接口就可以
// 爬取商品详情数据
Craw.prototype.crawGoodsDetailData = crawGoodsDetailData
// 爬取商品列表数据
Craw.prototype.crawGoodsListData = crawGoodsListData
// 爬取整个店铺商品数据
Craw.prototype.crawAllShopData = crawAllShopData
// 爬取所有商品数据
Craw.prototype.crawAllData = crawAllData
module.exports = createInstance()
