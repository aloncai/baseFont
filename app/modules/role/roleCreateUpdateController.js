/* 修改+创建菜单 */

baseFontApp.controller("roleCreateUpdateController", function ($rootScope, $scope, $location, Flash, $uibModalInstance, roleService, params) {

	$scope.nowRole = params;
	$scope.isCreate = $scope.nowRole === undefined;
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
	
	if($scope.isCreate){
		//新增菜单
		$scope.title = $rootScope.i18n.public.create + $rootScope.i18n.role.role;
		$scope.entity = {
			type : '0',
			status : '0'
		};
	}else{
		//修改菜单
		$scope.title = $rootScope.i18n.public.update + $rootScope.i18n.role.role;
		roleService.detail($scope.nowRole.id).success(function(res){
			$scope.entity = res.data;
			$scope.entity.type = String($scope.entity.type);
			$scope.entity.status = String($scope.entity.status);
			$scope.orgEntity =  angular.copy($scope.entity);
		});
	}

	$scope.create = function(){
		var roleParam = {
			name : $scope.entity.name,
			type :  Number($scope.entity.type),
			status: Number($scope.entity.status)
		};
		roleService.create(roleParam).success(function(res){
			Flash.create('success', $rootScope.i18n.public.create + $rootScope.i18n.public.successed);
			$uibModalInstance.close();
		}).error(function(rej){
			//Flash.create('danger',rej.message);
		});
	};
	$scope.update = function(){
		var params = {
			name : $scope.entity.name === $scope.orgEntity.name ? undefined : $scope.entity.name,
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
			Flash.create("info", $rootScope.i18n.public.noChange);
			//$uibModalInstance.close();
			return;
		}
		params.id = $scope.entity.id;
		roleService.update(params).success(function(res){
			Flash.create('success', $rootScope.i18n.public.update + $rootScope.i18n.public.successed);
			$uibModalInstance.close();
		}).error(function(rej){
			//Flash.create('danger',rej.message);
		});
	};
});