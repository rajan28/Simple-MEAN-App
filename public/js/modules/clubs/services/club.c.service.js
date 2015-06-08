angular.module('club').factory('Club', ['$resource', function($resource) {
	return $resource('api/clubs/:clubId', {
		clubId : '@_id'
	}, {
		update : {
			method : 'PUT'
		}
	});
}]);