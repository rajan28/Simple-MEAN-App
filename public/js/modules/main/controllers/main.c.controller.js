angular.module('main').controller('MainCtrl', ['$scope', '$rootScope', '$http', '$location', 'Authentication', 'Bar', 'Club', 'Restaurant', function($scope, $rootScope, $http, $location, Authentication, Bar, Club, Restaurant) {
	$scope.authentication = Authentication;
	$scope.logstatus = Authentication.user ? true : false;
	$scope.firstname = Authentication.user ? Authentication.user.firstname : '';
	$scope.name = Authentication.user ? Authentication.user.fullname : '';
	$scope.email = Authentication.user ? Authentication.user.email : '';
	$scope.userID = Authentication.user ? Authentication.user.id : '';
	$scope.toProfile = '/#!/' + $scope.userID.toString();
	var body = angular.element(document).find('body');

	$scope.watcher = function() {
		$scope.$watch(function() {
    		return $location.path();
		}, function(value) {
    		if ((value != '/') && (body.hasClass('landing'))) {
    			body.removeClass('landing');
    		};
    		if ((value == '/') && (body.hasClass('landing') === false)) {
    			body.addClass('landing');
    		};
		});
	};

	$scope.sendMail = function() {
		var data = {
			name : this.name,
			email : this.email,
			message : this.message
		};

		$http.post('/contact', data).
			success(function(data, status, headers, config) {
				console.log('success');
			}).
			error(function(data, status, headers, config) {
				console.log('failure');
			});

		$scope.name = '';
		$scope.email = '';
		$scope.message = '';
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
					console.log($scope.possibilities[i]);
					if ($scope.possibilities[i].featured) {
						console.log('hi');
						return $location.path('bars/' + $scope.possibilities[i]._id);
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