angular.module('bar').controller('BarCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$firebaseObject', '$firebaseArray', '$resource', 'FIREBASE_URL', 'Authentication', 'Bar', 'BarReview', 'BarRating', function($scope, $rootScope, $routeParams, $location, $firebaseObject, $firebaseArray, $resource, FIREBASE_URL, Authentication, Bar, BarReview, BarRating) {
	$scope.authentication = Authentication;

	$scope.featuredRating = 3;

	//Carousel

	$scope.initializeCarousel= function() {
		$('.center').slick( {
		  lazyLoad: 'ondemand',
		  slidesToShow: 3,
		  slidesToScroll: 1
		});
	};

	// MAPS
	$scope.directionUrl = '/#!' + $location.path() + '/directions';

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
			user : window.user.username
		});
		review.$save(function(res) {
			// $location.path('bars/' + res._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// $scope.sendRating = function() {
	// 	var rating = new BarRating( {
	// 		rating : $scope.rating1,
	// 		user : window.user.username
	// 	});
	// 	for (i=0; i < 1; i++) {
	// 		for (i=0; i < $scope.ratings.length; i++) {
	// 			if ($scope.ratings[i].user == window.user.username) {
	// 				var ratingToRemove = $resource('api/bars/:barId/ratings/:ratingId', {
	// 					barId : $location.path().slice(6,30),
	// 					ratingId : $scope.ratings[i]._id
	// 				});
	// 				$scope.ratings[i].$remove(function (info) {
	// 					if (info) {
	// 						console.log('rating deleted');
	//                 	};
	// 				});
	// 			};
	// 		};
	// 		rating.$save(function(res) {

	// 		}, function(errorResponse) {
	// 			$scope.error = errorResponse.data.message;
	// 		});
	// 	};
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
				});			
			});
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
			name : this.name,
			city : this.city,
			address : this.address,
			ageMin : this.ageMin,
			ageMax : this.ageMax,
			price : this.price
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