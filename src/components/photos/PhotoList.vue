<template>
    <div>
        <!-- 顶部列表 -->
			<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', items.id==0  ? 'mui-active':'']" v-for="items in photlist" :key="items.id" @click="getphotlistimg(items.id)">
							{{items.title}}
						</a>
					</div>
				</div>

		</div>
        <!-- 图片详情 -->
        <ul class="photo-list">
            <router-link v-for="items in list" :key="items.id" :to="'/home/photoinfo/'+items.id" tag="li">
                <img v-lazy="items.img_url">
                <div class="info">
                    <h3 class="info-title">{{items.title}}</h3>
                    <p class="info-body">{{items.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
// 导入MUI的JS文件
import mui from "../../lib/mui/js/mui.min.js"

export default {
    data() {
        return {
            photlist:[], //顶部菜单数据
            list:[],    //图片数据
        }
    },
    created() {
        this.getphotlist(),
        this.getphotlistimg(0) //默认进入页面，就主动请求所有图片列表的数据
    },
    mounted() {
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getphotlist(){
            this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory').then(response=>{
                if(response.data.status===0){
                    // console.log(response.data.message)
                    response.data.message.unshift({id:0,title:'全部'})
                    this.photlist = response.data.message
                    // console.log(this.photlist)
                }
            })
        },
        getphotlistimg(imgid){
            this.$http.get('http://www.liulongbin.top:3005/api/getimages/'+imgid).then(response=>{
                if(response.data.status===0){
                    this.list = response.data.message
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
a{ touch-action: none; }
.photo-list{
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    list-style: none;
    li{
        position: relative;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
}
.info{
    color: #fff;
    background:rgba(0, 0, 0,0.3);
    position: absolute;
    bottom: 0;
    text-align: left;
    .info-body {
        font-size: 14px;
        color: #fff;
        padding: 0;
        margin:0;
    }
    .info-title{
        font-size: 13px;
    }
}
</style>