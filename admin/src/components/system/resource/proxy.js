let axios = require('axios')
// 导出资源列表
module.exports.getResourceList = (data) => {
  return axios.get('/api/resource/resourceList', {params: {...data}})
}
// 删除资源
module.exports.deleteResource = (data) => {
  return axios.post('/api/resource/deleteResource', {...data})
}
