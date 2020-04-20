<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <CartListItem :itemInfo="item" v-for="(item, index) in list" :key="index"></CartListItem>
    </Scroll>
  </div>
</template>
 
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters({
      list: "cartList"
    })
  },
  active(){
    this.$refs.scroll.Scroll.refresh()
  }
};
</script>
 
<style scoped>
.cart-list{
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>