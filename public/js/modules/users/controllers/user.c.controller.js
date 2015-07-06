angular.module('user').controller('UserCtrl', ['$scope', '$location', '$routeParams', 'Upload', 'User', 'Authentication', function($scope, $location, $routeParams, Upload, User, Authentication) {
	$scope.authentication = Authentication;

	$scope.user = Authentication.user ? Authentication.user : '';

	$scope.editName = '/#!' + $location.path() + '/edit#name';
	$scope.editUsername = '/#!' + $location.path() + '/edit#username';
	$scope.editPassword = '/#!' + $location.path() + '/edit#password';
	$scope.editEmail = '/#!' + $location.path() + '/edit#email';
	$scope.editGender = '/#!' + $location.path() + '/edit#gender';
	$scope.editBirthday = '/#!' + $location.path() + '/edit#birthday';
	$scope.editAvatar = '/#!' + $location.path() + '/edit#avatar';
	$scope.editCity = '/#!' + $location.path() + '/edit#city';
	$scope.editG1 = '/#!' + $location.path() + '/edit#g1';
	$scope.editG2 = '/#!' + $location.path() + '/edit#g2';
	$scope.editG3 = '/#!' + $location.path() + '/edit#g3';

	$scope.findOne = function() {
		$scope.user = User.get( {
			userId : $routeParams.userId
		});
	};

	$scope.update = function() {

		$scope.user.password = $scope.password;

		$scope.user.$update(function() {
			$location.path($scope.user._id);
			location.reload();
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.updatePassword = function() {

		$scope.user.password = $scope.password;

		if ($scope.newPassword !== $scope.confirmation) {
			$scope.error = 'New Password and Confirmation of New Password Do Not Match'
			return;
		};

		$scope.user.$update(function() {
			$location.path($scope.user._id);
			location.reload();
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};



// File Upload

	// $scope.onFileSelect = function() {
	// 	console.log('hi');    

	//     if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
	//         alert('Only PNG and JPEG are accepted.');
	//         return;
	//     }

	//     $scope.uploadInProgress = true;
	//     $scope.uploadProgress = 0;
	//     console.log('hi2');

	//     $scope.upload = $upload.upload({
	//         url: '/upload/image',
	//         method: 'POST',
	//         file: image
	//     }).progress(function(event) {
	//         $scope.uploadProgress = Math.floor(event.loaded / event.total);
	//         $scope.$apply();
	//     }).success(function(data, status, headers, config) {
	//         $scope.uploadInProgress = false;
	//         // If you need uploaded file immediately 
	//         $scope.uploadedImage = JSON.parse(data);      
	//     }).error(function(err) {
	//         $scope.uploadInProgress = false;
	//         console.log('Error uploading file: ' + err.message || err);
	//     });
	//     console.log('hi3');
	// };

}]);