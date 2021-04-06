<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button @click.native="checkClick" :is-checked="product.checked"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述:{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{product.price}}</div>
        <div class="item-count">×{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "cartListItem",
  components:{
    CheckButton
  },
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    checkClick(){
      this.product.checked=!this.product.checked
    }
  }
}
</script>

<style scoped>
#shop-item{
  width: 100%;
  padding: 5px;
  border-bottom: 5px solid #ccc;
  display: flex;

}
.item-selector{
  width: 14%;
  display: flex;
  /*align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。*/
  align-items: center;
  /*justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。*/
  justify-content: center;
}
.item-img img{
  width: 80px;
  height: 100px;
  border-radius: 5px;
}
.item-img{
  padding: 5px;
}
.item-info{
  padding: 5px 10px;
  overflow: hidden;
}
.item-title,.item-desc{
  overflow: hidden;
  /*规定文本不换行，一行显示*/
  white-space: nowrap;
  /*超出显示的文本用...代替*/
  text-overflow: ellipsis;
}
.item-title{
  font-size: 15px;
}
.item-desc{
  font-size: 10px;
}
.item-desc{
  margin-top: 10px;
}
.info-bottom{
  margin-top: 20px;
}
.item-price{
  float: left;
  color: orangered;
}
.item-count{
  float: right;
}

</style>
