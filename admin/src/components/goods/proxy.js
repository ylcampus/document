// 获取商品列表
module.exports.getGoodsList = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        total: 100,
        rows: [{
          id: '24fa4366',
          name: '第一件商品',
          price: 120,
          shopId: '1111',
          shopName: '美津浓官方体验店',
          status: 2,
          pics: [],
          skuList: [],
          updateAt: '2018-08-08 08:08:08'
        }]
      },
      message: null,
      success: true
    })
  })
}
// 获取店铺列表
module.exports.getShopList = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        total: 100,
        rows: [{
          name: '不限',
          shopId: ''
          }, {
          name: '美津浓官方体验店',
          hostName: 'mizuno.m.tmall.com', // 主机名
          shopId: '62193774',
          suid: '451024527',
          sales: '', // 在售商品数
          createAt: '2018-09-08 08:08:08'
        }, {
          name: '亚瑟士官方体验店',
          hostName: 'mizuno.m.tmall.com', // 主机名
          shopId: '62193775',
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
// 删除商品
module.exports.deleteGoods = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
