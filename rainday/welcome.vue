<template>
  <div id="Welcome">
    <header class="portal-header">
      <div class="portal-container">
        <div class="web-logo"><a href="/">优乐商城</a></div>
        <div class="header-nav-right">
          <ul id="portal-menu">
            <li class="header-search-item active">
              <a class="header-item" href="/">首页</a>
            </li>
            <li class="header-search-item">
              <a class="header-item" href="/linkUs" target="_blank">联系我们</a>
            </li>
            <li style="padding:26px 0"><div style="display:block" class="v-line"></div></li>
            <li class="header-user-item">
              <a href="http://192.168.1.15:8080/login" target="_blank" class="header-item login">登录</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <!--描述页面-->
    <div id="portalWrap">
      <rain-day></rain-day>
      <!--<div id="portalContent">-->
        <!--<div class="my-portal-container fullpage-wrapper">-->
          <!--&lt;!&ndash;首页&ndash;&gt;-->
          <!--<div id = "homePage" v-bind:style="{height: wheight + 'px'}" class="section">-->
            <!--<div class="fp-tableCell">-->
              <!--<div class="col-md-6 home-page-left">-->
                <!--<div class="col-md-4"></div>-->
                <!--<div class="col-md-8">-->
                  <!--<div class="home-page-title">优乐商城管理系统</div>-->
                  <!--<div class="home-page-content">-->
                    <!--<span>助力企业品牌推广</span><br>-->
                    <!--<span>为企业提供优先培养未来核心消费者服务</span>-->
                    <!--<span>为企业提供优先培养未来核心消费者服务</span>-->
                  <!--</div>-->
                  <!--<div id="apply-btn" class="home-page-btn apply-btn">立即体验</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
import RainDay from './rainday/rainday.vue'
export default {
  name: 'Welcome',
  components: {
    RainDay
  },
  data () {
    return {
      windowHeight: this.store.state.windowHeight
    }
  },
  computed: {
    // 窗口高度
    wheight: function () {
      return this.store.state.windowHeight
    }
  },
  mounted () {
    // ok从现在开始进行改造
  },
  methods: {}
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
