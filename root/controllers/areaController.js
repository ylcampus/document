/*
* 区域管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const AreaService = require('../service/areaService')
const Result = require('../../root/libs/result')

// 添加区域
router.post('/addArea', (req, res, next) => {
  co(function *() {
    let result = yield AreaService.addArea(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 删除区域
router.post('/deleteArea', (req, res, next) => {
  co(function *() {
    let result = yield AreaService.deleteArea(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 编辑区域
router.put('/editArea', (req, res, next) => {
  co(function *() {
    let result = yield AreaService.editArea(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取区域列表
router.get('/areaList', (req, res, next) => {
  co(function *() {
    let result = yield AreaService.areaList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
