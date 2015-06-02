angular.module('users').factory('Auth', [ function() {
	this.user = window.user;
	return {
		user : this.user
	};
}]);