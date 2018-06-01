'use strict'
let event = require('../../../root/libs/event')

/**
 * @name 监听爬取商品信号
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
let onCraw = () => {
  event.on('craw', function (msg) {
    let type = msg.type
    // 原来的 更新的 新加的
    if (type === 'detail') { // detail list shop all start end
      let data = msg.data
      let time = (new Date()).toJSON()
      let status = data.isSuccess ? '爬取成功' : '爬取失败'
      let opaStatus = '未知状态'
      if (data.flag === 'origin') {
        opaStatus = '未更新'
      } else if (data.flag === 'fresh') {
        opaStatus = '更新'
      } else if (data.flag === 'add') {
        opaStatus = '新加'
      }
      let str = time + '  ' + status + '  ' + data.title + '  ' + data.shop_title + '  ' + opaStatus
      console.log(str)
    } else {
      console.log('other')
    }
  })
}
module.exports.start = onCraw
