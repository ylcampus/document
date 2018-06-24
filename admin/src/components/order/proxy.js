// 获取订单列表
module.exports.getOrderList = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        total: 100,
        rows: [{
          id: '24fa4366',
          status: 2,
          account: 'ule@123',
          goodsName: '这是一个商品名称',
          shopName: '美津浓官方体验店',
          createAt: '2018-08-08 08:08:08',
          updateAt: '2018-08-08 08:08:08'
        }]
      },
      message: null,
      success: true
    })
  })
}
// 删除订单
module.exports.deleteOrder = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
