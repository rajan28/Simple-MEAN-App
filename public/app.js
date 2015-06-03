var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'main']);

myApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

if (window.location.hash === '#_=_') {
    window.location.hash = '#!';
}

angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
});

// angular.module('myApp').config(['$routeProvider', function($routeProvider) {
//     $routeProvider.
//     when('/', {
//         templateUrl : 'views/index.html',
//         controller : 'TestCtrl'
//     }).
//     when('/register', {
//         templateUrl : 'views/register.html',
//         controller : 'TestCtrl'
//     }).
//     when('/login', {
//         templateUrl : 'views/login.html',
//         controller : 'TestCtrl'
//     }).
//     otherwise( {
//         redirectTo : '/'
//     });
// }]);