//入口文件
import Vue from "vue"
//1.1导入路由的包
import VueRouter from "vue-router"
//1.2安装路由
Vue.use(VueRouter)

// 2.1导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root='http://vue.studyit.io';
// 设置全局post时候表单数据格式组织的形式
Vue.http.options.emulateJSON = true;

//引入Mint-ui部分css
import {Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);

//引入MUI框架
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"
// import mui from './lib/mui/js/mui.js'
// Vue.prototype.mui = mui

//导入格式化时间的插件
import moment from "moment"
//定义全局的过滤器
Vue.filter("glq",(dataStr,pattern="YYY-MM-DD HH:mm:ss")=>{
   return moment(dataStr).format(pattern)
})

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