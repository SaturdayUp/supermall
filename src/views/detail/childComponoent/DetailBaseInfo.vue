<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info{
  margin-top: 10px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title{
  color: #222;
  font-size: 15px;
}
.info-price{
  margin-top: 10px;
}
.n-price{
  color: #ff5777;
  font-size: 20px;
}
.o-price{
  color: #999999;
  font-size: 10px;
  margin-left: 5px;
  text-decoration: line-through;
}
.discount{
  color: #ffffff;
  font-size: 12px;
  background-color: #ff5777;
  padding: 2px 5px;
  margin-left: 5px;
  border-radius: 10px;
}
.info-other{
  display: flex;
  margin-top: 15px;
  line-height: 30px;
  font-size: 12px;
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.info-other span{
  flex: 1;
  text-align: center;
}
.info-service{
  line-height: 60px;
  display: flex;
  justify-content: space-around;
}
.info-service-item img{
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
.info-service-item span{
  font-size: 14px;
  color: #333;
}

</style>
