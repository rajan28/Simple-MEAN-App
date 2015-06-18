var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'uiGmapgoogle-maps', 'firebase', 'main', 'user', 'article', 'bar', 'restaurant', 'club', 'chat']);

myApp.constant('FIREBASE_URL', 'https://startup-stuff.firebaseio.com/');

myApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

if (window.location.hash === '#_=_') {
    window.location.hash = '#!';
}

angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
});

myApp.directive('myMaps', function() {
	return {
		restrict : 'E',
		template : '<div></div>',
		replace : true,
		link : function(scope, element, attrs) {
			var coords = new google.maps.LatLng(50,50);
			var mapOptions = {
	          	center : coords,
	         	zoom : 8,
	         	mapType : google.maps.MapTypeId.ROADMAP
	        };
	        var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
	        var marker = new google.maps.Marker( {
	        	position : coords,
	        	map : map,
	        	title : 'Hi'
	        });
	        marker.setMap(map);
		}
	};
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