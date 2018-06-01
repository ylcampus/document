/*
* 资源表
* @author dongjiguo2008123@126.com
* @date 2018/05
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  id: { // 资源id
    type: String,
    required: true
  },
  name: { // 资源名称
    type: String,
    required: true,
    maxlength: 32,
    message: '资源名称最大长度为32个字符'
  },
  type: { // 资源类型 1：接口资源；2：模块资源
    type: Number,
    required: true,
    enum: [1, 2]
  },
  path: { // 资源路径
    type: String,
    maxlength: 64
  },
  code: { // 所属模块code码
    type: Number,
    min: 200,
    max: 400
  },
  platform: { // 资源所属平台（适用于模块资源） 1：官方管理平台； 2： 商家管理平台
    type: Number,
    enum: [1, 2]
  },
  desc: { // 资源描述
    type: String,
    maxlength: 256,
    message: '资源描述最大长度为256个字符'
  },
  create_at: { // 创建时间
    type: String,
    required: true,
    default: (new Date()).toJSON()
  },
  update_at: { // 最近更新时间
    type: String,
    required: true,
    default: (new Date()).toJSON()
  }
})
