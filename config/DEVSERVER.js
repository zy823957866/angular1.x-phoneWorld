/**
 * WEBPACK-DEV-SERVER相关配置
 * 热启动，为开发方便，页面代码会自动跟新
 */

'use strict';

const path = require('path');

module.exports = {
	//运行DEV
	dev : {

		//它指定了服务器资源的根目录，如果不写入contentBase的值，那么contentBase默认是项目的目录
		contentBase: './dist',

		//服务器主机号
		host : 'localhost',
		//端口号
		port : 8080,

		//在浏览器中显示错误
		overlay : true,

		//热启动
		inline : true, 
		open : true,

		//反向代理
		proxy : {},

		//拦截器
		setup : app => {},

		//设置监听时间
		watchOptions: {
	        aggregateTimeout: 300,
	        poll: 1000
	    }
	},

	//运行BUILD,对BUILD进行属性初始化
	build : {

		//模板
		contentBase: './dist',

		open : true,

		//反向代理
		proxy : {

		}

		//压缩
		// productionGzip: false,
  		//productionGzipExtensions: ['js', 'css'],
	}
}

