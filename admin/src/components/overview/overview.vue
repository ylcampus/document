<template>
  <div id="Overview">
    <input value = "添加区域" type="button" @click="addArea">
    <input value = "删除区域" type="button" @click="deleteArea">
    <input value = "编辑区域" type="button" @click="editArea">
    <input value = "区域列表" type="button" @click="getAreaList">
    <br>
    <br>
    <input value = "添加定时任务" type="button" @click="addTask">
    <input value = "删除定时任务" type="button" @click="deleteTask">
    <input value = "编辑定时任务" type="button" @click="editTask">
    <input value = "获取定时任务详情" type="button" @click="taskDetail">
    <input value = "获取定时任务列表" type="button" @click="taskList">
    <br>
    <br>
    <input value = "读取文件目录" type="button" @click="readDir">
    <input value = "删除目录" type="button" @click="rmDir">
    <a href="http://192.168.1.15:8080/api/file/download?path=JavaScript设计模式.pdf" target="_self">下载文件</a>
    <a href="http://192.168.1.15:8080/api/file/preview?path=JavaScript设计模式.pdf" target="_blank">文件预览</a>
    <input value = "验证老手机" type="button" @click="validOldTelephone">
    <input value = "更换手机号" type="button" @click="changeTelephone">
    <input value = "更新密码" type="button" @click="updatePwd">
    <input value = "绑定手机号" type="button" @click="bindTelephone">
    <input value = "更改密码" type="button" @click="changePwd">
    <!--<p>-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i4/451024527/TB2wXhCbyMnBKNjSZFzXXc_qVXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/451024527/TB2Mj3.fCtYBeNjSspaXXaOOFXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i4/451024527/TB2mXwUbXooBKNjSZPhXXc2CXXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i4/451024527/TB2N40zbCcqBKNjSZFgXXX_kXXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/451024527/TB2QevnfrGYBuNjy0FoXXciBFXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i3/451024527/TB2aGjyfr1YBuNjSszeXXablFXa_!!451024527.jpg"></p>-->
    <!--<p>-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i4/451024527/TB2B1tzgQUmBKNjSZFOXXab2XXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/451024527/TB2XMndtDJYBeNjy1zeXXahzVXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/451024527/TB2aFhItrSYBuNjSspfXXcZCpXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i3/451024527/TB20UFYtv1TBuNjy0FjXXajyXXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i4/451024527/TB23NfuaKUXBuNjt_a0XXcysXXa_!!451024527.jpg">-->
      <!--<img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/451024527/TB2EZXAgOMnBKNjSZFzXXc_qVXa_!!451024527.jpg">-->
    <!--</p>-->
  </div>
</template>
<script>
import proxy from './proxy'
import {sha256} from 'js-sha256'
export default {
  name: 'overview',
  data () {
    return {}
  },
  mounted () {},
  methods: {
    addArea () { // 添加区域
      let body = {
        name: '江苏省',
        deep: 1,
        father: 'root'
      }
      proxy.addArea(body).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    deleteArea () { // 删除区域
      let ids = ['bd4c68ab-3bee-4d28-af6f-60c50efedfd7']
      proxy.deleteArea({ids: ids}).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    editArea () { // 编辑区域
      let body = {
        id: 'f1b3c0f7-866b-4694-abac-7da07fbaba45',
        name: '山东省'
      }
      proxy.editArea(body).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    getAreaList () { // 获取区域列表
      proxy.getAreaList().then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    addTask () { // 添加定时任务
      let params = {
        name: '定时任务3',
        type: 1, // 每天 每周 每月
        module: 'common', // 所属模块
        handle: 'test2', // 处理函数
        params: null,
        ready: true, // 就绪状态
        rule: '0,5,10,15,20,25,30,35,40,45,50,55 * * * * *', // 定时规则
        desc: '描述' // 描述
      }
      proxy.addTask(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    deleteTask () { // 删除定时任务
      let ids = ['973519c5-0e44-4946-a240-bdd54ba2462f']
      proxy.deleteTask({ids: ids}).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    editTask () { // 编辑定时任务
      let body = {
        id: '35486286-504e-47e5-b587-f3e2471a5ac7',
        name: '山东省3',
        ready: true
      }
      proxy.editTask(body).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    taskDetail () { // 获取定时任务详情
      let id = '35486286-504e-47e5-b587-f3e2471a5ac7'
      proxy.getTaskDetail(id).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    taskList () { // 获取定时任务列表
      let params = {
        pageNo: 1,
        pageSize: 10
      }
      proxy.getTaskList(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    }, // readDir mkDir rmDir download preview
    readDir () { // 读取目录
      proxy.readDir({'dir': 'system\\报表\\商品\\2018年10月'}).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    rmDir () { // 删除文件（目录）
      proxy.rmDir({'path': 'log'}).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    validOldTelephone () { // 验证老手机
      let params = {
        validCode: 123456,
        telephone: '18205185737'
      }
      proxy.validOldTelephone(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    changeTelephone () { // 更换手机号
      let params = {
        validCode: 123456,
        telephone: '18205185737'
      }
      proxy.changeTelephone(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    updatePwd () {
      let params = {
        oldPwd: sha256('ule@123'),
        newPwd: sha256('ule@1234'),
        confirmPwd: sha256('ule@1234')
      }
      proxy.updatePwd(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    bindTelephone () { // 验证老手机
      let params = {
        validCode: 123456,
        telephone: '18205185737'
      }
      proxy.bindTelephone(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    changePwd () { // 更改密码 - 貌似又有问题 问题还真不少
      let params = {
        validCode: 123456,
        pwd: sha256('ule@1234'),
        confirmPwd: sha256('ule@1234')
      }
      proxy.changePwd(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
