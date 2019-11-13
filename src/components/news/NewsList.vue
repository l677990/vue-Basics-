<template>
    <div>
        <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media"  v-for="items in news" :key="items.id">
				<router-link :to="'/home/newsinfo/'+items.id">
					<img class="mui-media-object mui-pull-left" :src="items.img_url">
					<div class="mui-media-body"> 
						<h1>{{items.title}}</h1>
						<p class='mui-ellipsis'>
                            <span>发表时间：{{items.add_time|glq('YYYY-MM-DD')}}</span>
                            <span>点击：{{items.click}}次</span>
                        </p>
					</div>
				</router-link>
			</li>
		</ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            news:[]
        }
    },
    created(){
        this.newslist()
    },
    methods: {
      newslist(){
          axios({
              method:'get',
              url:'http://www.liulongbin.top:3005/api/getnewslist'
          }).then( (response)=> {
                // console.log(response.data.message);
                this.news = response.data.message;
                // console.log(this.news)
          }); 
      } 
    },
}
</script>

<style lang="less" scoped>
    .mui-table-view{
        h1{
            font-size:15px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: skyblue;
            display:flex;
            justify-content: space-between;
        }
    }
</style>