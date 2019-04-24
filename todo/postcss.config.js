//后处理css，进一步优化编译完成后的css代码
const autoprefixer=require('autoprefixer')		//自动给css属性添加浏览器前缀

module.exports={
	plugins:[autoprefixer()]
}