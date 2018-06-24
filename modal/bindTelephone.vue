<template>
  <div id="BindTelephone">
    <el-form :model="form" :rules="rules" ref="bindPhoneForm">
      <el-form-item prop="telephone">
        <el-input placeholder="手机号" v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item prop="validCode">
        <div class="warp">
          <el-input placeholder="验证码" v-model="form.validCode" style="width:195px;"></el-input>
          <el-button :disabled="sendFlag" @click="sendCode" class="ver-btn">{{verText}}</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!--绑定手机-->
    <div class="yle-submit">
      <el-button type="primary" @click="bindTelephone">确定</el-button>
      <el-button @click="close">延后处理</el-button>
    </div>
  </div>
</template>
<script>
import {getTelephoneCode, bindTelephone} from '../proxy'
export default {
  props: {
    step: {
      type: Number,
      default: 1
    },
    closeModel: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  data () {
    // 验证手机号
    let validatePhone = (rule, value, callback) => {
      if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    // 验证验证码
    let validateVerCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      sendFlag: false, // 是否已发送验证码 true 是 false 否
      verText: '获取验证码',
      form: { // 表单
        validCode: '',
        telephone: ''
      },
      rules: {
        telephone: [
          {
            required: true,
            validator: validatePhone,
            trigger: 'blur'
          }
        ],
        validCode: [
          {
            required: true,
            validator: validateVerCode,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    sendCode () { // 发送手机验证码
      let tel = this.form.telephone
      if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(tel))) {
        this.$message.warning('请输入手机号')
        return
      }
      getTelephoneCode({telephone: tel}).then((res) => {
        if (res.code * 1 === 0) { // 临时方案
          this.form.validCode = res.data
          // 启动计时器
          this.startTime()
        }
      })
    },
    startTime () { // 启动计时器
      this.verText = `60s后发送`
      let wait = 59
      this.sendFlag = true
      let timer = setInterval(() => {
        if (wait > 0) {
          this.verText = `${wait}s后发送`
          wait--
        } else {
          this.sendFlag = false
          this.verText = '重新发送'
          clearInterval(timer)
        }
      }, 1000)
    },
    bindTelephone () { // 绑定手机号
      this.$refs.bindPhoneForm.validate((valid) => {
        if (valid) {
          let params = {
            telephone: this.form.telephone,
            validCode: this.form.validCode
          }
          bindTelephone(params).then((res) => {
            if (res.code * 1 === 0 && res.data) {
              this.$notify({
                message: '手机号绑定成功',
                type: 'success'
              })
              this.store.state.user.telephone = this.form.telephone
              this.$emit('update:step', 3)
            }
          })
        } else {
          return false
        }
      })
    },
    close () {
      this.$emit('update:closeModel', true)
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style lang="scss">
  #BindTelephone {
    width: 320px;
    margin: 0 auto;
    .el-input__inner{
      background-color: #f7f7f7;
      border: none;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
    }
    .warp{
      display: flex;
      justify-content: space-between;
    }
  }
</style>
