import Vue from 'vue'
import Vuex from 'vuex'
import actions from "@/store/actions";
import mutations from "@/store/mutations";


//1.安装插件
Vue.use(Vuex)
const state={
  cartList: []
}
//2.创建vuex对象
const store=new Vuex.Store({
  state,
  //mutations的唯一目的就是修改state中的状态
  //mutations的设计原则就是其中的每个方法尽量完成的事件比较单一,所以涉及到判断和异步操作我们一般放到action中
  mutations,
  actions,
})
//3.将store导出
export default store

