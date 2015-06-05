angular.module('main').controller('MainCtrl', ['$scope', 'Authentication', function($scope, Authentication) {
	$scope.authentication = Authentication;
	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';
}]);