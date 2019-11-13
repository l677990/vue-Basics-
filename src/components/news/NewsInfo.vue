<template>
    <div class="newsinfo">
        <h1 class="title">{{ NewsInfo.title }}</h1>
        <p class="subtitle">
            <span>时间:{{ NewsInfo.add_time|glq('YYYY-MM-DD HH:mm') }}</span>
            <span>点击:{{ NewsInfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容区 -->
        <div class="content" v-html="NewsInfo.content"></div>
        <!-- 评论子组件区 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    //1.导入 评论子组件
import comment from "../subcommponents/comment.vue"
export default {
    data() {
        return {
            id:this.$route.params.id, //将URL地址中传递过来的 ID值，挂载到 data上，方便以后调用
            NewsInfo:{}
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo(){ //获取新闻详情
            axios({
                method: 'get',
                url: 'http://www.liulongbin.top:3005/api/getnew/'+this.id,
            })
            .then((response) =>{
                this.NewsInfo = response.data.message[0]
                console.log(this.NewsInfo[0])
            });
        }
    },
    components:{
        //用来注册子组件的节点
        'comment-box':comment
    },
}
</script>

<style lang="less" scoped>
    .newsinfo{
        padding:0 4px;
        margin: 15px 0;
    }
    .title{
        font-size:16px;
        text-align: center;
        color: red;
    }
    .subtitle{
        color: skyblue;
        display:flex;
        justify-content: space-between;
    }
</style>