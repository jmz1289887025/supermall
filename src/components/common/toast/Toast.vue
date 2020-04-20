<template>
  <div class="toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>
 
<script>
export default {
  name: "Toast",
  props: {
  },
  data() {
    return {
      message: "",
      isshow: false
    };
  },
  methods: {
    show(message, duration) {
      this.isshow = true;
      this.message = message;
      setTimeout(() => {
        this.isshow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>
 
<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 22;
  transform: translate(-50%, -50%);
  color: white;
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>