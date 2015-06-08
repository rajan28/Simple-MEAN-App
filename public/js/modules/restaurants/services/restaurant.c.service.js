angular.module('restaurant').factory('Restaurant', ['$resource', function($resource) {
	return $resource('api/restaurants/:restaurantId', {
		restaurantId : '@_id'
	}, {
		update : {
			method : 'PUT'
		}
	});
}]);