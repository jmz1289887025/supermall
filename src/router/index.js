import Vue from 'vue'
import Router from 'vue-router'
const Cart =()=> import('../views/cart/Cart.vue')
const Profile =()=> import('../views/profile/Profile.vue')
const Home =()=>import('../views/home/Home.vue') 
const Category =()=>import('../views/category/Category.vue') 
const Detail =()=>import('../views/detail/Detail.vue') 
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/Cart',
      component:Cart
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/detail/:iid',
      component:Detail
    },
  ]
})
