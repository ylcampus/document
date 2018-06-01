/*
* 资源管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const uuid = require('uuid')
const resourceModel = require('../libs/mongo').model('resource')

// 检查资源名称是否存在
exports.isResourceNameExist = (req) => {
  return resourceModel.findOne({
    name: req.body.name || null
  }).then((doc) => {
    return !!doc
  })
}

// 检查资源路径是否存在
exports.isResourcePathExist = (req) => {
  return resourceModel.findOne({
    name: req.body.path || null
  }).then((doc) => {
    return !!doc
  })
}

// 检查资源code码是否存在
exports.isResourceCodeExist = (req) => {
  return resourceModel.findOne({
    name: req.body.code || null
  }).then((doc) => {
    return !!doc
  })
}

// 添加资源
exports.addResource = (req) => {
  let type = parseInt(req.body.type, 10)
  let saveDoc = {
    id: uuid.v4(),
    name: req.body.name,
    type: type,
    desc: req.body.desc || ''
  }
  if (type === 1) { // 接口资源
    saveDoc.path = req.body.path
  } else if (type === 2) { // 模块资源
    saveDoc.code = parseInt(req.body.code, 10)
    saveDoc.platform = parseInt(req.body.platform, 10)
  }
  return resourceModel.create(saveDoc)
}

// 删除资源
exports.deleteResource = (ids) => {
  return resourceModel.remove({id: {$in: ids}})
}

// 编辑资源
exports.editResource = (req) => {
  let id = req.body.id
  let doc = {}
  if (req.body.name) { // 资源名称
    doc.name = req.body.name
  }
  if (req.body.type) { // 资源类型
    doc.type = parseInt(req.body.type, 10)
  }
  if (req.body.path) { // 路径
    doc.path = req.body.path
  }
  if (req.body.code) { // 模块code码
    doc.code = parseInt(req.body.code, 10)
  }
  if (req.body.platform) { // 所属平台
    doc.platform = parseInt(req.body.platform, 10)
  }
  if (req.body.desc) { // 描述信息
    doc.desc = req.body.desc
  }
  return resourceModel.updateOne({id: id}, doc)
}

// 获取资源详情
exports.resourceDetail = (id) => {
  return resourceModel.findOne({id: id})
}

// 获取资源列表
exports.resourceList = (query) => {
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
  if (query.name) { // 资源名称模糊查询
    const reg = new RegExp(query.name, 'i')
    condition.name = {
      $regex: reg
    }
  }
  if (query.type) { // 资源类型
    condition.type = parseInt(query.type, 10)
  }
  return resourceModel.find(condition).skip(skip).limit(pageSize).sort(orderMap)
}

// 获取资源总数
exports.resourceTotal = (query) => {
  let condition = {}
  if (query.name) { // 资源名称
    condition.name = query.name
  }
  if (query.type) { // 资源类型
    condition.type = parseInt(query.pageNo, 10)
  }
  return resourceModel.count(condition)
}
