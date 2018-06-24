let axios = require('axios')
// 获取角色列表
module.exports.getRoleList = (data) => {
  return axios.get('/api/role/roleList', {params: {...data}})
}
// 删除角色
module.exports.deleteRole = (data) => {
  return axios.post('/api/role/deleteRole', {...data})
}
