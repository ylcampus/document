<template>
  <div id="Goods">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-close" :disabled="selected.length === 0" @click = "delGoods" plain>删除</el-button>
      </div>
      <div class="filter">
        <div class="fitem" style="width:180px;">
          <el-select v-model="filter.shop" @change="typeSelect" placeholder="请选择" clearable>
            <el-option
              v-for="item in shopList"
              :key="item.shopId"
              :label="item.name"
              :value="item.shopId">
            </el-option>
          </el-select>
        </div>
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getGoodsList"
            placeholder="输入商品名称进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getGoodsList"
            v-model="filter.name" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--资源列表-->
    <section class="goodsList">
      <el-table
        :data="goodsList"
        :height = "tableHeight"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="name" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="gname" @click="toDetail(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品Id"
          prop="id" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price" width="100">
        </el-table-column>
        <el-table-column
          label="所属店铺"
          prop="shopName" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="更新状态"
          prop="status" width="100">
          <template slot-scope="scope">
            <span v-if = "scope.row.status === 1">新建</span>
            <span v-else-if = "scope.row.status === 2">更新成功</span>
            <span v-else-if = "scope.row.status === 3">更新失败</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateAt" show-overflow-tooltip>
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
import {getGoodsList, getShopList, deleteGoods} from './proxy'
export default {
  name: 'goods',
  data () {
    return {
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        shop: '', // 所属店铺
        name: '' // 商品名称
      },
      shopList: [],
      tableHeight: 720,
      goodsList: [],
      selected: [] // 已选中商品
    }
  },
  mounted () {
    // 获取商品列表
    this.getGoodsList()
    // 获取店铺列表
    getShopList().then((res) => {
      if (res.code * 1 === 0 && res.data) {
        this.shopList = res.data.rows || []
      }
    }).catch((err) => {
      this.$message.error(err.message)
    })
  },
  methods: {
    getGoodsList () { // 获取资源列表数据
      let params = this.getParams()
      console.log(params)
      getGoodsList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.goodsList = res.data.rows || []
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
      if (this.filter.shop) { // 所属店铺
        map.shop = this.filter.shop
      }
      if (this.filter.name) { // 商品名称
        map.name = this.filter.name
      }
      return map
    },
    delGoods () { // 删除资源
      this.$confirm('确定要删除已选商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selected.map((row) => {
          return row.id
        })
        deleteGoods({ids: ids}).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getGoodsList()
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
      this.filter.shop = val
      this.getGoodsList()
    },
    toDetail (row) { // 到商品详情页面
      this.$router.push({
        name: 'GoodsDetail',
        query: { id: row.id }
      })
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getGoodsList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
