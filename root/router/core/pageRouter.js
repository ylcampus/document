/*
* 页面路由
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
let path = require('path')
module.exports = function (app) {
  // 官方管理平台
  app.use('/admin', (req, res, next) => {
    res.sendFile(path.join(process.env.root, 'dist/admin/index.html'))
  })
  // 商家管理平台
  app.use('/seller', (req, res, next) => {
    res.sendfile(path.join(process.env.root, 'dist/admin/index.html'))
  })
  // app客户端
  app.use('/app', (req, res, next) => {
    res.sendfile(path.join(process.env.root, 'dist/admin/index.html'))
  })
}
