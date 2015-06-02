var myApp = angular.module('myApp', ['ngRoute', 'test']);

myApp.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('!');
}]);

// angular.element(document).ready(function() {
// 	angular.bootstrap(document, ['myApp']);
// });

// myApp.config(['$routeProvider', function($routeProvider) {
//   $routeProvider.
//   when('/register', {
//   	templateUrl : 'views/register.html',
//   	controller : 'UserController'
//   }).
//   otherwise( {
//   	redirectTo : '/'
//   });
// }]);