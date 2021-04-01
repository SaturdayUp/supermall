<template>
  <swiper>
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </SwiperItem>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper/index"
export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  methods:{
    //监听图片加载完成
    imageLoad(){
    //  给父组件发送一个事件，通知父组件图片已经加载完成
      this.$emit('swiperImageLoad')
    }
  }
}
</script>

<style scoped>

</style>
