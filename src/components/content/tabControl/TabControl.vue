<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:currentIndex===index}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
  }
  .tab-control-item{
    /*设置每一个item均分*/
    flex: 1;
  }
  /*设置活跃状态div的样式*/
  .active{
    color: var(--color-high-text);
  }
  /*设置当某一个span处于活跃状态时，给该span设置下边界*/
  .active span{
    border-bottom: 2px solid var(--color-high-text);
  }
  /*为每一个span设置padding*/
  .tab-control-item span{
    padding:5px;
  }
</style>
