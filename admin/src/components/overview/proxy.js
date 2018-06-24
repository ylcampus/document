let axios = require('axios')
// 添加区域
module.exports.addArea = (data) => {
  return axios.post('/api/area/addArea', {...data})
}
// 删除区域
module.exports.deleteArea = (data) => {
  return axios.post('/api/area/deleteArea', {...data})
}
// 编辑区域
module.exports.editArea = (data) => {
  return axios.put('/api/area/editArea', {...data})
}
// 获取区域列表
module.exports.getAreaList = (data) => {
  return axios.get('/api/area/areaList')
}

// 添加定时任务
module.exports.addTask = (data) => {
  return axios.post('/api/task/addTask', {...data})
}
// 删除定时任务
module.exports.deleteTask = (data) => {
  return axios.post('/api/task/deleteTask', {...data})
}
// 编辑定时任务
module.exports.editTask = (data) => {
  return axios.put('/api/task/editTask', {...data})
}
// 获取定时任务详情
module.exports.getTaskDetail = (id) => {
  return axios.get('/api/task/taskDetail/' + id)
}
// 获取定时任务列表
module.exports.getTaskList = (data) => {
  return axios.get('/api/task/taskList', {params: {...data}})
}

// 读取目录
module.exports.readDir = (data) => {
  return axios.post('/api/file/readDir', {...data})
}
// 删除文件(目录)
module.exports.rmDir = (data) => {
  return axios.post('/api/file/rmDir', {...data})
}
// 文件下载
module.exports.download = (data) => {
  return axios.get('/api/file/download', {params: {...data}})
}
// 文件预览
module.exports.preview = (data) => {
  return axios.post('/api/file/preview', {...data})
}
// 验证老手机
module.exports.validOldTelephone = (data) => {
  return axios.post('/api/iam/validOldTelephone', {...data})
}
// 更换手机号
module.exports.changeTelephone = (data) => {
  return axios.post('/api/iam/changeTelephone', {...data})
}
// 更新密码
module.exports.updatePwd = (data) => {
  return axios.post('/api/iam/updatePwd', {...data})
}
// 绑定手机号-用于首次登陆 --向导1：阅读协议；2：绑定手机号；3修改密码
module.exports.bindTelephone = (data) => {
  return axios.post('/api/iam/bindTelephone', {...data})
}
// 更改密码
module.exports.changePwd = (data) => {
  return axios.post('/api/iam/changeUserPwd', {...data})
}
