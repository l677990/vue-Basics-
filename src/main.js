//入口文件
import Vue from "vue"
//1.1导入路由的包
import VueRouter from "vue-router"
//1.2安装路由
Vue.use(VueRouter)

//安装vuex
import Vuex from "vuex"
Vue.use(Vuex)


// 2.1导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root='http://vue.studyit.io';
// 设置全局post时候表单数据格式组织的形式
Vue.http.options.emulateJSON = true;

//引入Mint-ui部分css
// import {Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//完整引入Mint-ui
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//引入MUI框架
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"
// import mui from './lib/mui/js/mui.js'
// Vue.prototype.mui = mui

//引入Vue缩略图插件(支持2.5以上版本)
// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)


//导入格式化时间的插件
import moment from "moment"
//定义全局的过滤器
Vue.filter("glq",(dataStr,pattern="YYYY-MM-DD HH:mm:ss")=>{
   return moment(dataStr).format(pattern)
})

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中 吧 购物车的数据读出来放到store中
var car =JSON.parse(localStorage.getItem('car') || '[]')

//配置vuex
const store = new Vuex.Store({
   state:{
      //存放购物车中的商品的数据，用一个数组存储起来，在car数组中，存储一些商品对象
      //{id:商品id，count:要购买的数量，price:商品的单价，selected：false 是否购买的开关}
      car:car
   },
   mutations:{
      addToCar(state,goodsinfo){// 点击加入购物车，吧商品信息，保存到store中的car上 
         // 分析
         // 1.如果购物车中已经有对应商品了，那么只需要更新数量
         // 2.如果没有，则直接把 商品数据，push到car中即可

         // 假设 在购物车中没有找到对应商品
         var flag = false

         state.car.some(items=>{
            if(items.id == goodsinfo.id){
               items.count += parseInt(goodsinfo.count)
               flag = true
               return true
            }
         })

         // 如果最终，循环完毕，得到的flag还是false，则吧商品数据直接push到购物车中
         if(!flag){
            state.car.push(goodsinfo)
         }

         //当 更新 car 之后，吧car数组，存储到本地 的localStorage中
         localStorage.setItem('car',JSON.stringify(state.car))
      },
      updateGoodsInfo(state,goodsinfo){//修改购物车中商品的数量值
         state.car.some(item=>{
            if(item.id==goodsinfo.id){
               item.count = parseInt(goodsinfo.count)
               return true
            }
         })
         //当修改完数量，吧最新的购物车数据，保存到本地 存储中
         localStorage.setItem('car',JSON.stringify(state.car))
      },
      removeFormCar(state,id){// 根据id，从store中的购物车中删除对应的那条商品数据     
         state.car.some((item,i)=>{
            if(item.id==id){
               state.car.splice(i,1)
               return true;
            }
         })
           //将删除完毕的数据，吧最新的购物车数据，保存到本地 存储中
           localStorage.setItem('car',JSON.stringify(state.car))
      },
      updateShopchange(state,info){//开关的关闭和打开同步
         state.car.some(item=>{
            if(item.id==info.id){
               item.selected=info.selected
            }
         })
         //将开关同步，吧最新的购物车数据，保存到本地 存储中
         localStorage.setItem('car',JSON.stringify(state.car))
      }
   },
   getters:{
      getAllCount:(state)=>{
         var c=0;
         state.car.forEach(items=>{
            c+=items.count
         })
         return c
      },
      getAllcarnum:(state)=>{
         var o = {}
         state.car.forEach(item=>{
            o[item.id]=item.count
         })
         return o
      },
      getShopSelected:(state)=>{
         var o ={}
         state.car.forEach(item=>{
            o[item.id]=item.selected
         })
         return o
      },
      getShopmoney:(state)=>{
         var o = {
            count:0, //数量
            money:0, //总价
         }
         state.car.forEach(item=>{
           if(item.selected){
            o.count += item.count,
            o.money += item.price * item.count
           }
         })
         return o
      }
   },
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
   router, //1.4挂载路由到对象实例上
   store
})

