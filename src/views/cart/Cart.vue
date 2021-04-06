<template>
  <div class="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import cartList from "@/views/cart/childComponents/cartList";
import cartBottomBar from "@/views/cart/childComponents/cartBottomBar";
//需要导入mapGetters，注意是从vuex中导入
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components:{
    NavBar,
    cartList,
    cartBottomBar
  },
  computed:{
    //1.普通方法：利用计算属性计算当前购物车中有多少件不同的商品
    // cartCount(){
    //   return this.$store.state.cartList.length
    // }
    //2.利用mapGetters
    //2.1在mapGetters中传入数组作为参数
    ...mapGetters([
      "cartCount",
      "cartList"
    ]),
    //2.2在mapGetters中传入对象作为参数,与传入数组不同的是传入对象可以修改方法的名字
    // ...mapGetters({
    //   count:'cartCount',
    //   list:'cartList'
    // })

  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}


</style>
