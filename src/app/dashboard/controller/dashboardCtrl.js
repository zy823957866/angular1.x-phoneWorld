'use strict';

//定义控制器
const ctrl = ['$scope', ($scope) => {
    $scope.regexArr = [
    	{regex:'focus', mes:'最大48字符，中文、英文、数字以及部分特殊字符',class:'grey'},
    	{regex:'require', mes:'备注不能为空', class:'red'},
    	{regex:'/^[A-Za-z0-9\u3091-\uffe5_\\\-:\.&=,@"\(\)\s]*$/', mes:'备注为中文、英文、数字以及部分特殊字符', class:'red'},
    	{regex:'<=|48', mes:'备注不能超过48个字符!',class:'red'},
    	{regex:'>=|13', mes:'备注最少13个字符！',class: 'red'},
    	{regex:'request', mes:'后台返回的错误信息！',class: 'red'},
    ];

    $scope.query = {
        msisdn : '123'
    }

    $scope.selectData = [
        {code:'1', name: '正常'},
        {code:'2', name: '单项停机'},
        {code:'3', name: '停机'},
        {code:'4', name: '销户'}
    ];
}]

export default angular
    .module('app.dashboard')
    .controller('dashCtrl', ctrl)
    .name;