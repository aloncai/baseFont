/* 修改用户信息 */

baseFontApp.controller("menuRelationController", function ($rootScope, $scope, $location, Flash, $uibModalInstance, menuService) {

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	menuService.list().success(function(res){
		var menuList = res.data;
		$scope.relationMenuList = [];
		//目前只支持两级目录
        angular.forEach(menuList, function(menu){
            if(menu.level === 1){
                $scope.relationMenuList.push(menu);
                menu.subMenuList = [];
                angular.forEach(menuList, function(subMenu){
                    if(subMenu.parentId === menu.id){
                        menu.subMenuList.push(subMenu);
                    }
                });
            }
        });

	});
});