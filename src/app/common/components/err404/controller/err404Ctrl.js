'use strict';

const ctrl = ['$scope', ($scope) => {
    $scope.test = function() {
        alert('hah');
    }
}]

export default angular
    .module('app.err')
    .controller('errCtrl', ctrl)
    .name;