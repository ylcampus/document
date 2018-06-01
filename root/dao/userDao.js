/*
* 用户管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const uuid = require('uuid')
const userModel = require('../libs/mongo').model('user')
const roleModel = require('../libs/mongo').model('role')

// 检查用户账号是否存在
exports.isUseraccountExist = (req) => {
  return userModel.findOne({
    account: req.body.account || null
  }).then((doc) => {
    return !!doc
  })
}

// 获取角色详情
exports.getRoleDetail = (id) => {
  return roleModel.findOne({id: id})
}

// 添加用户
exports.addUser = (req) => {
  let saveDoc = {
    id: uuid.v4(), // 用户Id
    tenentId: '10000', // 租户id
    type: 3, // 用户类型
    pwd: 'ule@123', // ?初始密码配置需放到配置文件中
    origin: true, // 是初始密码
    account: req.body.account, // 用户账号
    roleId: req.body.roleId, // 用户账号
    roleName: req.body.roleName // 角色名称
  }
  if (req.body.name) { // 姓名
    saveDoc['name'] = req.body.name
  }
  if (req.body.name) { // 性别
    saveDoc['sex'] = parseInt(req.body.sex, 10)
  }
  if (req.body.desc) { // 描述
    saveDoc['desc'] = req.body.desc
  }
  return userModel.create(saveDoc)
}

// 删除用户
exports.deleteUser = (ids) => {
  return userModel.remove({id: {$in: ids}})
}

// 获取用户详情
exports.userDetail = (id) => {
  return userModel.findOne({id: id})
}

// 检查电话号码是否存在
exports.isUserTelephoneExist = (req) => {
  return userModel.findOne({
    telephone: req.body.telephone || null
  }).then((doc) => {
    return !!doc
  })
}

// 检查电子邮箱是否存在
exports.isUserEmailExist = (req) => {
  return userModel.findOne({
    email: req.body.email || null
  }).then((doc) => {
    return !!doc
  })
}

// 编辑用户
exports.editUser = (req) => {
  let id = req.body.id
  let doc = {}
  if (req.body.roleId) { // 角色Id
    doc.roleId = req.body.roleId
  }
  if (req.body.roleName) { // 角色名称
    doc.roleName = req.body.roleName
  }
  if (req.body.name) { // 姓名
    doc.name = req.body.name
  }
  if (req.body.sex) { // 性别
    doc.sex = parseInt(req.body.sex, 10)
  }
  if (req.body.telephone) { // 手机号码
    doc.telephone = req.body.telephone
  }
  if (req.body.email) { // 电子邮箱
    doc.email = req.body.email
  }
  if (req.body.desc) { // 描述信息
    doc.desc = req.body.desc
  }
  return userModel.updateOne({id: id}, doc)
}

// 获取用户列表
exports.userList = (query) => {
  // 分页
  let pageSize = parseInt(query.pageSize, 10)
  let pageNo = parseInt(query.pageNo, 10)
  let skip = (pageNo - 1) * pageSize
  //  排序
  let orderMap = {}
  if (query.prop && query.order) {
    if (query.order === 'descending') { // 降序
      orderMap[query.prop] = -1
    } else if (query.order === 'ascending') { // 升序
      orderMap[query.prop] = 1
    }
  }
  let condition = {}
  if (query.search) { // 用户名称
    condition.name = query.search
  }
  if (query.type) { // 用户类型
    condition.type = parseInt(query.pageNo, 10)
  }
  return userModel.find(condition).skip(skip).limit(pageSize).sort(orderMap)
}

// 获取用户总数 -- 还需要加一个租户id参数
exports.userTotal = (query) => {
  let condition = {}
  if (query.name) { // 用户名称
    condition.name = query.name
  }
  if (query.type) { // 用户类型
    condition.type = parseInt(query.pageNo, 10)
  }
  return userModel.count(condition)
}
