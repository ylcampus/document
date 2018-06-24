<template>
  <div id="UserAddEdit">
    <div class="addUser"><span>{{title}}</span></div>
    <!--form表单-->
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" size="small">
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户账号" prop="account">
          <el-input  :disabled="pflag === 'UserEdit'" v-model="form.account" placeholder="请输入用户账号-最短3个字符最长不超过16个字符"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input  :disabled="pflag === 'UserEdit'" v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex" :disabled="pflag === 'UserEdit'">
            <el-radio :label="1" border>男</el-radio>
            <el-radio :label="2" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if = "pflag === 'UserEdit'" label="联系电话" prop="telephone">
          <el-input v-model="form.telephone" placeholder="联系电话" disabled></el-input>
        </el-form-item>
        <el-form-item v-if = "pflag === 'UserEdit'" label="电子邮件" prop="email">
          <el-input  v-model="form.email" placeholder="电子邮件" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input rows = "4" type="textarea" v-model="form.desc" placeholder="请输入描述信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">
            {{pflag === 'UserAdd' ? '立即创建' : '保存修改'}}
          </el-button>
          <el-button v-if = "pflag === 'UserAdd'" @click="resetForm()">重置</el-button>
          <el-button v-else-if = "pflag === 'UserEdit'" @click="resetPwd()">重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--提示信息-->
    <div class="tips">
      <div class="item fir"><b>温馨提示</b></div>
      <div class="item"> 1. 用户默认密码ule@123,创建用户后请通知用户及时完善信息，并修改登录密码。</div>
      <div class="item"> 2. 个人银行卡信息仅用于进行实名认证，不会绑定您的银行卡产生任何隐形消费，也不会泄露您的银行卡信息。</div>
    </div>
  </div>
</template>
<script>
import {userRules} from '@/libs/rules'
import {getRoleList, getUserDetail, addUser, editUser, resetUserPassword} from './proxy'
export default {
  name: 'userAddEdit',
  data () {
    return {
      title: '添加用户',
      pflag: 'UserAdd', // 添加or编辑 默认为添加
      form: {
        type: 3, // 用户类型 1：超级管理员；2：管理员；3普通用户
        account: null, // 账户名
        roleId: null, // 角色Id
        roleName: null, // 角色名称
        telephone: null, // 联系电话
        email: null, // 电子邮件
        name: null, // 用户姓名
        sex: null, // 性别
        desc: null // 描述
      },
      roleList: [], // 角色列表
      rules: userRules
    }
  },
  mounted () {
    this.pflag = this.$route.name
    this.title = this.pflag === 'UserAdd' ? '添加用户' : '编辑用户'
    // 若是编辑页面则首先去获取资源详情
    if (this.pflag === 'UserEdit') {
      let id = this.$route.query.id
      getUserDetail(id).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
        }
      })
    }
    // 获取角色列表
    this.getRoleList()
  },
  methods: {
    getRoleList () { // 获取角色列表
      let params = {
        pageNo: 1,
        pageSize: 25,
        type: 2
      }
      getRoleList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.roleList = res.data.rows || []
        }
      })
    },
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let body = this.getBody()
          console.log(body)
          if (this.pflag === 'UserAdd') {
            addUser(body).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('用户添加成功')
                setTimeout(() => {
                  this.$router.push('/user')
                }, 2000)
              }
            }).catch((err) => {
              this.$message.error(err.message)
            })
          } else if (this.pflag === 'UserEdit') {
            body.id = this.form.id
            editUser(body).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('用户编辑成功')
                setTimeout(() => {
                  this.$router.push('/user')
                }, 2000)
              }
            }).catch((err) => {
              this.$message.error(err.message)
            })
          }
        } else {
          return false
        }
      })
    },
    getBody () { // 获取body体参数
      let bmap = {
        type: parseInt(this.form.type),
        account: this.form.account,
        roleId: this.form.roleId,
        name: this.form.name,
        sex: parseInt(this.form.sex),
        desc: this.form.desc
      }
      let roleId = bmap.roleId
      let target = this.roleList.find((row) => {
        return row.id === roleId
      })
      bmap.roleName = target.name
      if (this.pflag === 'UserEdit') {
        bmap.telephone = this.form.telephone
        bmap.email = this.form.email
      }
      return bmap
    },
    resetPwd () { // 重置密码
      let uid = this.form.id
      resetUserPassword(uid).then((res) => {
        if (res.code * 1 === 0) {
          this.$notify({
            title: '成功',
            message: '用户密码已重置',
            type: 'success'
          })
        }
      })
    },
    resetForm () {
      this.form.type = 3
      this.form.account = null
      this.form.roleId = null
      this.form.roleName = null
      this.form.telephone = null
      this.form.email = null
      this.form.name = null
      this.form.sex = null
      this.form.desc = null
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
