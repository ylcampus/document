/*
* 店铺管理
* @author dongjiguo2008123@126.com
*
* @date 2018/04
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
// 测试接口
router.get('/test', (req, res, next) => {
  co(function *() {
    res.status(200).send({})
  }).catch((err) => {
    next(err)
  })
})
module.exports = router
