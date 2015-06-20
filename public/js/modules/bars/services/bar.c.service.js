angular.module('bar').factory('Bar', ['$resource', function($resource) {
	return $resource('api/bars/:barId', {
		barId : '@_id'
	}, {
		update : {
			method : 'PUT'
		}
	});
}]);

angular.module('bar').factory('BarReview', ['$resource', '$location', function($resource, $location) {
	return $resource('api/bars/:barId/reviews', {
		barId : $location.path().slice(6,30)
	}, {
		update : {
			method : 'PUT'
		}
	});
}]);

angular.module('bar').factory('BarRating', ['$resource', '$location', function($resource, $location) {
	return $resource('api/bars/:barId/ratings', {
		barId : $location.path().slice(6,30)
	}, {
		update : {
			method : 'PUT'
		}
	});
}]);