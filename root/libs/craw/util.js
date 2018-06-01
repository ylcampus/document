'use strict'
const event = require('../../libs/event')
/**
 * @name 延时函数
 * @param time 延迟时间
 * @returns goodsMap:商品详情数据
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
let delay = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/**
 * @name 生成一个符合特定正态分布规律的随机时间戳
 * @param policy 策略
 * @param min 基准时间
 * @returns 随机时间
 */
let getRandomTime = (policy, min) => {
  let result = []
  if (!min) {
    min = 0
  }
  for (let i = 0; i < 60; i++) {
    let num = parseInt(policy[i], 10)
    let origin = i * 1000 + min
    if (num !== 0) {
      for (let j = 0; j < num; j++) {
        let item = Math.round(origin + Math.random() * 1000)
        result.push(item)
      }
    }
  }
  let idx = Math.floor(Math.random() * 100)
  return result[idx]
}
/**
 * @name 生成一个指定长度的字符串（数字、小写字母与大写字母）
 * @param n
 * @returns String
 */
let generateMixedString = (n) => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let res = ''
  for (let i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 61)
    res += chars[id]
  }
  return res
}

/**
 * @name 生成一个指定长度的字符串（数字与小写字母）
 * @param n
 * @returns String
 */
let generateString = (n) => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let res = ''
  for (let i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35)
    res += chars[id]
  }
  return res
}

/**
 * @name 生成一个指定长度的字符串（大写字母与小写字母）
 * @param n
 * @returns String
 */
let generateMixedChars = (n) => {
  let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let res = ''
  for (let i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 51)
    res += chars[id]
  }
  return res
}
/**
 * @name 生成一个指定长度的字符串（纯数字）
 * @param n
 * @returns String
 */
let generateMixedNumber = (n) => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let res = ''
  for (let i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 9)
    res += chars[id]
  }
  return res
}

/**
 * @name 检测对象是否为空
 * @param map - 对象
 * @returns boolean
 */
let isEmpty = (map) => {
  var arr = Object.keys(map)
  return (arr.length === 0)
}

/**
 * @name 检测对象是否为空
 * @param msg - 消息名
 * @param type - 消息类型
 * @param data - 数据
 * @returns boolean
 */
let emitMsg = (msg, type, data) => {
  event.eventEmitter.emit(msg, {
    type: type,
    data: data
  })
}

module.exports.delay = delay
module.exports.getRandomTime = getRandomTime
module.exports.generateMixedString = generateMixedString
module.exports.generateString = generateString
module.exports.generateMixedNumber = generateMixedNumber
module.exports.generateMixedChars = generateMixedChars
module.exports.isEmpty = isEmpty
module.exports.emitMsg = emitMsg
