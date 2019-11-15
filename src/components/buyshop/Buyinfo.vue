<template>
    <div>
        <h3>商品评论</h3>
        <comment :id="id"></comment>
    </div>
</template>

<script>
//导入评论组件
import comment from "../subcommponents/comment.vue"
export default {
    data() {
        return {
            id:this.$route.params.id
        }
    },
    methods: {
        
    },
    components: {
        comment
    }
}
</script>

<style lang="less" scoped>
    h3{
        text-align: center;
        color: rgb(32, 97, 122);
    }
</style>