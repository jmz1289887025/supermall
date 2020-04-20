<template>
  <div class="check-button" :class="{check:ischecked}" @click="checkBtnClick">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>
 
<script>
export default {
  name: "CheckButton",
  props:{
    ischecked:{
      type:Boolean,
      default:true
    }
  },
  methods:{
    checkBtnClick(){
      this.$emit('checkBtnClick')
    }
  }
};
</script>
 
<style scoped>
.check-button{
  border-radius: 50%;
  border: 1px solid #aaa;
}
.check{
  border-color: red;
  background-color: red;
}
</style>