/* 修改用户信息 */

baseFontApp.controller("userUpdateController", function ($rootScope, $scope, $location, Flash, userService) {
	var dictionary = $rootScope.global.dictionary;
	$scope.label = dictionary.user.label;
	$scope.holder = dictionary.user.holder;

});