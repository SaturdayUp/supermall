import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import toast from '@/components/common/toast'

//解决移动端300ms点击延迟
//1. 使用npm install下载安装fastclick
//2. 导入fastclick
import FastClick from 'fastclick'
//3. 调用attach函数
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
// 安装toast插件
Vue.use(toast)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
