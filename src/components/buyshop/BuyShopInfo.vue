<template>
    <div class="goodsinfo-container">
        <!-- 购物车小球 -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
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
                       
                        <p class="box-num">购买数量:<numbox tag="div" class="num" @getcount="getSelectedCount" :max="shopinfo.stock_quantity"></numbox></p> 
                     
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
           ballFlag:false, //控制小球的隐藏和显示的标识符
           selectedCount:1  //保存用户选中的商品数量，默认，认为用户买1个
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
            //{id:商品id，count:要购买的数量，price:商品的单价，selected：false 是否购买的开关}
            // 拼接处一个，要保存到store中car数组里的 商品信息对象
            var goodsinfo = {
                id:this.id,
                count:this.selectedCount,
                price:this.shopinfo.sell_price,
                selected:true
            };
        //调用 store中的 mutations 来将商品加入购物车
        this.$store.commit('addToCar',goodsinfo);
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;

            //小球动画优化思路：
            //1.视线分析 动画 不准确的本质原因： 我们把 小球 最终 位移到的位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下
            //2.只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后，问题出现了
            //3.因此，我们经过分析，得到的结论：不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值
            //4.经过分析，得出解题思路：先得到 购物车 坐标，再得到 小球横纵坐标，然后 让y值 求差，x值也 求差，得到的 结果，就是
            // 横纵坐标要位移的距离
            // 5.如何 获取 购物车 和 小球的 位置    domObject.getBoundingClientRect()

            const ball = this.$refs.ball.getBoundingClientRect()
            const badge = document.getElementById('badge').getBoundingClientRect()

            //购物车坐标的距离 - 小球坐标的距离 = 位移的距离
            const ballX=badge.left-ball.left  
            const ballY=badge.top-ball.top

            el.style.transform = `translate(${ballX}px, ${ballY}px)`;
            el.style.transition = "all 0.4s cubic-bezier(.4,-0.3,1,.67)";
            done();
        },
        afterEnter(el){
            this.ballFlag =!this.ballFlag;
        },
        getSelectedCount(count){
            // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data上
            this.selectedCount = count;
            // console.log('父组件拿到的值为'+this.selectedCount)
        }
    },
    components: {
        swiper,
        "numbox":num
    }
}
</script>

<style lang="less" scoped>
.goodsinfo-container{
    background: #eee;
    overflow: hidden;

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