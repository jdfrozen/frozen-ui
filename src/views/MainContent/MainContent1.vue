<template>
  <!-- 标签页 -->
  <div id="main-container" class="main-container" :class="isCollapse?'position-collapse-left':'position-left'">
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      mainTabsActiveName: this.$store.state.mainTabsActiveName
    }
  },
  computed: {
    mainTabs: {
      get () { return this.$store.state.mainTabs },
      set (val) { this.$store.commit('updateMainTabs', val) }
    }
  },
  methods: {
    // tabs, 选中tab
    selectedTabHandle (tab) {
      tab = this.mainTabs.filter(item => item.name === tab.name)
      if (tab.length >= 1) {
        this.$router.push({ name: tab[0].name })
      }
    },
    // tabs, 删除tab
    removeTabHandle (tabName) {
      this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
      if (this.mainTabs.length >= 1) {
        // 当前选中tab被删除
        if (tabName === this.mainTabsActiveName) {
          this.$router.push({ name: this.mainTabs[this.mainTabs.length - 1].name }, () => {
            this.mainTabsActiveName = this.$route.name
          })
        }
      } else {
        this.$router.push("/Main")
      }
    },
    // tabs, 关闭当前
    tabsCloseCurrentHandle () {
      this.removeTabHandle(this.mainTabsActiveName)
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle () {
      this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
    },
    // tabs, 关闭全部
    tabsCloseAllHandle () {
      this.mainTabs = []
      this.$router.push("/Main")
    },
    // tabs, 刷新当前
    tabsRefreshCurrentHandle () {
      var tempTabName = this.mainTabsActiveName
      this.removeTabHandle(tempTabName)
      this.$nextTick(() => {
        this.$router.push({ name: tempTabName })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .main-container {
    padding: 0 5px 5px;
    position: absolute;
    top: 60px;
    left: 1px;
    right: 1px;
    bottom: 0px;
    // background: rgba(56, 5, 114, 0.5);
    .tabs {
      position: fixed;
      top: 60px;
      right: 50px;
      padding-left: 0px;
      padding-right: 2px;
      z-index: 1020;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      background: rgb(255, 253, 255);
      border-color: rgba(200, 206, 206, 0.5);
      // border-left-width: 1px;
      // border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-style: solid;
    }
    .tabs-tools {
      position: fixed;
      top: 60px;
      right: 0;
      z-index: 1020;
      height: 40px;
      // padding: 0 10px;
      font-size: 14px;
      line-height: 40px;
      cursor: pointer;
      border-color: rgba(200, 206, 206, 0.5);
      border-left-width: 1px;
      border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      background: rgba(255, 255, 255, 1);
    }
    .tabs-tools:hover {
      background: rgba(200, 206, 206, 1);
    }
    .main-content {
      position: absolute;
      top: 45px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      padding: 5px;
      // background: rgba(209, 212, 212, 0.5);
    }
  }
  .position-left {
    left: 200px;
  }
  .position-collapse-left {
    left: 65px;
  }
</style>
