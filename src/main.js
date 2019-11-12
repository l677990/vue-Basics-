//入口文件
import Vue from "vue"
//引入Mint-ui部分css
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)

//引入MUI框架
import "./lib/mui/css/mui.min.css"

//App.vue文件引入
import c from "./App.vue"

var vm = new Vue({
   el:'#app',
   render:function(createElements){
      return createElements(c)
   }
})