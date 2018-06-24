<template>
  <div id="Discount">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-close" :disabled="selected.length === 0" @click = "delDiscount" plain>删除</el-button>
      </div>
      <div class="filter">
        <div class="fitem" style="width:180px;">
          <el-select v-model="filter.status" placeholder="请选择打折券类型" @change="statusSelect" clearable>
            <el-option label="不限" value=""></el-option>
            <el-option label="未领取" value="1"></el-option>
            <el-option label="未使用" value="2"></el-option>
            <el-option label="已使用" value="3"></el-option>
            <el-option label="已完成" value="4"></el-option>
          </el-select>
        </div>
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getDiscountList"
            placeholder="输入打折券id进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getDiscountList"
            v-model="filter.id" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--资源列表-->
    <section class="discountList">
      <el-table
        :data="discountList"
        :height = "tableHeight"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          label="打折券Id"
          prop="id" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status" width="100">
          <template slot-scope="scope">
            <span v-if = "scope.row.status === 1">未领取</span>
            <span v-else-if = "scope.row.status === 2">未使用</span>
            <span v-else-if = "scope.row.status === 3">已使用</span>
            <span v-else-if = "scope.row.status === 4">已完成</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="折扣"
          prop="discount" width="100">
        </el-table-column>
        <el-table-column
          label="所属店铺"
          prop="shopName" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createAt" show-overflow-tooltip>
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
import {getDiscountList, deleteDiscount} from './proxy'
export default {
  name: 'Discount',
  data () {
    return {
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        status: '', // 打折券状态
        id: '' // 打折券Id
      },
      tableHeight: 720,
      discountList: [], // 打折券列表
      selected: [] // 已选中商品
    }
  },
  mounted () {
    // 获取打折券列表数据
    this.getDiscountList()
  },
  methods: {
    getDiscountList () { // 获取资源列表数据
      let params = this.getParams()
      console.log(params)
      getDiscountList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.discountList = res.data.rows || []
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
      if (this.filter.status) { // 打折券状态
        map.status = parseInt(this.filter.status, 10)
      }
      if (this.filter.id) { // 打折券Id
        map.id = this.filter.id
      }
      return map
    },
    delDiscount () { // 删除打折券
      this.$confirm('确定要删除已选打折券吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selected.map((row) => {
          return row.id
        })
        deleteDiscount({ids: ids}).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getDiscountList()
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
    statusSelect (val) {
      this.filter.status = val
      this.getDiscountList()
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getDiscountList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getDiscountList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
