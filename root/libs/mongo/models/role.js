/*
* 角色表
* @author dongjiguo2008123@126.com
* @date 2018/05
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  id: { // 角色id
    type: String,
    required: true
  },
  tenentId: { // 租户id
    type: String,
    required: true
  },
  name: { // 角色名称
    type: String,
    required: true,
    maxlength: 32
  },
  root: { // 是否是根角色
    type: Boolean,
    required: true
  },
  type: { // 角色类型 1：系统；2：平台
    type: Number,
    required: true,
    enum: [1, 2]
  },
  tag: { // 角色标签 visit:访客；member:会员；tenant:租户；admin:超级管理员；user:普通用户
    type: String,
    required: true,
    enum: ['visit', 'member', 'tenant', 'admin', 'user']
  },
  apiAuth: { // api权限码
    type: String,
    maxlength: 512
  },
  apiStr: { // api权限字符串
    type: String,
    maxlength: 512
  },
  moduleAuth: { // 模块权限字符串
    type: String,
    maxlength: 512
  },
  codeAuth: { // code权限码
    type: String,
    maxlength: 512
  },
  codeStr: { // code权限字符串
    type: String,
    maxlength: 512
  },
  desc: { // 资源描述
    type: String,
    maxlength: 256
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
