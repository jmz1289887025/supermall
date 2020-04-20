export const itemListenerMixin={
  mounted() {
    const refresh = debounce(this.$refs.scroll.scroll.refresh, 200);
    this.itemImgListener=()=>{
        refresh()
    }
    this.$bus.$on('itemimgload',this.itemImgListener)
  },
}
export const backTopMixin={
  components:{
    BackTop
  },
  data() {
    return {
      isshow:false
    }
  },
  methods: {
    backclick() {
      //this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
}
// mixins:[backTopMixin,itemListenerMixin]
