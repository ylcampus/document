// let axios = require('axios')
// 获取定时任务列表
module.exports.getTaskList = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        total: 100,
        rows: [{
          id: 'becbb4f7-8d07-4ec9-b9b8-2302cd5da06b',
          type: 1,
          name: '定时任务1',
          tenant: '优乐商城', // 所属店铺
          tenantId: '10000',
          funname: 'craw', // 处理函数名称
          ready: true, // 就绪状态 未启用 已启用
          rule: '0 29 * * * *', // 执行时间规则
          params: null, // 附加参数
          handle: null, // 处理函数
          status: 'pending', // 运行状态 runing 运行中 pending 挂起中
          j: null, // 这一个字段的信息不应该保存到数据库中去？
          desc: '描述', // 描述
          creator: '', // 创建者
          create_at: '', // 创建时间
          update_at: '' // 最近更新时间
        }]
      },
      message: null,
      success: true
    })
  })
}
// 删除定时任务
module.exports.deleteTask = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
