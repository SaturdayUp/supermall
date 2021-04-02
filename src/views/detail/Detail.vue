<template>
  <div id="detail">
    <detail-navbar class="detail-nav"></detail-navbar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
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
import {getDetails,Goods,Shop,GoodsParam} from "@/network/detail";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Detail",
  components:{
    Scroll,
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo

  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{}
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
      // console.log(this.paramInfo);
    })
  },
  methods:{
    imgLoad(){
      this.$refs.scroll.refresh()
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
