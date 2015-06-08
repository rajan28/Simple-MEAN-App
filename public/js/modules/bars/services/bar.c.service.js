angular.module('bar').factory('Bar', ['$resource', function($resource) {
	return $resource('api/bars/:barId', {
		barId : '@_id'
	}, {
		update : {
			method : 'PUT'
		}
	});
}]);