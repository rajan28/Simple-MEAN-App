angular.module('main').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl : 'js/modules/main/views/index.html'
	}).
	when('/cities', {
		templateUrl : 'js/modules/main/views/list-cities.html'
	}).
	when('/careers', {
		templateUrl : 'js/modules/main/views/careers.html'
	});
}]);