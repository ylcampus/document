<template>
  <div id="Task">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-plus" @click = "addTask" plain>添加</el-button>
        <el-button icon="el-icon-close" :disabled="selected.length === 0" @click = "delTask" plain>删除</el-button>
      </div>
      <div class="filter">
        <div class="fitem" style="width:150px;">
          <el-select v-model="filter.type" placeholder="请选择定时任务类型" @change="typeSelect" clearable>
            <el-option label="不限" value=""></el-option>
            <el-option label="系统" value="1"></el-option>
            <el-option label="租户" value="2"></el-option>
          </el-select>
        </div>
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getTaskList"
            placeholder="输入定时任务名称进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getTaskList"
            v-model="filter.name" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--定时任务列表-->
    <section class="taskList">
      <el-table
        :data="taskList"
        :height = "tableHeight"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="tname" @click="editTask(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100">
          <template slot-scope="scope">
            <span v-if = "scope.row.type === 1">按周</span>
            <span v-else-if = "scope.row.type === 2">按天</span>
            <span v-else-if = "scope.row.type === 3">按月</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tenant"
          label="租户"
          width="100">
        </el-table-column>
        <el-table-column
          prop="rule"
          label="执行时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="ready"
          label="就绪状态"
          width="120">
          <template slot-scope="scope">
            <span v-if = "scope.row.ready">已启用</span>
            <span v-else-if = "!scope.row.ready">未启用</span>
          </template>
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
import {getTaskList, deleteTask} from './proxy'
export default {
  name: 'task',
  data () {
    return {
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        type: '1',
        name: ''
      },
      tableHeight: 720,
      taskList: [],
      selected: []
    }
  },
  mounted () {
    // 加载资源列表
    this.getTaskList()
  },
  methods: {
    getTaskList () { // 获取资源列表数据
      let params = this.getParams()
      console.log(params)
      getTaskList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.taskList = res.data.rows || []
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
      if (this.filter.name) { // 用户姓名或手机号
        map.search = this.filter.name
      }
      if (this.filter.type) { // 用户类型
        map.type = this.filter.type
      }
      return map
    },
    addTask () { // 添加用户
      this.$router.push('task/add')
    },
    delTask () { // 删除用户
      this.$confirm('确定要删除已选用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selected.map((row) => {
          return row.id
        })
        deleteTask({ids: ids}).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getTaskList()
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
      this.filter.userType = val
      this.getTaskList()
    },
    editTask (row) { // 到定时任务编辑页面
      this.$router.push({
        name: 'TaskEdit',
        query: { id: row.id }
      })
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getTaskList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getTaskList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
