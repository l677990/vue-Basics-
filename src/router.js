//vue路由文件

//1导入vue-router包
import VueRouter from 'vue-router'

//导入对应的组件
import HomeContainer from "./components/tabbar/HomeContainer.vue"  //主页
import SearchContainer from "./components/tabbar/SearchContainer.vue" //搜索页
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue" //购物页
import VipContainer from "./components/tabbar/VipContainer.vue" //会员页
import NewsList from "./components/news/NewsList.vue"  //新闻列表页面
import NewsInfo from "./components/news/NewsInfo.vue" //新闻详情
import PhotList from "./components/photos/PhotoList.vue"  //图文资讯
import PhotoInfo from "./components/photos/PhotoInfo.vue" //图片详情
import BuyShopList from "./components/buyshop/BuyShopList.vue" //商品购买
import BuyShopInfo from "./components/buyshop/BuyShopInfo.vue" //商品购买详情
import BuyDesc from "./components/buyshop/Buydesc.vue"    //图文介绍
import BuyInfo from "./components/buyshop/Buyinfo.vue"    //商品评论
// 3创建路由对象
var router = new VueRouter({
    routes:[
      {path:'/',redirect:'/home'},
      {path:'/home',component:HomeContainer},
      {path:'/search',component:SearchContainer},
      {path:'/shopcar',component:ShopcarContainer},
      {path:'/vip',component:VipContainer},
      {path:'/home/newslist',component:NewsList},
      {path:'/home/newsinfo/:id',component:NewsInfo},
      {path:'/home/photolist',component:PhotList},
      {path:'/home/photoinfo/:id',component:PhotoInfo},
      {path:'/home/buyshoplist',component:BuyShopList},
      {path:'/home/buyshopinfo/:id',component:BuyShopInfo,name:'buyshopinfo'},
      {path:'/home/Buydesc/:id',component:BuyDesc,name:'Buydesc'},
      {path:'/home/Buyinfo/:id',component:BuyInfo,name:'Buyinfo'},
    ],
    linkActiveClass:'mui-active' //覆盖默认的路由高亮的类，默认的类叫做
})

// 向外暴露成员
export default router