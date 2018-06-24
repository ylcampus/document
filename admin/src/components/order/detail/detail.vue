<template>
  <div id="OrderDetail">
    <div class="oTitle"><span>订单详情</span></div>
    <!--form表单-->
    <div class="form">
      订单号
    </div>
    <!--提示信息-->
    <div class="tips">
      <div class="item fir"><b>温馨提示</b></div>
      <div class="item"> 1. 用户默认密码ule@123,创建用户后请通知用户及时完善信息，并修改登录密码。</div>
      <div class="item"> 2. 个人银行卡信息仅用于进行实名认证，不会绑定您的银行卡产生任何隐形消费，也不会泄露您的银行卡信息。</div>
    </div>
  </div>
</template>
<script>
import {getOrderDetail} from './proxy'
export default {
  name: 'OrderDetail',
  data () {
    return {
      orderDetail: {
        id: 3
      }
    }
  },
  mounted () {
    let id = this.$route.query.id
    getOrderDetail({id: id}).then((res) => {
      if (res.code * 1 === 0 && res.data) {
        console.log(res.data)
      }
    })
  },
  methods: {
    test () {}
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
