// 获取打折券列表
module.exports.getDiscountList = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        total: 100,
        rows: [{
          id: '24fa4366',
          status: 2,
          discount: '五折券',
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
// 删除打折券
module.exports.deleteDiscount = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
