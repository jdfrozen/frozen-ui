import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 全局 state 对象，用于保存所有组件的公共数据
const state = {
  // 定义一个 user 对象
  // 在组件中是通过 this.$store.state.mainTabs 来获取
  mainTabs: [
    { title: '系统介绍', icon: 'el-icon-date', name: 'Main' }
  ],
  mainTabsActiveName: 'Main'
};
// 定义改变 state 初始值的方法，这里是唯一可以改变 state 的地方，缺点是只能同步执行
const mutations  = {
  // 在组件中是通过 this.$store.commit('updateMainTabs', mainTabs); 方法来调用 updateMainTabs
  updateMainTabs(state, mainTabs) {
    state.mainTabs = mainTabs;
  },
  // 在组件中是通过 this.$store.commit('mainTabsActiveName', mainTabsActiveName); 方法来调用 updateMainTabs
  mainTabsActiveName(state, mainTabsActiveName) {
    state.mainTabs = mainTabsActiveName;
  }
};
const store =  new Vuex.Store({
  state,
  mutations
});

export default store
