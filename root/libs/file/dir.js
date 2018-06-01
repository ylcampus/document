/**
 * @name 目录操作类
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
let fs = require('fs')
let path = require('path')
module.exports = class dir {
  constructor (dir) {
    // 检查文件路径是否设定
    if (!dir) {
      throw new Error('缺少文件路径信息')
    }
    // 检查设定的文件路径是否存在
    if (!fs.existsSync(dir)) {
      throw new Error('指定的文件路径不存在')
    }
    // 设置到setting里面去就可以了
    // 洗完澡后就开始改造
    this.root = dir.split('/')[0]
    this.dir = dir
    this.rootPath = process.env.rootPath
  }
  /**
   * @name 同步递归获取目录详细信息
   * @param cell 单元格
   * @returns none
   */
  _readDirSync (dir, files, target, flag) {
    let menu = fs.readdirSync(dir)
    for (let i = 0; i < menu.length; i++) {
      let filename = menu[i]
      let filepath = path.join(dir, filename)
      let stat = fs.statSync(filepath)
      let map = {
        name: filename, // 名称
        path: this.dir + '/' + filename, // 路径
        birthtime: stat.birthtime // 创建时间
      }
      if (stat.isDirectory()) {
        map.flag = 'dir'
        var item = {...map, children: []}
        if (target['children']) {
          target['children'].push(item)
        } else {
          files.push(item)
        }
        this._readDirSync(dir + '/' + filename, files, item, flag)
      } else {
        if (flag !== 'onlydir') {
          map.flag = 'file'
          map.size = stat.size
          if (target['children']) {
            target['children'].push(map)
          } else {
            files.push(map)
          }
        }
      }
    }
  }

  /**
   * @name 读取文件目录
   * @param dir 文件目录
   * @returns none
   */
  readDirSync (dir) {
    // 检查路径是否存在
    if (!fs.existsSync(dir)) {
      throw new Error('路径不存在')
    }
    let menu = fs.readdirSync(dir)
    let files = []
    for (let i = 0; i < menu.length; i++) {
      let filename = menu[i]
      let filepath = path.join(dir, filename)
      let stat = fs.statSync(filepath)
      let map = {
        name: filename, // 名称
        path: this.dir + '/' + filename, // 路径
        birthtime: stat.birthtime // 创建时间
      }
      if (stat.isDirectory()) {
        map.flag = 'dir'
      } else {
        map.flag = 'file'
        map.type = filename.substring(filename.lastIndexOf('.') + 1)
        map.size = stat.size
      }
      files.push(map)
    }
    return files
  }

  /**
   * @name 获取目录树
   * @param cell 单元格
   * @returns none
   */
  getTreeSync (flag) {
    let files = []
    let target = {}
    let dirpath = path.join(this.rootPath, this.dir)
    this._readDirSync(dirpath, files, target, flag)
    return files
  }

  /**
   * @name 创建（批量创建）目录
   * @param dir 工作目录
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

  /**
   * @name 创建（批量创建）目录
   * @param dirs 工作目录集合
   * @returns none
   */
  mkDirSync (dirs) {
    let type = (typeof dirs)
    if (type === 'object' && dirs.length) {
      for (let i = 0; i < dirs.length; i++) {
        this._mkDirSync(dirs[i])
      }
    } else if (type === 'string') {
      this._mkDirSync(dirs)
    } else {
      throw new Error('输入参数不合法')
    }
  }

  /**
   * @name 删除（批量删除）文件
   * @param file 待删除文件
   * @returns none
   */
  _rmFileSync (filePath) {
    let self = this
    let files = []
    if (fs.existsSync(filePath)) {
      files = fs.readdirSync(filePath)
      files.forEach(function (file, index) {
        var curPath = filePath + '/' + file
        if (fs.statSync(curPath).isDirectory()) {
          self._rmFileSync(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(filePath) // 删除目录
    } else {
      throw new Error('文件路径不存在')
    }
  }

  /**
   * @name 删除（批量）文件
   * @param files 待删除文件集合
   * @returns none
   */
  rmFileSync (files) {
    let type = (typeof files)
    if (type === 'object' && files.length) {
      for (let i = 0; i < files.length; i++) {
        this._rmFileSync(files[i])
      }
    } else if (type === 'string') {
      this._rmFileSync(files)
    } else {
      throw new Error('输入参数不合法')
    }
  }
}
