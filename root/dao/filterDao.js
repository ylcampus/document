/*
* 用户管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const uuid = require('uuid')
const roleModel = require('../libs/mongo').model('role')

// 检查用户账号是否存在
exports.test = (req) => {
  return new Promise((resolve) => {
    resolve()
  })
}
