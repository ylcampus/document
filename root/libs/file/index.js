/**
 * @name 文件操作类
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 * @versio 1.0
 */
'use strict'
let Dir = require('./dir') // 目录操作类
let File = require('./file') // 文件操作类
let FileInstance = new File() // 获取一个单例
// 获取一个实例
module.exports.getInstance = (dir) => {
  return new Dir(dir)
}
// 文件下载
module.exports.download = FileInstance.download
// 文件预览
module.exports.preview = FileInstance.preview
