angular.module('user').controller('UserCtrl', ['$scope', 'Authentication', function($scope, Authentication) {
	$scope.authentication = Authentication;

	$scope.userUrl = '../../../users/' + Authentication.id;
}]);