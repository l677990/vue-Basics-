<template>
    <div>
        <!-- 购物车小球 -->
        <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag"></div>
        </transition>
        <!-- 物品轮播图 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :BannerList="bannerlist" :isfull="false"></swiper>
					</div>
				</div>
		</div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{shopinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner  lmk-box">
						<p class="box-money">
                            市场价:<span class="old">￥{{shopinfo.market_price}}</span>&nbsp;&nbsp;
                            销售价:<span class="new">￥{{shopinfo.sell_price}}</span>
                        </p>
                       
                        <p class="box-num">购买数量:<numbox tag="div" class="num"></numbox></p> 
                     
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addshopcar">加入购物车</mt-button>
					</div>
				</div>
		</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{shopinfo.goods_no}}</p>
                        <p>库存情况：{{shopinfo.stock_quantity}}件</p>
                        <p>上架时间：{{shopinfo.add_time|glq}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="desc(id)">图文介绍</mt-button><br>
                    <mt-button type="danger" size="large" plain @click="info(id)"> 商品评论</mt-button>
                </div>
		</div>
        
    </div>
</template>

<script>
//导入轮播图组件
import swiper from "../subcommponents/swiper.vue"
//导入+ - 组件路由
import num from "../subcommponents/numbox.vue"

export default {
    data() {
        return {
           id:this.$route.params.id,
           bannerlist:[],   //轮播图数据
           shopinfo:{}, //商品详细信息
           ballFlag:false
        }
    },
    created() {
        this.getbanner();
        this.getinfo();
    },
    methods: {
        getbanner(){
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id)
            .then(response=>{
                if(response.data.status===0){
                    response.data.message.forEach(item=>{
                        item.img = item.src
                    })
                    this.bannerlist = response.data.message;
                    // console.log(this.bannerlist)
                }
            })
        },
        getinfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/'+this.id)
            .then(response=>{
                if(response.data.status===0){
                    // console.log(1)
                    this.shopinfo=response.data.message[0]
                }
            })
        },
        desc(id){
            this.$router.push({ name: 'Buydesc', params: { id }})
        },
        info(id){
            this.$router.push({ name: 'Buyinfo', params: { id }})
        },
        addshopcar(){ //购物车小球动画开关按钮
            // console.log(123)
            this.ballFlag=!this.ballFlag
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            el.style.transform = "translate(96px, 354px)";
            el.style.transition = "all 0.8s cubic-bezier(.4,-0.3,1,.67)"
        },
        afterEnter(el){
            this.ballFlag =!this.ballFlag;
        }
    },
    components: {
        swiper,
        "numbox":num
    }
}
</script>

<style lang="less" scoped>
.lmk-box{
    padding: 20px;
    .box-money{
    color: #000;
    .old{
        text-decoration:line-through;
    }
    .new{
        color: red;
        font-size: 18px;
    }
    }
    .box-num{
        color: #000;
    }
    .num{
        display: inline-block;

    }

}
     .ball{
        z-index: 500;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position:absolute;
        z-index: 99;
        top:412px;
        left: 142px;
        // transform: translate(96px, 385px)
    }
.mui-card-footer{
    display: block;
    // padding: 5px;
}
</style>