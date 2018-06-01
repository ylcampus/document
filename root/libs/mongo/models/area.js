/*
* 区域表
* @author dongjiguo2008123@126.com
* @date 2018/05
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  id: { // 区域id
    type: String,
    required: true
  },
  name: { // 区域名称
    type: String,
    required: true,
    maxlength: 32
  },
  father: { // 父节点
    type: String,
    required: true
  },
  deep: { // 节点深度
    type: String,
    required: true,
    enum: [1, 2]
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
