angular.module('user').controller('UserCtrl', ['$scope', '$location', '$routeParams', 'User', 'Authentication', function($scope, $location, $routeParams, User, Authentication) {
	$scope.authentication = Authentication;

	$scope.user = Authentication.user ? Authentication.user : '';

	$scope.editName = '/#!' + $location.path() + '/edit#name';

	$scope.findOne = function() {
		$scope.user = User.get( {
			userId : $routeParams.userId
		});
	};

	$scope.update = function() {
		$scope.user.$update(function() {
			$location.path($scope.user._id);
			location.reload();
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};
	
}]);