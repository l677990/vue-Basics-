<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <div class="subtitle">
            <span>时间:{{photoinfo.add_time|glq}}</span>
            <span>点击:{{photoinfo.click}}次</span>
        </div>
        <hr>
        <!-- 缩略图内容 -->
        <!-- <div class="thumbs">
                <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
        </div> -->
         <div class="imginfo">
             <vue-preview 
             :list="list"
             @close="handleClose" 
             ></vue-preview>
         </div>
        <!-- 详情内容 -->
        <div class="content" v-html="photoinfo.content">
        </div>
        <com-box :id="id"></com-box>
    </div>
</template>

<script>
//导入评论子组件
import comment from "../subcommponents/comment.vue"
export default {
    data() {
        return {
            id:this.$route.params.id, //获取id
            list: [], //缩略图详情
            photoinfo:{} //图片详情
        }
    },
    created() {
        this.getphotoinfo();
        this.imginfo();
    },
    methods: {
        getphotoinfo(){
            this.$http.get("http://www.liulongbin.top:3005/api/getimageInfo/"+this.id).then(response=>{
                if(response.data.status===0){
                    this.photoinfo = response.data.message[0]
                }
            })
        },
        imginfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id).then(response=>{
                var data = response.data.message
                // console.log(data)
                if(response.data.status===0){
                    response.data.message.forEach(item=>{
                        item.w=600;
                        item.h=400;
                        item.src = item.src;  //大图
                        item.msrc = item.src;  //小图
                    });
                }
                this.list = data
                // console.log(this.thumbsList)
            })
        },
        handleClose () {
            console.log('close event')
        }
    },
    components:{
        "com-box":comment
    }
}
</script>

<style lang="less" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        font-size: 15px;
        text-align: center;
        padding: 6px 0;
        color:#26A2FF;
    }
    .subtitle{
       display: flex;
       justify-content: space-between;
        span{
            font-size: 13px;
            color: #666;
        }
   }
    .content {
       font-size: 13px;
       line-height: 30px;
   }
    // .thumbs {
    // // .my-gallery {
    // //     display: flex !important;
    // //     flex-wrap: wrap;
    // //             figure {
    // //                 width: 30%!important;
    // //                 margin: 5px!important;
    // //             img {
    // //                 width: 100%!important;
    // //             }
    // //         }
    // //     }
    // // }
}
</style>