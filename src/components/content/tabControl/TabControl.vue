<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active:index===currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index){
      this.currentIndex=index
      this.$emit('tabclick',index)
    }
  },
};
</script>
 
<style scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: aliceblue;
  z-index: 10;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span{
  padding: 5px;
  border-bottom: 3px solid var(--color-high-text);
}
</style>