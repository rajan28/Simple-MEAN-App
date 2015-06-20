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

// myApp.run(['$rootScope', '$location', function($rootScope, $location) {
//   $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
//     if(error === 'AUTH_REQUIRED') {
//       $rootScope.message = 'Please login to access this page.';
//       $location.path('/login');
//     }
//   });
// }]);

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

myApp.directive("starRating", function() {
    return {
        restrict : "EA",
        template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
                   "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
                   "    <i class='fa fa-star'></i>" + //&#9733
                   "  </li>" +
                   "</ul>",
        scope : {
          ratingValue : "=ngModel",
          max : "=?",
          onRatingSelected : "&?",
          readonly: "=?"
        },
        link : function(scope, elem, attrs) {
          if (scope.max == undefined) { scope.max = 10; }
          function updateStars() {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
              scope.stars.push({
                filled : i < scope.ratingValue
              });
            }
          };
          scope.toggle = function(index) {
            if (scope.readonly == undefined || scope.readonly == false){
              scope.ratingValue = index + 1;
              scope.onRatingSelected({
                rating: index + 1
              });
            }
          };
          scope.$watch("ratingValue", function(oldVal, newVal) {
            if (newVal) { updateStars(); }
          });
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