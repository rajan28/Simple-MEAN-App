var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'uiGmapgoogle-maps', 'firebase', 'main', 'user', 'article', 'bar', 'restaurant', 'club', 'chat']);

myApp.constant('FIREBASE_URL', 'https://startup-stuff.firebaseio.com/');

myApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

// myApp.config(['$routeProvider', function($routeProvider) {
//   $routeProvider.
// }])

myApp.controller('MyRootController', function($scope, $location, $rootScope, $log) {
      // your controller initialization here ...
      $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        $log.info("location changing to:" + next); 
      });
});

if (window.location.hash === '#_=_') {
    window.location.hash = '#!';
}
// if (window.location.hash === '#!/#one') {
//     window.location.hash = '#!';
// }
// if (window.location.hash === '#!/#two') {
//     window.location.hash = '#!';
// }
// if (window.location.hash === '#!/#three') {
//     window.location.hash = '#!';
// }

angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
});

var body = angular.element(document).find('body');

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
              // scope.onRatingSelected({
              //   rating: index + 1
              // });
            }
          };
          scope.$watch("ratingValue", function(oldVal, newVal) {
            if (newVal) { updateStars(); }
          });
        }
    };
});