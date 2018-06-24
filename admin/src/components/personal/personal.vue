<template>
  <div id="Personal">
    <div class="page-personel">
      <!--个人资料-->
      <div class="info-block">
        <div class="info-block-title">个人资料</div>
        <el-form :model="form" :rules="rules" ref="personalForm" label-width="100px" style="width:386px">
          <el-form-item label="账号">{{form.username}}</el-form-item>
          <el-form-item label="用户姓名" prop="name">
            <el-input placeholder="用户姓名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex" required>
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号码">{{form.telephone}}</el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="邮箱" v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
        <div class="info-block-btn">
          <el-button type="primay" @click="submit">保 存</el-button>
        </div>
      </div>
      <!--账号安全-->
      <div class="info-block">
        <div class="info-block-title">账号安全</div>
        <div class="info-block-edit">
          <div class="edit-label">
            <span class="edit-label-title">验证手机</span>
            <span class="edit-label-text">您的手机:{{form.telephone}}若已丢失或停用，请立即更换，避免账号被盗</span>
          </div>
          <div class="edit-btn">
            <el-button @click="changePhoneV = true" style="width:110px;" type="primary">更换手机号</el-button>
          </div>
        </div>
        <div class="info-block-edit">
          <div class="edit-label">
            <span class="edit-label-title">密码设置</span>
            <span class="edit-label-text">安全性高的密码可以使账号更安全，建议您定期更换密码，且设置包含数字、字母及特殊字符且8位以上</span>
          </div>
          <div class="edit-btn">
            <el-button @click="changePwdV = true" style="width:110px;" type="primary">修 改</el-button>
          </div>
        </div>
      </div>
      <!--弹窗-->
      <phone-modal :visible.sync="changePhoneV" :phone.sync="form.telephone"></phone-modal>
      <password-modal :visible.sync="changePwdV"></password-modal>
    </div>
  </div>
</template>
<script>
import {getInfo, changeInfo} from './proxy'
import passwordModal from './modal/passwordModal.vue'
import phoneModal from './modal/phoneModal.vue'
export default {
  name: 'personal',
  components: {
    passwordModal,
    phoneModal
  },
  data () {
    // 验证姓名
    let validateName = (rule, value, callback) => {
      if (value.length > 25) {
        callback(new Error('长度不能超过25个字节'))
      } else {
        callback()
      }
    }
    // 验证性别
    let validateSex = (rule, value, callback) => {
      if (value !== 1 && value !== 2) {
        callback(new Error('请选择性别'))
      } else {
        callback()
      }
    }
    // 验证特殊字符
    let checkSpecialChar = (rule, value, callback) => {
      let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
      if (pattern.test(value)) {
        callback(new Error('内容含有特殊字符'))
      } else {
        callback()
      }
    }
    return {
      changePhoneV: false,
      changePwdV: false,
      form: {
        username: null,
        name: null,
        sex: 1,
        telephone: null,
        email: null
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            validator: validateName,
            trigger: 'blur'
          },
          {
            validator: checkSpecialChar,
            trigger: 'blur'
          }
        ],
        sex: [
          {
            validator: validateSex,
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '不能超过30个字'
          }
        ]
      }
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () { // 获取用户基本信息
      getInfo().then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
        }
      })
    },
    close () { // 关闭弹窗
      this.$emit('update:visible', false)
    },
    submit () {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          changeInfo(this.form).then((res) => {
            if (res.code * 1 === 0 && res.data) {
              this.$message.success('修改成功')
            }
            this.close()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
