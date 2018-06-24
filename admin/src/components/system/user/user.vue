<template>
  <div id="User">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-plus" @click = "addUser" plain>添加</el-button>
        <el-button icon="el-icon-close" :disabled="selected.length === 0" @click = "delUser" plain>删除</el-button>
      </div>
      <div class="filter">
        <div class="fitem" style="width:150px;">
          <el-select v-model="filter.type" placeholder="请选择用户类型" @change="typeSelect" clearable>
            <el-option label="不限" value=""></el-option>
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="普通用户" value="3"></el-option>
          </el-select>
        </div>
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getUserList"
            placeholder="输入用户账号/手机号进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getUserList"
            v-model="filter.search" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--用户列表-->
    <section class="roleList">
      <el-table
        :data="userList"
        :height = "tableHeight"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="account"
          label="用户账号"
          width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="raccount" @click="editUser(scope.row)">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </section>
    <!--分页-->
    <section class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filter.pageNo"
        :page-sizes="[20, 25, 50, 100]"
        :page-size="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </section>
  </div>
</template>
<script>
import {getUserList, deleteUser} from './proxy'
export default {
  name: 'user',
  data () {
    return {
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        type: '',
        search: ''
      },
      tableHeight: 720,
      userList: [],
      selected: []
    }
  },
  mounted () {
    // 加载资源列表
    this.getUserList()
  },
  methods: {
    getUserList () { // 获取资源列表数据
      let params = this.getParams()
      getUserList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.userList = res.data.rows || []
          this.total = res.data.total || 0
        }
      }).catch((err) => {
        this.$message.error(err.message)
      })
    },
    getParams () { // 获取筛选参数
      let map = {
        pageNo: this.filter.pageNo,
        pageSize: this.filter.pageSize
      }
      if (this.filter.search) { // 用户姓名或手机号
        map.search = this.filter.search
      }
      if (this.filter.type) { // 用户类型
        map.type = this.filter.type
      }
      return map
    },
    addUser () { // 添加用户
      this.$router.push('user/add')
    },
    delUser () { // 删除用户
      this.$confirm('确定要删除已选用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selected.map((row) => {
          return row.id
        })
        deleteUser({ids: ids}).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getUserList()
          }
        }).catch((err) => {
          this.$message.error(err.message)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    typeSelect (val) {
      this.filter.type = val
      this.getUserList()
    },
    editUser (row) { // 到用户编辑页面
      let userId = row.id
      this.$router.push({
        name: 'UserEdit',
        query: { id: userId }
      })
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getUserList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
