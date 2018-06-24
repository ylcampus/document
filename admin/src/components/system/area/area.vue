<template>
  <div id="Area">
    <!--区域树-->
    <div class="areaTree">
      <div class="filter">
        <el-input
          placeholder="输入区域名称进行过滤"
          suffix-icon="el-icon-search"
          v-model="filterText" clearable>
        </el-input>
      </div>
      <div class="atree">
        <el-tree
          class="filter-tree"
          :data="areaList"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="areaTree">
        </el-tree>
      </div>
    </div>
    <!--会员列表-->
    <div class="memberList">
      <!--操作面板-->
      <section class="head">
        <div class="status" style="width:150px;">
          <el-select  v-model="filter.status" placeholder="请选择在线状态" @change="statusSelect" clearable>
            <el-option label="不限" value=""></el-option>
            <el-option label="在线" value="1"></el-option>
            <el-option label="离线" value="2"></el-option>
          </el-select>
        </div>
        <div class="filter">
          <div class="fitem" style="width:150px;">
            <el-select  v-model="filter.sex" placeholder="请选择性别" @change="sexSelect" clearable>
              <el-option label="不限" value=""></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </div>
          <div class="fitem">
            <el-input
              @keyup.enter.native = "getMemberList"
              placeholder="输入用户账号/手机号进行搜索"
              suffix-icon="el-icon-search"
              @clear = "getMemberList"
              v-model="filter.search" clearable>
            </el-input>
          </div>
        </div>
      </section>
      <!--列表-->
      <section class="mList">
        <el-table
          :data="memberList"
          :height = "tableHeight"
          stripe>
          <el-table-column
            prop="account"
            label="会员账号"
            width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="raccount" @click="toMemberDetail(scope.row)">{{ scope.row.account }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center"
            width="60">
            <template slot-scope="scope">
              <span v-if = "scope.row.status === 1">在线</span>
              <span v-else-if = "scope.row.status === 2">离线</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            align="center"
            width="60">
            <template slot-scope="scope">
              <span v-if = "scope.row.sex === 1">男</span>
              <span v-else-if = "scope.row.sex === 2">女</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="地址信息">
            <el-table-column
              prop="province"
              label="省"
              align="center"
              width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="city"
              label="市"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="college"
              label="学校"
              align="center"
              width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="campus"
              label="校区"
              align="center"
              width="100" show-overflow-tooltip>
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="createAt"
            label="注册时间" show-overflow-tooltip>
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
  </div>
</template>
<script>
import {getMemberList} from './proxy'
export default {
  name: 'area',
  watch: {
    filterText (val) {
      this.$refs.areaTree.filter(val)
    }
  },
  data () {
    return {
      filterText: '',
      tableHeight: 720,
      filter: {
        areaId: null, // 区域id
        type: null, // 区域类型
        pageNo: 1,
        pageSize: 25,
        status: '', // 在线状态
        sex: '', // 性别
        search: '' // 会员账号或手机号
      },
      memberList: [], // 会员列表
      areaList: [{
        id: 1,
        label: '江苏省',
        children: [{
          id: 4,
          label: '南京市',
          children: [{
            id: 9,
            label: '南京大学'
          }, {
            id: 10,
            label: '东南大学'
          }]
        }]
      }], // 区域列表
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      total: 0
    }
  },
  mounted () {
    // 获取会员列表数据
    this.getMemberList()
    // 获取区域树列表
    // 关于区域树的东西 估计要放后处理
  },
  methods: {
    getMemberList () { // 获取会员列表
      let params = this.getParams()
      console.log(params)
      getMemberList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.memberList = res.data.rows || []
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
      if (this.filter.areaId) {
        map.areaId = this.filter.areaId
      }
      if (this.filter.type) {
        map.type = this.filter.type
      }
      if (this.filter.status) {
        map.status = this.filter.status
      }
      if (this.filter.sex) {
        map.sex = parseInt(this.filter.sex, 10)
      }
      if (this.filter.search) {
        map.search = this.filter.search
      }
      return map
    },
    statusSelect (val) { // 在线状态选择
      this.filter.status = val
      this.getMemberList()
    },
    sexSelect (val) { // 性别选择
      this.filter.sex = val
      this.getMemberList()
    },
    toMemberDetail (row) { // 到会员详情页
      this.$router.push({
        name: 'MemberDetail',
        query: { id: row.id }
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getMemberList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getMemberList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
