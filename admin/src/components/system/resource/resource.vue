<template>
  <div id="Resource">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-plus" plain @click = "addResource">添加</el-button>
        <el-button icon="el-icon-close" :disabled="selected.length === 0" plain @click = "delResource">删除</el-button>
        <el-button icon="el-icon-close" plain>导入</el-button>
        <el-button icon="el-icon-close" plain>导出</el-button>
      </div>
      <div class="filter">
        <div class="fitem" style="width:150px;">
          <el-select v-model="filter.type" placeholder="请选择资源类型" @change="typeSelect" clearable>
            <el-option label="不限" value=""></el-option>
            <el-option label="接口资源" value="1"></el-option>
            <el-option label="模块资源" value="2"></el-option>
          </el-select>
        </div>
        <div class="fitem" style="width:220px;">
          <el-input
            @keyup.enter.native = "getResourceList"
            placeholder="输入资源名称进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getResourceList"
            v-model="filter.name" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--资源列表-->
    <section class="resourceList">
      <el-table
        :data="resourceList"
        :height = "tableHeight"
        :default-sort = "{prop: 'group', order: 'descending'}"
        @sort-change = "hansleSortChange"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="250" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="rname" @click="editResource(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="资源类型"
          width="100">
          <template slot-scope="scope">
            <span v-if = "scope.row.type === 1">接口资源</span>
            <span v-else-if = "scope.row.type === 2">模块资源</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="接口资源">
          <el-table-column
            prop="group"
            label="资源组"
            align="center"
            width="200" sortable>
            <template slot-scope="scope">
              <span v-if = "scope.row.group">{{scope.row.group}}</span>
              <span v-if = "!scope.row.group">--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="path"
            label="资源路径"
            align="center"
            width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if = "scope.row.path">{{scope.row.path}}</span>
              <span v-if = "!scope.row.path">--</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          label="模块资源">
          <el-table-column
            prop="code"
            align="center"
            label="Code码"
            width="120">
            <template slot-scope="scope">
              <span v-if = "scope.row.code">{{scope.row.code}}</span>
              <span v-if = "!scope.row.code">--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="platform"
            label="所属平台"
            align="center"
            width="120">
            <template slot-scope="scope">
              <span v-if = "scope.row.platform === 1">官方</span>
              <span v-else-if = "scope.row.platform === 2">商家</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="update_at"
          label="最近更新时间" show-overflow-tooltip>
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
import {getResourceList, deleteResource} from './proxy'
export default {
  name: 'resource',
  data () {
    return {
      total: 0, // 总数据数
      filter: { // 筛选条件
        name: null, // 资源名称
        type: '', // 资源类型
        prop: 'group',
        order: 'descending',
        pageNo: 1,
        pageSize: 25
      },
      tableHeight: 720, // 需要使用vuex
      resourceList: [],
      selected: []
    }
  },
  mounted () {}, // 之后还需要加上vuex的逻辑
  methods: {
    getResourceList () { // 获取资源列表数据
      let params = this.getParams()
      getResourceList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.resourceList = res.data.rows || []
          this.total = res.data.total || 0
        }
      })
    },
    getParams () { // 获取筛选参数
      let map = {
        pageNo: this.filter.pageNo,
        pageSize: this.filter.pageSize
      }
      if (this.filter.name) {
        map.name = this.filter.name
      }
      if (this.filter.type) {
        map.type = this.filter.type
      }
      if (this.filter.prop && this.filter.order) {
        map.prop = this.filter.prop
        map.order = this.filter.order
      }
      return map
    },
    addResource () { // 添加资源
      this.$router.push('resource/add')
    },
    editResource (row) { // 编辑资源
      let resourceId = row.id
      this.$router.push({
        name: 'ResourceEdit',
        query: { id: resourceId }
      })
    },
    delResource () { // 删除资源
      this.$confirm('确定要删除已选资源吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selected.map((row) => {
          return row.id
        })
        deleteResource({ids: ids}).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getResourceList()
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
      this.getResourceList()
    },
    hansleSortChange (column) { // 排序
      this.filter.prop = column.prop
      this.filter.order = column.order
      this.getResourceList()
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getResourceList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getResourceList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
