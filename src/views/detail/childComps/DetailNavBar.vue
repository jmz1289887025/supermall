<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" class="title-item" :class="{active:index===currentIndex}" @click="titleclick(index)">{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>
 
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  methods:{
    titleclick(index){
      this.currentIndex=index
      this.$emit('titleClick',index)
    },
    backclick(){
      this.$router.back()
    }
  }
};
</script>
 
<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color:red
}
.back{
  margin-top: 7px;
}
</style>