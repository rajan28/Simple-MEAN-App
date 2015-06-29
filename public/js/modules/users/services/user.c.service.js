angular.module('user').factory('User', ['$resource', function($resource) {
	return $resource('users/:userId', {
		userId : '@_id'
	}, {
		update : {
			method : 'PUT'
		}
	});
}]);