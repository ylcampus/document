let axios = require('axios')
// 获取验证码
module.exports.getCaptcha = () => {
  return axios.post('/api/iam/getCaptcha')
}
// 检测用户验证码及账号信息
module.exports.checkUserVcodeAndAccountMsg = (data) => {
  return axios.post('/api/iam/checkUserVcodeAndAccountMsg', {...data})
}
// 获取手机验证码
module.exports.getTelephoneCode = () => {
  return axios.post('/api/iam/getTelephoneCode')
}
// 修改用户密码
module.exports.changeUserPwd = (data) => {
  return axios.post('/api/iam/changeUserPwd', {...data})
}
