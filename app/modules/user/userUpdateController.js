/* 修改用户信息 */

baseFontApp.controller("userUpdateController", function ($rootScope, $scope, $location, Flash, userService, $uibModalInstance, params) {

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	var userDbId = params.id;
	userService.detail(userDbId).success(function(res){
		$scope.entity = res.data;
		$scope.entity.userSex = String($scope.entity.userSex);
		$scope.orgEntity = angular.copy($scope.entity);
		$scope.entity.userBirth = new Date($scope.entity.userBirth);
	});

	$scope.update = function(){
		var reqParams = {
			userName : $scope.entity.userName === $scope.orgEntity.userName ? undefined : $scope.entity.userName,
			nickName : $scope.entity.nickName === $scope.orgEntity.nickName ? undefined : $scope.entity.nickName,
			userMobile : $scope.entity.userMobile === $scope.orgEntity.userMobile ? undefined : $scope.entity.userMobile,
			userSex : $scope.entity.userSex === $scope.orgEntity.userSex ? undefined : $scope.entity.userSex,
			userBirth : $scope.entity.userBirth.getTime() === $scope.orgEntity.userBirth ? undefined : $scope.entity.userBirth.getTime()
		};
		//是否有变更
		var noChange = true;
		angular.forEach(reqParams, function(value, key){
			if(value !== undefined){
				noChange = false;
				return;
			}
		});
		if(noChange){
			Flash.create("info", $rootScope.i18n.public.noChange);
			$scope.ok();
		}else{
			reqParams.id = $scope.entity.id;
			userService.update(reqParams).success(function(res){
				Flash.create("info",  $rootScope.i18n.public.update +  $rootScope.i18n.public.successed);
				$scope.ok();
			}).error(function(rej){
			});
		}

	};
});