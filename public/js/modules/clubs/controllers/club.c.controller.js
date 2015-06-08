angular.module('club').controller('ClubCtrl', ['$scope', '$routeParams', '$location', 'Authentication', 'Club', function($scope, $routeParams, $location, Authentication, Club) {
	$scope.authentication = Authentication;

	$scope.create = function() {
		var club = new Club( {
			name : this.name,
			city : this.city,
			address : this.address,
			ageMin : this.ageMin,
			ageMax : this.ageMax,
			price : this.price
		});
		club.$save(function(res) {
			$location.path('clubs/' + res._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.find = function() {
		$scope.clubs = Club.query();
	};

	$scope.findOne = function() {
		$scope.club = Club.get( {
			clubId : $routeParams.clubId
		});
	};

	$scope.update = function() {
		$scope.club.$update(function() {
			$location.path('clubs/' + $scope.club._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.delete = function(club) {
		if (club) { 
			club.$remove(function() { 
				for (var i in $scope.clubs) { 
					if ($scope.clubs[i] === club) { 
						$scope.clubs.splice(i, 1); 
					} 
				} 
			}); 
		} else { 
			$scope.club.$remove(function() { 
				$location.path('clubs'); 
			}); 
		} 
	};

}]);