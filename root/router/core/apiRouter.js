/*
* 店铺管理
* @author dongjiguo2008123@126.com
*
* @date 2018/04
* */
'use strict'
const express = require('express')
const router = express.Router()
// 资源
router.use('/resource', require('../../controllers/resourceController'))
// 角色
router.use('/role', require('../../controllers/roleController'))
// 用户
router.use('/user', require('../../controllers/userController'))
// IAM
router.use('/iam', require('../../controllers/iamController'))
// 区域
router.use('/area', require('../../controllers/areaController'))
// 定时任务
router.use('/task', require('../../controllers/taskController'))
// 文件
router.use('/file', require('../../controllers/fileController'))

// 打折券
// 商品
// 订单
// 统计
// 店铺管理
router.use('/mall', require('../../controllers/shopController'))
router.use((req, res, next) => {
  res.status(404).send({
    code: -1,
    data: null,
    message: 'Not Found',
    success: false
  })
})
module.exports = router
