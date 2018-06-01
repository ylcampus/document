#目的
#有关文件的操作用于文件报备系统
#使用方法
#1:获取目录树
let file = require('./root/libs/file')
let myfile = file.getInstance()
let dirTree = myfile.getDirTree('static')
console.log(dirTree)
#2:获取文件树
let file = require('./root/libs/file')
let myfile = file.getInstance()
let fileTree = myfile.getFileTree('static')
console.log(fileTree)


let file = require('./root/libs/file')
let myfile = file.getInstance('static')
let dirTree = myfile.getTreeSync('onlydir')
console.log(dirTree)
