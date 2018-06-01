/**
 * @name 文件打包类
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
const archiver = require('archiver')
const fs = require('fs')
const co = require('co')
const request = require('request')
const config = require('./config')
module.exports = class zip {
  constructor () {
    this.dir = '' // 压缩包保存路径
    this.files = [] // 文件列表
    this.succeed = 0 // 成功的个数
    this.failed = 0 // 失败的个数
  }
  /**
   * @name 添加一个文件
   * @param url - 文件路径
   * @returns
   */
  addFile (url) {
    if (this.files.indexOf(url) === -1) {
      this.files.push(url)
    }
  }

  /**
   * @name 文件列表
   * @param files - 文件集合
   * @returns
   */
  addFiles (files) {
    for (let i = 0; i < files.length; i++) {
      let url = files[i]
      if (this.files.indexOf(url) === -1) {
        this.files.push(url)
      }
    }
  }

  /**
   * @name 下载单张图片
   * @returns none
   */
  _downloadPic (url) {
    let protocol = 'http:'
    return new Promise((resolve, reject) => {
      let options = {
        url: protocol + url,
        headers: config.headers,
        encoding: null
      }
      request.get(options, function (error, response, body) {
        if (error) {
          // 无论成功还是失败都走resolve这样做的目的在于不让程序中断
          return resolve({code: 99})
        }
        resolve({
          code: 0,
          data: body
        })
      })
    })
  }

  /**
   * @name 获取文件名
   * @returns none
   */
  _getFileName (url) {
    return url.split('/').pop().replace('_!!', '.').trim()
  }

  /**
   * @name 保存压缩包
   * @returns none
   */
  save (dir) {
    let self = this
    self.dir = dir
    return new Promise((resolve, reject) => {
      co(function *() {
        // 生成archiver对象，打包类型为zip
        let zipArchiver = archiver('zip', {
          zlib: { level: 9 } // 设置压缩等级
        })
        // 创建一最终打包文件的输出流
        let output = fs.createWriteStream(dir)
        // 将打包对象与输出流关联
        zipArchiver.pipe(output)
        for (let i = 0; i < self.files.length; i++) {
          let imgurl = self.files[i]
          let result = yield self._downloadPic(imgurl)
          if (result.code * 1 === 0) {
            self.succeed++
            let filename = self._getFileName(imgurl)
            zipArchiver.append(result.data, { name: filename })
          } else {
            self.failed++
          }
        }
        // 事件监听
        output.on('close', () => {
          resolve({
            code: 0,
            data: {
              total: self.files.length,
              succeed: self.succeed,
              failed: self.failed,
              size: zipArchiver.pointer()
            }
          })
        })
        zipArchiver.on('error', () => {
          let err = new Error('压缩文件错误')
          err.code = 'error.zip.001'
          reject(err)
        })
        // 保存文件
        zipArchiver.finalize()
      })
    })
  }
}
