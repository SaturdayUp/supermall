<template>
  <div id="detail">
    <detail-navbar class="detail-nav" @clickTitle="clickTitle"></detail-navbar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info  :shop="shop"></detail-shop-info>
      <detail-goods-info  :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recomments" ref="recommends"></goods-list>
    </scroll>

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
import {itemListenerMixin} from "@/common/mixin";
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

    GoodsList
  },
  mixins:[itemListenerMixin],
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
      getThemeTopY:null
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
        console.log(this.themeTopYs);
    },100)

  },
  //mounted中的代码以混入
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
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],1000)
    }
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
  bottom: 0;
}
</style>
