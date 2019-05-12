<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="5" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
        <img :src="this.logo" /><div>{{appName}}</div>
      </el-col>
      <el-col :span="1">
        <div class="tools" @click.prevent="collapse">
          <i class="el-icon-menu"></i>
        </div>
        <!-- <i class="fa fa-align-justify"></i> -->
      </el-col>
      <el-col :span="13">
        <div class="hearNavBar">
          <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#14889A" text-color="#fff"
                   active-text-color="#ffd04b" mode="horizontal" @select="handleSelectHearNavBar">
            <el-menu-item index="1" @click="$router.push('main')"><i class="el-icon-s-home"></i>  </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="5" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.userAvatar" /> {{userName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside class="aside">
        <!--导航菜单-->
        <el-menu default-active="1-2" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="1-1" @click="$router.push('user')">
              <i class="el-icon-s-custom"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="1-3" @click="$router.push('role')">
              <i class="el-icon-c-scale-to-original"></i>
              <span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="1-4" @click="$router.push('menu')">
              <i class="el-icon-menu"></i>
              <span slot="title">菜单管理</span>
            </el-menu-item>
            <el-menu-item index="1-5" @click="$router.push('log')">
              <i class="el-icon-s-fold"></i>
              <span slot="title">日志管理</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span slot="title">系统监控</span>
            </template>
            <el-menu-item index="2-1" >
              <i class="el-icon-pie-chart"></i>
              <span slot="title">服务监控</span>
            </el-menu-item>
            <el-menu-item index="2-2" >
              <i class="el-icon-mobile"></i>
              <span slot="title">任务监控</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <!-- 主内容区域 -->
      <main-content></main-content>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import mock from '@/mock/mock.js';
  import MainContent from "./MainContent/MainContent1"
export default {
  name: 'Home',
  components:{
    MainContent
  },
  data() {
    return {
      isCollapse: false,
      sysName: "kitty",
      appName: "frozen-ui",
      userName: "Louis",
      userAvatar: "",
      logo: "",
      activeIndex: '1'
    };
  },
  methods: {
    getUser() {
      axios.get('http://localhost:8080/user')
        .then(function (res) {
          alert(JSON.stringify(res.data))
        }).catch(function (res) {
          alert(res)
        })
    },
    getMenu() {
      axios.get('http://localhost:8080/menu')
        .then(function (res) {
          alert(JSON.stringify(res.data))
        }).catch(function (res) {
        alert(res)
      })
    },
    handleopen() {
      console.log('handleopen')
    },
    handleclose() {
      console.log('handleclose')
    },
    handleselect(a, b) {
      console.log('handleselect')
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      }).then(() => {
        sessionStorage.removeItem("user");
        this.$router.push("/login");
      })
      .catch(() => {});
    }
  },
  mounted() {
    this.logo = require("@/assets/user1.png");
    var user = sessionStorage.getItem("user");
    if (user) {
      this.userName = user;
      this.userAvatar = require("@/assets/user1.png");
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: #14889A;
      color: #fff;
      .userinfo {
        text-align: right;
        padding-right: 30px;
        float: right;
        .userinfo-inner {
          font-size: 20px;
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        height: 60px;
        font-size: 22px;
        padding-left: 0px;
        padding-right: 0px;
        border-color: rgba(238, 241, 146, 0.5);
        border-right-width: 1px;
        border-right-style: solid;
        background: #14889A;
        text-align: left;
        img {
          width: 40px;
          height: 40px;
          border-radius: 0px;
          margin: 10px 10px 10px 10px;
          float: left;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 200px;
      }
      .logo-collapse-width {
        width: 65px;
      }
      .tools {
        padding-left: 10px;
        padding-right: 10px;
        text-align: center;
        width: 40px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
      .hearNavBar {
        background: #14889A;
        padding: 0px 0px;
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 29px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex: 0 0 200px;
        width: 200px;
        .el-menu {
          height: 100%;
          text-align: left;
        }
      }
    }
  }
</style>
