import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/error/404'
import User from '@/views/SysMng/User'
import Role from '@/views/SysMng/Role'
import Menu from '@/views/SysMng/Menu'
import Log from '@/views/SysMng/Log'
import Main from '@/views/SysMng/Main'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/jdfrozen/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: '/user', component: User, name: 'User' },
        { path: '/role', component: Role, name: 'Role' },
        { path: '/menu', component: Menu, name: 'Menu' },
        { path: '/log', component: Log, name: 'Log' },
        { path: '/main', component: Main, name: 'Main' }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let userName = sessionStorage.getItem('user')
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(userName) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!userName) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      next()
    }
  }
})

export default router
