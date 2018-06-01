/**
 * @name 文件操作类
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
let fs = require('fs')
module.exports = class file {
  constructor () {
    this.root = null
    this.rconfig = {
      flags: 'r',
      // encoding: 'ascii', // 使用二进制可以节省流量
      autoClose: true
    }
  }
  /**
   * @name 文件（批量）下载
   * @param files 待下载文件集合
   * @returns none
   */
  download (rpath) {
    return new Promise((resolve) => {
      if (!rpath) {
        throw new Error('文件路径名错误')
      }
      if (!fs.existsSync(rpath)) {
        throw new Error('指定的文件路径不存在')
      }
      let r = fs.createReadStream(rpath, this.rconfig)
      let header = {
        'Content-Type': 'application/force-download',
        'Content-Disposition': null
      }
      let lastIdx = rpath.lastIndexOf('/')
      let filename = rpath.substring(lastIdx + 1)
      header['Content-Disposition'] = 'attachment; filename=' + filename
      resolve({
        stream: r,
        header: header
      })
    })
  }

  /**
   * @name 文件预览
   * @param rpath 文件路径
   * @returns none
   */
  preview (rpath) {
    return new Promise((resolve) => {
      if (!rpath) {
        throw new Error('文件路径名错误')
      }
      if (!fs.existsSync(rpath)) {
        throw new Error('指定的文件路径不存在')
      }
      let r = fs.createReadStream(rpath, this.rconfig)
      let header = {
        'Content-Type': null,
        'Content-Disposition': null
      }
      let lastIdx = rpath.lastIndexOf('/')
      let filename = rpath.substring(lastIdx + 1)
      let suffix = filename.substring(filename.lastIndexOf('.') + 1)
      header['Content-Type'] = 'application/' + suffix
      header['Content-Disposition'] = 'inline; filename=' + filename
      resolve({
        stream: r,
        header: header
      })
    })
  }
}
