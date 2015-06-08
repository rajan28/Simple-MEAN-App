angular.module('bar').controller('BarCtrl', ['$scope', '$routeParams', '$location', 'Authentication', 'Bar', function($scope, $routeParams, $location, Authentication, Bar) {
	$scope.authentication = Authentication;

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