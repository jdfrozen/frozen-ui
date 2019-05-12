<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import KtButton from "@/views/Core/KtButton"
export default {
  components:{
    KtButton
  },
  data() {
    return {
      filters: {
        name: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    // 获取分页数据
    findPage: function (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest
      }
      this.pageRequest.columnFilters = {name: {name: 'name', value: this.filters.name}}
      this.$api.user.findPage(this.pageRequest).then((res) => {
        this.pageResult = res.data
        this.findUserRoles()
      }).then(data != null ? data.callback : '')
    },
    // 显示新增界面
    handleAdd: function () {
      this.dialogVisible = true
      this.operation = true
      this.dataForm = {
        id: 0,
        name: '',
        password: '',
        deptId: 1,
        deptName: '',
        email: 'test@qq.com',
        mobile: '13889700023',
        status: 1,
        userRoles: []
      }
    }
  }
}
</script>

<style lang="scss">
  .site-wrapper.site-page--not-found {
    position: absolute;
    top: 60px;
    right: 0;
    left: 0;
    overflow: hidden;
    .site-content__wrapper {
      padding: 0;
      margin: 0;
      background-color: #fff;
    }
    .site-content {
      position: fixed;
      top: 15%;
      left: 50%;
      z-index: 2;
      padding: 30px;
      text-align: center;
      transform: translate(-50%, 0);
    }
    .not-found-title {
      margin: 20px 0 15px;
      font-size: 8em;
      font-weight: 500;
      color: rgb(55, 71, 79);
    }
    .not-found-desc {
      margin: 0 0 30px;
      font-size: 26px;
      text-transform: uppercase;
      color: rgb(118, 131, 143);
      > em {
        font-style: normal;
        color: #ee8145;
      }
    }
    .not-found-btn-gohome {
      margin-left: 30px;
    }
  }
</style>
