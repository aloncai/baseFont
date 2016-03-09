/* 修改用户信息 */

baseFontApp.controller("userCreateController", function ($rootScope, $scope, $location, Flash, userService, $uibModalInstance) {
	var dictionary = $rootScope.global.dictionary;
	$scope.label = dictionary.user.label;
	$scope.holder = dictionary.user.holder;
	$scope.public = dictionary.public;
	
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
			userBirth : $scope.entity.userBirth.getTime()
		};
		userService.create(reqParams).success(function(res){
			Flash.create('success', "创建成功");
			$uibModalInstance.close('ok');
		}).error(function(rej){
			if(rej.code === 2){
				Flash.create('danger', "用户ID已存在");
			}
		});
	};
});