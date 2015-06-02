angular.module('test').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl : 'test/views/test.c.view.html'
	}).
	otherwise( {
		redirectTo : '/'
	});
}]);