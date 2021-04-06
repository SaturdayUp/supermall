import {ADD_COUNT,ADD_CART} from "@/store/mutations-types";

export default {
  [ADD_COUNT](state,payload){
    payload.count++
  },
  [ADD_CART](state,payload){
    payload.checked=true
    state.cartList.push(payload)
  }
}
