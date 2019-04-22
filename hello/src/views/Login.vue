<template>
	<div>
		<form action="" v-if="!isReg">
			<span>用户名：</span>
			<input type="text" v-model="name"><br><br>
			<span>密码：</span>
			<input type="password" v-model="pass"><br><br>
			<button type="button" @click="login()">登录</button>
			<button type="button" @click="reg()">注册</button>
		</form>
		<form action="" v-else>
			<span>用户名：</span>
			<input type="text" v-model="name"><br><br>
			<span>密码：</span>
			<input type="password" v-model="pass"><br><br>
			<span>确认密码：</span>
			<input type="password" v-model="pass2"><br><br>
			<button type="button" @click="addUser()">确定</button>
			<button type="button" @click="cancel()">取消</button>
		</form>
	</div>
</template>

<script>
export default {
  name: 'Login',
  data(){
  	return{
  		isReg:false,
  		name:'',
  		pass:'',
  		pass2:''
  	}
  },
  methods:{
  	login(){
  		if(localStorage.getItem("name")===this.name && localStorage.getItem("pass")===this.pass)
  		{
  			this.name="";
  			this.pass="";
  			this.$router.push('/home/list');
  		}else{
  			alert("用户名或密码输入错误！");
  		}
  	},
  	reg(){
  		this.isReg=true;

  	},
  	addUser(){
  		if(this.pass===this.pass2){
	  		localStorage.setItem("name",this.name);
	  		localStorage.setItem("pass",this.pass);
	  		this.name="";
	  		this.pass="";
	  		this.pass2="";
	  		this.isReg=false;
  		}else{
  			alert("两次密码输入不一致！");
  		}
  	},
  	cancel(){
  		this.isReg=false;

  	}
  }
}
</script>

<style scoped>

</style>