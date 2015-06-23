angular.module('user').controller('UserCtrl', ['$scope', '$location', 'Authentication', function($scope, $location, Authentication) {
	$scope.authentication = Authentication;

	$scope.user = Authentication.user ? Authentication.user : '';

	$scope.edit = '/#!' + $location.path() + '/edit';

	
}]);