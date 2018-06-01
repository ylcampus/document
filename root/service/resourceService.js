/*
* 资源管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const ResourceDao = require('../dao/resourceDao')
// 添加资源
exports.addResource = (req) => {
  return co(function *() {
    // 资源类型
    let type = parseInt(req.body.type, 10)
    if (type === 1) { // 接口资源
      // 检查资源名称是否重复
      let nameResult = yield ResourceDao.isResourceNameExist(req)
      if (nameResult) {
        let nameErr = new Error('资源名称已存在')
        nameErr.code = 'resource.err400001'
        throw nameErr
      }
      // 检查path路径是否重复
      let pathResult = yield ResourceDao.isResourcePathExist(req)
      if (pathResult) {
        let pathErr = new Error('资源路径已存在')
        pathErr.code = 'resource.err400002'
        throw pathErr
      }
    } else if (type === 2) { // 模块资源
      // 检查code码是否重复
      let codeResult = yield ResourceDao.isResourceCodeExist(req)
      if (codeResult) {
        let codeErr = new Error('资源模块指定的code码已存在')
        codeErr.code = 'resource.err400003'
        throw codeErr
      }
    }
    // 添加资源
    return yield ResourceDao.addResource(req)
  })
}

// 删除资源
exports.deleteResource = (req) => {
  return co(function *() {
    let ids = req.body.ids
    if (ids.length === 0) {
      let err = new Error('参数错误')
      err.code = 'resource.err400004'
      throw err
    }
    return yield ResourceDao.deleteResource(ids)
  })
}

// 编辑资源
exports.editResource = (req) => { // 这个接口有问题
  return co(function *() {
    let id = req.body.id
    if (!id) {
      let err = new Error('参数错误')
      err.code = 'resource.err400004'
      throw err
    }
    return yield ResourceDao.editResource(req)
  })
}

// 获取资源详情
exports.resourceDetail = (req) => {
  return co(function *() {
    let id = req.params.id
    if (!id) {
      let err = new Error('参数错误')
      err.code = 'resource.err400004'
      throw err
    }
    return yield ResourceDao.resourceDetail(id)
  })
}

// 获取资源列表
exports.resourceList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'resource.err400004'
      throw err
    }
    let result = yield ResourceDao.resourceList(query)
    let total = yield ResourceDao.resourceTotal(query)
    let backMap = {
      rows: result,
      total: total
    }
    // 还有一个模糊查询没有实现
    return backMap
  })
}
