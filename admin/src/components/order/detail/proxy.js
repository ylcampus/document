// 获取订单详情
module.exports.getOrderDetail = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        total: 100,
        rows: [{
          id: '24fa4366',
          name: '管理员',
          authList: []
        }, {
          id: '24fa4366-2',
          name: '订单管理员',
          authList: []
        }, {
          id: '24fa4366-3',
          name: '后勤人员',
          authList: []
        }]
      },
      message: null,
      success: true
    })
  })
}
