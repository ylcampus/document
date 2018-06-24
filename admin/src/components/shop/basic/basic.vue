<template>
  <div id="MallBasic">
    <div class="mtitle"><span>优乐商城基本信息</span></div>
    <!--form表单-->
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" size="small">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入店铺名称" disabled></el-input>
        </el-form-item>
        <el-form-item label="官方域名" prop="hostName">
          <el-input v-model="form.hostName" placeholder="请输入域名信息" disabled></el-input>
        </el-form-item>
        <el-form-item label="店铺Id" prop="shopId">
          <el-input v-model="form.shopId" placeholder="请输入店铺Id" disabled></el-input>
        </el-form-item>
        <el-form-item label="Logo" prop="logo">
          <div class="picWarp">
            <div class="el_upload">
              <i class="el-icon-plus plus-icon"></i>
              <input type="file" name="file" class="el-upload__input">
            </div>
          </div>
        </el-form-item>
        <el-form-item label="轮播广告" prop="carousel">
          <div class="picWarp">
            <div class="el_upload">
              <i class="el-icon-plus plus-icon"></i>
              <input type="file" name="file" class="el-upload__input">
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {shopRules} from '@/libs/rules'
import {getMallDetail, editMall} from './proxy'
export default {
  name: 'mallBasic',
  data () {
    return {
      form: {
        hostName: null, // 主机名
        shopId: null, // 店铺Id
        name: null, // 店铺名称--
        logo: null, // 店铺logo--
        carousel: [] // 轮播广告
      },
      rules: shopRules
    }
  },
  mounted () {
    // 获取商城基本信息
    getMallDetail({id: 10000}).then((res) => {
      if (res.code * 1 === 0 && res.data) {
        this.form = {...this.form, ...res.data}
      }
    })
  },
  methods: {
    submitForm () { // 提交店铺信息
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let body = this.getBody()
          editMall(body).then((res) => {
            if (res.code * 1 === 0) {
              this.$message.success('店铺编辑成功')
            }
          }).catch((err) => {
            this.$message.error(err.message)
          })
        } else {
          return false
        }
      })
    },
    getBody () { // 获取body体参数
      let bmap = {
        id: this.form.id,
        name: this.form.name,
        hostName: this.form.hostName,
        shopId: this.form.shopId
      }
      if (this.form.logo) { // 店铺logo
        bmap['logo'] = this.form.logo
      }
      if (this.form.carousel.length) { // 轮播广告
        bmap['carousel'] = this.form.carousel
      }
      return bmap
    }
  }
}
</script>
<style scoped lang="scss">
  @import "style";
</style>
