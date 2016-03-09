/* 修改+创建菜单 */

baseFontApp.controller("menuCreateUpdateController", function ($rootScope, $scope, $location, Flash, $uibModalInstance, menuService, params) {

	$scope.nowMenu = params;
	$scope.isCreate = $scope.nowMenu === undefined;
	$scope.ok = function () {
		if($scope.isCreate){
			$scope.create();
		}else{
			$scope.update();
		}
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	//顶层菜单
	menuService.list({level:1}).success(function(res){
		$scope.topMenu = {
			list : res.data
		};
		if(!$scope.isCreate){
			angular.forEach($scope.topMenu.list, function(top){
				if(top.id === $scope.nowMenu.parentId){
					$scope.topMenu.top = top;
					return;
				}
			});
		}
	});
	if($scope.isCreate){
		//新增菜单
		$scope.title = '新增菜单';
		$scope.entity = {
			level : '1',
			status : '0'
		};
	}else{
		//修改菜单
		$scope.title = '修改菜单';
		menuService.detail($scope.nowMenu.id).success(function(res){
			$scope.entity = res.data;
			$scope.entity.level = String($scope.entity.level);
			$scope.entity.status = String($scope.entity.status);
			$scope.orgEntity =  angular.copy($scope.entity);
		});
	}

	$scope.create = function(){
		var userParam = {
			name : $scope.entity.name,
			url:  $scope.entity.level === '1' ? undefined : $scope.entity.url,
			level: Number($scope.entity.level),
			isTail: $scope.entity.url === undefined,
			parentId: $scope.entity.level === '1' ? undefined : $scope.topMenu.top.id,
			parentName: $scope.entity.level === '1' ? undefined : $scope.topMenu.top.name,
			status: Number($scope.entity.status)
		};
		menuService.create(userParam).success(function(res){
			Flash.create('success',res.message);
			$uibModalInstance.close();
		}).error(function(rej){
			Flash.create('danger',rej.message);
		});
	};
	$scope.update = function(){
		var params = {
			name : $scope.entity.name === $scope.orgEntity.name ? undefined : $scope.entity.name,
			url:  $scope.entity.url === $scope.orgEntity.url ? undefined : $scope.entity.url,
			parentId: $scope.topMenu.top.id === $scope.orgEntity.parentId ? undefined : $scope.topMenu.top.id,
			parentName: $scope.topMenu.top.id === $scope.orgEntity.parentId ? undefined : $scope.topMenu.top.name,
			status: $scope.entity.status === $scope.orgEntity.status ? undefined : $scope.entity.status
		};
		//是否有变更
		var noChange = true;
		angular.forEach(params, function(value, key){
			if(value !== undefined){
				noChange = false;
				return;
			}
		});
		if(noChange){
			Flash.create("info", "信息未更改");
			$uibModalInstance.close();
			return;
		}
		params.id = $scope.entity.id;
		menuService.update(params).success(function(res){
			Flash.create('success',res.message);
			$uibModalInstance.close();
		}).error(function(rej){
			Flash.create('danger',rej.message);
		});
	};
});