angular.module('bar').controller('BarCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', 'Authentication', 'Bar', function($scope, $rootScope, $routeParams, $location, $firebaseObject, $firebaseArray, FIREBASE_URL, Authentication, Bar) {
	$scope.authentication = Authentication;

	//Chat Functions
	$scope.chatroom = '/#!' + $location.path() + '/chat';

	$scope.bar = {};
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
			var chatObj = $firebaseObject(mainRef);
			chatObj.$loaded().then(function(obj) {
				$scope.chats = obj;
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
			text : $scope.message
		});
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