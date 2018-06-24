<template>
  <div id="Welcome">
    <!--页头-->
    <div id="header">
      <div class="warpLeft">
        <!--菜单显示状态切换-->
        <div @click = "handleMenu" class="header-menu" v-bind:class="{ active: isCollapse}">
          <i class="el-icon-more"></i>
        </div>
        <!--商城logo-->
        <div class="web-logo">
          <a href="/">优乐校园</a>
        </div>
        <!--网站导航-->
        <div class="yle-header-item">
          <div class="yle-dropdown navigation">
            <div class="txt">
              <i class="yle-icon yle-icon-menu"></i>
              <span>网站导航</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </div>
            <div class="menu">
              <div class="navigationInner">
                <div class="mitem">
                  <span class="module">
                    <a>个人中心</a>
                  </span>
                </div>
                <div class="mitem">
                  <span class="module">
                    <a>概览</a>
                  </span>
                </div>
                <div class="mitem">
                  <span class="module">
                    <a>商品管理</a>
                  </span>
                </div>
                <div class="mitem">
                  <span class="module">
                    <a>订单管理</a>
                  </span>
                </div>
                <div class="mitem">
                  <span class="module">
                    <a>会员管理</a>
                  </span>
                </div>
                <div class="mitem">
                  <span class="module">
                    <a>打折券管理</a>
                  </span>
                </div>
                <div class="mitem">
                  <span class="spec">
                    <a>店铺管理</a>
                  </span>
                  <div class="pmenu">
                    <a class="pitem">基本信息</a>
                    <a class="pitem">入驻店铺</a>
                  </div>
                </div>
                <div class="mitem">
                  <span class="spec">
                    <a>系统管理</a>
                  </span>
                  <div class="pmenu">
                    <a class="pitem">用户管理</a>
                    <a class="pitem">角色管理</a>
                    <a class="pitem">任务管理</a>
                    <a class="pitem">文件管理</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-tools">
        <!--帮助中心-->
        <div class="yle-header-item normal">协议声明</div>
        <div class="v-line"></div>
        <!--下载中心-->
        <div class="yle-header-item">
          <div class="yle-dropdown load">
            <div class="txt">
              <span>下载中心</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </div>
            <div class="menu">
              <div class="inner">
                <div class="lItem">
                  <div class="warp">
                    <div class="pic android"></div>
                    <div class="desc">
                      <div class="title">安卓客户端</div>
                      <div class="version">v1.0.0</div>
                    </div>
                  </div>
                </div>
                <div class="lItem">
                  <div class="warp">
                    <div class="pic ios"></div>
                    <div class="desc">
                      <div class="title">IOS客户端</div>
                      <div class="version">v1.0.0</div>
                    </div>
                  </div>

                </div>
                <div class="r-line"></div>
                <div class="lItem">
                  <a>用户手册</a>
                </div>
                <div class="lItem">
                  <a>数据库</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="v-line"></div>
        <!--语言-->
        <div class="yle-header-item">
          <div class="yle-dropdown lang">
            <div class="txt">
              <i class="header-icon header-icon-lang-zh"></i>
              <span>中文（简体）</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </div>
            <div class="menu">
              <div class="inner">
                <div class="nItem">
                  <a>中文（简体）</a>
                </div>
                <div class="nItem">
                  <a>English（英文）</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--个人中心-->
        <div class="v-line"></div>
        <div class="yle-header-item">
          <div class="yle-dropdown personal">
            <div class="txt">
              <!--下面就要开始着手处理图片了-->
              <i class="yle-icon yle-icon-user"></i>
              <span>root</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </div>
            <div class="menu">
              <div class="inner">
                <div class="nItem">
                  <a>个人中心</a>
                </div>
                <div class="nItem">
                  <a>消息（0）</a>
                </div>
                <div class="nItem">
                  <a>退出</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--登录-->
        <div class="yle-header-item login">登录</div>
      </div>
    </div>
    <!--主体-->
    <div id="content">
      <!--走马灯-->
      <div class="carousel">
        <el-carousel :interval="30000" height="910px">
          <el-carousel-item>
            <div class="item pic1">
              <div class="test">
                <div class="items item1"></div>
                <div class="items">dsfs</div>
                <div class="items item1"></div>
                <div class="items">sdf</div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="item pic2"></div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="item pic3"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--产品与服务-->
      <div class="product">
        <div class="inner">
          <div class="tArea">
            <div class="title">产品与服务</div>
            <div class="subTitle">精准.可控.高效.可持续</div>
          </div>
          <div class="cardArea">
            <div class="item">
              <div class="pic">
                <div class="logo logo1"></div>
              </div>
              <div class="title">可控的商品信息与品牌推广渠道</div>
              <div class="desc">使用云服务ECS、VPC、EVS、AS、ELB部署应用，搭建论坛网站</div>
            </div>
            <div class="item">
              <div class="pic">
                <div class="logo logo2"></div>
              </div>
              <div class="title">精准的市场定位</div>
              <div class="desc">使用微服务开发框架，将电商应用从原生Spring Boot和Go-kit迁移并部署到ServiceStage平台上</div>
            </div>
            <div class="item">
              <div class="pic">
                <div class="logo logo3"></div>
              </div>
              <div class="title">数据采集与量化分析</div>
              <div class="desc">使用机器学习服务，预测餐厅未来的销售量，为开设新餐厅提供决策依据。</div>
            </div>
          </div>
        </div>
      </div>
      <!--入驻企业-->
      <div class="brand">
        <div class="inner">
          <div class="bArea">
            <div class="title">合作伙伴展示</div>
            <div class="subTitle">共建和谐共赢的云生态，实现快速发展</div>
          </div>
          <div class="cardArea">
            <div class="inner">
              <div class="item">
                <img src="../../assets/img/protal/logo1.png">
              </div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--页脚-->
    <div class="yle-footer">
      <div class="inner">
        <div class="topArea">
          <div class="footer-copyright">
            <span>版权所有 © 华为软件技术有限公司 2018</span>
            <span>保留一切权利</span>
            <a>苏ICP备17040376号-5</a>
            <span>苏B2-20130048号</span>
          </div>
          <div class="footer-law">
            <a>法律声明</a>
            <span class="v-line"></span>
            <a>隐私政策声明</a>
            <span class="v-line"></span>
            <a>举报不良信息</a>
            <span class="v-line"></span>
            <a>可接受的使用政策</a>
            <span class="v-line"></span>
            <a>华为云用户协议</a>
          </div>
        </div>
        <div class="bottomArea">
          <i class="icon-record icon1"></i>
          <i class="icon-record icon2"></i>
          <span>苏公网安备 32011402010008号</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Welcome',
  data () {
    return {
      isCollapse: false
    }
  },
  mounted () {
    // 考虑下一步的工作计划
  },
  methods: {
    handleMenu () { // 切换菜单折叠状态
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
