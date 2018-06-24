let axios = require('axios')
// 获取角色列表
module.exports.getRoleList = (data) => {
  return axios.get('/api/role/roleList', {params: {...data}})
}
// 获取用户详情
module.exports.getUserDetail = (id) => {
  return axios.get('/api/user/userDetail/' + id)
}
// 添加用户
module.exports.addUser = (data) => {
  return axios.post('/api/user/addUser', {...data})
}
// 编辑用户
module.exports.editUser = (data) => {
  return axios.put('/api/user/editUser', {...data})
}
// 重置用户密码
module.exports.resetUserPassword = (id) => {
  // return axios.post('/api/user/resetUserPassword/' + id)
  return new Promise((resolve) => {
    resolve({
      code: 0
    })
  })
}
