/*
* iam模块
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const IamDao = require('../dao/iamDao')
const svgCaptcha = require('svg-captcha')
const setting = require('../../bin/setting')
const Util = require('../libs/util')

// 用户登录
exports.userLogin = (req) => {
  return co(function *() {
    const account = req.body.params.account
    const password = req.body.params.pwd
    const lockGapTime = setting.lockGapTime // 账号锁定时间
    const maxErrTime = setting.maxErrTime // 最大错误次数
    if (!req.session.errTime || !req.session.lastTime) {
      req.session.errTime = 0 // 错误次数
      req.session.lastTime = 0 // 最后一次出错时间
    }
    // 账号锁定
    if (req.session.errTime > maxErrTime - 1) {
      let nowTime = ((new Date()).getTime())
      if (nowTime - lockGapTime < req.session.lastTime) {
        let tErr = new Error('账号与密码已连续错误5次，请10分钟后再试')
        tErr.code = 'iam.err400005'
        throw tErr
      } else {
        req.session.errTime = 0
        req.session.lastTime = 0
      }
    }
    // 检测账号是否为空
    if (!account) {
      let accountErr = new Error('账号不能为空')
      accountErr.code = 'iam.err400001'
      req.session.errTime++
      req.session.lastTime = (new Date()).getTime()
      throw accountErr
    }
    // 检测密码是否为空
    if (!password) {
      let passwordErr = new Error('密码不能为空')
      passwordErr.code = 'iam.err400002'
      req.session.errTime++
      req.session.lastTime = (new Date()).getTime()
      throw passwordErr
    }
    // 获取用户信息
    let userMsg = yield IamDao.getUserMsg(req)
    // 账号校验
    if (!userMsg) {
      let aErr = new Error('账号不存在')
      aErr.code = 'iam.err400003'
      req.session.errTime++
      req.session.lastTime = (new Date()).getTime()
      throw aErr
    }
    // 密码校验
    let dbPwd = userMsg.pwd
    if (password !== dbPwd) {
      let pErr = new Error('密码错误')
      pErr.code = 'iam.err400004'
      req.session.errTime++
      req.session.lastTime = (new Date()).getTime()
      throw pErr
    }
    // 账号密码校验通过后删除错误标识
    delete req.session.errTime
    delete req.session.lastTime
    let userType = parseInt(userMsg.type, 10)
    let auth = '' // 权限数据
    switch (userType) {
      case 1: // 系统管理员
        console.log('这是一个系统管理员')
        // 下面的步骤又应该是怎样呢
        // 明天再说吧
        break
      case 2: // 管理员 （相当于店铺的超级管理员）
        break
      case 3: // 普通用户 （包括官方管理平台用户与商家管理平台用户）
        break
      default:
        break
    }
    // 封装session数据
    console.log('here')
    // 先创建一个超级管理员
    // // 现在开始模拟登录接口
    // // 再一次登录的逻辑又是怎么回事 ？
    // // req.session.user = { // 获取到的用户信息
    // //   id: '10000',
    // //   tag: 'member',
    // //   username: 'dongjiguo',
    // //   roleId: null,
    // //   tenentId: ''
    // // }
    // // 获取到的用户权限信息 addResource
    // req.session.auth = 'api.resource.addResource,api.goods.goodsList,api.resource.editResource,api.resource.resourceList'
    return userMsg
  })
}

// 会员注册
exports.register = (req) => {
  return co(function *() {
    return null
  })
}

// 登出
exports.loginOut = (req) => {
  return co(function *() {
    req.session.destroy()
    return null
  })
}

// 获取验证码
exports.getCaptcha = (req) => {
  let codeConfig = {
    size: 5, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 1, // 干扰线条的数量
    height: 40,
    width: 120
    // color: true,
    // background: '#cc9966'
  }
  let captcha = svgCaptcha.create(codeConfig)
  req.session.captcha = captcha.text
  return captcha
}

// 检测用户验证码及账号信息
exports.checkUserVcodeAndAccountMsg = (req) => {
  return co(function *() {
    // 检查用户账号是否存在
    let accountResult = yield IamDao.isUserAccountExist(req)
    if (!accountResult) {
      let accountErr = new Error('账号不存在')
      accountErr.code = 'iam.err400003'
      delete req.session.account
      throw accountErr
    }
    // 检测验证码是否错误
    let vcode = req.body.vCode.trim()
    let captcha = req.session.captcha.trim().toLowerCase()
    if (vcode !== captcha) {
      let vcodeErr = new Error('验证码错误')
      vcodeErr.code = 'iam.err400006'
      throw vcodeErr
    } else {
      delete req.session.captcha
    }
    // 校验通过则根据账号获取用户基本信息
    let userBasicMsg = yield IamDao.getUserBasicMsg(req)
    userBasicMsg.telephone = '18205185737'
    req.session.account = userBasicMsg.account
    req.session.telephone = userBasicMsg.telephone
    // 把用户电话号码重点四位用****替换
    let tel = userBasicMsg.telephone
    if (tel) {
      let arr = []
      arr.push(tel.substr(0, 3))
      arr.push('****')
      arr.push(tel.substr(7))
      userBasicMsg.telephone = arr.join('')
    }
    delete userBasicMsg.pwd // 删除密码信息
    return userBasicMsg
  })
}

// 获取手机验证码
exports.getTelephoneCode = (req) => {
  return co(function *() {
    if (!req.session.account) {
      let accountErr = new Error('账号不存在')
      accountErr.code = 'iam.err400003'
      throw accountErr
    }
    let telephone = req.session.telephone
    // 下面是执行发送短信的逻辑
    let tCode = Util.getRandomNumber(6)
    req.session.tCode = tCode
    console.log(telephone)
    // 临时方案 返回一个六位随机数
    return tCode
  })
}
