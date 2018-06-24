import Vue from 'vue'
import Router from 'vue-router'
// 门户
import Welcome from '@/components/welcome/welcome'
import LinkUs from '@/components/welcome/linkUs/linkUs' // 联系我们
// IAM
import Login from '@/components/iam/login/login' // 登录
import NotFound from '@/components/iam/notfound/notfound' // 404页面
import ForgetPwd from '@/components/iam/login/forgetPwd/forgetPwd' // 忘记密码
// 路由
import Frame from '@/components/frame/frame' // 网页框架
import Personal from '@/components/personal/personal' // 个人中心
import Overview from '@/components/overview/overview' // 概览
import Basic from '@/components/shop/basic/basic' // 基本信息
import Enter from '@/components/shop/enter/enter' // 入驻店铺
import ShopAddEdit from '@/components/shop/enter/addEdit/addEdit' // 店铺添加或编辑
import Goods from '@/components/goods/goods' // 商品列表
import GoodsDetail from '@/components/goods/detail/detail' // 商品详情
import Order from '@/components/order/order' // 订单列表
import OrderDetail from '@/components/order/detail/detail' // 订单详情
import Discount from '@/components/discount/discount' // 打折券
// 系统管理部分
import User from '@/components/system/user/user' // 用户管理
import UserAddEdit from '@/components/system/user/addEdit/addEdit' // 用户添加或编辑
import Role from '@/components/system/role/role' // 角色列表
import RoleAddEdit from '@/components/system/role/addEdit/addEdit' // 角色添加或编辑
import Resource from '@/components/system/resource/resource' // 资源列表
import ResourceAddEdit from '@/components/system/resource/addEdit/addEdit' // 资源添加或编辑
import Area from '@/components/system/area/area' // 区域管理
import MemberDetail from '@/components/system/area/detail/detail' // 会员详情
import Task from '@/components/system/task/task' // 定时任务列表
import TaskAddEdit from '@/components/system/task/addEdit/addEdit' // 定时任务添加编辑
import File from '@/components/system/file/file' // 文件管理
Vue.use(Router)
// 前端路由
export default new Router({
  mode: 'history',
  base: '',
  exact: true,
  linkActiveClass: 'linkActive',
  routes: [
    { // 登录页面
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    { // 联系我们
      path: '/linkUs',
      name: 'LinkUs',
      component: LinkUs
    },
    { // 登录页面
      path: '/login',
      name: 'Login',
      component: Login
    },
    { // 404页面
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    { // 忘记密码
      path: '/forgetPwd',
      name: 'ForgetPwd',
      component: ForgetPwd
    },
    { // 网页主体
      path: '/frame',
      name: 'Frame',
      component: Frame,
      children: [
        { // 概览
          path: '/personal',
          name: 'Personal',
          component: Personal
        },
        { // 概览
          path: '/overview',
          name: 'Overview',
          component: Overview
        },
        { // 基本信息
          path: '/basic',
          name: 'Basic',
          component: Basic
        },
        { // 入驻店铺
          path: '/enter',
          name: 'Enter',
          component: Enter
        },
        { // 新建店铺
          path: '/enter/add',
          name: 'ShopAdd',
          component: ShopAddEdit
        },
        { // 编辑店铺
          path: '/enter/edit',
          name: 'ShopEdit',
          component: ShopAddEdit
        },
        { // 商品列表
          path: '/goods',
          name: 'Goods',
          component: Goods
        },
        { // 商品详情
          path: '/goods/detail',
          name: 'GoodsDetail',
          component: GoodsDetail
        },
        { // 订单列表
          path: '/order',
          name: 'Order',
          component: Order
        },
        { // 订单详情
          path: '/order/detail',
          name: 'OrderDetail',
          component: OrderDetail
        },
        { // 打折券
          path: '/discount',
          name: 'Discount',
          component: Discount
        },
        /* 系统管理部分 */
        { // 用户管理
          path: '/user',
          name: 'User',
          component: User
        },
        { // 新建用户
          path: '/user/add',
          name: 'UserAdd',
          component: UserAddEdit
        },
        { // 编辑用户
          path: '/user/edit',
          name: 'UserEdit',
          component: UserAddEdit
        },
        { // 角色列表
          path: '/role',
          name: 'Role',
          component: Role
        },
        { // 新建角色
          path: '/role/add',
          name: 'RoleAdd',
          component: RoleAddEdit
        },
        { // 编辑角色
          path: '/role/edit',
          name: 'RoleEdit',
          component: RoleAddEdit
        },
        { // 资源管理
          path: '/resource',
          name: 'Resource',
          component: Resource
        },
        { // 新建资源
          path: '/resource/add',
          name: 'ResourceAdd',
          component: ResourceAddEdit
        },
        { // 编辑资源
          path: '/resource/edit',
          name: 'ResourceEdit',
          component: ResourceAddEdit
        },
        { // 区域管理
          path: '/area',
          name: 'Area',
          component: Area
        },
        { // 区域管理-会员详情
          path: '/area/detail',
          name: 'MemberDetail',
          component: MemberDetail
        },
        { // 定时任务列表
          path: '/task',
          name: 'Task',
          component: Task
        },
        { // 新建定时任务
          path: '/task/add',
          name: 'TaskAdd',
          component: TaskAddEdit
        },
        { // 编辑定时任务
          path: '/task/edit',
          name: 'TaskEdit',
          component: TaskAddEdit
        },
        { // 文件管理
          path: '/file',
          name: 'File',
          component: File
        }
      ]
    }
  ]
})
