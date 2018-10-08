const menus = [
	{menuName: '信息面板', icon: 'icon-communicateMge',url:'dashboard',children: []},
	{menuName: '通信管理', icon: 'icon-dashboard',children: [
		{menuName: '物联卡信息管理',url:'commMge'},
		{menuName: '通信状态管理',children: [
			{menuName: '数据服务查询',url:'serviceQuery'},
			{menuName: '当前开关机状态查询',url:'swithQuery'}
		]},
		{menuName: '通信服务状态',url:'commStatue'}
	]},
	{menuName: '统计分析', icon: 'icon-statistical',children: [
		{menuName: '当前卡状态报表',url:'currentRep'},
		{menuName: '用量统计报表',url:'useRep'},
		{menuName: 'API统计报表',url:'apiRep'},
		{menuName: '机卡分离报表',url:'seprateRep'},
		{menuName: '群组统计',url:'groupRep'}
	]}
	
];

export default menus;