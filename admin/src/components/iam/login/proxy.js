let axios = require('axios')
// 用户登录
module.exports.loginIn = (data) => {
  return axios.post('/api/iam/userLogin', {params: {...data}})
}
