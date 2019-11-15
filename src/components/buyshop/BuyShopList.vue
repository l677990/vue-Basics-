<template>
    <div class="buyshoplist">
        <div class="box">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573813238238&di=b0501999ead23e470f57cf77044d4300&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F09%2F20160109112142_4fRLS.jpeg" alt="">
            <h3>商品列表商品列表商品列表</h3>
            <div class="box-info">
                <p class="price">
                    <span class="now">￥899</span>
                    <span class="old">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <div class="box">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573813238238&di=b0501999ead23e470f57cf77044d4300&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F09%2F20160109112142_4fRLS.jpeg" alt="">
            <h3>商品列表商品列表商品列表商品列表商品列表商品列表商品列表商品列表商品列表商品列表商品列表商品列表</h3>
            <div class="box-info">
                <p class="price">
                    <span class="now">￥899</span>
                    <span class="old">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中&nbsp;&nbsp;剩60件</span>
                </p>
            </div>
        </div>

        <div class="box">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573813238238&di=b0501999ead23e470f57cf77044d4300&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F09%2F20160109112142_4fRLS.jpeg" alt="">
            <h3>商品列表商品列表商品列表</h3>
            <div class="box-info">
                <p class="price">
                    <span class="now">￥899</span>
                    <span class="old">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中&nbsp;&nbsp;剩60件</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
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