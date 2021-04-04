<template>
  <div class="detail-bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
name: "DetailBottomBar",
  methods:{
    addToCart(){
      this.$emit('addToCart')
    }
  }
}
</script>
<style scoped>
.detail-bottom-bar{
  height: 49px;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
  box-shadow: 0px -1px 10px #999999;

}
.bar-item{
  flex: 1;
}
.bar-left{
  font-size: 12px;
  display: flex;
}
.bar-left div{
  flex: 1;
}
.bar-right{
  display: flex;
}
.bar-right div{
  flex: 1;
}
.bar-left .icon{
  display: block;
  width: 22px;
  height: 22px;
  margin: 8px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
/*利用雪碧图*/
.bar-left .service{
  background-position: 0 -54px;
}
.bar-left .shop{
  background-position: 0 -98px;
}
.bar-right{
  font-size: 14px;
  color: #fff;
  line-height: 49px;
  margin: 5px 2px;
}
.bar-right .cart{
  height: 39px;
  border-radius: 10px;
  background-color: #FFC500;
  line-height: 39px;
}
.bar-right .buy{
  height: 39px;
  line-height: 39px;
  border-radius: 10px;
  background-color: #FF9402;
}
</style>
