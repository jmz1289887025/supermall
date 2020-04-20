import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//安装插件
Vue.use(Vuex)
//创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
 // mutations: {
    mutations,
    getters,
    //mutations唯一的目的就是修改state中的状态
    //mutations中的每一个方法尽可能完成的事件比较单一一点
    // addCart(state, payload) {
    //   // let oldProduct = null
    //   // for (const item of state.cartList) {
    //   //   if (item.iid === payload.iid) {
    //   //     oldProduct = item
    //   //   }
    //   // }
    //   let oldProduct=state.cartList.find(function(item){
    //     return item.iid===payload.iid
    //   })
    //   if (oldProduct) {
    //     oldProduct.count += 1
    //   } else {
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    // }

    // addCounter(state,payload){
    //   payload.count++
    // },
    // addToCart(state,payload){
    //   state.cartList.push(payload)
    // }
 // },
  // actions:{
  //   addCart(context, payload) {
  //     // let oldProduct = null
  //     // for (const item of state.cartList) {
  //     //   if (item.iid === payload.iid) {
  //     //     oldProduct = item
  //     //   }
  //     // }
  //     let oldProduct=context.state.cartList.find(function(item){
  //       return item.iid===payload.iid
  //     })
  //     if (oldProduct) {
  //      // oldProduct.count += 1
  //      context.commit('addCounter',oldProduct)
  //     } else {
  //       payload.count = 1
  //       //context.state.cartList.push(payload)
  //       context.commit('addToCart',payload)
  //     }
  //   }
  // }
  actions,
})
//挂载Vue实列上
export default store