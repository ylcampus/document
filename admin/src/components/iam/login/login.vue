<template>
  <div id="Login">
    <!--页头-->
    <header id="header">
      <div class="inner">
        <div class="web-logo">
          <a href="/">优乐校园</a>
        </div>
      </div>
    </header>
    <!--登录表单-->
    <section id="loginBody">
      <div class="inner">
        <div class="title">账号登录</div>
        <div class="body">
          <div id="loginForm">
            <div class="condition">
              验证身份后进行登录
            </div>
            <div class="forByPhoneDes">
              如果手机停用或原先手机号不能正常使用，请进入联系我们页面联系我们客服人员。
            </div>
            <div class="forget">
              <span @click="toForgetPwdPage">忘记密码</span>
            </div>
            <!--form表单-->
            <div class="form">
              <el-form ref="form" :rules="rules" :model="form">
                <el-form-item prop="account">
                  <el-input v-model="form.account" placeholder="请输入账户名" clearable></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input v-model="form.pwd" placeholder="输入新密码" type="password" clearable></el-input>
                </el-form-item>
                <el-form-item >
                  <div class="remember">
                    <el-checkbox v-model="form.checked">记住密码</el-checkbox>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <!--提交 disabled-->
            <div id="inputArea">
              <div class="submit">
                <el-button @click="submit">登录</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--页脚-->
    <section id="customerFooter">
      <div class="inner">
        <div class="warrant-area">
          <p class="lItem">
            <a class="rule" target="_blank">优乐帐号用户协议</a>
            <em class="foot_em">|</em>
            <a class="rule" target="_blank">关于优乐帐号与隐私的声明</a>
            <span class="foot_em">
              <em style="font-style: normal">|</em>
              <a style="padding:0 10px;" target="blank">常见问题</a>
            </span>
          </p>
          <p class="lItem" style="margin-top:10px ">
            Copyright&nbsp;©&nbsp;2011-2018&nbsp;&nbsp;南京优乐校园电子商务有限公司&nbsp;&nbsp;版权所有&nbsp;&nbsp;保留一切权利&nbsp;&nbsp;苏B2-20070200号&nbsp;|&nbsp;
            苏ICP备09062682号-9
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import {sha256} from 'js-sha256'
import {loginIn} from './proxy'
import {loginRules} from '@/libs/rules'
export default {
  name: 'login',
  data () {
    return {
      form: { // from表单
        account: '', // 账号
        pwd: '', // 密码
        checked: true // 记住密码
      },
      rules: loginRules
    }
  },
  mounted () {
    this.pageInit()
  },
  methods: {
    pageInit () { // 页面初始化
      // 若cookie中有账号信息则忘记密码check为true,否则为false
    },
    submit () {
      /*
      * 二个方面的功能后期需要追加处理-目前阶段一切从简
      * 1：账号或密码错误三次出现验证码
      * 3：对有人登录账号的情形需提示强制登录
      * */
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = this.getParams()
          console.log(params)
          loginIn(params).then((res) => {
            if (res.code * 1 === 0) {
              // 登录成功应该把获取到的数据放到vuex里面去
              this.$router.push('/overview')
              console.log('登录成功')
            }
          })
        } else {
          return false
        }
      })
    },
    getParams () {
      // 对记住账号的处理逻辑
      return {
        account: this.form.account,
        pwd: sha256(this.form.pwd)
      }
    },
    toForgetPwdPage () { // 到忘记密码页面
      this.$router.push('/forgetPwd')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style lang="scss">
  #Login {
    .el-input__inner{
      background-color: #f7f7f7;
      border: none;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
    }
  }
</style>
