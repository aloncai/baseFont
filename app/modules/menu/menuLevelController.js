/* 修改用户信息 */

baseFontApp.controller("menuLevelController", function ($rootScope, $scope, $location, Flash, $uibModalInstance, menuService, params) {

	$scope.nowMenu = params;
	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	//等级菜单-获取子菜单
	if($scope.nowMenu.level === 1){
		//父菜单
		$scope.parentMenu = $scope.nowMenu;
		//子菜单
		menuService.list({parentId : $scope.nowMenu.parentId}).success(function(res){
			$scope.subMenuList = res.data;
		});
	}else{
		//子菜单
		menuService.list({parentId : $scope.nowMenu.parentId}).success(function(res){
			$scope.subMenuList = res.data;
		});
		//父菜单
		menuService.detail($scope.nowMenu.parentId).success(function(res){
			$scope.parentMenu = res.data;
		});
	}
});