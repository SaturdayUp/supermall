<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import cartListItem from "@/views/cart/childComponents/cartListItem";

export default {
  name: "cartList",
  components: {
    Scroll,
    cartListItem
},
  computed:{
    //1.获取到cart中商品的数据有两种方式，一种是通过父子组件之间的通信来获取数据，
    //因为我们在cart组件中使用了vuex来管理商品的状态，所以我们使用vuex来获取数据，该方法比较简单
    ...mapGetters([
      'cartList'
    ])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  /*注意使用calc属性时，在运算符前后都需要一个kongge*/
  height: calc(100% - 44px - 49px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>
