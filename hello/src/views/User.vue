<template>
	<div>
		<div>user</div>
		<button @click="linktoadd()">添加</button>
	</div>
</template>

<script>
export default {
  name: 'User',
  methods:{
  	linktoadd(){
  		this.$router.push('/add');
  	}
  }

}
</script>

<style scoped>

</style>