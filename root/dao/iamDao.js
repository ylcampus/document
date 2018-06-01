/*
* Iam模块-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const uuid = require('uuid')
const userModel = require('../libs/mongo').model('user')

// 获取用户信息 - 应该修改为账号或密码 - 之后再增加吧 -今天不想写
exports.getUserMsg = (req) => {
  let account = req.body.params.account
  return userModel.findOne({account: account})
}

// 检测账号是否存在
exports.isUserAccountExist = (req) => {
  return userModel.findOne({
    account: req.body.account || null
  }).then((doc) => {
    return !!doc
  })
}

// 根据账号名获取用户基本信息
exports.getUserBasicMsg = (req) => {
  return userModel.findOne({
    account: req.body.account || null
  }).then((doc) => {
    return doc
  })
}

