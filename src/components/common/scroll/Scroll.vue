<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null,
    }
  },
  mounted() {
    //1.创建better-scroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad,
      click:true
    })
  //  2.监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
  //  3.上拉加载更多
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },

  methods:{
    scrollTo(x,y,time=400){
      this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
