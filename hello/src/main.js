//入口文件，主要作用是初始化vue实例，并引入所需要的插件，把主组件App.vue和入口页面index.html联系起来
import Vue from 'vue'		 	//导入vue
import App from './App.vue'		//导入App.vue
import router from './router'	//导入路由
import store from './store'		//导入store

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')			//将上边的全局变量赋给vue实例化，并挂载到 #app上
