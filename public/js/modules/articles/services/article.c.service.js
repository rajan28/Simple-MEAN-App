angular.module('article').factory('Article', ['$resource', function($resource) {
	return $resource('api/articles/:articleId', {
		articleId : '@_id'
	}, {
		update : {
			method : 'PUT'
		}
	});
}]);