<template>
    <div>
         <!-- 轮播图 -->
       <mt-swipe :auto="4000">
            <mt-swipe-item v-for="items in BannerList" :key="items.url">
                <img :src="items.img" alt="" class="{w:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- 分析：为什么 商品评论中的 轮播图这么丑 -->
    <!-- 1.首页中的照片，它的宽和高，都是 使用了100%的宽度 -->
    <!-- 2.在商品详情页面中，轮播图的 图片，如果也使用 宽高 为100%的话，页面不好看 -->
    <!-- 3.商品详情页面中轮播图，期望 高度是100%，但是宽度自适应 -->
    <!-- 4.经过分析，得到 问题的原因：首页中的轮播图 和 详情中的轮播图，分歧点是 宽度到底是100%还是自适应 -->
    <!-- 5。既然两个轮播图其他方面都没有冲突的，只是 宽度有分歧，那么，我们可以自定义一个属性，让 使用轮播图的 调用者，
    手动指定 是否为 100% 的宽度 -->
</template>

<script>
export default {
    props: ["BannerList"]
}
</script>

<style lang="less" scoped>
.mint-swipe{
    height:200px;
    .mint-swipe-item{
        text-align: center;
        img{
            // width: 100%;
            height: 100%;
        }
    }
    .w{
        width: 100%;
    }
}
</style>