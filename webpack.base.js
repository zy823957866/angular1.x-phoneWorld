/**
 * 根据参数判断是否打包
 * CREATE BY JHON
 */

/**===========================================================================================
 * LOADERS:
 * 对js进行处理(包括es6)的写法，插件为babel-loader babel-core babel-preset-latest
 * 对css进行处理(包括加浏览器前缀)，插件为style-loader css-loader postcss-loader autoprefixer
 * 对scss进行处理，sass-loader、node-sass
 *===========================================================================================*/

'use strict';

const webpack            = require('webpack');
const path               = require('path');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyJS           = require('uglifyjs-webpack-plugin');
const devServer          = require('./config/DEVSERVER' );
const CopyWebpackPlugin  = require('copy-webpack-plugin');


module.exports = function( option ){
	let config = {};

	//强制转换成布尔格式
	let BUILD = !!option.BUILD;
	let TEST  = !!option.TEST;

	//设置输入文件、输出路径
	config.entry  = {
		vendor: ["angular", 'angular-ui-router', 'oclazyload'],
		app : path.resolve(__dirname, './src/main.js')
	};

	//输出文件
	config.output = {

		//绝对路径
		path : path.resolve( __dirname , 'dist' ),

		//输出解析文件的目录，url相对于HTML 页面
		publicPath : BUILD ? './' : 'http://localhost:8080/',

		//输出的文件名
		filename : BUILD ? 'js/[name].[hash].js' : 'js/[name].bundle.js',

		//引入的文件打包至chunk
		chunkFilename : BUILD ? 'chunk/[name].[hash].js' : 'chunk/[name].bundle.js'
	};


	//DEVTOOL模块映射设置
	if (TEST){
		config.devtool = 'inline-source-map';
	} else if(BUILD){
		config.devtool = 'source-map';
	} else {
		config.devtool = 'eval';
	}


	//设置运行环境，production、development、none
	config.mode = BUILD ? 'production' : 'development';


	//MODULE
	//PRELOADER 先对语法进行检查
	config.module = {
		unknownContextCritical : false,
		rules : [
			{
				test : /\.css$/,
				use : [
					'style-loader',
					{ loader : 'css-loader?importLoaders=1' },
					{
						loader:'postcss-loader', 
                    	options:{
                    		plugins:function(){
                            return [

                            	//POSTCSS-IMPORTANT一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
                                require('postcss-import')(),

                                //自动修正css样式，使其兼容五个常用版本
                                require("autoprefixer")({browsers:['last 5 versions']})
                            	]
                        	}
						}
					}
				]
			},{
				test : /\.scss$/,
				use : [ 'style-loader', 'css-loader', 'sass-loader']
			},{
				test : /\.js$/,
				loader : 'babel-loader',

				//需要打包的文件为src目录
				include : path.resolve(__dirname, 'src'),

				//不需要解析的文件夹
				exclude : path.resolve(__dirname, 'node_modules'),

				//ES6用哪个版本，一般指向latest(最新)版本
				query : {
					presets : ['latest'],
					babelrc: false,
			        plugins: [
			            "syntax-dynamic-import",
			            "transform-object-rest-spread",
			            "transform-class-properties"
			        ]
				}
			},{
				//图片压缩 url-loader limit限制图片大小
      			test: /\.(png|svg|jpg|gif)$/,
      			use: [ 'url-loader?limit=8192&name=./images/common/[name].[hash:7].[ext]' ]
			},{
				//加载字体压缩
      			test: /\.(woff|woff2|eot|ttf|otf)$/,
      			use : "url-loader?limit=30000&name=./fonts/[name]-[hash].[ext]"
			},{ 
				test: /\.html$/, 
				loader: 'raw-loader' 
			}
		]
	};


	//警告设置
  	config.performance = {
  		//本地开启性能警告，生产环境屏蔽性能警告
  		hints : BUILD ? false : 'warning',

  		//整数类型（以字节为单位）
  		maxAssetSize: 200000,
  		maxEntrypointSize: 400000,

  		//提供资源文件名的断言函数
  		assetFilter : assetFilename => assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
  	};

	//PLUGINS
	config.plugins = [
		//部分源文件加载
		new webpack.optimize.SplitChunksPlugin({
            chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    name: "vendor"
                }
            }
        })
	];

	if (BUILD) {
		//清理dist文件夹内容
		config.plugins.push( new cleanWebpackPlugin(['dist']) );
		// config.plugins.push(uglifyJS());
	}

	

	//将压缩后的JS文件放入html中
	config.plugins.push(
  		new HtmlWebpackPlugin({
  			inject : 'body',
  			chunks: ['vendor', 'app'],
  			template: './src/index.html',
  			favicon : path.resolve(__dirname, 'src/app/common/images/favicon.ico'),
  			minify :  false
  		})
	);

	config.plugins.push(
		//图片拷贝
        new CopyWebpackPlugin([{
	    	from: __dirname + '/src/app/common/images',
	    	to:__dirname + '/dist/common/images'
		}]),

		//国际化文件拷贝
		new CopyWebpackPlugin([{
	    	from: __dirname + '/src/app/common/lang',
	    	to:__dirname + '/dist/common/lang'
		}])
	)

	//库文件引入
	config.plugins.push(
		new webpack.ProvidePlugin({
     		jQuery: "jquery",
     		$: "jquery"
 		})
	);

	//本地运行文件：服务器设置
	config.devServer = BUILD ? devServer.build:devServer.dev;

	return config;
}