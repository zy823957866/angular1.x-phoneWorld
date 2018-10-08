/**
 * ========================FORMSELECT组件================================
 *
 * componentClass	组件class		默认为:col-lg-3 col-md-6 col-xs-8
 * placeholder 		占位符 			默认为:请输入
 * lalebName 		标签名 			必填项
 * labelWidth 		标签宽度 		必填项，默认为90px,需要传入一个具
 * 									体数字，如：100，则代表100px
 * inputWidth  		输入框宽度 		默认为 (100% - 标签宽度),需要传入
 * 	 								一个具体数字，跟标签宽度一样
 * selectData 		下拉框数据 		数组中每个元素包括两个属性：code、name
 * selectText 		输入框内的文字	
 * selectCode		传给后端的code码			
 * selectAll 		是否显示请选择下拉框
 * hideItem 		需要隐藏的下拉数据  传入格式为['code1', 'code2']
 * disabled 		是否禁用下拉框
 * 
 *=======================================================================*/

import animate from './formSelectService';
import formSelectHTML from './formSelect.html';
import './formSelect.scss';

const formSelect= {
	restrict : 'EA',
	template : formSelectHTML,
	replace : true,
	scope : {
		componentClass 	: '@componentClass',
		placeholder 	: '@placeholder',
		labelName 		: '@labelName',
		labelWidth 		: '@labelWidth',
		inputWidth 		: '@inputWidth',
		selectData 		: '=selectData',
		selectText 		: '=selectText',
		selectCode 		: '=selectCode',
		selectAll 		: '@selectAll',
		hideItem 		: '@hideItem',
		disabled 		: '@disabled'
	},
	controller : ['$scope', 'animate', ($scope, animate) => {
		
		//输入框class
 		$scope.formGroupClass  = typeof $scope.componentClass === 'undefined' ? 'col-lg-3 col-md-6 col-xs-8' : $scope.componentClass;

 		//label class
 		$scope.labelClass  = typeof $scope.labelWidth === 'undefined' ? 'width-90' : 'width-' + $scope.labelWidth;

 		//input class
 		$scope.inputClass  = typeof $scope.inputWidth === 'undefined' 
 							 ? 'width-less-' + ($scope.labelWidth ? $scope.labelWidth : '90')
 							 : 'width-less-' + $scope.inputWidth;

		//占位符处理
 		$scope.placeholder = typeof $scope.placeholder === 'undefined' ? '--请选择--' : $scope.placeholder;

 		//下拉框中是否显示占位符内容
 		if($scope.selectAll !== 'false') $scope.selectData.unshift({code: '', name: $scope.placeholder});

 		//下拉数据
 		$scope.selectData = typeof $scope.selectData === 'undefined' ? [] : $scope.selectData;

 		//显示下拉框
		$scope.showSelect = (e) => {
			//是否禁用
			if($scope.disabled) {
				return false;
			}
			animate.slide(e.target.parentNode.parentNode.parentNode.parentNode);
		};

		//选择下拉数据
		$scope.getSelect = (item, e) => {
			$scope.ngModel = item.code;
			$scope.selectText = item.name;
			$scope.showSelect(e);
		}

	}]
};

export default angular
	.module('directive.formSelect', [animate])
	.directive('formSelect', () => {
		return formSelect;
	})
	.name;