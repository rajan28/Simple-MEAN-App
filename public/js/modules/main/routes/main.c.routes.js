angular.module('main').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl : 'js/modules/main/views/index.html'
	}).
	when('/results', {
		templateUrl : 'js/modules/main/views/results.html'
	});
}]);