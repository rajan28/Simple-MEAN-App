angular.module('article').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/articles', {
		templateUrl : 'js/modules/articles/views/list-articles.html'
	}).
	when('/articles/create', {
		templateUrl : 'js/modules/articles/views/create-article.html'
	}).
	when('/articles/:articleId', {
		templateUrl : 'js/modules/articles/views/view-article.html'
	}).
	when('/articles/:articleId/edit', {
		templateUrl : 'js/modules/articles/views/edit-article.html'
	});
}]);