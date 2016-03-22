/* 用户授权 */

baseFontApp.controller("userAuthorityController", function ($rootScope, $scope, $location, Flash, roleUserService, menuService, roleService, $uibModalInstance, params) {

	$scope.user = params.user;
	$scope.ok = function () {
		$scope.save();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	//获取全部角色
	roleService.list().success(function(res){
		$scope.allRoleList = res.data;
		$scope.userRoleList = [];
		$scope.leftRoleList = [];
		//获取用户已拥有角色
		roleUserService.list({userId : $scope.user.userId}).success(function(res2){
			angular.forEach($scope.allRoleList, function(role){
				var has = false;
				angular.forEach(res2.data, function(roleUser){
					if(role.id === roleUser.roleId){
						has = true;
						$scope.userRoleList.push(role);
						return ;
					}
				});
				if(!has){
					$scope.leftRoleList.push(role);
				}
			});
			$scope.loadMenu();
		});
	});
	

	//删除角色
	$scope.removeRole = function(role){
		var index = 0;
		for(var i = 0; i < $scope.userRoleList.length; i++){
			if($scope.userRoleList[i].id === role.id){
				index = i;
				break;
			}
		}
		$scope.userRoleList.splice(index, 1);
		$scope.leftRoleList.push(role);
		$scope.loadMenu();
	};

	//分配角色
	$scope.addRole = function(role){
		$scope.userRoleList.push(role);
		var index = 0;
		for(var i = 0; i < $scope.leftRoleList.length; i++){
			if($scope.leftRoleList[i].id === role.id){
				index = i;
				break;
			}
		}
		$scope.leftRoleList.splice(index, 1);
		$scope.loadMenu();
	};

	$scope.loadMenu = function(){
		$scope.relationMenuList = [];
		var roleIds = [];
		for(var i = 0; i < $scope.userRoleList.length; i++){
			roleIds.push($scope.userRoleList[i].id);
		}
		if(roleIds.length === 0){
			return ;
		}
		menuService.getByRoleIds(roleIds).success(function(res){
			//目前只支持两级目录
	        angular.forEach(res.data, function(menu){
	            if(menu.level === 1){
	                $scope.relationMenuList.push(menu);
	                menu.subMenuList = [];
	                angular.forEach(res.data, function(subMenu){
	                    if(subMenu.parentId === menu.id){
	                        menu.subMenuList.push(subMenu);
	                    }
	                });
	            }
	        });
		});
	};
	

	//保存更改
	$scope.save = function(){
		var params = {
			userId : $scope.user.userId,
			userName : $scope.user.userName,
			roleList : []
		};
		for(var i = 0; i < $scope.userRoleList.length; i++){
			params.roleList[i] = {
				id : $scope.userRoleList[i].id,
				name : $scope.userRoleList[i].name
			};
		}
		roleUserService.authority(params).success(function(res){
			Flash.create("success", $rootScope.i18n.user.authority + $rootScope.i18n.public.successed);
			$uibModalInstance.dismiss('cancel');
		});	
	};
});