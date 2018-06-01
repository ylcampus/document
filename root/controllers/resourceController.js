/*
* 资源管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const ResourceService = require('../service/resourceService')
const Result = require('../../root/libs/result')
// 添加资源
router.post('/addResource', (req, res, next) => {
  co(function *() {
    let result = yield ResourceService.addResource(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 删除资源
router.post('/deleteResource', (req, res, next) => {
  co(function *() {
    let result = yield ResourceService.deleteResource(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 编辑资源
router.put('/editResource', (req, res, next) => {
  co(function *() {
    let result = yield ResourceService.editResource(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取资源详情
router.get('/resourceDetail/:id', (req, res, next) => {
  co(function *() {
    let result = yield ResourceService.resourceDetail(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取资源列表
router.get('/resourceList', (req, res, next) => {
  co(function *() {
    let result = yield ResourceService.resourceList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})
module.exports = router
