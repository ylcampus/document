let axios = require('axios')
// 获取角色详情
module.exports.getRoleDetail = (id) => {
  return axios.get('/api/role/roleDetail/' + id)
}
// 添加角色
module.exports.addRole = (data) => {
  return axios.post('/api/role/addRole', {...data})
}
// 编辑角色
module.exports.editRole = (data) => {
  return axios.put('/api/role/editRole', {...data})
}
// 获取资源列表
module.exports.getResourceList = (data) => {
  return axios.get('/api/resource/resourceList', {params: {...data}})
}
