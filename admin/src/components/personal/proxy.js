// 测试接口 getInfo, changeInfo getValidCode, validOldPhone, changeNewPhone changePwd
// 获取信息
module.exports.getInfo = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        username: 'admin001',
        name: '董纪国',
        sex: 1,
        telephone: '18205185737',
        email: 'dongjiguo2008123@126.com'
      }
    })
  })
}
// 修改信息
module.exports.changeInfo = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: 123456
    })
  })
}
// 获取手机验证码
module.exports.getValidCode = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: 123456
    })
  })
}
// 验证老手机
module.exports.validOldPhone = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: 123456
    })
  })
}
// 修改新手机
module.exports.changeNewPhone = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: 123456
    })
  })
}
// 修改密码
module.exports.changePwd = () => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: 123456
    })
  })
}
