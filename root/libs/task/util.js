/**
 * @name 组件库
 * @author dongjiguo2008123@126.com
 * @date 2018-05
 */
'use strict'
// 引入数据库
/**
 * @name 获取定时任务列表
 * @param  task -定时任务
 * @returns id -定时任务id
 */
module.exports.getTaskList = () => {
  return new Promise((resolve, reject) => {
    resolve({
      code: 0,
      data: []
    })
  })
}

/**
 * @name 获取店铺列表
 * @param  task -定时任务
 * @returns id -定时任务id
 */
module.exports.getShopList = () => {
  return new Promise((resolve, reject) => {
    resolve({
      code: 0,
      data: [{
        hostname: 'asics.m.tmall.com',
        shopId: '64474411',
        suid: '661559176'
      }]
    })
    // resolve({
    //   code: 0,
    //   data: [{
    //     hostname: 'mizuno.m.tmall.com',
    //     shopId: '62193774',
    //     suid: '451024527'
    //   }, {
    //     hostname: 'asics.m.tmall.com',
    //     shopId: '64474411',
    //     suid: '661559176'
    //   }]
    // })
  })
}

/**
 * @name 更新定时任务状态
 * @param  task -定时任务
 * @returns id -定时任务id
 */
module.exports.updateTaskStatua = (id) => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}
