<template>
  <div id="ShopAddEdit">
    <div class="addShops"><span>{{title}}</span></div>
    <!--form表单-->
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" size="small">
        <el-form-item label="店铺名称" prop="name" v-if="pflag === 'ShopEdit'">
          <el-input v-model="form.name" placeholder="请输入店铺名称" disabled></el-input>
        </el-form-item>
        <el-form-item label="官方域名" prop="hostName">
          <el-input v-model="form.hostName" :disabled="pflag === 'ShopEdit'" placeholder="请输入域名信息"></el-input>
        </el-form-item>
        <el-form-item label="店铺Id" prop="shopId">
          <el-input v-model="form.shopId" :disabled="pflag === 'ShopEdit'" placeholder="请输入店铺Id"></el-input>
        </el-form-item>
        <el-form-item label="suid" prop="suid">
          <el-input v-model="form.suid" :disabled="pflag === 'ShopEdit'" placeholder="请输入suid"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman" v-if="pflag === 'ShopEdit'">
          <el-input v-model="form.linkman" placeholder="请输入联系人信息" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone" v-if="pflag === 'ShopEdit'">
          <el-input v-model="form.telephone" placeholder="请输入联系电话信息" disabled></el-input>
        </el-form-item>
        <el-form-item label="品牌简介" prop="brief" v-if="pflag === 'ShopEdit'">
          <el-input rows = "4" type="textarea" v-model="form.brief" placeholder="请输入品牌简介信息" disabled></el-input>
        </el-form-item>
        <el-form-item label="Logo" prop="logo" v-if="pflag === 'ShopEdit'">
          <div class="picWarp">
            <div class="el_upload">
              <i class="el-icon-plus plus-icon"></i>
              <input type="file" name="file" class="el-upload__input">
            </div>
          </div>
        </el-form-item>
        <el-form-item label="授权证明" prop="authority" v-if="pflag === 'ShopEdit'">
          <div class="picWarp">
            <div class="el_upload">
              <i class="el-icon-plus plus-icon"></i>
              <input type="file" name="file" class="el-upload__input">
            </div>
          </div>
        </el-form-item>
        <el-form-item label="轮播广告" prop="carousel" v-if="pflag === 'ShopEdit'">
          <div class="picWarp">
            <div class="el_upload">
              <i class="el-icon-plus plus-icon"></i>
              <input type="file" name="file" class="el-upload__input">
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">
            {{pflag === 'ShopAdd' ? '立即创建' : '保存修改'}}
          </el-button>
          <el-button v-if = "pflag === 'ShopAdd'" @click="resetForm()">重置</el-button>
          <el-button v-else-if = "pflag === 'ShopEdit'" @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tips">
      <div class="item fir"><b>温馨提示</b></div>
      <div class="item"> 1. 或者建议您更换使用其他银行的银行卡</div>
      <div class="item"> 2. 个人银行卡信息仅用于进行实名认证，不会绑定您的银行卡产生任何隐形消费，也不会泄露您的银行卡信息。</div>
    </div>
  </div>
</template>
<script>
import {shopRules} from '@/libs/rules'
import {getShopDetail, addShop, editShop} from './proxy'
export default {
  name: 'shopEnterAddEdit',
  data () {
    return {
      title: '新建店铺',
      pflag: 'ShopAdd', // 新建or编辑 默认为新建
      form: {
        hostName: null, // 主机名
        shopId: null, // 店铺Id
        suid: null, // suid
        name: null, // 店铺名称--
        logo: null, // 店铺logo--
        authority: null, // 授权证明
        carousel: [], // 轮播广告
        brief: null, // 品牌简介
        linkman: null, // 联系人
        telephone: null // 联系电话
      },
      rules: shopRules
    }
  },
  mounted () {
    // ok 可以从这个地方入手向下继续了
    this.pflag = this.$route.name
    this.title = this.pflag === 'ShopAdd' ? '添加店铺' : '编辑店铺'
    // 若是编辑页面则首先去获取资源详情
    if (this.pflag === 'ShopEdit') {
      let id = this.$route.query.id
      getShopDetail({id: id}).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
        }
      })
    }
  },
  methods: {
    submitForm () { // 提交店铺信息
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let body = this.getBody()
          if (this.pflag === 'ShopAdd') {
            addShop(body).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('新建店铺成功')
                setTimeout(() => {
                  this.$router.push('/enter')
                }, 2000)
              }
            }).catch((err) => {
              this.$message.error(err.message)
            })
          } else if (this.pflag === 'ShopEdit') {
            body.id = this.form.id
            editShop(body).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('店铺编辑成功')
                setTimeout(() => {
                  this.$router.push('/enter')
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
        hostName: this.form.hostName,
        shopId: this.form.shopId,
        suid: this.form.suid
      }
      if (this.form.logo) { // 店铺logo
        bmap['logo'] = this.form.logo
      }
      if (this.form.authority) { // 授权证明
        bmap['authority'] = this.form.authority
      }
      if (this.form.carousel.length) { // 轮播广告
        bmap['carousel'] = this.form.carousel
      }
      if (this.form.brief) { // 品牌简介
        bmap['brief'] = this.form.brief
      }
      if (this.form.linkman) { // 联系人
        bmap['linkman'] = this.form.linkman
      }
      if (this.form.telephone) { // 联系电话
        bmap['telephone'] = this.form.telephone
      }
      return bmap
    },
    resetForm () { // 重置
      this.form.hostName = null
      this.form.shopId = null
      this.form.suid = null
    },
    cancel () {
      this.$router.push('/enter')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "style";
</style>
