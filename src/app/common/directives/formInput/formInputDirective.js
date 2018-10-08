/**
 * ========================FORMINPUT组件=======================
 *
 * componentClass	组件class		默认为:col-lg-3 col-md-6 col-xs-8
 * placeholder 		占位符 			默认为:请输入
 * lalebName 		标签名 			必填项
 * labelWidth 		标签宽度 		必填项，默认为90px,需要传入一个具
 * 									体数字，如：100，则代表100px
 * inputWidth  		输入框宽度 		默认为 (100% - 标签宽度),需要传入
 * 	 								一个具体数字，跟标签宽度一样
 * require 			是否为必填 		默认为:false
 * disabled 		是否禁用
 * 
 *============================================================*/

import formInputHTML from './formInput.html';
import './formInput.scss';

 const formInput = {
 	restrict : 'EA',
 	template : formInputHTML,
 	replace: true,
 	scope : {
 		componentClass 	: '@componentClass',
 		placeholder 	: '@placeholder',
 		lalebName 		: '@labelName',
 		labelWidth 		: '@labelWidth',
 		inputWidth 		: '@inputWidth',
 		require 		: '@require',
 		ngModel 		: '=ngModel',
 		disabled 		: '@disabled'
 	},
 	controller : ['$scope', ($scope) => {

 		//输入框class
 		$scope.formGroupClass  = typeof $scope.componentClass === 'undefined' ? 'col-lg-3 col-md-6 col-xs-8' : $scope.componentClass;

 		//label class
 		$scope.labelClass  = typeof $scope.labelWidth === 'undefined' ? 'width-90' : 'width-' + $scope.labelWidth;

 		//input class
		$scope.inputClass  = typeof $scope.inputWidth === 'undefined' 
		 							 ? 'width-less-' + ($scope.labelWidth ? $scope.labelWidth : '90')
		 							 : 'width-less-' + $scope.inputWidth;
 		//占位符处理
 		$scope.placeholder = typeof $scope.placeholder === 'undefined' ? '请输入' : $scope.placeholder;

 		//是否为必填
 		$scope.require = typeof $scope.require === 'undefined' ? false : $scope.require;

 		//是否禁用
 		$scope.disabled = typeof $scope.disabled === 'undefined' ? false : $scope.disabled;

 	}]
 };

 export default angular
 	.module('directive.formInput', [])
 	.directive('formInput', () => {
 		return formInput;
 	})
 	.name;