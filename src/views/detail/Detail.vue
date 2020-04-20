<template>
  <div id="datail">
    <DetailNavBar class="dnb" ref="nav" @titleClick="titleClick"></DetailNavBar>
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo" ref="params"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <GoodsList :goods="recommends" ref="recommend"></GoodsList>
    </Scroll>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <!-- 加上native使得组件可以监听点击事件 -->
    <BackTop @click.native="backclick" v-show="isshow"></BackTop>
  </div>
</template>
 
<script>
import DetailNavBar from "../detail/childComps/DetailNavBar";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import DetailSwiper from "../detail/childComps/DetailSwiper";
import DetailBaseInfo from "../detail/childComps/DetailBaseInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailShopInfo from "../detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "../detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "../detail/childComps/DetailParamInfo";
import DetailCommentInfo from "../detail/childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from 'components/content/backTop/BackTop'
import { debounce } from "../../common/utils";
import DetailBottomBar from './childComps/DetailBottomBar'
import {mapActions} from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex:0,
      isshow: false,
    };
  },
  components: {
    DetailNavBar, 
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  methods: {
    ...mapActions(['addCart']),
    addToCart(){
      const product ={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid
      //this.$store.cartList.push(product)
      //this.$store.commit('addCart',product)
      //将商品添加到购物车里(1.promise  2.mapactions)
      this.addCart(product).then(res=>{
        this.$toast.show(res,2000)
      })
      // this.$store.dispatch('addCart',product)
      // .then(res=>{
      //   console.log(res);  
      // })
    },
    backclick() {
      //this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length=this.themeTopYs.length
      for (let i = 0; i < length-1; i++) {
        if (this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])) {
          this.currentIndex=i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }
      //是否显示回到顶部
    this.isshow = -position.y > 450;
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
      this.getThemeTopY();
    }
  },
  updated() {},
  created() {
    //给getThemeTopY赋值(对this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    });
    //保存传入的iid
    this.iid = this.$route.params.iid;
    //请求详情数据
    getDetail(this.iid).then(res => {
      //获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //获取参数的详情信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //取出评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
      //渲染完调用函数
      // this.$nextTick(() => {
      //   //根据最新的数据,对应的DOM是已经被渲染出来
      //   //但是图片依旧没有加载完(目前offsetTop没有完全包含图片)
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  }
};
</script>
 
<style scoped>
#datail {
  position: relative;
  z-index: 15;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.dnb {
  position: relative;
  background-color: #fff;
  z-index: 16;
}
</style>