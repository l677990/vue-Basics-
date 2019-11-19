<template>
    <div class="shopcar">
        <!-- 商品列表区域 -->
        <div class="goods-list">
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-for="(items,i) in goodslist" :key="items.id">
						<mt-switch v-model="$store.getters.getShopSelected[items.id]"
                        @change="updateshop(items.id,$store.getters.getShopSelected[items.id])"
                        ></mt-switch>
                        <img :src="items.thumb_path" alt="">
                        <div class="info">
                            <h1>{{items.title}}</h1>
                            <p>
                            <span>￥{{items.sell_price}}</span>
                            <shopcarnum class="shopcarnum" :shocarnum="$store.getters.getAllcarnum[items.id]" :goodsid="items.id"></shopcarnum>
                            <!-- 问题：如何从购物车中获取商品数量 -->
                            <!-- 1.可以先创建一个 空对象,然后循环购物车中所有商品的数据， 把 当前循环这条商品的ID，
                            作为对象的 属性名 ，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象 
                            {88:2 , 89:1, 90:4}    -->
                            <span @click="remove(items.id,i)">删除</span>
                            </p>
                        </div>
                    </div>
				</div>
			</div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getShopmoney.count}}</span>件，总价：<span class="red">￥{{$store.getters.getShopmoney.money}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
                    
				</div>
		</div>
        <p>{{$store.getters.getShopSelected}}</p>
    </div>
</template>

<script>
import shopcarnum from '../subcommponents/shopcarnum.vue'
export default {
    data() {
        return {
            goodslist:[] //购物车中所有商品
        }
    },
    created() {
        this.getgoodslist()
    },
    methods: {
        getgoodslist(){
            // 1.获取到stotre中所有商品的id，然后拼接处一个 用逗号分隔的 字符串
            var idArr=[]
            this.$store.state.car.forEach(item=>idArr.push(item.id));
            if(idArr.length<=0){ //如果购物车中没有商品
                return
            }
            //获取购物车商品列表
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+idArr.join(","))
            .then(response=>{
                if(response.data.status===0){
                    this.goodslist = response.data.message;
                }
            })
        },
        remove(id,index){
            //点击删除，吧商品从store中根据传递的ID删除，同时，吧当前组件中的goodslist中对应要删除的商品，使用index进行删除
            this.goodslist.splice(index,1);
            this.$store.commit('removeFormCar',id)
        },
        updateshop(id,val){//商品购买的开关
            console.log(id+'---'+val)
            this.$store.commit("updateShopchange",{id,selected:val})
        }
    },
    components:{
        shopcarnum
    }
}
</script>

<style lang="less" scoped>
.goods-list{
    .mui-card-content-inner{
        display: flex;
    }
    img {
        width: 60px;
        height: 60px;
    }
    h1{
        font-size: 13px;
    }
    p {
        .shopcarnum{
            display: inline;
        }
        span:nth-child(1){
            color: red;
            font-weight: 700;
        }
        span {
            color: skyblue;
        }
    }
}
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .red{
        font-size: 16px;
        font-weight: 700;
        color: red;
    }
</style>