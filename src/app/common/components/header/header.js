import './header.scss';

const header = {
	restrict : 'EA',
	template : require('./header.html'),
	controller : ['$scope','T', ($scope, T) => {
		console.log(T.T('PUBLIC.en'))
		//基础变量申明
		$scope.currentLi = '';

		//下载
		$scope.downLoad = () => {
			$scope.currentLi = 'downLoad';
		};

		//帮助文档
		$scope.help = () => {
			$scope.currentLi = 'help';
		};

		//语言切换
		$scope.changeLang = (flag) => {
			localStorage.setItem('lang',flag);
			window.location.reload();
		}
	}]
};

export default angular
	.module('directive.header', [])
	.directive('header', () => {
		return header;
	})
	.name;