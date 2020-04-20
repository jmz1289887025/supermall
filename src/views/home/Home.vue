<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl :titles="['流行','新款','精选']" class="tabControl" @tabclick="tabclick" ref="tabControl1" v-show="istabfixed"></TabControl>
    <!-- 加冒号传入具体参数类型,不加就是个字符串 -->
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadmore"
    >
      <HomeSwiper :banners="banners" @swiperimgload="swiperimgload"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精选']" @tabclick="tabclick" ref="tabControl2"></TabControl>
      <GoodsList :goods="goods[currentType].list"></GoodsList>
    </Scroll>
    <!-- 当我们要监听一个组件的原生事件时 -->
    <BackTop @click.native="backclick" v-show="isshow"></BackTop>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata, getHomeGoods } from "network/home";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import {debounce} from 'common/utils'
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    itemImgListener:null
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isshow: false,
      taboffsettop:0,
      istabfixed:false,
      saveY:0
    };
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // mixins:[itemListenerMixin]//混入
  mounted() {
    //监听item中图片加载完成
    //const refresh = debounce(this.$refs.scroll.scroll.refresh, 200);
    // this.itemImgListener=()=>{
    //    //this.$refs.scroll.scroll.refresh()
    //     refresh()
    // }
    // this.$bus.$on('itemimgload',this.itemImgListener)

    //获取tabControl的offsettop
    //所有的组件都有一个属性$el:用于获取组件中的元素
  },
  methods: {
    swiperimgload(){
      this.taboffsettop=this.$refs.tabControl2.$el.offsetTop
    },
    loadmore() {
      this.getHomeGoods(this.currentType);
      //刷新scrollheight
      this.$refs.scroll.scroll.refresh();
    },
    backclick() {
      //this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0, 0);
    },
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //   for (const n of res.data.list) {
        //       this.goods[type].list.push(n)
        //   }
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // this.$refs.scroll.scroll.finishPullUp()
        this.$refs.scroll.finishPullUp();
      });
    },
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      //使两个tabControl的index保持一致
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    contentScroll(position) {
      //1.判断backtop是否显示
      this.isshow = -position.y > 450;
      //2.决定tabcontrol是否吸顶(position:fixed)
      this.istabfixed=-position.y>this.taboffsettop
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.scroll.refresh()
  },
  deactivated(){
    this.saveY=this.$refs.scroll.scroll.y

    //取消全局事件的监听
    // this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
};
</script>

<style scoped>
.tabControl {
  position: fixed;
  /* position: sticky;*/
  left: 0;
  right: 0;
}
#home {
  padding-top: 44px;
  padding-bottom: 49px;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
.content {
  height: calc(100vh - 93px);
  overflow: hidden;
}
</style>
