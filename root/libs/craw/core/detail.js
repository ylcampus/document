/**
 * @name 爬取商品详情数据
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
const request = require('request')
let fs = require('fs')
const zlib = require('zlib')
const j = request.jar()
let co = require('co')
let axios = require('axios')
// 基础配置信息 -- 这些信息应该写在配置文件中
let options = {
  url: 'https://detail.tmall.com/item.htm?id=563021821661',
  // url: 'https://detail.m.tmall.com/item.htm?id=44348523358',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'upgrade-insecure-requests': 1,
    'accept-language': 'zh-CN,zh;q=0.8',
    'Accept-Encoding': 'gzip,deflate',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
  },
  jar: j,
  gzip: true,
  encoding: null
}

/**
 * @name 爬取商品详情静态网页并提取关键信息
 * @param goodsId:商品id
 * @returns Promise Obj
 */
let crawGoodsDetailHtmlPage = (goodsId) => {
  return new Promise((resolve, reject) => {
    let res = request.get(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // let cookieMap = j.getCookieString(options.url)
        // console.log(cookieMap)
        let htmlstr = body.toString('utf-8')
        var startChar = htmlstr.indexOf('{"descUrl":')
        var endChar = htmlstr.indexOf('"valTimeLeft":')
        var newStr = htmlstr.substring(startChar, endChar - 1)
        let realStr = '{"api":' + newStr + '}'
        let jsonObj = JSON.parse(realStr)
        let goodsDetailMsg = packageGoodsMsg(jsonObj)
        resolve({
          code: 0,
          data: goodsDetailMsg
        })
      } else {
        // 无论成功还是失败都让他走resolve,这样可以避免程序执行中断
        resolve({
          goodsId: goodsId || null,
          code: 'craw.goods.001',
          message: '获取商品详情错误'
        })
      }
    })
    // console.log(res.headers)
  })
}

/**
 * @name 封装商品信息
 * @param originJson:原始json对象
 * @returns goodsMap:商品详情数据
 */
let packageGoodsMsg = (originJson) => {
  let goodsMap = {
    id: null,
    title: null,
    price: 0,
    shopId: null,
    pics: [],
    skuList: []
  }
  goodsMap.id = originJson.itemDO.itemId
  goodsMap.title = originJson.itemDO.title
  goodsMap.price = originJson.detail.defaultItemPrice
  goodsMap.shopId = originJson.rstShopId
  // 获取属性图片
  let propertyPics = originJson.propertyPics
  for (let idx in propertyPics) {
    if (idx !== 'default') {
      goodsMap.pics.push(propertyPics[idx][0])
    }
  }
  // 获取商品颜色，尺码，skuid及其库存信息
  let skuList = originJson.valItemInfo.skuList
  let skuMap = originJson.valItemInfo.skuMap
  for (let row of skuList) {
    let map = {}
    map.skuId = row.skuId
    map.name = row.name
    let target = {}
    for (let idxmap in skuMap) {
      if (skuMap[idxmap].skuId === map.skuId) {
        target = skuMap[idxmap]
        break
      }
    }
    map.price = target.price || 0
    map.stock = target.stock || 0
    goodsMap.skuList.push(map)
  }
  return goodsMap
}

/**
 * @name 上传单张图片到OSS
 * @param originJson:原始json对象
 * @returns goodsMap:商品详情数据
 */
let uploadPic = (pic) => {
  return new Promise((resolve, reject) => {
    let protocol = 'http'
    let options = {
      url: null,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        'upgrade-insecure-requests': 1
      },
      encoding: null
    }
    options.url = protocol + ':' + pic
    // 临时方案
    let fileName = parseInt(Math.random() * 10000) + '.jpg'
    request.get(options).on('response', (res) => {
      if (res.statusCode === 200) {
        resolve({
          code: 0,
          data: 'url' + parseInt(Math.random() * 10000) + '.jpg'
        })
      } else {
        reject(new Error())
      }
    }).pipe(fs.createWriteStream(fileName))
  })
}

/**
 * @name 转存商品图片文件,把图片上传至OSS
 * @param originJson:原始json对象
 * @returns goodsMap:商品详情数据
 */
let uploadPicsToOSS = (goodsMap) => {
  return new Promise((resolve, reject) => {
    let pics = goodsMap.pics
    let promiseArr = []
    pics.forEach((pic) => {
      promiseArr.push(uploadPic(pic))
    })
    // 确保所有图片上传完毕
    axios.all(promiseArr).then((res) => {
      resolve({
        code: 0,
        data: res
      })
    }).catch((err) => {
      resolve(new Error(err))
    })
  })
}

/**
 * @name 保存商品数据到数据库
 * @param
 * @returns
 */
let saveGoodsMsgToDB = () => {
  // console.log('保存商品数据到数据库')
}
saveGoodsMsgToDB()

/**
 * @name 爬取商品详情数据
 * @param
 * @returns
 */
let crawGoodsDetailData = () => { // ? 有关options信息应该从这个地方传进来
  // 是要保证这个函数永远不要走catch
  // 这里面肯定还是有问题？ 思路还是不怎么明确
  // 所有数据都获取到才算获取商品数据成功
  // 无论获取商品数据是否成功 都不要他走catch  ?再加一层promise?
  // 明天晚上继续测试吧
  return new Promise((resolve, reject) => {
    co(function *() {
      let result = yield crawGoodsDetailHtmlPage()
      if (result.code * 1 === 0 && result.data) {
        let goodsMap = result.data
        let uploadResult = yield uploadPicsToOSS(goodsMap)
        if (uploadResult.code * 1 === 0 && uploadResult.data) {
          result.pics = uploadResult.data
          resolve({
            code: 0,
            data: result.data.id
          })
        }
      }
    }).catch((err) => {
      // 无论成功还是失败都让他走resolve,这样可以避免程序执行中断
      resolve({
        code: 'craw.detail.001',
        message: err.message
      })
    })
  })
}
// 导出模块
// 一点点的来-总有一天会做完的
module.exports = crawGoodsDetailData
