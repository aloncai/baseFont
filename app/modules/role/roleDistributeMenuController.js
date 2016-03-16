/*  给角色分配菜单 */

baseFontApp.controller("roleDistributeMenuController", function ($rootScope, $scope, $uibModalInstance, Flash, roleMenuService, menuService, params) {
	$scope.role = params;
	$scope.ok = function () {
		$scope.save();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	//全部菜单
	menuService.list().success(function(res){
		$scope.menuList = res.data;
		$scope.relationMenuList = [];
		//改角色已拥有菜单
		roleMenuService.list({roleId: $scope.role.id}).success(function(res2){
			angular.forEach($scope.menuList, function(m){
				angular.forEach(res2.data, function(roleMenu){
					if(m.id === roleMenu.menuId){
						m.ok = true;
					}
				})
			});
		});

		//目前只支持两级目录
        angular.forEach($scope.menuList, function(menu){
            if(menu.level === 1){
                $scope.relationMenuList.push(menu);
                menu.subMenuList = [];
                angular.forEach($scope.menuList, function(subMenu){
                    if(subMenu.parentId === menu.id){
                        menu.subMenuList.push(subMenu);
                        subMenu.parentMenu = menu;
                    }
                });
            }
        });

	});

	$scope.toggleMenu = function(menu){
		if(menu.parentMenu !== undefined){
			//子菜单
			if(menu.ok === true){
				menu.parentMenu.ok = true;
			}else{
				//是否全部子菜单都取消了
				var isALlCancel = true;
				angular.forEach(menu.parentMenu.subMenuList, function(brothMenu){
					if(brothMenu.ok === true){
						isALlCancel = false;
					}
				});
				if(isALlCancel){
					menu.parentMenu.ok = false;
				}
			}
		}else{
			//父菜单
			angular.forEach(menu.subMenuList, function(subMenu){
				if(subMenu.status !== 1 || menu.ok === false){
					subMenu.ok = menu.ok;
				}
			});

		}
	};

	$scope.save = function(){
		var params = {
			roleId : $scope.role.id,
			roleName : $scope.role.name,
			menuList : []
		};
		for(var i = 0; i < $scope.menuList.length; i++){
			var menu = $scope.menuList[i];
			if(menu.ok === true){
				params.menuList.push({
					id : menu.id,
					name : menu.name
				});
			};
		}
		roleMenuService.distributeMenu(params).success(function(res){
			Flash.create("success", $rootScope.i18n.role.distributeMenu + $rootScope.i18n.public.successed);
			$uibModalInstance.dismiss('cancel');
		});	
	}
});