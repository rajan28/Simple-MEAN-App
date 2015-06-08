angular.module('club').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/clubs', {
		templateUrl : 'js/modules/clubs/views/list-clubs.html'
	}).
	when('/clubs/create', {
		templateUrl : 'js/modules/clubs/views/add-club.html'
	}).
	when('/clubs/:clubId', {
		templateUrl : 'js/modules/clubs/views/view-club.html'
	}).
	when('/clubs/:clubId/edit', {
		templateUrl : 'js/modules/clubs/views/edit-club.html'
	});
}]);