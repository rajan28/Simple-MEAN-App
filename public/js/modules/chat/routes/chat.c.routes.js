angular.module('chat').config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/chat', {
			templateUrl: 'js/modules/chat/views/chat.html'
		}
	);
}]);