angular.module('main').controller('MainCtrl', ['$scope', '$rootScope', '$location', 'Authentication', 'Bar', 'Club', 'Restaurant', function($scope, $rootScope, $location, Authentication, Bar, Club, Restaurant) {
	$scope.authentication = Authentication;
	$scope.logstatus = Authentication.user ? true : false;
	$scope.name = Authentication.user ? Authentication.user.firstname : 'MEAN Application';
	$scope.userID = Authentication.user ? Authentication.user.id : 'MEAN Application';
	$scope.toProfile = '/#!/' + $scope.userID.toString();

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

		var control = document.getElementById('control');
		control.style.display = 'block';
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(control);
	};

	$scope.calcRoute = function() {
		var start = document.getElementById('start').value;
		var end = document.getElementById('end').value;
		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
	  		if (status == google.maps.DirectionsStatus.OK) {
	    		directionsDisplay.setDirections(response);
	  		};
		});
	};

	$scope.queryHandler = function() {
		var queryObject = {
			city : $scope.location,
			locationType : $scope.type,
			price : $scope.price,
			age : $scope.age,
			groupSize : $scope.group
		};

		window.queryObject = queryObject;

		if(queryObject.locationType === 'Bar') {
			$scope.possibilities = [];
			$scope.options = Bar.query();
			$scope.options.$promise.then(function(data) {
				for(i=0; i < data.length; i++) {
					if ((queryObject.city === data[i].city) && (queryObject.age >= data[i].ageMin) && (queryObject.age <= data[i].ageMax) && (queryObject.price == data[i].price)) {
						$scope.possibilities.push(data[i]);
					};
				};
			}).then(function(data) {
				//if $scope.possibilities is empty, throw error to client
				for (i=0; i < $scope.possibilities.length; i++) {
					if ($scope.possibilities[i].featured) {
						$rootScope.chosen = $scope.possibilities[i];
						$location.path('bars/' + $scope.possibilities[i]._id);
					};
				};
				$location.path('bars/' + $scope.possibilities[0]._id);
			});
		}

		else if(queryObject.locationType === 'Club') {
			$scope.options = Club.query();
			$scope.options.$promise.then(function(data) {
				
			});
		}

		else if(queryObject.locationType === 'Restaurant') {
			$scope.options = Restaurant.query();
			$scope.options.$promise.then(function(data) {
				
			});
		};


			//locationType
			//age
			//price
			//city
			//group size
			//prefs (like city, part of user schema)

			//Create a new object with all the relevant info
			//OR abandon this and do a put request to the user schema
	};

}]);