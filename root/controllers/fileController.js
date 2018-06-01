/*
* 文件管理
* @author dongjiguo2008123@126.com
*
* @date 2018/06
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')

// 添加用户
router.post('/test', (req, res, next) => {
  co(function *() {
    // 接下来可以处理文件相关的业务逻辑了




    res.status(200).send({})
  }).catch((err) => {
    next(err)
  })
})
module.exports = router
