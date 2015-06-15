angular.module('main').controller('MainCtrl', ['$scope', 'Authentication', function($scope, Authentication) {
	$scope.authentication = Authentication;
	$scope.name = Authentication.user ? Authentication.user.fullname : 'MEAN Application';
	$scope.map = { 
		center: { 
			latitude: 45, 
			longitude: -73 
		}, 
		zoom: 8 
	};
}]);