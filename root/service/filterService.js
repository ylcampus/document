/*
* 用户管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const FilterDao = require('../dao/filterDao')

// 获取访客角色资源数据
exports.getVisitRoleResourceList = (req) => {
  return co(function *() {
    return {
      auth: 'api.iam.userLogin,api.iam.register,api.goods.goodsList,api.shop.shopList,api.goods.goodsDetail'
    }
  })
}
