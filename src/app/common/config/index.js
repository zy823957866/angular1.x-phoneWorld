import Router from './routers/routers';

const config = ['$stateProvider','$urlRouterProvider',($stateProvider, $urlRouterProvider) => {
	//找不到路径指向404
	$urlRouterProvider.otherwise('404');
}]

//定义按需加载的路由
const modules = () => {
	let mod = [];

	for(let route of Router){
		mod.push(
			angular.module(route.module, [])
				.config( ['$stateProvider',($stateProvider) => {

					$stateProvider.state(route.state, {
						url : route.url,
						templateProvider : ['$q', ($q) => {
				            let deferred = $q.defer();
				            
				            //此函数未开发完全，必须传入字符串形式的key，对项目开发并无太大影响
				            require.ensure([], (require) => {
				            	let tpl = [];

				                for(let t of route.templates){
									tpl.push(require( '../../' + t + '.html'))
								}

				                deferred.resolve(tpl);
				            });
				            return deferred.promise;
				        }],
						controller : route.controller,
						resolve : {
							deps : ['$q', '$ocLazyLoad',($q, $ocLazyLoad) => {
								let deferred = $q.defer();

								require.ensure( [] , (require) => {
									let file = [];

									for(let js of route.jsFiles){
										file.push(require( '../../' + js + '.js'))
									}

									$ocLazyLoad.load({
				                        name: route.module
				                    });

									deferred.resolve(file);

								});

								return deferred.promise;
							}]
						},
						onEnter : () => {
							console.log("进入页面")
						},
						onExit : () => {
							console.log("退出页面")
						}
					})

				} ]).name
		);
	}

	return mod;	
}

export default angular
    .module('app.route', modules())
    .config(config)
    .name;