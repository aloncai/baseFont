/* 修改用户信息 */

baseFontApp.controller("userCreateController", function ($rootScope, $scope, $location, Flash, userService, $uibModalInstance) {

	
	$scope.ok = function () {
		$scope.create();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.create = function(){
		var reqParams = {
			userId : $scope.entity.userId,
			userName : $scope.entity.userName,
			nickName : $scope.entity.nickName,
			userMobile : $scope.entity.userMobile,
			userSex : $scope.entity.userSex,
			userBirth : $scope.entity.userBirth.getTime(),
			imgUrl : $scope.entity.imgUrl
		};
		userService.create(reqParams).success(function(res){
			Flash.create('success', $rootScope.i18n.public.create + $rootScope.i18n.public.successed);
			$uibModalInstance.close('ok');
		}).error(function(rej){
			if(rej.code === 2){
				Flash.create('danger', $rootScope.i18n.user.createUserErrorExist);
			}
		});
	};
});