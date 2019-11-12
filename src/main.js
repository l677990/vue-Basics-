//入口文件
import Vue from "vue"
//1.1导入路由的包
import VueRouter from "vue-router"
//1.2安装路由
Vue.use(VueRouter)

// 2.1导入vue-axios
import axios from "axios"
// Vue.prototype.$http=axios
// Vue.use(VueAxios)

//引入Mint-ui部分css
import {Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//引入MUI框架
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"
//引入lib-flexible(rem单位)
import "lib-flexible/flexible"

//1.3导入自己的router.js路由模块
import router from "./router.js"


//App.vue文件引入
import app from "./App.vue"

var vm = new Vue({
   el:'#app',
   render:function(createElements){
      return createElements(app)
   },
   router //1.4挂载路由到对象实例上
})