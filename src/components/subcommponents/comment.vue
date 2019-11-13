<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(120字以内)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComme">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(items,i) in comments" :key="items.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;用户:{{items.user_name}}&nbsp;&nbsp;发表时间：{{items.add_time|glq('YYYY-MM-DD HH:mm')}}
                </div>
                <div class="cmt-body">
                    {{items.content==='undefined'?'楼主很懒，什么都没说':items.content}}
                </div>
            </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
    data() {
        return {
            pageIndex:1,
            comments:[],
            msg:'' //评论输入的内容
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments(){ //获取评论
            axios({
                method: 'get',
                url: "http://www.liulongbin.top:3005/api/getcomments/"+this.id+"?pageindex="+this.pageIndex,
            })
            .then((response)=>{
                if(response.data.status===0){
                    this.comments=this.comments.concat(response.data.message);
                    // console.log(this.comments)
                }else{
                    Toast('评论加载失败')
                }
            });
        },
        getMore(){//加载更多
            this.pageIndex++;
            this.getComments();
        },
        postComme(){
            if(this.msg.trim().length===0){
                return Toast('评论内容不能为空!');
            }
            this.$http
            .post("http://www.liulongbin.top:3005/api/postcomment/"+this.$route.params.id,{
                content:this.msg.trim()
            })
            .then(function(response){
                if(response.data.status===0){
                   var cmt = {
                       user_name:"匿名用户",
                       add_time:Date.now(),
                       content:this.msg.trim()
                   }
                }
                this.comments.unshift(cmt);
                this.msg="";
            });



        }
    },
    props:["id"]
}
</script>

<style lang="less" scoped>
.cmt-container{
    h3{
        font-size: 16px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin:0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 35px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>