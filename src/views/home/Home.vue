<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

      <scroll
        class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="scrollContent"
        :pull-up-load="true"
        @pullingUp="loadMore">
        <home-swiper :banners="banners"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <home-feature-view></home-feature-view>
        <tab-control
          :titles="['流行','新款','精选']"
          class="tab-control" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
//导入公共组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
//导入子组件
import HomeSwiper from "@/views/home/childComponents/HomeSwiper";
import HomeRecommendView from "@/views/home/childComponents/HomeRecommendView";
import HomeFeatureView from "@/views/home/childComponents/HomeFeatureView";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata,getHomeData} from "@/network/home";

export default {
  name: "Home",
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    GoodsList,
    Scroll,
    BackTop

  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false
    }
  },
  created() {
    this.getHomeMultidata()
    //请求首页数据
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
    //监听GoodsListItem发送过来的图片加载完成的事件，然后每一张图片加载完成都去回调scroll的refresh方法，但是需要注意的是$bus是空，不存在，我们需要在main.js中通过向Vue的原型中添加一个$bus事件，初始化值为一个vue实例对象即可
    this.$bus.$on('itemImgLoad',()=>{
      this.$refs.scroll.refresh()
    })
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    /**
     * 普通事件的方法
     */
    tabClick(type){
      switch (type){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0)
    },
    scrollContent(position){
      // console.log(position);
      this.isShowBackTop=(-position.y)>1000?true:false
    },
    loadMore(){
      this.getHomeData(this.currentType)

    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata(){
      getHomeMultidata().then((res)=>{
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })
    },
    getHomeData(type){
      const page=this.goods[type].page+1
      getHomeData(type,page).then(res=>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
      })
    }
  }

}
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    position: relative;
    /*设置视口的高度*/
    height: 100vh;
  }
  .home-nav{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    /*position: relative;*/
    background-color: var(--color-tint);
    color: #fff;

  }

  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
