<template>
  <div>
    <input type="text" v-model="itemValue"/>
    <button @click="submit">提交</button>
    <ul>
      <li-item v-for="(item,index) of list" :item="item" :index="index" @delete="deleteItem"></li-item>
    </ul>
  </div>
</template>

<script>
import liItem from './components/liItem'  //导入局部组件

export default {
  components: {
    'li-item':liItem,     //注册局部组件
  },
  data:function(){
    return{
      itemValue:'',
      list:[],
    }
  },
  methods:{
    submit:function(){
      this.list.push(this.itemValue);
      this.itemValue='';
    },
    deleteItem:function(index){
      this.list.splice(index,1);
    },
  }
}
</script>

<style>

</style>
