angular.module('bar').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/bars', {
		templateUrl : 'js/modules/bars/views/list-bars.html'
	}).
	when('/bars/create', {
		templateUrl : 'js/modules/bars/views/add-bar.html'
	}).
	when('/bars/:barId', {
		templateUrl : 'js/modules/bars/views/view-bar.html'
	}).
	when('/bars/:barId/edit', {
		templateUrl : 'js/modules/bars/views/edit-bar.html'
	}).
	when('/bars/:barId/chat', {
		templateUrl : 'js/modules/bars/views/chat.html'
	}).
	when('/bars/:barId/directions', {
		templateUrl : 'js/modules/bars/views/directions.html'
	}).
	when('/bars/:barId/reviews', {
		templateUrl : 'js/modules/bars/views/review-bar.html'
	});
}]);