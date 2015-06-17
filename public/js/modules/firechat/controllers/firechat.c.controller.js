angular.module('firechat').controller('FirechatCtrl', ['$scope', '$firebaseObject', 'FIREBASE_URL', function($scope, $firebaseObject, FIREBASE_URL) {
	var chatRef = new Firebase(FIREBASE_URL + 'messages');

	$scope.test = function() {
		chatRef.push( {
			imageUrl : '',
			sender : 'Bob',
			text : $scope.testing
		});
	};

}]);