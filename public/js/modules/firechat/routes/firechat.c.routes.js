angular.module('firechat').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/firechat', {
		templateUrl : 'js/modules/firechat/views/firechat.html'
	});
}]);