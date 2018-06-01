/*
* 角色管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const RoleDao = require('../dao/roleDao')
// 添加角色
exports.addRole = (req) => {
  return co(function *() {
    // 根角色
    let isRoot = req.body.root
    if (isRoot) { // 根角色只有系统才可以创建
      let rootErr = new Error('根角色只有系统才可以创建')
      rootErr.code = 'role.err400001'
      throw rootErr
    }
    // 角色类型
    let type = parseInt(req.body.type, 10) // 系统类型角色只能创建一个
    if (type === 1) { // 系统角色
      // 检查角色是否存在是否重复
      let roleResult = yield RoleDao.isRoleExist(req)
      if (roleResult) {
        let roleErr = new Error(req.body.tag + '类型角色只能创建一个')
        roleErr.code = 'role.err400002'
        throw roleErr
      }
    }
    // 检查角色名称是否存在
    let nameResult = yield RoleDao.isRoleNameExist(req)
    if (nameResult) {
      let nameErr = new Error('角色名称已存在')
      nameErr.code = 'role.err400003'
      throw nameErr
    }
    // 添加角色
    return yield RoleDao.addRole(req)
  })
}

// 删除角色
exports.deleteRole = (req) => {
  return co(function *() {
    let ids = req.body.ids
    if (ids.length === 0) {
      let err = new Error('参数错误')
      err.code = 'role.err400004'
      throw err
    }
    return yield RoleDao.deleteRole(ids)
  })
}

// 编辑角色
exports.editRole = (req) => {
  return co(function *() {
    let id = req.body.id
    if (!id) {
      let err = new Error('参数错误')
      err.code = 'role.err400004'
      throw err
    }
    // 获取角色详情
    let dresult = yield RoleDao.roleDetail(id)
    if (dresult) {
      // 根角色
      if (req.body.root && req.body.root !== dresult.root) {
        let isRoot = dresult.root
        if (isRoot) { // 根角色只有系统才可以编辑
          let rootErr = new Error('根角色只有系统才可以编辑')
          rootErr.code = 'role.err400005'
          throw rootErr
        }
      }
      // 角色类型
      if (req.body.tag && req.body.tag !== dresult.tag) {
        let type = parseInt(dresult.type, 10)
        if (type === 1) {
          let roleResult = yield RoleDao.isRoleExist(req)
          if (roleResult) {
            let roleErr = new Error(dresult.tag + '类型角色只能创建一个')
            roleErr.code = 'role.err400002'
            throw roleErr
          }
        }
      }
      // 检查角色名称是否存在
      if (req.body.name && req.body.name !== dresult.name) {
        let nameResult = yield RoleDao.isRoleNameExist(req)
        if (nameResult) {
          let nameErr = new Error('角色名称已存在')
          nameErr.code = 'role.err400003'
          throw nameErr
        }
      }
    }
    return yield RoleDao.editRole(req)
  })
}

// 获取角色详情
exports.roleDetail = (req) => {
  return co(function *() {
    let id = req.params.id
    if (!id) {
      let err = new Error('参数错误')
      err.code = 'role.err400004'
      throw err
    }
    return yield RoleDao.roleDetail(id)
  })
}

// 获取角色列表
exports.roleList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'role.err400004'
      throw err
    }
    let result = yield RoleDao.roleList(query)
    let total = yield RoleDao.roleTotal(query)
    let backMap = {
      rows: result,
      total: total
    }
    return backMap
  })
}
