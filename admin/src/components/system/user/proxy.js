let axios = require('axios')
// 获取用户列表
module.exports.getUserList = (data) => {
  return axios.get('/api/user/userList', {params: {...data}})
}
// 删除用户
module.exports.deleteUser = (data) => {
  return axios.post('/api/user/deleteUser', {...data})
}
