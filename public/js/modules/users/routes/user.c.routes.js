angular.module('user').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/profile/edit', {
		templateUrl : 'js/modules/users/views/edit-profile.html'
	});
}]);