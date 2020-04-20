<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <!-- 商品列表 -->
    <CartList></CartList>
    <!-- 底部汇总 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import { mapGetters } from "vuex";
import CartBottomBar from './childComps/CartBottomBar'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // }
    //...mapGetters(['cartLength','cartList'])
    ...mapGetters(["cartLength"])
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: aliceblue;
}
</style>
