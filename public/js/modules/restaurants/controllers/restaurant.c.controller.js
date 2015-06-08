angular.module('restaurant').controller('RestaurantCtrl', ['$scope', '$routeParams', '$location', 'Authentication', 'Restaurant', function($scope, $routeParams, $location, Authentication, Restaurant) {
	$scope.authentication = Authentication;

	$scope.create = function() {
		var restaurant = new Restaurant( {
			name : this.name,
			city : this.city,
			address : this.address,
			ageMin : this.ageMin,
			ageMax : this.ageMax,
			price : this.price
		});
		restaurant.$save(function(res) {
			$location.path('restaurants/' + res._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.find = function() {
		$scope.restaurants = Restaurant.query();
	};

	$scope.findOne = function() {
		$scope.restaurant = Restaurant.get( {
			restaurantId : $routeParams.restaurantId
		});
	};

	$scope.update = function() {
		$scope.restaurant.$update(function() {
			$location.path('restaurants/' + $scope.restaurant._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.delete = function(restaurant) {
		if (restaurant) { 
			restaurant.$remove(function() { 
				for (var i in $scope.restaurants) { 
					if ($scope.restaurants[i] === restaurant) { 
						$scope.restaurants.splice(i, 1); 
					} 
				} 
			}); 
		} else { 
			$scope.restaurant.$remove(function() { 
				$location.path('restaurants'); 
			}); 
		} 
	};

}]);