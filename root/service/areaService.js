/*
* 区域管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const AreaDao = require('../dao/areaDao')

// 添加区域
exports.addArea = (req) => {
  return co(function *() {
    // 检查同节点下区域名称是否存在
    let aResult = yield AreaDao.isUseraccountExist(req)
    if (aResult) {
      let aErr = new Error('相同节点下区域名称已存在')
      aErr.code = 'area.err400001'
      throw aErr
    }
    // 添加区域
    return yield AreaDao.addArea(req)
  })
}

// 删除区域
exports.deleteArea = (req) => {
  return co(function *() {
    let ids = req.body.ids
    if (ids.length === 0) {
      let err = new Error('参数错误')
      err.code = 'area.err400004'
      throw err
    }
    return yield AreaDao.deleteArea(ids)
  })
}

// 编辑区域
exports.editArea = (req) => {
  return co(function *() {
    let id = req.body.id
    if (!id) {
      let err = new Error('参数错误')
      err.code = 'area.err400004'
      throw err
    }
    // 获取区域详情
    let aresult = yield AreaDao.areaDetail(id)
    if (aresult) {
      // 检查同节点下区域名称是否存在
      if (req.body.name && req.body.name !== aresult.telephone) {
        let aResult = yield AreaDao.isUseraccountExist(req)
        if (aResult) {
          let aErr = new Error('相同节点下区域名称已存在')
          aErr.code = 'area.err400001'
          throw aErr
        }
      }
    }
    return yield AreaDao.editArea(req)
  })
}

// 获取区域列表
exports.areaList = (req) => {
  return co(function *() {
    return yield AreaDao.areaList()
  })
}
