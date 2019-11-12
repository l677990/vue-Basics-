//vue路由文件

//1导入vue-router包
import VueRouter from 'vue-router'

//导入对应的组件
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import VipContainer from "./components/tabbar/VipContainer.vue"

// 3创建路由对象
var router = new VueRouter({
    routes:[
      {path:'/',redirect:'/home'},
      {path:'/home',component:HomeContainer},
      {path:'/search',component:SearchContainer},
      {path:'/shopcar',component:ShopcarContainer},
      {path:'/vip',component:VipContainer},
    ],
    linkActiveClass:'mui-active' //覆盖默认的路由高亮的类，默认的类叫做
})

// 向外暴露成员
export default router