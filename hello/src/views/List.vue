<template>
	<div>
		<ul>
			<li v-for="(item,index) in page_lists":key="index">
				{{item.title}}-{{item.content}}
			</li>
		</ul>
	</div>
</template>

<script>
import store from '@/store' 	//@代表src这个目录
export default {
  name: 'List',
  store,
  computed:{
  	page_lists(){
  		return store.state.lists;
  	}
  }

}
</script>

<style scoped>

</style>