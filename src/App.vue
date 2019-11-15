<template>
    <div class="app-container">
        <!-- 头部Header -->
        <mt-header fixed title="前端项目"></mt-header>
        <span class="mui-icon mui-icon-back fh" @click="fh"></span>
        <span class="qwq" @click="fh">返回</span>
        <!-- 中间内容 -->
        <transition>
            <router-view></router-view>
        </transition>
        <!-- 底部Tabbar -->
		<nav class="mui-bar mui-bar-tab mui-active">
			<router-link class="mui-tab-item-lmk" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-lmk" to="/vip">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-lmk" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-lmk" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>

</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        fh(){
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="less" scoped>
.app-container{
    padding-top: 40px;
	padding-bottom: 50px;
	overflow-x: hidden;
}
.v-enter {
    opacity: 0;
    transform: translateX(100%);
}
.v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}

.fh{
    position: fixed;
    top: 7px;
    font-size: 25px;
    left: 0;
    color:#fff;
    z-index: 100;
}
.qwq{
    position: fixed;
    top: 9px;
    left: 20px;
    color: #fff;
    font-size: 15px;
    z-index: 100;
}

.v-enter-active,
.v-leave-active{
    opacity: 1;
    transition:all 0.5s ease;
}

.mui-bar-tab .mui-tab-item-lmk.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-lmk .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-lmk .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-lmk {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
</style>