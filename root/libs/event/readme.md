// ok 大概是可以从这个地方入手测试了
let evtObj = require('./root/libs/event')
let craw = require('./root/libs/craw')
let shops = [{
  hostname: 'mizuno.m.tmall.com',
  shopId: '62193774',
  suid: '451024527'
}, {
  hostname: 'asics.m.tmall.com',
  shopId: '64474411',
  suid: '661559176'
}]
craw.crawAllData(shops).then((res) => {
  console.log(res)
})

let tfun = (msg) => {
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
    console.log(evtObj)
    console.log('--------------看结果----------------------')
    console.log(evtObj.isExist ('craw'))
    evtObj.remove('craw')
    console.log(evtObj.isExist ('craw'))
    console.log('--------------看结果----------------------')
    console.log(evtObj)
  }
}
// 注册一个监听函数 ---看来已经其效果了
evtObj.register('craw', tfun)

// 又要怎样和用户关联起来？不需要关联

// evtObj.register('craw', (msg) => {
//
// })
// evtObj.register('craw', (msg) => {
//
// })
// evtObj.register('craw', (msg) => {
//
// })



// evtObj.register('craw', crawEventFun)


