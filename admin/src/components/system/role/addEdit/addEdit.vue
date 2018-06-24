<template>
  <div id="ResourceAddEdit">
    <div class="addResource"><span>{{title}}</span></div>
    <!--form表单-->
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" size="small">
        <el-form-item label="角色类型" prop="type">
          {{form.type===1 ? '系统角色' : '平台角色'}}-{{tag}}
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item v-if = "form.type === 1" label="权限列表1" prop="apiAuth">
          <el-transfer
            filterable
            :props="{
              key: 'id',
              label: 'label'
            }"
            :titles="['未选权限', '已选权限']"
            :button-texts="['到左边', '到右边']"
            v-model="form.apiAuth"
            :data="apiAuthList">
          </el-transfer>
        </el-form-item>
        <el-form-item v-if = "form.type === 2" label="权限列表2" prop="moduleAuth">
          <el-transfer
            filterable
            :props="{
              key: 'id',
              label: 'name'
            }"
            :titles="['未选权限', '已选权限']"
            :button-texts="['到左边', '到右边']"
            v-model="form.moduleAuth"
            :data="moduleAuthList">
          </el-transfer>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input rows = "4" type="textarea" v-model="form.desc" placeholder="请输入描述信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">
            {{pflag === 'RoleAdd' ? '立即创建' : '保存修改'}}
          </el-button>
          <el-button v-if = "pflag === 'RoleAdd'" @click="resetForm()">重置</el-button>
          <el-button v-else-if = "pflag === 'RoleEdit'" @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tips">
      <div class="item fir"><b>温馨提示</b></div>
      <div class="item"> 1. 或者建议您更换使用其他银行的银行卡</div>
      <div class="item"> 2. 个人银行卡信息仅用于进行实名认证，不会绑定您的银行卡产生任何隐形消费，也不会泄露您的银行卡信息。</div>
    </div>
  </div>
</template>
<script>
import co from 'co'
import {roleRules} from '@/libs/rules'
import {getRoleDetail, addRole, editRole, getResourceList} from './proxy'
import {apiGroupArr} from '../../../../libs/config'
export default {
  name: 'roleAddEdit',
  data () {
    return {
      title: '添加角色',
      pflag: 'RoleAdd', // 添加or编辑 默认为添加
      tag: '普通用户',
      form: {
        id: null,
        name: null,
        type: 2, // 1：系统角色；2平台角色
        tag: 'user', // visit:访客；member:会员；tenant:租户；admin:超级管理员；user:普通用户
        desc: null,
        moduleAuth: [],
        apiAuth: [],
        apiStr: [],
        codeAuth: [],
        codeStr: []
      },
      apiAuthList: [], // api权限列表
      moduleAuthList: [], // 模块权限列表
      rules: roleRules
    }
  },
  mounted () {
    /*
    * 超级管理员与租户角色的模块资源在系统初始化的时候完成
    * 由此，系统角色只需要配置接口资源即可；平台角色只需要配置模块资源即可
    * 这个页面还有好多逻辑需要修改
    * 只需要保存资源Id就可以 - 有很多很多问题
    * */
    this.pflag = this.$route.name
    this.title = this.pflag === 'RoleAdd' ? '添加角色' : '编辑角色'
    // 若是编辑页面则首先去获取角色详情
    let self = this
    co(function *() {
      if (self.pflag === 'RoleEdit') {
        let id = self.$route.query.id
        let dresult = yield getRoleDetail(id)
        if (dresult.code * 1 === 0 && dresult.data) {
          let data = dresult.data
          self.form.id = data.id
          self.form.name = data.name
          self.form.type = parseInt(data.type, 10)
          self.form.tag = data.tag
          self.form.desc = data.desc
          if (data.apiAuth && data.apiStr) {
            self.form.apiAuth = data.apiAuth.split(',')
            self.form.apiStr = data.apiStr.split(',')
          }
          if (data.codeAuth && data.codeStr) {
            self.form.codeAuth = data.codeAuth.split(',')
            self.form.codeStr = data.codeStr.split(',')
            self.form.moduleAuth = data.moduleAuth.split(',')
          }
        }
      }
      // 获取tag文本
      let tag = self.form.tag
      let map = {
        visit: '访客',
        member: '会员',
        tenant: '租户',
        admin: '超级管理员',
        user: '普通用户'
      }
      self.tag = map[tag]
      // 获取资源列表
      let roleType = self.form.type
      let rParams = {
        pageNo: 1,
        pageSize: 1000
      }
      if (roleType === 1) { // 系统角色-获取api接口资源
        rParams.type = 1
        getResourceList(rParams).then((res) => {
          if (res.code * 1 === 0 && res.data) {
            let rows = res.data.rows || []
            self.apiAuthList = rows.map((row) => {
              let pathArr = row.path.trim().split('.')
              let resourceName = (pathArr.length === 3) ? (apiGroupArr[pathArr[1]] || '未知') : '未知'
              row.label = resourceName + '-' + row.name
              return row
            })
          }
        })
      } else if (roleType === 2) { // 平台角色-获取模块资源
        rParams.type = 2
        getResourceList(rParams).then((res) => {
          if (res.code * 1 === 0 && res.data) {
            console.log(res.data)
            self.moduleAuthList = res.data.rows || []
          }
        })
      }
    }).catch((err) => {
      this.$message.error(err.message)
    })
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let body = this.getBody()
          console.log(body)
          if (this.pflag === 'RoleAdd') { // 添加角色
            addRole(body).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('角色添加成功')
                setTimeout(() => {
                  this.$router.push('/role')
                }, 2000)
              }
            })
          } else if (this.pflag === 'RoleEdit') { // 编辑角色
            body.id = this.form.id
            editRole(body).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('角色编辑成功')
                setTimeout(() => {
                  this.$router.push('/role')
                }, 2000)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    getBody () { // 获取body体参数
      let bmap = {
        name: this.form.name,
        type: parseInt(this.form.type),
        tag: this.form.tag,
        desc: this.form.desc
      }
      let roleType = this.form.type
      if (roleType === 1) { // 系统角色
        bmap.apiAuth = this.form.apiAuth.join(',')
        let apiTaget = []
        for (let prow of this.apiAuthList) {
          if (bmap.apiAuth.indexOf(prow.id) > -1) {
            apiTaget.push(prow.path)
          }
        }
        bmap.apiStr = apiTaget.join(',')
      } else if (roleType === 2) { // 平台角色
        bmap.moduleAuth = this.form.moduleAuth.join(',')
        let codeAuthTaget = []
        let codeStrTaget = []
        for (let crow of this.moduleAuthList) {
          if (bmap.moduleAuth.indexOf(crow.id) > -1) {
            codeAuthTaget.push(crow.code)
            codeStrTaget.push(crow.name)
          }
        }
        bmap.codeAuth = codeAuthTaget.join(',')
        bmap.codeStr = codeStrTaget.join(',')
      }
      return bmap
    },
    cancel () {
      this.$router.push('/role')
    },
    resetForm () {
      this.form.id = null
      this.form.name = null
      this.form.type = 2
      this.form.tag = 'user'
      this.form.desc = null
      this.form.apiAuth = []
      this.form.apiStr = []
      this.form.moduleAuth = []
      this.form.codeAuth = []
      this.form.codeStr = []
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
