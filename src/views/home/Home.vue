<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>
    <tab-control
      v-show="isTabFixed"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"></tab-control>
      <scroll
        class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="scrollContent"
        :pull-up-load="true"
        @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <home-feature-view></home-feature-view>
        <tab-control
          :titles="['流行','新款','精选']"
          @tabClick="tabClick" ref="tabControl2"></tab-control>
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
import {itemListenerMixin,backTopMixin} from "@/common/mixin";

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
  mixins:[itemListenerMixin,backTopMixin],
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
      // isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null
    }
  },
  created() {
    this.getHomeMultidata()
    //请求首页数据
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')

  },
  //mounted中的代码以混入
  mounted() {
    //监听GoodsListItem发送过来的图片加载完成的事件，然后每一张图片加载完成都去回调scroll的refresh方法，
    // 但是需要注意的是$bus是空，不存在，我们需要在main.js中通过向Vue的原型中添加一个$bus事件，
    // 初始化值为一个vue实例对象即可
    //反复请求refresh会造成浪费，可以通过防抖函数来减少请求得次数
    // const refresh=debounce(this.$refs.scroll.refresh,300)
    // this.itemImgListener=()=>{
      //起初是在creat中调用该回调函数，但是在create中页面还没有挂载，可能拿不到$refs，所以此处在mounted中执行
    //   refresh()
    // }
    // this.$bus.$on('itemImgLoad',this.itemImgListener)
  },
  activated() {
  //  当home再次处于活跃状态时，将其offset设置为之前的offset
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    //每次返回到之前的位置时，最好做一次刷新，否则可能会出现不能点击的情况
    this.$refs.scroll.refresh()
  //
  },
  deactivated() {
  //  1.当切换到其他模块时，再次点击home为了保存之前的home状态使用deactived
    this.saveY=this.$refs.scroll.getScrollY()
  //  2.当该组件处于不活跃状态时，需要将之前的事件取消掉，不再进行refresh
    this.$bus.$off('itemImgLoad',this.itemImgListener)

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

    tabClick(index){
      switch (index){
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
      //为了使tabcontrol1和tabcontrol2的点击的index保持一致，所以在点击tabcontrol时将两个的currentindex都设置为index
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    //点击回到顶部，让其滑动回到顶部
    // backTop(){
    //   this.$refs.scroll.scrollTo(0,0)
    // },
    scrollContent(position){

      // console.log(position);
      //1.通过滑动的距离控制backTop显示或者隐藏
      this.isShowBackTop=(-position.y)>1000?true:false
      //2.通过tabControl和当前滑动的距离进行比较，控制tabControl是否吸顶
      this.isTabFixed=(-position.y)>this.tabOffsetTop

    },
    loadMore(){
      this.getHomeData(this.currentType)
    },
    swiperImageLoad(){
      //当swiper的图片加载完毕之后，父组件接收子组件传过来的事件，然后获取到此时tabControl的offsetTop
      //拿到tabControl组件之后他是没有offsetTop属性的，通过$el获取到里面的标签，标签才有offsetTop
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop

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

      // 完成加载更多,默认情况下只会有一次上拉加载更多，我们需要每次上拉加载更多数据完成后，将该次的上拉加载更过finish掉
        this.$refs.scroll.finishPullUp()
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
    /*起初是通过fixed定位控制home-nav不滚动，
    但是这时原生的，如果使用better-scroll，home-nav下面所有的组件都被包含在了scroll中，
    所以此处不需要再去设置fixed布局去控制了，他也不会跟随滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
    /*position: relative;*/
    background-color: var(--color-tint);
    color: #fff;

  }
  /*这是使用原生的滑动为了使tabcontrol能够吸顶所设置的样式，如果使用better-scroll的话，那么原声的样式将会失效*/
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
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
