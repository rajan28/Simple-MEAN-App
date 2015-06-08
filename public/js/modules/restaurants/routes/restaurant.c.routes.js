angular.module('restaurant').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/restaurants', {
		templateUrl : 'js/modules/restaurants/views/list-restaurants.html'
	}).
	when('/restaurants/create', {
		templateUrl : 'js/modules/restaurants/views/add-restaurant.html'
	}).
	when('/restaurants/:restaurantId', {
		templateUrl : 'js/modules/restaurants/views/view-restaurant.html'
	}).
	when('/restaurants/:restaurantId/edit', {
		templateUrl : 'js/modules/restaurants/views/edit-restaurant.html'
	});
}]);