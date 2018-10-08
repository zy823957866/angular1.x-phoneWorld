/**
 * ==========================INPUT组件=========================
 * 
 * ngModel 		input绑定的数据
 * regex   		正则表达式
 * errorArr 	显示错误信息列表及校验规则:
 * 				regex : 'focus'、'require'、'request'、'>=|13'、正则表达式
 * 				mes : '错误提示信息'
 * 				class ： 提示的calss名字，red、grey
 * borderStyle 	焦点状态的样式：blue,red三种，默认为blue
 * disabled 	是否禁用(常量)
 * ngDisabled 	是否禁用(变量)
 * palceholder 	占位符(常量)
 * palceHolder  占位符(变量)
 * 
 *============================================================*/
import './eInput.scss';
import eInputSer from './eInputSer';

 const eInput = {
 	restrict : 'EA',
 	template : `<div class="input">
 					<input type="text" class="col-xs-12"
 						ng-model="ngModel"
 						ng-class = "borderStyle" 
 						ng-focus = "focus()" 
 						ng-blur = "blur()" placeholder="{{palceholder}}" 
 						ng-init="placeholderIE(palceholder, $event)"
 						ng-disabled = "disabled">
 					<span ng-if="require" class="padding-left-5 font-bolder" ng-class="reqClass">*</span>
 					<span ng-if="errorArr" class="padding-left-10" ng-class="errClass">{{errMsg}}</span>
 				</div>`,
 	scope : {
 		ngModel : '=ngModel',
 		showError : '@showError',
 		regex : '@regex',
 		errorArr : '=errorArr',
 		palceHolder : '=placeHolder',
 		palceholder : '@placeholder',
 		disabled : '@disabled',
 		ngDisabled : '=ngDisabled'
 	},
 	link : (scope, element, attrs, controller) => {
 		//正则验证
 		const testRegex = () => {
 			if(!scope.errorArr){
 				//禁止输入
 				scope.$watch('ngModel', (newVal, oldVal) => {
 					if(newVal && newVal != oldVal){
 						let regex = new RegExp( scope.regex );
 						scope.ngModel = regex.test(newVal) ? newVal : oldVal;
 					}
 				});

 				element.bind('keydown keypress', (e) => {
 					//鼠标按下时候执行的事件...
 				});
 			}
 		};

 		if(scope.regex){
 			testRegex();
 		}
 	},
 	controller : ['$scope', 'eInputSer', ($scope, eInputSer) => {

 		//判断鼠标悬浮时的样式
 		$scope.borderStyle = typeof $scope.borderStyle === 'undefined' ? 'blueBorder' : $scope.borderStyle;

 		//默认占位符(先判断变量，再判断常量)
 		$scope.palceholder = typeof $scope.palceHolder === 'undefined' ? 
 							 typeof $scope.palceholder === 'undefined' ? '请输入' : $scope.palceholder
 							 : $scope.palceHolder;

 		//是否禁用
 		$scope.disabled = typeof $scope.ngDisabled === 'undefined' ? 
 						  typeof $scope.disabled === 'undefined' ? false : $scope.disabled
 						  : $scope.ngDisabled;

 		//占位符IE兼容处理
 		$scope.placeholderIE = (palceholder, e) => eInputSer.placeHolderIE(palceholder, e);

 		//显示输入框错误信息
 		if($scope.errorArr && $scope.errorArr.length){
 			//获取错误类型
 			let types = new Set();

 			//获取types
 			eInputSer.errType('', true);

 			//默认状态显示
 			if(types.has('require')){
 				let requireMsg = eInputSer.errType('require');

 				$scope.require = true;
 				$scope.reqClass = 'red';
 			}
 			

 			//FOCUS事件显示
 			if(types.has('focus')){
				$scope.focus = () => {
					let focusMsg = eInputSer.errType('focus');
					$scope.errClass = focusMsg.class || 'grey';
					$scope.errMsg = focusMsg.mes || '';
					$scope.focusMsg = focusMsg.mes || '';
	 			}
 			}
 			
 			
 			//BLUR事件显示
 			$scope.blur = () => {
 				//数据进行去空格处理(去除首尾空格)
 				let model = ($scope.ngModel || '').replace(/(^\s*)|(\s*$)/g, "");

 				//空数据判断
 				if(types.has('require') && !model){
 					let requireMsg = eInputSer.errType('require');

 					$scope.errClass = requireMsg.class || 'red';
 					$scope.errMsg = requireMsg.mes || '';
 					return false;
 				}
 				
 				//正则验证错误
 				if(types.has('regex')){
					let reg = eInputSer.errType('regex');
					let regex = new RegExp( reg.regex.substring(1, reg.regex.length - 1) );

					if(!regex.test( $scope.ngModel )){
						$scope.errClass = reg.class || 'red';
						$scope.errMsg = reg.mes || '';
						return false;
					}
 				}
 				
 				
 				//最大、最小长度验证
 				if(types.has('regex')){
 					let validLens = eInputSer.errType('len');
 				
	 				for (let validLen of validLens) {
	 					let  _lenArr = validLen.regex.split("|");
	 					if(!eInputSer.validLength( _lenArr[0], parseInt(_lenArr[1] ))){
	 						$scope.errClass = validLen.class || 'red';
	 						$scope.errMsg = validLen.mes || '';
	 						return false;
	 					}
	 				}
 				}
 				

 				//后台返回的错误信息(如用户名不能重复等)
 				if(types.has('request')){
 					let req = eInputSer.errType('request');

 					$scope.errClass = req.class || 'red';
 					$scope.errMsg = req.mes || '';
 					return false;
 				}
 				

 				//验证通过则清空错误信息内容
 				if($scope.errMsg === $scope.focusMsg){
 					$scope.errMsg = '';
 				}
 			}
	
 		}
 	}]
 };

 export default angular
 	.module('directive.eInput', [eInputSer])
 	.directive('eInput', () => {
 		return eInput;
 	})
 	.name;