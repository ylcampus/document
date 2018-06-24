// 获取店铺详情
module.exports.getShopDetail = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        id: '',
        name: '美津浓官方体验店', // 店铺名称
        hostName: 'mizuno.m.tmall.com', // 主机名
        shopId: '62193774', // 店铺Id
        suid: '451024527', // suid
        sales: '', // 在售商品数
        createAt: '2017年4月25日 08:08:08', // 创建时间
        updateAt: '2017年4月25日 08:08:08' // 最近更新时间
      },
      message: null,
      success: true
    })
  })
}
// 添加店铺
module.exports.addShop = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
// 编辑店铺
module.exports.editShop = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
