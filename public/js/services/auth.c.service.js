angular.module('myApp').factory('Auth', function() {
	var user = window.user;

	return user;
});