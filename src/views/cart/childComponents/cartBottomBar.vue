<template>
  <div class="bottom-bar">
    <div class="bottom-left">
      <check-button :is-checked="isAllChecked" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="bottom-center">
      合计:￥{{totalPrice}}
    </div>
    <div class="bottom-right">
      结算（{{calculate}}）
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex"
export default {
  name: "cartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item=>{
       return item.checked
      //  这里reduce接收两个参数，第一个参数是回调函数，传入prevalue，代表前面元素之和，item代表当前元素，第二个参数传入从哪个下标开始遍历
      }).reduce((preValue,item)=>{
        return preValue+item.price*item.count
      },0).toFixed(2)   //tofixed表示结果保留两位小数
    },
    calculate(){
      return this.cartList.filter(item=>{
        return item.checked
      }).length
    },
    isAllChecked(){
      //1.如果当前购物车为空，那么一定是返回false
      if (this.cartList.length===0) return false
      //2.如果购物车不为空，看一下购物车中是否有未被选中的item，如果有，则返回false，这里比较复杂
      //注意点：如果使用一行箭头函数，箭头函数默认将后面的值return出去，
      // return !this.cartList.find(item=> !item.check),和下面的写法一致
      return !this.cartList.find(item=>{
       return  !item.checked
      })
    }
  },
  methods:{
    checkClick(){
      if (this.isAllChecked){  //如果现在是全部选中状态
        //遍历cartList中的所有item，将checked设置为false
        this.cartList.forEach(item=> item.checked=false)
      }else {
        //如果现在是全部选中或者有未被选中的item，那么将所有item的checked设置为true
        this.cartList.forEach(item=>item.checked=true)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: -3px 0 10px #aaa;
  font-size: 14px;
}
.bottom-left{
  display: flex;
  width: 80px;
  margin-left: 10px;
}
.bottom-left span{
  margin-left: 5px;
}
.bottom-center{
  flex: 1;
  text-align: right;
  margin-right: 10px;

}
.bottom-right{
  width: 80px;
  height: 30px;
  margin-right: 5px;
  text-align: center;
  line-height: 30px;
  background-color: #ffa500;
  border-radius: 30px;
}


</style>
