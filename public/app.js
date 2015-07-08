var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'uiGmapgoogle-maps', 'firebase', 'main', 'user', 'article', 'bar', 'restaurant', 'club', 'chat']);

myApp.constant('FIREBASE_URL', 'https://startup-stuff.firebaseio.com/');

myApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

myApp.controller('MyRootController', function($scope, $location, $rootScope, $log) {
      // your controller initialization here ...
      $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        $log.info("location changing to:" + next); 
      });
});

if (window.location.hash === '#_=_') {
    window.location.hash = '#!';
}
if (window.location.hash === '#!/#one') {
    window.location.hash = '#!';
}
if (window.location.hash === '#!/#two') {
    window.location.hash = '#!';
}
if (window.location.hash === '#!/#three') {
    window.location.hash = '#!';
}

angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
});

var body = angular.element(document).find('body');
// if (window.location.href !== "http://localhost:8000/#!/" || "http://localhost:8000/#!/#one" || "http://localhost:8000/#!/#two" || "http://localhost:8000/#!/#three") {
//     body.removeClass('landing');
// };

// myApp.config(['$location', function($location) {
//   if ($location.path !== '/' || '/#one' || '/#two' || '/#three') {
//     body.removeClass('landing');
//   };
// }]);

// myApp.run(['$rootScope', '$location', function($rootScope, $location) {
//   $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
//     if(error === 'AUTH_REQUIRED') {
//       $rootScope.message = 'Please login to access this page.';
//       $location.path('/login');
//     }
//   });
// }]);

// myApp.directive('myMaps', function() {
//     return {
//         restrict : 'E',
//         template : '<div></div>',
//         replace : true,
//         scope : {
//           latitude : '=?',
//           longitude : '=?'
//         },
//         link : function(scope, element, attrs) {
//             var coords = new google.maps.LatLng(scope.latitude,scope.longitude);
//             var mapOptions = {
//                 center : coords,
//                 zoom : 8,
//                 mapType : google.maps.MapTypeId.ROADMAP
//             };
//             var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
//             var marker = new google.maps.Marker( {
//                 position : coords,
//                 map : map,
//                 title : 'Hi'
//             });
//             marker.setMap(map);
//         }
//     };
// });

myApp.directive('hello', function() {
    // return {
    //     link : function(scope, element, attrs) {
    //         var options = scope.$eval(attrs.hi);
    //         scope.hiMessage = options.message.split(" ");
    //         element.text(result);
    //     },
    //     template : "<ul>\
    //                   <li ng-repeat='word in hiMessage'>\
    //                     {{word}}\
    //                   </li>\
    //                 </ul>"
    // };

    // return {
    //     template : "<i>{{message}}</i>",
    //     controller : function($scope) {
    //       $scope.message = "from internal";
    //     }
    // };

    // return {
    //   template : "<p>this {{message}}</p>",
    //   scope : {
    //     message : '=?'
    //   }
    // };
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

// var compareTo = function() {
//   return {
//     require: "ngModel",
//     scope: {
//       otherModelValue: "=compareTo"
//     },
//     link: function(scope, element, attributes, ngModel) {

//       ngModel.$validators.compareTo = function(modelValue) {
//         return modelValue == scope.otherModelValue;
//       };

//       scope.$watch("otherModelValue", function() {
//         ngModel.$validate();
//       });
//     }
//   };
// };

// myApp.directive("compareTo", compareTo);

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