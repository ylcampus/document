<template>
  <div id="Order">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-close" :disabled="selected.length === 0" @click = "delOrders" plain>删除</el-button>
      </div>
      <div class="filter">
        <div class="fitem" style="width:180px;">
          <el-select v-model="filter.status" placeholder="请选择订单状态" @change="orderSelect" clearable>
            <el-option label="不限" value=""></el-option>
            <el-option label="待处理" value="1"></el-option>
            <el-option label="备货中" value="2"></el-option>
            <el-option label="代发货" value="3"></el-option>
            <el-option label="已发货" value="4"></el-option>
            <el-option label="待退货" value="5"></el-option>
            <el-option label="已完成" value="6"></el-option>
            <el-option label="已取消" value="7"></el-option>
          </el-select>
        </div>
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getOrderList"
            placeholder="输入订单号进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getOrderList"
            v-model="filter.orderNo" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--资源列表-->
    <section class="goodsList">
      <el-table
        :data="orderList"
        :height = "tableHeight"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          label="订单号"
          prop="id" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="gname" @click="toDetail(scope.row)">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="买家"
          prop="account" width="100">
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="goodsName" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="店铺"
          prop="shopName" width="100">
          <template slot-scope="scope">
            <span v-if = "scope.row.status === 1">新建</span>
            <span v-else-if = "scope.row.status === 2">更新成功</span>
            <span v-else-if = "scope.row.status === 3">更新失败</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createAt" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </section>
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
import {getOrderList, deleteOrder} from './proxy'
export default {
  name: 'goods',
  data () {
    return {
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        status: '', // 订单状态
        orderNo: '' // 订单号
      },
      tableHeight: 720,
      orderList: [],
      selected: [] // 已选中订单
    }
  },
  mounted () {
    // 获取商品列表
    this.getOrderList()
  },
  methods: {
    getOrderList () { // 获取资源列表数据
      let params = this.getParams()
      console.log(params)
      getOrderList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.orderList = res.data.rows || []
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
      if (this.filter.status) { // 订单状态
        map.status = parseInt(this.filter.status, 10)
      }
      if (this.filter.orderNo) { // 订单号
        map.orderNo = this.filter.orderNo
      }
      return map
    },
    delOrders () { // 删除订单
      this.$confirm('确定要删除已选订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selected.map((row) => {
          return row.id
        })
        deleteOrder({ids: ids}).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getOrderList()
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
    orderSelect (val) {
      this.filter.status = val
      this.getOrderList()
    },
    toDetail (row) { // 到商品详情页面
      this.$router.push({
        name: 'OrderDetail',
        query: { id: row.id }
      })
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getOrderList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getOrderList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
