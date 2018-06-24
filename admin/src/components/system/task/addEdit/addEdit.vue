<template>
  <div id="TaskAddEdit">
    <div class="addTask"><span>{{title}}</span></div>
    <!--form表单-->
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" size="small">
        <el-form-item label="任务类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="1" border>每天</el-radio>
            <el-radio :label="2" border>每周</el-radio>
            <el-radio :label="3" border>每月</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入定时任务名称"></el-input>
        </el-form-item>
        <el-form-item v-if = "form.type === 1" label="路径" prop="path">
          <el-input v-model="form.path" placeholder="请输入资源路径"></el-input>
        </el-form-item>
        <el-form-item v-if = "form.type === 1" label="资源组" prop="group">
          <el-select v-model="form.group" clearable placeholder="请选择分组">
            <el-option
              v-for="item in groupList"
              :key="item.val"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if = "form.type === 2" label="code码" prop="code">
          <el-input v-model="form.code" placeholder="请输入code码"></el-input>
        </el-form-item>
        <el-form-item v-if = "form.type === 2" label="所属平台" prop="platform">
          <el-select v-model="form.platform" placeholder="请选择所属平台">
            <el-option label="官方管理平台" value="1"></el-option>
            <el-option label="商家管理平台" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" rows = "4" placeholder="请输入资源描述信息" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--提示信息-->
    <div class="tips">
      <div class="item fir"><b>温馨提示</b></div>
      <div class="item"> 1. 或者建议您更换使用其他银行的银行卡</div>
      <div class="item"> 2. 个人银行卡信息仅用于进行实名认证，不会绑定您的银行卡产生任何隐形消费，也不会泄露您的银行卡信息。</div>
    </div>
  </div>
</template>
<script>
import {apiGroupList} from '@/libs/config'
import {resourceRules} from '@/libs/rules'
import {getResourceDetail, addResource, editResource} from './proxy'
export default {
  name: 'taskAddEdit',
  data () {
    return {
      title: '添加资源',
      pflag: 'ResourceAdd', // 添加or编辑 默认为添加
      form: {
        name: null, // 资源名称
        type: 1, // 资源类型 1：api接口资源；2：模块资源
        path: null, // 资源路径
        group: null, // 资源组
        code: null, // code码 100 - 999
        platform: '1', // 所属平台 1：官方；2：商家；3：公有
        desc: null // 描述
      },
      groupList: apiGroupList,
      rules: resourceRules
    }
  },
  mounted () {
    // 明天可以从这个地方入手处理定时任务逻辑了




    // ok 之后再说
    // ? 应该可以继续向下做下去 ？
    this.pflag = this.$route.name
    this.title = this.pflag === 'TaskAdd' ? '添加任务' : '编辑任务'
    // 若是编辑页面则首先去获取资源详情
    if (this.pflag === 'ResourceEdit') {
      let id = this.$route.query.id
      getResourceDetail({id: id}).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
        }
      })
    }
  },
  methods: {
    submitForm () { // 创建资源
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let body = this.getBody()
          if (this.pflag === 'ResourceAdd') { // 添加资源
            addResource(body).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('资源添加成功')
                setTimeout(() => { // 停留2秒后跳转到列表页
                  this.$router.push('/resource')
                }, 2000)
              }
            }).catch((err) => {
              this.$message.error(err.message)
            })
          } else if (this.pflag === 'ResourceEdit') { // 编辑资源
            body.id = this.form.id
            editResource(body).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('资源编辑成功')
                setTimeout(() => {
                  this.$router.push('/resource')
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
        name: this.form.name,
        type: parseInt(this.form.type, 10),
        desc: this.form.desc // 描述
      }
      let type = this.form.type
      if (type === 1) { // 接口资源
        bmap.path = this.form.path
        bmap.group = this.form.group
      } else if (type === 2) { // 模块资源
        bmap.code = this.form.code
        bmap.platform = parseInt(this.form.platform)
      }
      return bmap
    },
    resetForm () { // 表单重置
      this.form.name = null
      this.form.type = 1
      this.form.path = null
      this.form.group = null
      this.form.code = null
      this.form.platform = 1
      this.form.desc = null
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
