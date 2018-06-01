/**
 * @name 组件
 * @author dongjiguo2008123@126.com
 * @date 2018-05
 */
'use strict'
// const moment = require('moment')

/**
 * @name 把时间转换成定时任务规则
 * @param  task -定时任务
 * @returns id -定时任务id
 */
module.exports.timeToRule = (map) => {
  const defaultMap = {
    week: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null
  }
  let newMap = {...defaultMap, ...map}
  let rArr = ['*', '*', '*', '*', '*', '*']
  if (newMap.second !== null) {
    rArr[0] = newMap.second
  }
  if (newMap.minute !== null) {
    rArr[1] = newMap.minute
  }
  if (newMap.hour !== null) {
    rArr[2] = newMap.hour
  }
  if (newMap.day !== null) {
    rArr[3] = newMap.day
  }
  if (newMap.month !== null) {
    rArr[4] = newMap.month
  }
  if (newMap.week !== null) {
    rArr[5] = newMap.week
  }
  return rArr.join(' ').trim()
}

/**
 * @name 指定位数的随机数
 * @param n
 * @returns String
 */
module.exports.getRandomNumber = (n) => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let res = ''
  for (let i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 9)
    res += chars[id]
  }
  return res
}
