<template>
  <el-dialog id="GuidModal" title="向导" :fullscreen="fullscreen" :visible="visible" width="1000px" @close="close" :close-on-click-modal="false">
    <!--页头-->
    <span slot="title" class="dialog-title">
      <el-steps :active="activePage" simple>
        <el-step title="用户协议" icon="el-icon-edit"></el-step>
        <el-step title="绑定手机号" icon="el-icon-upload"></el-step>
        <el-step title="修改密码" icon="el-icon-picture"></el-step>
      </el-steps>
    </span>
    <div class="dialogBody">
      <!--用户协议-->
      <agree-book v-if ="activePage === 1" :closeModel.sync="closeModel" :step.sync="activePage"></agree-book>
      <!--绑定手机号-->
      <bind-telephone v-if ="activePage === 2" :closeModel.sync="closeModel" :step.sync="activePage"></bind-telephone>
      <!--修改密码-->
      <update-pwd v-if ="activePage === 3" :closeModel.sync="closeModel" :step.sync="activePage"></update-pwd>
    </div>
  </el-dialog>
</template>
<script>
import agreeBook from './agreeBook' // 用户协议
import bindTelephone from './bindTelephone' // 绑定手机号
import updatePwd from './updatePwd' // 修改密码
export default {
  props: {
    visible: { // 显示状态
      type: Boolean,
      default: false
    },
    model: { // 手机号码
      type: Object,
      default: () => {
        return {
          telephone: null,
          origin: true,
          agree: false
        }
      }
    }
  },
  components: {
    agreeBook,
    bindTelephone,
    updatePwd
  },
  computed: {
    activePage: {
      set (val) {
        if (val === 2) {
          this.agree = true
        } else if (val === 3) {
          this.agree = true
          this.telephone = this.store.state.user.telephone
        }
      },
      get () {
        if (!this.agree) {
          return 1
        } else if (!this.telephone && this.agree) {
          return 2
        } else if (this.agree && this.telephone && this.origin) {
          return 3
        }
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.$nextTick(() => {
          this.activePage = 1
        })
      }
    },
    closeModel (val) {
      if (val) {
        this.$emit('update:visible', false)
      }
    },
    'model.telephone' (val) {
      this.telephone = val
    },
    'model.origin' (val) {
      this.origin = val
    },
    'model.agree' (val) {
      this.agree = val
    }
  },
  data () {
    return {
      telephone: this.model.telephone,
      origin: this.model.origin,
      agree: this.model.agree,
      closeModel: false,
      fullscreen: true // 全屏对话框
    }
  },
  mounted () {
    // 总感觉这里面逻辑写复杂了
  },
  methods: {
    close () { // 关闭弹窗
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
