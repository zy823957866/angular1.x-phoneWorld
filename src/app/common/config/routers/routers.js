const Router = [
	{
		//错误404
		state : '404',
		url : '/404',
		module : 'app.err',
		templates : ['common/components/err404/view/index'],
		controller : 'errCtrl',
		jsFiles : ['common/components/err404/controller/err404Ctrl']
	},{

		//信息面板
		state : 'dashboard',
		url : '/dashboard',
		module : 'app.dashboard',
		templates : ['dashboard/view/das'],
		controller : 'dashCtrl',
		jsFiles : ['dashboard/controller/dashboardCtrl']
	},{

		//物联卡信息管理
		state : 'commMge',
		url : '/commMge',
		module : 'app.cardInfoMge',
		templates : ['communicate/view/cardInfoMge'],
		controller : 'cardInfoMgeCtrl',
		jsFiles : ['communicate/controller/cardInfoMgeCtrl']
	},{

		//数据服务查询
		state : 'serviceQuery',
		url : '/serviceQuery',
		module : 'app.serviceQuery',
		templates : ['communicate/view/commState/serviceQuery'],
		controller : 'serviceQueryCtrl',
		jsFiles : ['communicate/controller/serviceQueryCtrl']
	},{

		//当前开关机状态查询
		state : 'swithQuery',
		url : '/swithQuery',
		module : 'app.switchQuery',
		templates : ['communicate/view/commState/switchQuery'],
		controller : 'switchQueryCtrl',
		jsFiles : ['communicate/controller/switchQueryCtrl']
	},{

		//通信服务状态
		state : 'commStatue',
		url : '/commStatue',
		module : 'app.commStatue',
		templates : ['communicate/view/commStateMge'],
		controller : 'switchQueryCtrl',
		jsFiles : ['communicate/controller/commStateMgeCtrl']
	}
];

export default Router;