<template>
  <div class="Bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button" 
      :ischecked="isSelectAll"
      @click.native="checkClick"
      ></CheckButton>
      <div>全选</div>
      <div class="price">总计:{{totalPrice}}</div>
      <div class="calculate" @click="calcClick">去计算:({{checkLength}})</div>
    </div>
  </div>
</template>
 
<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "¥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      // return !(this.$store.state.cartList.filter(item=>!item.checked).length)
      // return !this.$store.state.cartList.find(item => !item.checked);
      for (const item of this.$store.state.cartList) {
        if (!item.checked) {
          return false
        } 
      }
      return true
    }
  },
  methods:{
    checkClick(){
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item =>item.checked=false);
      }else{
        this.$store.state.cartList.forEach(item => item.checked=true);
      }
    },
    calcClick(){
      if (!this.isSelectAll) {
         this.$toast.show('请选择购买的商品',2000) 
      }
    }
  },
};
</script>
 
<style scoped>
.Bottom-bar {
  width: 100%;
  height: 40px;
  background-color: rgb(250, 241, 241);
  position: fixed;
  line-height: 40px;
  display: flex;
  bottom: 49px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.price {
  margin-left: 30px;
}
.calculate {
  background-color: red;
  position: absolute;
  right: 0;
}
</style>