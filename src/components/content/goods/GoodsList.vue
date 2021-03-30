<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>

</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  components:{
  GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  /*设置一行能有几个goods-item，因为在goodslistitem中设置了每个item宽度占据父布局的48%，
  所以这个属性就可以自动根据每个item的宽度显示每行有几个item*/
  flex-wrap: wrap;
  /*该属性设置空白区域自动包裹在item周围*/
  justify-content: space-around;
  /*设置goods的内边距*/
  padding: 2px;
}
</style>
