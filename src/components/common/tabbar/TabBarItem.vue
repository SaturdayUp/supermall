<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#FF852A'
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path)!=-1
    },
    activeStyle(){
      return this.isActive? {color:this.activeColor}:{}
    }
  },
  methods:{
    itemClick(){
      //为了使双击不报错，所以在路由切换时抛出一个err
      this.$router.replace(this.path).catch(err=>err)
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
/*.active{*/
/*  color: red;*/
/*}*/
</style>
