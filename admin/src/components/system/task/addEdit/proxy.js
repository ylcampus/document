// 获取资源详情
module.exports.getResourceDetail = () => {
  // return axios.post('/api/resource/deleteResource', {...data})
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        id: '24fa4366-1ce0-4b36-a204-1500799dfb3d',
        name: '添加资源',
        type: 1,
        path: 'api.resource.resourceList',
        group: '107',
        code: '',
        platform: '',
        desc: null,
        createAt: '2018-05-11T17:14:06.435Z',
        updateAt: '2018-05-11T17:14:06.435Z'
      },
      message: null,
      success: true
    })
  })
}
// 添加资源
module.exports.addResource = () => {
  // return axios.post('/api/resource/addResource', {...data})
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
// 编辑资源
module.exports.editResource = () => {
  // return axios.post('/api/resource/editResource', {...data})
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: null,
      message: null,
      success: true
    })
  })
}
