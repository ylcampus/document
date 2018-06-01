/*
* 区域管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const uuid = require('uuid')
const areaModel = require('../libs/mongo').model('area')

// 检查同节点下区域名称是否存在
exports.isUseraccountExist = (req) => {
  return areaModel.findOne({
    name: req.body.name || null,
    father: req.body.father || null
  }).then((doc) => {
    return !!doc
  })
}

// 添加区域
exports.addArea = (req) => {
  let saveDoc = {
    id: uuid.v4(), // 区域Id
    name: req.body.name, // 区域名称
    father: req.body.father, // 父节点
    deep: req.body.deep // 区域深度
  }
  return areaModel.create(saveDoc)
}

// 删除区域
exports.deleteArea = (ids) => {
  return areaModel.remove({id: {$in: ids}})
}

// 获取区域详情
exports.areaDetail = (id) => {
  return areaModel.findOne({id: id})
}

// 编辑区域
exports.editArea = (req) => {
  let id = req.body.id
  let doc = {}
  if (req.body.name) { // 区域名称
    doc.name = req.body.name
  }
  return areaModel.updateOne({id: id}, doc)
}

// 获取区域列表
exports.areaList = () => {
  return areaModel.find()
}
