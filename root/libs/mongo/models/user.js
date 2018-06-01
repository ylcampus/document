/*
* 用户表
* @author dongjiguo2008123@126.com
* @date 2018/05
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  id: { // 用户id
    type: String,
    required: true
  },
  tenentId: { // 租户id
    type: String,
    required: true
  },
  type: { // 用户类型 1：系统管理员；2：管理员；3：普通用户
    type: String,
    required: true,
    enum: [1, 2, 3]
  },
  account: { // 账号 - 加校验
    type: String,
    required: true,
    maxlength: 32
  },
  roleId: { // 角色Id
    type: String,
    required: true
  },
  roleName: { // 角色名称
    type: String,
    required: true
  },
  name: { // 姓名
    type: String,
    maxlength: 32
  },
  sex: { // 性别 1：男；2：女
    type: String,
    enum: [1, 2]
  },
  telephone: { // 联系电话 - 加校验
    type: String
  },
  email: { // 电子邮件 - 加校验
    type: String
  },
  pwd: { // 密码 - 加校验
    type: String,
    required: true,
    maxlength: 64
  },
  origin: { // 是否是初始密码
    type: Boolean,
    required: true
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
