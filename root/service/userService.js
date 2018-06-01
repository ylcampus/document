/*
* 用户管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const UserDao = require('../dao/userDao')

// 添加用户
exports.addUser = (req) => {
  return co(function *() {
    // 检查用户账号是否存在
    let accountResult = yield UserDao.isUseraccountExist(req)
    if (accountResult) {
      let accountErr = new Error('用户账号已经存在')
      accountErr.code = 'user.err400001'
      throw accountErr
    }
    // 通过角色Id获取角色名称
    let result = yield UserDao.getRoleDetail(req.body.roleId)
    req.body['roleName'] = result ? result.name : '角色不存在'
    return yield UserDao.addUser(req)
  })
}

// 删除用户
exports.deleteUser = (req) => {
  return co(function *() {
    let ids = req.body.ids
    if (ids.length === 0) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    return yield UserDao.deleteUser(ids)
  })
}

// 编辑用户
exports.editUser = (req) => {
  return co(function *() {
    let id = req.body.id
    if (!id) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    // 获取角色详情
    let uresult = yield UserDao.userDetail(id)
    if (uresult) {
      // 检查电话号码是否存在
      if (req.body.telephone && req.body.telephone !== uresult.telephone) {
        let telResult = yield UserDao.isUserTelephoneExist(req)
        if (telResult) {
          let telErr = new Error('电话号码已被使用')
          telErr.code = 'user.err400002'
          throw telErr
        }
      }
      // 检查电子邮箱是否存在
      if (req.body.email && req.body.email !== uresult.email) {
        let emailResult = yield UserDao.isUserEmailExist(req)
        if (emailResult) {
          let emailErr = new Error('电子邮箱已被使用')
          emailErr.code = 'user.err400003'
          throw emailErr
        }
      }
    }
    // 通过角色Id获取角色名称
    if (req.body.roleId) {
      let result = yield UserDao.getRoleDetail(req.body.roleId)
      req.body['roleName'] = result ? result.name : '角色不存在'
    }
    return yield UserDao.editUser(req)
  })
}

// 获取用户详情
exports.userDetail = (req) => {
  return co(function *() {
    let id = req.params.id
    if (!id) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    return yield UserDao.userDetail(id)
  })
}

// 获取用户列表
exports.userList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    let result = yield UserDao.userList(query)
    let total = yield UserDao.userTotal(query)
    let backMap = {
      rows: result,
      total: total
    }
    return backMap
  })
}
