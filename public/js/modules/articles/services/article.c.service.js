angular.module('article').factory('Article', ['$resource', function($resource) {
	return $resource('api/articls/:articleId', {
		articleId : '@_id'
	}, {
		update : {
			method : 'PUT'
		}
	});
}]);