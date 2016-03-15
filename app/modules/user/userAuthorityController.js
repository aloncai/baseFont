/* 用户授权 */

baseFontApp.controller("userAuthorityController", function ($rootScope, $scope, $location, Flash, userService, roleUserService, roleService, $uibModalInstance, params) {

	$scope.user = params.user;
	$scope.ok = function () {
		$scope.save();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	//获取全部角色
	roleService.list({status : 0}).success(function(res){
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
	};

	//保存更改
	$scope.save = function(){
		var params = {
			userId : $scope.user.userId,
			userName : $scope.user.userName,
			roleList : []
		}
		for(var i = 0; i < $scope.userRoleList.length; i++){
			params.roleList[i] = {
				id : $scope.userRoleList[i].id,
				name : $scope.userRoleList[i].name
			}
		}
		userService.authority(params).success(function(res){
			Flash.create("success", res.message);
			$uibModalInstance.dismiss('cancel');
		});	
	}
});