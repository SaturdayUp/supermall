import {debounce} from "@/common/Utils";
import BackTop from "@/components/content/backTop/BackTop";
export const itemListenerMixin={
  data(){
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted(){
     this.refresh=debounce(this.$refs.scroll.refresh,300)
    this.itemImgListener=()=>{
      this.refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}


export const backTopMixin={
  data(){
    return {
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,100)
    }
  }
}
