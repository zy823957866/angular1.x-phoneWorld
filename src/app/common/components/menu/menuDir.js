import menus from './menuData';
import './menuDir.scss';

const menuDir = {
	restrict : 'EA',
	template : require("./menuDirTpl.html"),
	scope : {

	},
	controller : ['$scope', '$state', '$location', ($scope, $state, $location) => {
		$scope.menus = menus;

		$scope.currentUrl = $location.path().replace("/",'') || 'dashboard';

		//TOGGLE及跳转
		$scope.toggleMenu = (menu, e) => {

			if(menu.children && menu.children.length){
				menu.open = !menu.open;
			}else{
				$state.go(menu.url);

				$scope.currentUrl = menu.url;
			}
		}
	}]
}

export default angular
    .module('directive.menu',[])
    .directive('menu', () => {
    	return menuDir;
    })
    .name;
