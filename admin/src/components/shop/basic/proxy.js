// 获取商城详情
module.exports.getMallDetail = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        id: '10000',
        name: '优乐校园官方商城', // 店铺名称
        hostName: 'ulexy.com', // 主机名
        shopId: '10000', // 店铺Id
        logo: '',
        carousel: ''
      },
      message: null,
      success: true
    })
  })
}
// 编辑商城
module.exports.editMall = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
