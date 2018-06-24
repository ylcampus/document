<template>
  <div id="UpdatePwd">
    <el-form :model="form" :rules="rules" ref="changePwdForm">
      <el-form-item prop="oldPwd">
        <el-input placeholder="请输入原始密码" type="password" v-model="form.oldPwd"></el-input>
      </el-form-item>
      <el-form-item prop="newPwd">
        <el-input placeholder="请输入新密码" type="password" v-model="form.newPwd"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPwd">
        <el-input placeholder="请输入确认密码" type="password" v-model="form.confirmPwd"></el-input>
      </el-form-item>
    </el-form>
    <!--密码信息-->
    <div class="pwdMsg">
      <div class="pwdInfo">
        <div class="normal-tips">密码需满足以下要求：</div>
        <div class="gray-tips-EMUI5">
          <span>不能包含空格</span>
        </div>
        <div class="gray-tips-EMUI5 ">
          <span>至少包含8个字符</span>
        </div>
        <div class="gray-tips-EMUI5 ">
          <span>至少包含字母、数字、符号中的2种</span>
        </div>
      </div>
      <div class="pwdInfo">
        <div class="normal-tips">
          密码强度：
          <span class="pwdComplexFlag">{{pwdTxt}}</span>
        </div>
      </div>
    </div>
    <!--更改密码-->
    <div class="yle-submit">
      <el-button @click="submit" type="primary">确定</el-button>
      <el-button @click="close">延后处理</el-button>
    </div>
  </div>
</template>
<script>
import {sha256} from 'js-sha256'
import {updatePwd, loginOut} from '../proxy'
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
    // 密码验证
    let validatePass1 = (rule, value, callback) => {
      if (
        !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~?!@+-.#$%^&*])[\da-zA-Z~?!@+-.#$%^&*]{6,20}$/.test(value)
      ) {
        callback(new Error('包含数字，字母及特殊字符且8到12位'))
      } else {
        callback()
      }
    }
    // 确认密码验证
    let validatePass2 = (rule, value, callback) => {
      if (
        !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~?!@+-.#$%^&*])[\da-zA-Z~?!@+-.#$%^&*]{6,20}$/.test(value)
      ) {
        callback(new Error('包含数字，字母及特殊字符且8到12位'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      pwdTxt: '低',
      pwdBar: {
        width: '0%',
        background: '#555'
      },
      form: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      rules: {
        oldPwd: [
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
        newPwd: [
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
        confirmPwd: [
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
      this.$refs.changePwdForm.validate((valid) => {
        if (valid) {
          let params = {
            oldPwd: sha256(this.form.oldPwd),
            newPwd: sha256(this.form.newPwd),
            confirmPwd: sha256(this.form.confirmPwd)
          }
          console.log(params)
          updatePwd(params).then((res) => {
            if (res.code * 1 === 0 && res.data) {
              this.$message.success('已成功修改密码，请重新登录')
              // 执行登出操作
              loginOut().then((res) => {
                if (res.code * 1 === 0) {
                  // 清除vuex中用户数据
                  this.store.commit('user/clearData')
                  // 定向到登录页
                  this.$router.push('/login')
                  // 关闭模态框
                  this.close()
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },
    close () { // 关闭弹窗
      this.$emit('update:closeModel', true)
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style lang="scss">
  #UpdatePwd {
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
    .pwdMsg{
      .pwdInfo {
        margin-top: 10px;
        .normal-tips{
          padding: 0;
          font-size: 13px;
          line-height: 14px;
          margin-bottom: 4px;
          color: #000;
          .pwdComplexFlag{
            font-size: 14px;
            color: #000;
          }
        }
        .gray-tips-EMUI5{
          padding: 2px 0;
          font-size: 14px;
          line-height: 14px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
</style>
