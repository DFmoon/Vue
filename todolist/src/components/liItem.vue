<template>
  <li @click='del'>{{item}}</li>
</template>

<script>
export default {
  props:['item','index'],
  methods:{
    del:function(){
      this.$emit('delete',this.index);		//局部组件向外发布事件
    }
  },
}
</script>

<!-- scoped限制了该样式只在当前组件中有效，若去掉，则全局有效 -->
<style scoped>

</style>
