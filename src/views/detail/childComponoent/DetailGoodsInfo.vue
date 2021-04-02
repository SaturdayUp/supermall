<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
name: "DetailGoodsInfo",
  props:{
  detailInfo:{
    type:Object,
    default(){
      return {}
    }
  }
  },
  data(){
    return{
      count:0,
      imagesLength:0
    }
  },
  methods:{
    imgLoad(){
    //  所有的图片都加载完毕之后进行一次刷新,向detail发送刷新事件
      if (++this.count===this.imagesLength){
        this.$emit('imgLoad')
      }
    }
  },
  //这个watch就是为了监听detailInfo的，在定义detailInfo时设置了默认值是{}，watch会实时监听detailInfo的变化，然后获得图片的长度
  watch:{
    detailInfo(){
      this.imagesLength=this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.goods-info{
  padding: 20px 0px;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc{
  padding: 15px 15px;
}
.info-desc .start,.info-desc .end{
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start{
  float: left;
}
.info-desc .end{
  float: right;
}
/*利用伪元素选择器设置小黑方块*/
.info-desc .start::before,.info-desc .end::after{
  content: '';
  width: 5px;
  height: 5px;
  position: absolute;
  bottom: 0;
  background-color: #333;
}
.info-desc .desc{
  font-size: 14px;
  padding: 15px 0px;
}
.info-key{
  margin: 0px 15px 10px 15px;
  font-size: 16px;
  color: #333;
}
.info-list img{
  width: 100%;
}
</style>
