angular.module('user').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/:userId', {
		templateUrl : 'js/modules/users/views/view-profile.html'
	}).
	when('/:userId/edit', {
		templateUrl : 'js/modules/users/views/edit-profile.html'
	});
}]);