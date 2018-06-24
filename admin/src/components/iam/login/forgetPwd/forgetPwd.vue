<template>
  <div id="ForgetPwd">
    <!--页头-->
    <header id="header">
      <div class="inner">
        <div class="web-logo">
          <a href="/">优乐校园</a>
        </div>
      </div>
    </header>
    <!--主体-->
    <section id="pwdBody">
      <div class="inner">
        <div class="title">忘记密码</div>
        <div class="body">
          <!--页面一-->
          <div id="resetByIdFromP1" v-show="currentPage === 1">
            <div class="tips">点击图片可刷新验证码</div>
            <el-form ref="formP1" :rules="forgetSrep1Rules" :model="formP1">
              <el-form-item prop="account">
                <el-input v-model="formP1.account" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item prop="vCode">
                <div class="codeInner">
                  <div class="codeInput">
                    <el-input v-model="formP1.vCode" placeholder="请输入验证码"></el-input>
                  </div>
                  <div class="vCode" id="vCode" @click="refreshVcode"></div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="nextStep">下一步</el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--页面二-->
          <div id="resetByIdFromP2"  v-show="currentPage === 2">
            <div class="forByPhoneSubTitle">
              验证身份后设置新密码
            </div>
            <div class="forByPhoneDes">
              如果您有其他设备使用此帐号，设置新密码后需重新登录，以确保正常使用华为服务。
            </div>
            <div class="tel">
              <span class="telphone">{{telephone}}</span>
              <span class="forCode" @click="getTelephoneCode">获取验证码</span>
            </div>
            <!--form表单-->
            <div class="form">
              <el-form ref="formP2" :rules="forgetSrep2Rules" :model="formP2">
                <el-form-item prop="tCode">
                  <el-input v-on:input="form2MsgChange" v-model="formP2.tCode" placeholder="验证码" clearable></el-input>
                </el-form-item>
                <el-form-item prop="newPwd">
                  <el-input v-on:input="form2MsgChange" type="password" v-model="formP2.newPwd" placeholder="输入新密码" clearable></el-input>
                </el-form-item>
                <el-form-item prop="confirmPwd">
                  <el-input v-on:input="form2MsgChange" type="password" v-model="formP2.confirmPwd" placeholder="输入确认密码" clearable></el-input>
                </el-form-item>
              </el-form>
            </div>
            <!--密码信息-->
            <div class="pwdInfo">
              <div class="normal-tips">密码需满足以下要求：</div>
              <div id="pwdLength" class="gray-tips-EMUI5">
                <img class="pwd-format" src="../../../../assets/img/login/format_no.png">
                <span>不能包含空格</span>
              </div>
              <div id="pwdChar" class="gray-tips-EMUI5 ">
                <img class="pwd-format" src="../../../../assets/img/login/format_no.png">
                <span>至少包含8个字符</span>
              </div>
              <div id="pwdNumber" class="gray-tips-EMUI5 ">
                <img class="pwd-format" src="../../../../assets/img/login/format_no.png">
                <span>至少包含字母、数字、符号中的2种</span>
              </div>
            </div>
            <div class="pwdInfo">
              <div class="normal-tips">
                密码强度：
                <span id="pwdComplexFlag">中</span>
              </div>
            </div>
            <div class="pwdInfo">
              <div class="line8-EMUI5">
                <div class="gray-tips">
                  <div class="pwd-complex">
                    <div id="pwdStong" class="pwd-strong-div"></div>
                  </div>
                </div>
              </div>
              <div id="pwd-tips">勿使用其他帐号的密码。</div>
              <div id="forgetMsg">错误信息提示位置</div>
            </div>
            <!--提交-->
            <div id="inputArea">
              <div class="submit">
                <el-button type="primary" :disabled="f2disabled"  @click="changePwd">确定</el-button>
                <el-button @click="cancel">取消</el-button>
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
import {getCaptcha, checkUserVcodeAndAccountMsg, getTelephoneCode, changeUserPwd} from './proxy'
import {forgetSrep1Rules, forgetSrep2Rules} from '@/libs/rules'
export default {
  name: 'ForgetPwd',
  data () {
    return {
      currentPage: 1, // 当前页
      telephone: null,
      f1disabled: true,
      formP1: {
        account: '',
        vCode: ''
      },
      forgetSrep1Rules: forgetSrep1Rules, // 表单1校验规则
      f2disabled: true,
      formP2: {
        tCode: '', // 手机验证码
        newPwd: '', // 密码
        confirmPwd: '' // 确认密码
      },
      forgetSrep2Rules: forgetSrep2Rules // 表单二校验规则
    }
  },
  mounted () {
    this.getCaptcha() // 获取验证码
  },
  methods: {
    getCaptcha () { // 获取验证码
      getCaptcha().then((res) => {
        if (res.code * 1 === 0) {
          document.getElementById('vCode').innerHTML = res.data.data
        }
      })
    },
    refreshVcode () { // 刷新验证码
      this.getCaptcha()
    },
    nextStep () { // 下一步
      this.$refs.formP1.validate((valid) => {
        if (valid) {
          // 检测验证码与账号信息
          checkUserVcodeAndAccountMsg(this.formP1).then((res) => {
            if (res.code * 1 === 0) { // 如果检测通过则进入第二步
              if (!res.data.telephone) {
                this.$message.error('手机号码未设定，无法修改密码，请到联系我们页面联系我们客服人员解决')
              } else {
                this.currentPage = 2
                this.telephone = res.data.telephone || ''
              }
            }
          })
        } else {
          return false
        }
      })
    },
    form2MsgChange () { // 表单二数据变化检测
      this.f2disabled = !(this.formP2.tCode && this.formP2.newPwd && this.formP2.confirmPwd)
    },
    getTelephoneCode () { // 获取手机验证码
      getTelephoneCode().then((res) => {
        if (res.code * 1 === 0) { // 临时方案
          this.formP2.tCode = res.data
        }
      })
    },
    changePwd () { // 修改密码
      this.$refs.formP2.validate((valid) => {
        if (valid) {
          // 检测验证码与账号信息
          if (this.formP2.newPwd !== this.formP2.confirmPwd) {
            this.$message.error('两次密码输入不一致')
          } else {
            let params = {
              tCode: this.formP2.tCode,
              pwd: sha256(this.formP2.newPwd)
            }
            // 执行修改用户密码操作
            changeUserPwd(params).then((res) => {
              if (res.code * 1 === 0) { // 如果检测通过则进入第二步
                this.$message.success('修改密码成功')
                this.$nextTick(() => {
                  // 到登录页面
                  this.cancel()
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    cancel () { // 取消操作
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style lang="scss">
  #ForgetPwd {
    .el-input__inner{
      background-color: #f7f7f7;
      border: none;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
    }
  }
</style>
