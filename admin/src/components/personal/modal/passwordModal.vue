<template>
  <el-dialog title="修改密码" :visible="visible" width="500px" @close="close" :close-on-click-modal="false">
    <div class="pwdModal">
      <el-form :model="changePwdForm" :rules="changePwdRules" ref="changePwdForm" label-width="100px" style="width:386px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input placeholder="旧密码" type="password" v-model="changePwdForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input placeholder="新密码" type="password" v-model="changePwdForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repeatNewPassword">
          <el-input placeholder="确认密码" type="password" v-model="changePwdForm.repeatNewPassword" @keyup.enter.native="submit"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {changePwd} from '../proxy'
import {sha256} from 'js-sha256'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.$nextTick(() => {
          this.$refs.changePwdForm.resetFields()
        })
      }
    }
  },
  data () {
    // 密码验证
    let validatePass1 = (rule, value, callback) => {
      if (
        !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~?!@+-.#$%^&*])[\da-zA-Z~?!@+-.#$%^&*]{8,20}$/.test(value)
      ) {
        callback(new Error('包含数字，字母及特殊字符且8到12位'))
      } else {
        callback()
      }
    }
    // 确认密码验证
    let validatePass2 = (rule, value, callback) => {
      if (
        !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~?!@+-.#$%^&*])[\da-zA-Z~?!@+-.#$%^&*]{8,20}$/.test(value)
      ) {
        callback(new Error('包含数字，字母及特殊字符且8到12位'))
      } else if (value !== this.changePwdForm.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      changePwdForm: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      changePwdRules: {
        oldPassword: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          },
          {
            validator: validatePass1,
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ],
        repeatNewPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    submit () { // 修改密码
      let param = JSON.parse(JSON.stringify(this.changePwdForm))
      this.$refs.changePwdForm.validate((valid) => {
        if (valid) {
          param.oldPassword = sha256(param.oldPassword)
          param.newPassword = sha256(param.newPassword)
          param.repeatNewPassword = sha256(param.repeatNewPassword)
          changePwd(param).then((res) => {
            if (res.code * 1 === 0 && res.data) {
              this.$message.success('已成功修改密码，请重新登录')
              this.$nextTick(() => {
                this.close()
                this.$router.push('/login')
              })
            }
          })
        } else {
          return false
        }
      })
    },
    close () { // 关闭弹窗
      this.$emit('update:visible', false)
    }
  }
}
</script>
