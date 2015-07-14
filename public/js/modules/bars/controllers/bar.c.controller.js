angular.module('bar').controller('BarCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$firebaseObject', '$firebaseArray', '$resource', 'FIREBASE_URL', 'Authentication', 'Bar', 'BarReview', 'BarRating', function($scope, $rootScope, $routeParams, $location, $firebaseObject, $firebaseArray, $resource, FIREBASE_URL, Authentication, Bar, BarReview, BarRating) {
    $scope.authentication = Authentication

    $scope.featuredName = 'Bob';
    $scope.featuredRating = 3;


    window.barPics = ["images/yeoman.png"];
    $scope.pic1 = window.barPics[0];

    //Carousel

    $(document).ready(function() {
      $("#owl-demo").owlCarousel({
        items : 4,
        lazyLoad : true,
        autoHeight : false
      }); 
    });

    $('.item').on('click', function(event){
        var $this = $(this);
        if($this.hasClass('clicked')){
            $this.removeAttr('style').removeClass('clicked');
        } else {
            $this.css('min-height','400px').addClass('clicked');
        }
    });

    // MAPS

    $scope.directionUrl = '/#!' + $location.path() + '/directions';

    var map;
    google.maps.event.addDomListener(window, 'load', $scope.initializeViewBar);

    $scope.initializeViewBar = function() {
      var mapOptions = {
        zoom: 11
      };
      map = new google.maps.Map(document.getElementById('location-map-canvas'),
          mapOptions);

      // Try HTML5 geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);

          var locationPos = new google.maps.LatLng(window.bar.latitude, window.bar.longitude);

          var contentString = '<p>You are here.<br><a href="' + $scope.directionUrl + '">Get Directions to ' + $scope.bar.name + '</a></p>';

          var infowindow = new google.maps.InfoWindow({
              content: contentString
          });

          var marker = new google.maps.Marker({
            map: map,
            position: pos,
            title: 'You are here.'
          });

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });

          var locationcontentString = '<h2>' + $scope.bar.name + '</h2>' + '<p>sdfsd</p>';

          var locationinfowindow = new google.maps.InfoWindow({
              content: locationcontentString
          });

          var locationmarker = new google.maps.Marker({
            position: locationPos,
            map: map,
            title: 'Hello World!'
          });

          google.maps.event.addListener(locationmarker, 'click', function() {
            locationinfowindow.open(map, locationmarker);
          });

          map.setCenter(locationPos);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
    };

    $scope.handleNoGeolocation = function(errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }

      var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
      };

      var infowindow = new google.maps.InfoWindow(options);
      map.setCenter(options.position);
    };

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    google.maps.event.addDomListener(window, 'load', $scope.initialize);

    $scope.initialize = function() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(41.850033, -87.6500523)
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('directions-panel'));

        // var control = document.getElementById('control');
        // control.style.display = 'block';
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(control);
    };

    $scope.calcRoute = function() {
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        var mode = document.getElementById('mode').value;
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode[mode]
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            };
        });

        $scope.start = '';
    };

    $scope.latitude = 50;
    $scope.longitude = 50;

    // Rating, Review Functions
    $scope.reviewsPage = '/#!' + $location.path() + '/reviews';

    $scope.rating = 5; //get request to ratings
    $scope.rating2 = 5;
    $scope.isReadonly = true;

    $scope.createReview = function() {
        var review = new BarReview( {
            rating : this.rating,
            title : this.title,
            content : this.content,
            user : window.user.username,
            barNameAndCity : $scope.bar.name + ' ' + $scope.bar.city
        });
        review.$save(function(res) {
            // $location.path('bars/' + res._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // $scope.sendRating = function() {
    //  var rating = new BarRating( {
    //      rating : $scope.rating1,
    //      user : window.user.username
    //  });
    //  for (i=0; i < 1; i++) {
    //      for (i=0; i < $scope.ratings.length; i++) {
    //          if ($scope.ratings[i].user == window.user.username) {
    //              var ratingToRemove = $resource('api/bars/:barId/ratings/:ratingId', {
    //                  barId : $location.path().slice(6,30),
    //                  ratingId : $scope.ratings[i]._id
    //              });
    //              $scope.ratings[i].$remove(function (info) {
    //                  if (info) {
    //                      console.log('rating deleted');
    //                  };
    //              });
    //          };
    //      };
    //      rating.$save(function(res) {

    //      }, function(errorResponse) {
    //          $scope.error = errorResponse.data.message;
    //      });
    //  };
    // };



    //Chat Functions
    $scope.chatroom = '/#!' + $location.path() + '/chat';

    //$scope.bar = {};
    var chatRef = '';
    $scope.group = 0;
    $scope.groupSize = '';
    $scope.sender = '';

    $scope.createInfo = function() {
        $scope.bar = Bar.get( {
            barId : $routeParams.barId
        }).$promise.then(function(data) {
            chatRef = new Firebase(FIREBASE_URL + 'chatrooms/' + data.name);
            $scope.bar = data;
            var groupRef = new Firebase(FIREBASE_URL + 'chatrooms/' + data.name + '/groups');
            var mainRef = new Firebase(FIREBASE_URL + 'chatrooms/' + data.name + '/main');
            var chatArray = $firebaseArray(mainRef);
            chatArray.$loaded().then(function(arr) {
                $scope.chats = arr;
            });

            groupRef.once('value', function(dataSnapshot) {
                $scope.group = dataSnapshot.numChildren() + 1;
                window.sender = window.user ? window.user.username : window.local;
                $scope.groupSize = window.queryObject ? window.queryObject.groupSize : '';
                var groupArray = $firebaseArray(groupRef);
                groupArray.$loaded().then(function(data) {
                    if(data.length === 0) {
                        groupRef.push( {
                            group : $scope.group,
                            groupSize : $scope.groupSize,
                            sender : window.sender
                        });
                        $scope.sender = window.sender
                        console.log('hi');
                    }
                    else {
                        for (i=0; i < data.length; i++) {
                            if (window.sender == data[i].sender) {
                                $scope.group = data[i].group;
                                $scope.groupSize = data[i].groupSize;
                                $scope.sender = data[i].sender;
                                break;
                            }; 
                            if (i == data.length-1) {
                                groupRef.push( {
                                    group : $scope.group,
                                    groupSize : $scope.groupSize,
                                    sender : window.sender
                                });
                                $scope.sender = window.sender
                            };
                        };
                    };
                });         
            });

// TODO Create a function that identifies and styles chats that were created by the current group

            // for(i=0; i < $scope.chats.length; i++) {
            //     if ($scope.chats[i].group === $scope.group) {
            //         $
            //     }
            // };
        });
    };

    $scope.notSignedIn = function() {

    };

    $scope.main = function() {
        var mainRef = new Firebase(FIREBASE_URL + 'chatrooms/' + $scope.bar.name + '/main');
        mainRef.push( {
            group : $scope.group,
            groupSize : $scope.groupSize,
            sender : $scope.sender,
            text : $scope.message,
            time : Date.now()
        });
        $scope.message = '';
    };

    //Bar Functions

    $scope.create = function() {
        var bar = new Bar( {
            name : this.newbar.name,
            city : this.newbar.city,
            address : this.newbar.address,
            ageMin : this.newbar.ageMin,
            ageMax : this.newbar.ageMax,
            price : this.newbar.price,
            latitude : this.newbar.latitude,
            longitude : this.newbar.longitude,
            information : this.newbar.information,
            hours : this.newbar.hours,
            featured : this.newbar.featured,
            pic1 : this.newbar.pic1,
            pic2 : this.newbar.pic2
        });
        bar.$save(function(res) {
            $location.path('bars/' + res._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    $scope.find = function() {
        $scope.bars = Bar.query();
    };

    $scope.findOne = function() {
        $scope.bar = Bar.get( {
            barId : $routeParams.barId
        });
        window.bar = $scope.bar;
        $scope.reviews = BarReview.query();
        // $scope.ratings = BarRating.query();
    };

    $scope.update = function() {
        $scope.bar.$update(function() {
            $location.path('bars/' + $scope.bar._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    $scope.delete = function(bar) {
        if (bar) { 
            bar.$remove(function() { 
                for (var i in $scope.bars) { 
                    if ($scope.bars[i] === bar) { 
                        $scope.bars.splice(i, 1); 
                    } 
                } 
            }); 
        } else { 
            $scope.bar.$remove(function() { 
                $location.path('bars'); 
            }); 
        } 
    };

}]);



