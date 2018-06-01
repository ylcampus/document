/*
* 用户管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const IamService = require('../service/iamService')
const Result = require('../../root/libs/result')

// 登录
router.post('/userLogin', (req, res, next) => {
  co(function *() {
    let result = yield IamService.userLogin(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 注册
router.post('/register', (req, res, next) => {
  co(function *() {
    let result = yield IamService.register(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 登出
router.post('/loginOut', (req, res, next) => {
  co(function *() {
    let result = yield IamService.loginOut(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取验证码
router.post('/getCaptcha', (req, res, next) => {
  co(function *() {
    let result = yield IamService.getCaptcha(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 检测用户验证码及账号信息
router.post('/checkUserVcodeAndAccountMsg', (req, res, next) => {
  co(function *() {
    let result = yield IamService.checkUserVcodeAndAccountMsg(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取手机验证码
router.post('/getTelephoneCode', (req, res, next) => {
  co(function *() {
    let result = yield IamService.getTelephoneCode(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})
// 修改用户密码
router.post('/changeUserPwd', (req, res, next) => {
  co(function *() {
    let result = yield IamService.changeUserPwd(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})







module.exports = router
