import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
export default{
  addCart(context, payload) {
    // let oldProduct = null
    // for (const item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    return new Promise((resolve,reject)=>{
      let oldProduct=context.state.cartList.find(function(item){
        return item.iid===payload.iid
      })
      if (oldProduct) {
       // oldProduct.count += 1
       context.commit(ADD_COUNTER,oldProduct)
       resolve('添加成功')
      } else {
        payload.count = 1
        //context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加成功')
      } 
    })
  }
}