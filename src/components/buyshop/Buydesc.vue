<template>
    <div class="goodsdesc-container">
        <h3>{{descinfo.title}}</h3>
        <hr>
        <div class="content" v-html="descinfo.content">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            descinfo:[]
        }
    },
    created() {
        this.getdescinfo()
    },
    methods: {
        getdescinfo(){
            this.$http
            .get('http://www.liulongbin.top:3005/api/goods/getdesc/'+this.$route.params.id)
            .then(response=>{
                if(response.data.status===0){
                    this.descinfo=response.data.message[0]
                }
            })
        }
    },
}
</script>

<style lang="less" >
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content{
    p{
        img{
            width:100%;
            height: 100%;
        }
    }
  }
}

</style>