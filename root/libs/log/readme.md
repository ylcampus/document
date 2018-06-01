// let path = require('path')
let fs = require('fs')
process.env.rootPath = __dirname
let os = require('os')
let log = require('./root/libs/log')

let fpath = 'static/log/goods/002/2018年6月份爬取商品执行日志.txt'
let crawLog = log.create(fpath)
// 这一块总感觉有点不方便
// let data =[{
//   shop_id: '10001',
//   shop_title: '美津浓官方体验店',
//   goods_id: '10009',
//   title: '这是一个商品',
//   isSuccess: false,
//   flag: 'fresh'
// }]
//
// crawLog.openSync()
// for (let i =0; i < 20; i++) {
//   crawLog.appendLine([{
//     shop_id: '10001',
//     shop_title: '美津浓官方体验店',
//     goods_id: '10009',
//     title: '这是一个商品',
//     isSuccess: false,
//     flag: 'fresh'
//   }])
// }
// crawLog.closeSync()
let data = JSON.stringify({name:'dongjiguo', isruning: true})
crawLog.writeFile(data)
// 下一步的任务是读取日志文件中数据并把他转换成json对象
// 感觉是有办法的 再加两个方法就可以了
crawLog.readFile((err, data) => {
  console.log(data)
})
