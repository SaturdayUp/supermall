<template>
  <div id="detail">
    <detail-navbar class="detail-nav" @clickTitle="clickTitle" ref="detailNav"></detail-navbar>

    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info  :shop="shop"></detail-shop-info>
      <detail-goods-info  :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recomments" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar class="detail-bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-if="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavbar from "@/views/detail/childComponoent/DetailNavbar";
import DetailSwiper from "@/views/detail/childComponoent/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComponoent/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComponoent/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComponoent/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComponoent/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComponoent/DetailCommentInfo";
import {getDetails,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComponoent/DetailBottomBar";
// import BackTop from "@/components/content/backTop/BackTop";
import {itemListenerMixin,backTopMixin} from "@/common/mixin";
import {debounce} from "@/common/Utils";

export default {
  name: "Detail",
  components:{
    Scroll,
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    // BackTop,
    GoodsList
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recomments:[],
      itemImgListener:null,
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      // isShowBackTop:false
    }
  },
  created() {
    //1.保存传入的iid
    this.iid=this.$route.params.iid
  //  2.获取到请求来的数据
    getDetails(this.iid).then(res=>{
      const data=res.result
      // console.log(data);
      this.topImages=data.itemInfo.topImages
      // console.log(this.topImages);
      //  3.获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // console.log(this.goods);
      //  4.获取商家的详细信息
      this.shop=new Shop(data.shopInfo)
      // console.log(this.shop);
    //  5.获取商品的详细信息
      this.detailInfo=data.detailInfo
    //  6.获取参数相关信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      console.log(this.paramInfo);
    //  7.获取评论相关信息
      if (data.rate.list){
        this.commentInfo=data.rate.list[0]
        // console.log(this.commentInfo);
      }
        //  请求到数据之后，页面会先去遍历请求到的数据，我们需要等一下才能获取到完整的页面，这样才可以获取到正确的offset
        //  这里利用$nextTick,该方法就是在整个页面完全渲染完会来调用该函数
        // this.$nextTick(()=>{
        //   //此处对应的dom已经渲染完了,但是图片依然没有加载完,所以这种方法获取offsetTop不可取
        //   this.themeTopYs=[]
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        //   console.log(this.themeTopYs);
        // })
    })
  //  3.获取请求到的recomments相关数据
    getRecommend().then(res=>{
      // console.log(res);
      this.recomments=res.data.list
      // console.log(this.recomments);
    })
    this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
    },100)
  },
  //mounted中的代码已混入
  mounted() {

  },
  updated() {
    // this.themeTopYs=[]
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
    // console.log(this.themeTopYs);
  },
  destroyed() {
  //  当该组件被销毁的时候，也需要将Event事件销毁掉，因为detail没有开启keep-alive，所以并没有deactive方法，只能在destory方法中销毁
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods:{
    imgLoad(){
      //如果这样执行的话，没有用到防抖
      // this.$refs.scroll.refresh()
      //利用混入将防抖函数引入，这里直接调用refresh，只会执行一次
      this.refresh()
    //  图片加载完毕之后我们获取offsetTop一定是对的,但是这样会反复调用,我们可以加一个防抖函数
    //     this.themeTopYs=[]
    //     this.themeTopYs.push(0)
    //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
    //     console.log(this.themeTopYs);
      this.getThemeTopY()
    },
    clickTitle(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){
      //通过判断当前position的y值来决定isShowBackTop是否显示
      this.isShowBackTop=-position.y>1000?true:false
      const positionY=-position.y
      //获取到themeTopYs[0,7398,9120,9452]
      let length=this.themeTopYs.length
      // for (let index=0;index < length;index++){
        //普通方法
        //1.为了不重复打印index，这里先进行一次判断，判断当前的currentIndex是否等于index，如果不等于再进入if
        //2.这里需要分两种情况考虑，因为使用了index+1，最后可能会造成数组下标越界
        //    2.1 当0 <= positionY < 7398 时，此时的index=0
        //    2.2 当7398 <= positionY < 9120 时，此时的index=1
        //    2.3 当9120 <= positionY < 9452 时，此时的index=2
        //    2.4 当9452 <= positionY ，此时的index=3
        // if (this.currentIndex!==index && ((index<length-1 && positionY>=this.themeTopYs[index]&&positionY<this.themeTopYs[index+1])||(index===length-1) && positionY>=this.themeTopYs[index])){
          //3.此时让currentIndex=index
          // this.currentIndex=index
          // console.log(index);
          //然后将currentIndex传给detail-navbar中的currentIndex
        //   this.$refs.detailNav.currentIndex=this.currentIndex
        // }
      //  hack方法
      for (let index=0;index<length-1;index++){
        //主要思想就是向数组中末尾添加一个最大值，这样两种情况就能够合并，遍历的时候index=3时，index+1也不会造成数组下标越界
        if ((this.currentIndex!==index)&&((positionY>=this.themeTopYs[index])&&(positionY<this.themeTopYs[index+1]))){
          this.currentIndex=index
          console.log(index);
          this.$refs.detailNav.currentIndex=this.currentIndex
        }
      }
    },
    //添加到购物车
    addToCart(){
    //  获取到购物车需要显示的商品的数据,这里需要利用vuex对一些数据状态进行管理，不要直接将所有的数据直接发送到购物车组件中
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid

    //  将商品添加到vuex对象中
    //  注意,如果是直接commit到mutations中使用commitjike
    //   this.$store.commit('addToCart',product)
    //  如果是传入到action中,需要用到dispatch
      this.$store.dispatch('addToCart',product)
    }
    // backTop() {
    //   this.$refs.scroll.scrollTo(0,0,100)
    // }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  background-color: #fff;
  height: 100vh;
  z-index: 9;
}
.detail-nav{
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.content{
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
</style>
