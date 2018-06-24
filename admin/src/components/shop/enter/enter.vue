<template>
  <div id="EnterShop">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-plus" @click = "addShop" plain>新建店铺</el-button>
        <el-button icon="el-icon-close" :disabled="selected.length === 0" @click = "delShop" plain>删除</el-button>
      </div>
      <div class="filter">
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getShopList"
            placeholder="输入店铺名称进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getShopList"
            v-model="filter.name" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--资源列表-->
    <section class="shopsList">
      <el-table
        :data="shopList"
        :height = "tableHeight"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          label="店铺名称"
          prop="name" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="sname" @click="editShop(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="主机名"
          prop="hostName" width="150">
        </el-table-column>
        <el-table-column
          label="店铺ID"
          prop="shopId" width="120">
        </el-table-column>
        <el-table-column
          label="SUID"
          prop="suid" width="120">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createAt">
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
import {getShopList, deleteShop} from './proxy'
export default {
  name: 'shopEnter',
  data () {
    return {
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        name: '' // 店铺名称
      },
      tableHeight: 720,
      shopList: [],
      selected: [] // 被选中的店铺
    }
  },
  mounted () {
    this.getShopList() // 获取店铺列表
  },
  methods: {
    getShopList () { // 获取资源列表数据
      let params = this.getParams()
      console.log(params)
      getShopList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.shopList = res.data.rows || []
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
      return map
    },
    addShop () { // 添加店铺
      this.$router.push('enter/add')
    },
    editShop (row) { // 编辑店铺
      this.$router.push({
        name: 'ShopEdit',
        query: { id: row.shopId }
      })
    },
    delShop () { // 删除店铺
      this.$confirm('确定要删除已选店铺吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selected.map((row) => {
          return row.id
        })
        deleteShop({ids: ids}).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getShopList()
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
    handleSelectionChange (val) {
      this.selected = val
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getShopList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getShopList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "style";
</style>
