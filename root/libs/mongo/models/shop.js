/*
* 店铺表
* @author dongjiguo2008123@126.com
* @date 2018/05
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number,
    default: 0
  },
  time: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    default: ''
  }
})
