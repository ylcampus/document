/*
* 定时任务
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const uuid = require('uuid')
const TaskDao = require('../dao/taskDao')
const Task = require('../libs/task')
const taskMap = require('../libs/task/map')
// 添加定时任务
exports.addTask = (req) => {
  return co(function *() {
    req.session.tenentId = '10000'
    let tenentId = req.session.tenentId
    // 租户只能创建打折券任务
    if (tenentId.toString() !== '10000' && req.body.handel !== 'issueDiscount') {
      let noAuthorityErr = new Error('无权创建该类型定时任务')
      noAuthorityErr.code = 'task.err400001'
      throw noAuthorityErr
    }
    // 检查处理函数是否已注册
    let moduleName = req.body.module + 'Task'
    if (!taskMap[moduleName] || !taskMap[moduleName][req.body.handle]) {
      let rErr = new Error('定时任务处理函数未注册')
      rErr.code = 'task.err400002'
      throw rErr
    }
    // 检查定时任务名称是否存在
    let nResult = yield TaskDao.isTaskNameExist(req)
    if (nResult) {
      let ntErr = new Error('定时任务名称已存在')
      ntErr.code = 'task.err400003'
      throw ntErr
    }
    // 检查同类型的定时任务是否存在
    let sResult = yield TaskDao.isSameTypeTaskExist(req)
    if (sResult) {
      let sErr = new Error('同类型定时任务(' + sResult.name + ')已经存在')
      sErr.code = 'task.err400004'
      throw sErr
    }
    // 添加定时任务到数据库
    let saveDoc = {
      id: uuid.v4(),
      name: req.body.name, // 名称
      type: parseInt(req.body.type, 10), // 类型
      tag: (tenentId === '10000') ? 1 : 2, // 标签
      tenentId: '10000', // 租户id
      module: req.body.module, // 所属模块
      handle: req.body.handle, // 处理函数
      ready: req.body.ready || false, // 就绪状态
      rule: req.body.rule, // 定时规则
      status: 'pending', // 运行状态
      desc: req.body.desc // 描述
    }
    if (req.body.params) {
      saveDoc.params = req.body.params
    }
    let result = yield TaskDao.addTask(saveDoc)
    // 添加定时任务到执行列表并启动定时任务
    if (result && req.body.ready) {
      Task.add(saveDoc)
    }
    return result
  })
}

// 删除定时任务 编辑 - 详情 - 列表
exports.deleteTask = (req) => {
  return co(function *() {
    let ids = req.body.ids
    if (ids.length === 0) {
      let err = new Error('参数错误')
      err.code = 'task.err400005'
      throw err
    }
    // 删除定时任务列表中数据
    for (let i = 0; i < ids.length; i++) {
      Task.remove(ids[i])
    }
    // 删除数据库中数据
    return yield TaskDao.deleteTask(ids)
  })
}

// 编辑定时任务
exports.editTask = (req) => {
  return co(function *() {
    req.session.tenentId = '10000'
    let tenentId = req.session.tenentId
    let id = req.body.id
    if (!id) {
      let err = new Error('参数错误')
      err.code = 'task.err400005'
      throw err
    }

    // 获取定时任务详情
    let taskDetail = yield TaskDao.getTaskDetail(id)
    let editResult = null
    if (taskDetail) {
      // 租户只能编辑打折券任务
      if (tenentId.toString() !== '10000' && taskDetail.handel !== 'issueDiscount') {
        let noAuthorityErr = new Error('无权编辑该类型定时任务')
        noAuthorityErr.code = 'task.err400006'
        throw noAuthorityErr
      }

      // 检查处理函数是否已注册
      let moduleName = taskDetail.module + 'Task'
      if (!taskMap[moduleName] || !taskMap[moduleName][taskDetail.handle]) {
        let rErr = new Error('定时任务处理函数未注册')
        rErr.code = 'task.err400002'
        throw rErr
      }

      // 检查定时任务名称是否存在
      if (req.body.name && req.body.name !== taskDetail.name) {
        let tnResult = yield TaskDao.isTaskNameExist(req)
        if (tnResult) {
          let tnErr = new Error('定时任务名称已存在')
          tnErr.code = 'task.err400003'
          throw tnErr
        }
      }

      // 检查同类型的定时任务是否存在
      if ((req.body.module && req.body.module !== taskDetail.module) || (req.body.handle && req.body.handle !== taskDetail.handle)) {
        let tnResult = yield TaskDao.isSameTypeTaskExist(req)
        if (tnResult) {
          let sErr = new Error('同类型定时任务(' + tnResult.name + ')已经存在')
          sErr.code = 'task.err400004'
          throw sErr
        }
      }

      // 改变定时任务就绪状态
      editResult = TaskDao.editTask(req)
      let tastId = taskDetail.id
      if (req.body.ready === true || req.body.ready === false) {
        if (req.body.ready) {
          Task.add(taskDetail)
        } else {
          try {
            Task.remove(tastId)
          } catch (err) {
            let runErr = new Error('运行中的定时任务不允许编辑')
            runErr.code = 'task.err400007'
            throw runErr
          }
        }
      }

      // 改变定时规则
      if ((req.body.rule || req.body.params) && req.body.rule !== taskDetail.rule) {
        Task.restart(tastId, req.body.rule, req.body.params)
      }
    }
    return editResult
  })
}

// 获取定时任务详情
exports.taskDetail = (req) => {
  return co(function *() {
    let id = req.params.id
    if (!id) {
      let err = new Error('参数错误')
      err.code = 'task.err400005'
      throw err
    }
    // 从数据库中获取定时任务详情数据
    let result = yield TaskDao.getTaskDetail(id)
    // 从定时任务列表中获取定时任务状态
    result.status = Task.getStatus(id)
    return result
  })
}

// 获取用户列表
exports.taskList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'task.err400005'
      throw err
    }
    let result = yield TaskDao.taskList(query)
    let total = yield TaskDao.taskTotal(query)
    // 更新定时任务状态
    for (let i = 0; i < result.length; i++) {
      let id = result[i].id
      result[i].status = Task.getStatus(id)
    }
    // 返回数据模型
    return {
      rows: result,
      total: total
    }
  })
}
