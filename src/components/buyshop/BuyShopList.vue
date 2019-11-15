<template>
    <div class="buyshoplist">
        <div class="box" v-for="item in buyshoplist" :key="item.id" @click="shopinfo(item.id)">
            <img :src="item.img_url" alt="">
            <h3>{{item.title}}</h3>
            <div class="box-info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="add">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex:1, //页数，默认第一页
            buyshoplist:[] //存放所有商品信息
        }
    },
    created() {
        this.getshoplist()
    },
    methods: {
        getshoplist(){
            this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+this.pageindex)
            .then(response=>{
                if(response.data.status===0){
                    // console.log(response)
                    this.buyshoplist = this.buyshoplist.concat(response.data.message);
                }
            })
        },
        add(){
            this.pageindex++;
            this.getshoplist();
        },
        shopinfo(id){
            //使用JS的形式进行路由导航

            //注意:一定要区分 this.$route 和 this.$router这两个对象
            //其中: this.$route是路由【参数对象】,所有的路由参数，params,query都属于它
            //其中: this.$router是一个路由的【导航对象】，用它 可以方便的 使用JS代码，实现路由的 前进、后退、跳转到新的URL地址

            // console.log(this);
            // 1.字符串方式跳转
            // this.$router.push('/home/buyshopinfo/'+id);

            // 2.对象方式跳转
            // this.$router.push({path:'/home/buyshopinfo/'+id})

            // 3.命名的路由跳转
            this.$router.push({ name: 'buyshopinfo', params: { id}})
        }
    },
}
</script>

<style lang="less" scoped>
.buyshoplist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 8px;
    .box{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        width: 49%;
        border: 1px solid #ccc;
        margin:3px 0;
        box-shadow: 0 0 8px #ccc;
        min-height: 293px;
        padding: 2px;
        img{
            width: 100%;
            height: 170px;
        }
        h3{
            font-size: 14px;
        }
        .box-info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
             }
            .price{
                .now{
                    color: red;
                    font-size: 16px;
                    font-weight: 700;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            } 
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}

</style>