/**
 * @name 文件打包（压缩）模块
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 * @versio 1.0
 */
'use strict'
let Log = require('./log')
// 获取一个实例
module.exports.create = (fpath) => {
  return new Log(fpath)
}
