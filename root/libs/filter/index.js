/*
* 过滤器
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* @desc 两个问题没有解决
* 1：单点登录
* 2：同一账号只能在一个地方登录问题
* */
'use strict'
const co = require('co')
const FilterService = require('../../service/filterService')
module.exports = (req, res, next) => {
  co(function* () {
    // let uri = req.originalUrl.substr(1).split('/').join('.').split('?')[0].trim()
    // // 获取访客角色资源数据
    // let authStr = (yield FilterService.getVisitRoleResourceList()).auth || ''
    // let authArr = authStr.split(',')
    // // 若果是访客接口则直接过
    // if (authArr.indexOf(uri) > -1) {
    //   return next()
    // }
    // // 登录校验
    // if (!req.session.user) {
    //   let err = new Error('请登录')
    //   err.code = 'iam.err0001'
    //   err.status = 401
    //   return next(err)
    // }
    // // 权限校验
    // let authList = req.session.auth.split(',')
    // if (authList.indexOf(uri) === -1) {
    //   let err = new Error('无权限，请联系管理员')
    //   err.code = 'iam.err0002'
    //   err.status = 403
    //   next(err)
    // } else {
    //   next()
    // }
    next() // 直接过
  })
}
