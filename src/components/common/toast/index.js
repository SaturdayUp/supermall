import Toast from "@/components/common/toast/Toast";

const obj={}

obj.install=function (Vue){
  // 1.创建组件构造器
  const toastConstructor=Vue.extend(Toast)
  // 2.以new的方式，根据组件构造器创建一个组件对象
  const toast=new toastConstructor()
  // 3.将组件对象以手动的方式挂载到一个元素上
  toast.$mount(document.createElement('div'))
  // 4.此时toast.$el就是对应的div
  document.body.appendChild(toast.$el)
  //4.将Toast组件添加到Vue的原型中，令所有的组件都可以使用Toast
  Vue.prototype.$toast=toast
}
export default obj
