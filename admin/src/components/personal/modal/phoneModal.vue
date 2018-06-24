<template>
  <el-dialog title="更换手机号" :visible="visible" width="500px" @close="close" :close-on-click-modal="false">
    <div class="phoneModal">
      <!--验证老手机-->
      <el-form v-show="currentPage === 1" :model="form" :rules="p1Rules" ref="p1Form" label-width="100px" style="width:386px">
        <el-form-item label="老手机号">{{oldPhone}}</el-form-item>
        <el-form-item label="验证码" prop="oldNo">
          <div class="warp">
            <el-input placeholder="验证码" v-model="form.oldNo" style="width:170px;"></el-input>
            <el-button :disabled="!isSendFlag1" @click="sendCode(1)" class="ver-btn">{{verText1}}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <!--修改新手机-->
      <el-form v-show="currentPage === 2" :model="form" :rules="p2Rules" ref="p2Form" label-width="100px" content-width="286px">
        <el-form-item label="新手机号" prop="phone">
          <el-input placeholder="新手机号" v-model="form.phone" style="width:286px"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="newNo">
          <div class="warp">
            <el-input placeholder="验证码" v-model="form.newNo" style="width:170px;"></el-input>
            <el-button :disabled="!isSendFlag2" @click="sendCode(2)" class="ver-btn">{{verText2}}</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button v-show="currentPage === 1" type="primary" @click="nextStep">下一步</el-button>
      <el-button v-show="currentPage === 2" type="primary" @click="nextStep">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {getValidCode, validOldPhone, changeNewPhone} from '../proxy'
export default {
  name: 'phoneModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.currentPage = 1
        this.form.oldNo = ''
        this.form.newNo = ''
      }
    },
    phone (val) {
      this.oldPhone = val
    }
  },
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
    let validateVerNo = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      verText1: '获取验证码', // 老手机验证码
      verText2: '获取验证码', // 新手机验证码
      isSendFlag1: true,
      isSendFlag2: true,
      timer: null,
      oldPhone: null,
      currentPage: 1,
      form: {
        phone: '', // 手机号
        oldNo: '', // 老手机号验证码
        newNo: '' // 新手机号验证码
      },
      p1Rules: {
        oldNo: [
          {
            required: true,
            validator: validateVerNo,
            trigger: 'blur'
          }
        ]
      },
      p2Rules: {
        phone: [
          {
            required: true,
            validator: validatePhone,
            trigger: 'blur'
          }
        ],
        newNo: [
          {
            required: true,
            validator: validateVerNo,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    nextStep () { // 下一步
      this.$refs.p1Form.validate((valid) => {
        if (valid) {
          let params = {
            telephone: this.oldPhone,
            code: this.form.oldNo
          }
          validOldPhone(params).then((res) => {
            if (res.code * 1 === 0 && res.data) {
              this.currentPage = 2
            }
          })
        } else {
          return false
        }
      })
    },
    submit () { // 修改新手机
      this.$refs.p2Form.validate((valid) => {
        if (valid) {
          let params = {
            telephone: this.form.phone,
            code: this.form.newNo
          }
          changeNewPhone(params).then((res) => {
            if (res.code * 1 === 0 && res.data) {
              this.$message.success('手机号修改成功')
              this.$nextTick(() => {
                this.close()
              })
            }
          })
        } else {
          return false
        }
      })
    },
    sendCode (flag) { // 发送验证码 1：发送到老手机；2：发送到新手机
      let passFlag = (flag === 1) ? this.isSendFlag1 : this.isSendFlag2
      if (passFlag) {
        let phone = (flag === 1) ? this.oldPhone : this.form.phone
        if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(phone))) {
          this.$message.warning('请输入手机号')
          return
        }
        getValidCode({phone: phone}).then((res) => {
          if (res.code * 1 === 0 && res.data) {
            // 发送成功再启动计时器
            if (flag === 1) {
              this.startTime1()
            } else if (flag === 2) {
              this.startTime2()
            }
          }
        })
      }
    },
    startTime1 () { // 计时器1
      this.verText1 = `60s后发送`
      let wait = 59
      this.isSendFlag1 = false
      let timer1 = setInterval(() => {
        if (wait > 0) {
          this.verText1 = `${wait}s后发送`
          wait--
        } else {
          this.isSendFlag1 = true
          this.verText1 = '重新发送'
          clearInterval(timer1)
        }
      }, 1000)
    },
    startTime2 () { // 计时器2
      this.verText2 = `60s后发送`
      let wait = 59
      this.isSendFlag2 = false
      let timer2 = setInterval(() => {
        if (wait > 0) {
          this.verText2 = `${wait}s后发送`
          wait--
        } else {
          this.isSendFlag2 = true
          this.verText2 = '重新发送'
          clearInterval(timer2)
        }
      }, 1000)
    },
    close () { // 关闭弹窗
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="scss">
  .warp{
    display: flex;
    justify-content: space-between;
  }
</style>
