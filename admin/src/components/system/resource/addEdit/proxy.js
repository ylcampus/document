let axios = require('axios')
// 获取资源详情
module.exports.getResourceDetail = (id) => {
  return axios.get('/api/resource/resourceDetail/' + id)
}
// 添加资源
module.exports.addResource = (data) => {
  return axios.post('/api/resource/addResource', {...data})
}
// 编辑资源
module.exports.editResource = (data) => {
  return axios.put('/api/resource/editResource', {...data})
}
