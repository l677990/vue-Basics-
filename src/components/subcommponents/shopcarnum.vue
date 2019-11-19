<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' style="height:25px">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" readonly ref="numbox" @change="countChanged" type="number" :value="shocarnum" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>

<style lang="stylus" scoped>

</style>

<script>
// 导入MUI的JS文件
import mui from "../../lib/mui/js/mui.min.js"

export default {
    mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();

  },
  methods: {
    countChanged(){
      // 每当文本框的数据被修改的时候 立即把 最新的数据，同步到购物车的 store中
        // console.log(this.$refs.numbox.value)
        this.$store.commit("updateGoodsInfo",{
            id:this.goodsid,
            count:this.$refs.numbox.value
        })
    },
  },
    props:["shocarnum","goodsid"],
    watch: {
      //监听属性
      'max':function(newVal,oldVal){
        // mui(".mui-numbox").numbox().setOption("max",newVal)
        mui(".mui-numbox").numbox().setOption('shocarnum',newVal)
      }
    },
}
</script>