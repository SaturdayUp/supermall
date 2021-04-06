import {ADD_CART,ADD_COUNT} from "@/store/mutations-types";

export default {
  addCart(context,payload){
    //当添加购物车成功之后，返回一个promise，通知detail已经添加成功
    return new Promise((resolve,reject)=>{
      //检查当前的cartList中有没有我们当前的商品
      //方法一：通过遍历cartList，查看有没有当前我们点击的该商品
      // let oldProduct=null
      // for (let item of context.state.cartList){
      //   if (item.iid===payload.iid){
      //     oldProduct=item
      //   }
      // }
      //方法二：利用数组中的find方法,查找cartList中有没有我们当前点击的商品，如果有则会返回该商品，如果没有返回null
      let oldProduct=context.state.cartList.find((item)=>{
        return item.iid===payload.iid
      })
      //判断一下oldProduct
      if (oldProduct){
        // oldProduct.count+=1
        //修改状态交给mutations,因为再mutations中修改的状态可以跟踪
        context.commit(ADD_COUNT,oldProduct)
        resolve('当前数量加1')
      }else {
        payload.count=1
        //修改状态交给mutations,因为再mutations中修改的状态可以跟踪
        context.commit(ADD_CART,payload)
        // state.cartList.push(payload)
          resolve('添加成功，在购物车等亲 ~')
      }
    })

  }
}
