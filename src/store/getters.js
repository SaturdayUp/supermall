export default {
  //需要传入state作为参数
  cartCount(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  }
}
