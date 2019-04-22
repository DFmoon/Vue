//路由配置文件
import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',        //主页面，即localhost:8080
      name: 'login',
      component: Login
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      children:[
        {
          path:'list',
          name:'list',
          component: () => import(/* webpackChunkName: "list" */ './views/List.vue')
        },
        {
          path:'user',
          name:'user',
          component: () => import(/* webpackChunkName: "user" */ './views/User.vue')
        }
      ]
    },
    {
      path:'/add',
      name:'add',
      component: () => import(/* webpackChunkName: "add" */ './views/Add.vue')
    }
  ]
})
