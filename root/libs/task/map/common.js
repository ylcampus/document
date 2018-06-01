/**
 * @name 公共类定时任务
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
module.exports = class commonTask {
  constructor () {
    this.isRuning = false // 是否有定时任务在运行
  }
  // 测试程序
  test (taskId, params) {
    return () => {
      console.log(params)
      console.log('测试定时任务' + new Date())
      let Task = require('../index')
      Task.changeStatus(taskId, 1)
    }
  }
  // 测试任务2
  test2 (taskId, params) {
    return () => {
      console.log(params)
      console.log('测试定时任务2' + new Date())
      let Task = require('../index')
      Task.changeStatus(taskId, 1)
    }
  }
}
