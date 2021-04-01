<template>
  <div id="detail">
    <detail-navbar class="detail-nav"></detail-navbar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
        <li>列表21</li>
        <li>列表22</li>
        <li>列表23</li>
        <li>列表24</li>
        <li>列表25</li>
        <li>列表26</li>
        <li>列表27</li>
        <li>列表28</li>
        <li>列表29</li>
        <li>列表30</li>
        <li>列表31</li>
        <li>列表32</li>
        <li>列表33</li>
        <li>列表34</li>
        <li>列表35</li>
        <li>列表36</li>
        <li>列表37</li>
        <li>列表38</li>
        <li>列表39</li>
        <li>列表40</li>
        <li>列表41</li>
        <li>列表42</li>
        <li>列表43</li>
        <li>列表44</li>
        <li>列表45</li>
        <li>列表46</li>
        <li>列表47</li>
        <li>列表48</li>
        <li>列表49</li>
        <li>列表50</li>
        <li>列表51</li>
        <li>列表52</li>
        <li>列表53</li>
        <li>列表54</li>
        <li>列表55</li>
        <li>列表56</li>
        <li>列表57</li>
        <li>列表58</li>
        <li>列表59</li>
        <li>列表60</li>
        <li>列表61</li>
        <li>列表62</li>
        <li>列表63</li>
        <li>列表64</li>
        <li>列表65</li>
        <li>列表66</li>
        <li>列表67</li>
        <li>列表68</li>
        <li>列表69</li>
        <li>列表70</li>
        <li>列表71</li>
        <li>列表72</li>
        <li>列表73</li>
        <li>列表74</li>
        <li>列表75</li>
        <li>列表76</li>
        <li>列表77</li>
        <li>列表78</li>
        <li>列表79</li>
        <li>列表80</li>
        <li>列表81</li>
        <li>列表82</li>
        <li>列表83</li>
        <li>列表84</li>
        <li>列表85</li>
        <li>列表86</li>
        <li>列表87</li>
        <li>列表88</li>
        <li>列表89</li>
        <li>列表90</li>
        <li>列表91</li>
        <li>列表92</li>
        <li>列表93</li>
        <li>列表94</li>
        <li>列表95</li>
        <li>列表96</li>
        <li>列表97</li>
        <li>列表98</li>
        <li>列表99</li>
        <li>列表100</li>
      </ul>
    </scroll>

  </div>
</template>

<script>
import DetailNavbar from "@/views/detail/childComponoent/DetailNavbar";
import DetailSwiper from "@/views/detail/childComponoent/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComponoent/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComponoent/DetailShopInfo";
import {getDetails,Goods,Shop} from "@/network/detail";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Detail",
  components:{
    Scroll,
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,

  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{}
    }
  },
  created() {
    //1.保存传入的iid
    this.iid=this.$route.params.iid
  //  2.获取到请求来的数据
    getDetails(this.iid).then(res=>{
      const data=res.result
      this.topImages=data.itemInfo.topImages
      // console.log(this.topImages);
      //  3.获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // console.log(this.goods);
      //  4.获取商品的详细信息
      this.shop=new Shop(data.shopInfo)
      console.log(this.shop);
    })
  },

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
