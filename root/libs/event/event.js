/**
 * @name 事件类
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
var events = require('events')
module.exports = class event {
  constructor () {
    this.events = [] // 监听事件集合
    this.eventEmitter = new events.EventEmitter()
    this.hookFun = null
  }
  /**
   * @name 注册一个监听器
   * @param n
   * @returns String
   */
  register (msg, fun) {
    let count = this.eventEmitter.listeners(msg).length
    if (!count) {
      this.eventEmitter.addListener(msg, (data) => {
        if (this.hookFun) {
          this.hookFun(msg, data)
        }
        fun(data)
      })
      let map = {}
      map[msg] = fun
      this.events.push(map)
    } else {
      throw new Error('事件已经被注册')
    }
  }

  /**
   * @name 设定一个钩子函数
   * @param n
   * @returns String
   */
  setHook (fun) {
    this.hookFun = fun
  }

  /**
   * @name 移除一个监听器
   * @param n
   * @returns String
   */
  remove (msg) {
    let target = this.events.find((item) => {
      return Object.keys(item)[0] === msg
    })
    if (target) {
      let idx = this.events.indexOf(target)
      this.eventEmitter.removeAllListeners(msg)
      this.events.splice(idx, 1)
    }
  }

  /**
   * @name 移除所有监听器
   * @returns String
   */
  removeAll () {
    this.eventEmitter.removeAllListeners()
  }

  /**
   * @name 判断监听器存不存在
   * @param n
   * @returns String
   */
  isExist (msg) {
    let target = this.events.find((item) => {
      return Object.keys(item)[0] === msg
    })
    if (target) {
      return true
    } else {
      return false
    }
  }
}
