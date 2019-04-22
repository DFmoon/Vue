<template>
	<div>
		<p>标题</p>
		<input type="text" v-model="title">
		<p>内容</p>
		<input type="text" v-model="content">
		<button @click="add()">添加</button>
	</div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Add',
  store,
  data(){
  	return {
  		title:'',
  		content:''
  	}
  },
  methods:{
  	add(){
  		store.commit('addItem',{    //触发sstore的addItem，并把变量以对象的形式传递给它
  			title:this.title,
  			content:this.content
  		})
  		this.title='';
  		this.content='';
  		this.$router.push('/home/list');  //通过路由跳转到list页面
  	}
  }

}
</script>

<style scoped>

</style>