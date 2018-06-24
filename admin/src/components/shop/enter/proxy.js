// 获取资源列表
module.exports.getShopList = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        total: 100,
        rows: [{
          name: '美津浓官方体验店',
          hostName: 'mizuno.m.tmall.com', // 主机名
          shopId: '62193774',
          suid: '451024527',
          sales: '', // 在售商品数
          createAt: '2018-09-08 08:08:08'
        }]
      },
      message: null,
      success: true
    })
  })
}
// 删除店铺
module.exports.deleteShop = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
