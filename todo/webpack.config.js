const {VueLoaderPlugin}=require('vue-loader');		//新版的vue-loader要求必须手动添加VueLoaderPlugin
const path=require('path')
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const ExtractPlugin=require('extract-text-webpack-plugin')

const isDev=process.env.NODE_ENV==='development'	//定义一个变量，表示开发环境 

const config={
	target:'web',
	entry:path.join(__dirname,'src/index.js'),
	output:{
		filename:'bundle.[hash:8].js',
		path:path.join(__dirname,'dist')
	},
	plugins:[
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({		//区分开发环境development和正式环境production，前者会包含错误信息提示及其他功能
			'proess.env':{
				NODE_ENV:isDev?'"development"':'"production"'
			}
		}),
		new HTMLPlugin()
	],
	module:{
		rules:[			//webpack只能识别es5的js，因此需其他工具处理
			{
				test:/\.vue$/,			//匹配.vue文件
				loader:'vue-loader'
			},
			{
				test:/\.jsx$/,			//匹配.jsx文件
				loader:'babel-loader'
			},
			{
				test:/\.(gif|jpg|jpeg|png|svg)$/,		//匹配图片
				use:[
					{
						loader:'url-loader',		//判断图片大小若小于1024，则将其转换为base64写入js代码以减少http请求
						options:{
							limit:1024,
							name:'[name]-a.[ext]'	//大于1024的图片以该名字输出
						}
					}
				]
			}
		]
	}
}

if(isDev){	//开发环境（run dev)
	config.module.rules.push(			
	{
		test:/\.styl/,			//匹配css预处理文件
		use:[
			'style-loader',
			'css-loader',
			'stylus-loader'			//生成sourcemap
		]
	});
	config.devtool='#cheap-module-eval-source-map'	//通过sourcemap映射调试代码
	config.devServer={
		port:8000,				//端口号
		host:'0.0.0.0',			//IP地址
		overlay:{
			errors:true,		//编译过程中的错误显示到网页上
		},
		open:true ,				//启动Dev时自动打开浏览器
		hot:true,				//热加载，修改某一组件时只重新渲染该组件而不是整个页面
	}
	config.plugins.push(		//热加载的相关配置
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()	
		)
}else{		//正式环境(run build)
	config.entry={				//修改入口文件，将类库文件单独打包
		app:path.join(__dirname,'src/index.js'),
		vendor:['vue']
	};
	config.output.filename='[name].[chunkhash:8].js';	//chunkhash表示每个chunk会单独生成一个hush
	config.module.rules.push(
	{
		test:/\.styl/,			//匹配css预处理文件
		use: ExtractPlugin.extract({
			fallback:'style-loader',
			use:[
				'css-loader',
				'stylus-loader'			//生成sourcemap
			]
		})
	});
	config.plugins.push(
		new ExtractPlugin('styles.[Hash:8].css'),	//传入打包好的css文件名
	);
	config.optimization={					//类库文件单独打包相关配置
        splitChunks: {
            cacheGroups: {                  //这里开始设置缓存的chunks
                commons: {
                    chunks: 'initial',      //必须三选一："initial"|"all"|"async"(默认就是异步)
                    minSize: 0,             //最小尺寸，默认0,
                    minChunks: 2,           //最小chunk ，默认1
                    maxInitialRequests: 5   //最大初始化请求数，默认1
                },
                vendor: {
                    test: /node_modules/,   //正则规则验证，如果符合就提取chunk
                    chunks: 'initial',      //必须三选一："initial"|"all"|"async"(默认就是异步)
                    name: 'vendor',         //要缓存的分隔出来的chunk名称
                    priority: 10,           //缓存组优先级
                    enforce: true
                }
            }
        },
        runtimeChunk: true
    };
}

module.exports=config;