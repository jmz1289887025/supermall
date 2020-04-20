<template>
  <Swiper>
    <SwiperItem v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imgload">
      </a>
    </SwiperItem>
  </Swiper>
</template>
 
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return{
      isload:false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods:{
    imgload(){
      if (!this.isload) {
        this.$emit('swiperimgload')
        this.isload=true
      }
    }
  }
};
</script>
 
<style scoped>
</style>