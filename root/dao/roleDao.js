/*
* 角色管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const uuid = require('uuid')
const roleModel = require('../libs/mongo').model('role')

// 检查角色是否存在
exports.isRoleExist = (req) => {
  return roleModel.findOne({
    tag: req.body.tag || null
  }).then((doc) => {
    return !!doc
  })
}

// 检查角色名称是否存在
exports.isRoleNameExist = (req) => {
  return roleModel.findOne({
    name: req.body.name || null
  }).then((doc) => {
    return !!doc
  })
}

// 添加角色
exports.addRole = (req) => {
  let type = parseInt(req.body.type, 10)
  let saveDoc = {
    id: uuid.v4(),
    tenentId: '10000',
    name: req.body.name,
    root: false,
    type: type,
    tag: req.body.tag,
    desc: req.body.desc || ''
  }
  if (type === 1) { // 系统角色只需设定api权限
    saveDoc.apiAuth = req.body.apiAuth
    saveDoc.apiStr = req.body.apiStr
  } else if (type === 2) { // 平台角色只需要设定模块权限
    saveDoc.moduleAuth = req.body.moduleAuth
    saveDoc.codeAuth = req.body.codeAuth
    saveDoc.codeStr = req.body.codeStr
  }
  return roleModel.create(saveDoc)
}

// 删除角色
exports.deleteRole = (ids) => {
  return roleModel.remove({id: {$in: ids}})
}

// 获取角色详情
exports.roleDetail = (id) => {
  return roleModel.findOne({id: id})
}

// 编辑角色
exports.editRole = (req) => {
  let id = req.body.id
  let doc = {}
  if (req.body.name) { // 角色名称
    doc.name = req.body.name
  }
  if (req.body.type) { // 角色类型
    doc.type = parseInt(req.body.type, 10)
  }
  if (req.body.tag) { // 标签
    doc.tag = req.body.tag
  }
  if (req.body.apiAuth) { // api权限码
    doc.apiAuth = req.body.apiAuth
  }
  if (req.body.apiStr) { // api权限字符串
    doc.apiStr = req.body.apiStr
  }
  if (req.body.moduleAuth) { // 模块权限码
    doc.moduleAuth = req.body.moduleAuth
  }
  if (req.body.codeAuth) { // code权限码
    doc.codeAuth = req.body.codeAuth
  }
  if (req.body.codeStr) { // code权限字符串
    doc.codeStr = req.body.codeStr
  }
  if (req.body.desc) { // 描述信息
    doc.desc = req.body.desc
  }
  return roleModel.updateOne({id: id}, doc)
}

// 获取角色列表
exports.roleList = (query) => {
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
  if (query.name) { // 角色名称
    condition.name = query.name
  }
  if (query.type) { // 角色类型
    condition.type = parseInt(query.type, 10)
  }
  return roleModel.find(condition).skip(skip).limit(pageSize).sort(orderMap)
}

// 获取角色总数 -- 还需要加一个租户id参数
exports.roleTotal = (query) => {
  let condition = {}
  if (query.name) { // 资源名称
    condition.name = query.name
  }
  if (query.type) { // 资源类型
    condition.type = parseInt(query.pageNo, 10)
  }
  return roleModel.count(condition)
}
