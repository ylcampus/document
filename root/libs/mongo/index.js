/**
 * @name mongodb数据库模块
 * @author dongjiguo2008123@126.com
 * @date 2018-05
 * @versio 1.0
 */
const mongoose = require('mongoose')
const setting = require('../../../bin/setting')
// 引入schema
const AreaSchema = require('./models/area') // 区域表
const DiscountSchema = require('./models/discount') // 打折券表
const GoodsSchema = require('./models/goods') // 商品表
const OrderSchema = require('./models/order') // 订单表
const ResourceSchema = require('./models/resource') // 资源表
const RoleSchema = require('./models/role') // 角色表
const ShopSchema = require('./models/shop') // 店铺表
const TaskSchema = require('./models/task') // 定时任务表
const UserSchema = require('./models/user') // 用户表
// 创建数据库连接
mongoose.connect(setting.db.domain)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => { console.log('数据库连接成功') })
// 注入数据模型
db.model('area', AreaSchema, 'area')
db.model('discount', DiscountSchema, 'discount')
db.model('goods', GoodsSchema, 'goods')
db.model('order', OrderSchema, 'order')
db.model('resource', ResourceSchema, 'resource')
db.model('role', RoleSchema, 'role')
db.model('shop', ShopSchema, 'shop')
db.model('task', TaskSchema, 'task')
db.model('user', UserSchema, 'user')
module.exports = db
