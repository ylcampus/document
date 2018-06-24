<template>
  <div id="Frame">
    <div class="container">
      <!--页头-->
      <section id="header">
        <div class="web-logo">
          <a href="/">优乐校园</a>
        </div>
        <div class="navr">
          <div class="mitem bell">
            <i class="el-icon-bell"></i>
          </div>
          <div class="mitem v-line"></div>
          <div class="mitem">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-menu loginLogo"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>基本信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </section>
      <section id="body">
        <!--侧边栏-->
        <section id="sidebar">
          <h5>默认颜色</h5>
          <el-menu default-active="1" class="elSidebar" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">概览</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">店铺管理</span>
              </template>
              <el-menu-item index="1-1">基本信息</el-menu-item>
              <el-menu-item index="1-2">入驻店铺</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-setting"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-document"></i>
              <span slot="title">打折券管理</span>
            </el-menu-item>
            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">系统管理</span>
              </template>
              <el-menu-item index="1-1">用户管理</el-menu-item>
              <el-menu-item index="1-2">角色管理</el-menu-item>
              <el-menu-item index="1-3">资源管理</el-menu-item>
              <el-menu-item index="1-4">区域管理</el-menu-item>
              <el-menu-item index="1-5">任务管理</el-menu-item>
              <el-menu-item index="1-6">文件管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </section>
        <!--主页面-->
        <section id = "mainWarp">
          <div id ="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>系统管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/resource' }">资源管理</el-breadcrumb-item>
              <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div id="mainCotent">
            <router-view/>
          </div>
        </section>
      </section>
      <!--页脚-->
      <section id = "footer" @click="test">
        页脚
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'frame',
  data () {
    return {
      activeIndex2: '1',
      isCollapse: false
    }
  },
  mounted () {
    // ok 可以从这个地方深入下去抽象数据模型了
    // 等第一轮页面趟过一遍之后再说吧
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    test () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style scoped>

</style>
