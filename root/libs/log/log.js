/**
 * @name 日志操作类
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
let fs = require('fs')
let path = require('path')
let os = require('os')
module.exports = class dir {
  constructor (fpath) {
    if (!fpath) {
      throw new Error('缺少日志文件名')
    }
    let idx = fpath.lastIndexOf('.')
    let logpath = null
    if (idx === -1) {
      logpath = fpath + '.txt'
    } else {
      logpath = fpath
    }
    // 获取文件所在目录
    let didx = logpath.lastIndexOf('/')
    let logdir = logpath.substring(0, didx)
    let logname = logpath.substring(didx + 1)
    // 判定目录是否存在，若不存在则创建
    if (!fs.existsSync(logdir)) {
      this._mkDirSync(logdir)
    }
    this.logpath = logpath // 日志文件路径
    this.logdir = logdir // 目录名称
    this.logname = logname // 目录名称
    this.model = 'r+' // 读写模式
    this.fd = null // 文件描述符
    this.line = 0 // 当前行
  }
  /**
   * @name 打开一个日志文件
   * @param fpath 文件路径
   * @returns none
   */
  openSync () {
    // 判断文件是否存在，若不存在则创建
    fs.writeFileSync(this.logpath, '')
    this.fd = fs.openSync(this.logpath, this.model)
  }

  /**
   * @name 向日志文件中追加一行数据（异步方法）
   * @param fpath 文件路径
   * @returns none
   */
  appendLine (data) {
    return new Promise((resolve, reject) => {
      let rdata = null
      if (typeof data === 'string') { // 字符串类型不做任何处理
        rdata = data
      } else { // 数组或map
        rdata = JSON.stringify(data)
      }
      let fd = this.fd ? this.fd : this.logpath
      // 这一块开销可能会很大，由此用异步处理
      fs.appendFile(fd, rdata + ',' + os.EOL, (err) => {
        if (err) {
          reject(err)
        } else {
          this.line++
          resolve()
        }
      })
    })
  }

  /**
   * @name 向日志文件中追加一行数据（同步方法）
   * @param fpath 文件路径
   * @returns none
   */
  appendLineSync (data) {
    let rdata = null
    if (typeof data === 'string') { // 字符串类型不做任何处理
      rdata = data
    } else { // 数组或map
      rdata = JSON.stringify(data)
    }
    // 这一块开销可能会很大，由此用异步处理
    fs.appendFileSync(this.fd, rdata + ',' + os.EOL)
  }

  /**
   * @name 关闭一个日志文件
   * @param fpath 文件路径
   * @returns none
   */
  closeSync () {
    fs.closeSync(this.fd)
  }

  /**
   * @name 读取日志文件
   * @param fpath 文件路径
   * @returns none
   */
  readFile (cb) {
    fs.readFile(this.logpath, function (err, data) {
      if (cb) {
        cb(err, data.toString('utf8').trim())
      }
    })
  }

  /**
   * @name 写入文件
   * @param fpath 文件路径
   * @returns none
   */
  writeFile (data, cb) {
    // 判断文件是否存在，若不存在则创建
    fs.writeFile(this.logpath, data, (err, data) => {
      if (cb) {
        cb(err, data)
      }
    })
  }

  /**
   * @name 创建目录
   * @param dir 目录名称
   * @returns none
   */
  _mkDirSync (dirname) {
    if (fs.existsSync(dirname)) {
      return true
    } else {
      if (this._mkDirSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
      }
    }
  }
}
