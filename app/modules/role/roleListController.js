/* 用户列表 */

baseFontApp.controller("roleListController", function ($rootScope, $scope, $location, $locale, Flash, popup, $uibModal, roleService) {

	$scope.entity = {
		querying : false
	};
	$scope.result = {};
	$scope.page = {
		pageSize : 15,
		pageNo : 1,
		totalCount: 0
	};
	$scope.buildParams = function(){

		return {
			nameLike : $scope.entity.name || null,
			status : $scope.entity.status || null,
			pageSize : $scope.page.pageSize,
			pageNo : $scope.page.pageNo
		};
	};
	//查询列表
	$scope.query = function(){
		$scope.result.roleList = null;
		$scope.entity.querying = true;
		var params = $scope.buildParams();

		roleService.query(params).success(function(res){
			$scope.result.roleList = res.data.itemList;
			$scope.page.totalCount = res.data.total;
			$scope.entity.querying = false;
		}).error(function(rej){
			$scope.entity.querying = false;
		});
	};
	$scope.query();

	//更改状态
	$scope.changeStatus = function(role, targetStatus){
		var msg = $rootScope.i18n.role.changeConfirm + '：[<strong>' + role.name + '</strong>]';
		if(targetStatus === 0){
			msg = msg + $rootScope.i18n.role.optStatusNormal + '?';
		}else{
			msg = msg + $rootScope.i18n.role.optStatusStop + '?';
		}
		var confimTitle = $rootScope.i18n.public.update + $rootScope.i18n.public.status;
		popup.confim(confimTitle , msg).result.then(function(res){
			roleService.changeStatus(role.id, targetStatus).success(function(res){
				Flash.create('success', $rootScope.i18n.public.update + $rootScope.i18n.public.successed);
				$scope.query();
			});
		});
	};
	//删除
	$scope.delete = function(role){
		var msg = $rootScope.i18n.role.deleteConfirm + '，' + $rootScope.i18n.role.changeConfirm + '：[<strong>' + role.name + '</strong>]' + $rootScope.i18n.public.delete + '?';
		var confimTitle = $rootScope.i18n.public.delete + $rootScope.i18n.role.role;
		popup.confim(confimTitle, msg).result.then(function(res){
			roleService.delete(role.id).success(function(res){
				Flash.create('success', $rootScope.i18n.public.delete + $rootScope.i18n.public.successed);
				$scope.query();
			}).error(function(rej){
				switch(rej.code ){
					case 1: 
						Flash.create("danger", $rootScope.i18n.role.deleteCanntExistMenu);
						break;
				}
			});
		});
	};
	//新建+修改
	$scope.createUpdate = function(role){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/app/modules/role/htmls/role_create_update.part.html',
			controller: 'roleCreateUpdateController',
			resolve: {
				params: function () {
					return role;
				}
			}
		});
		modalInstance.result.then(function(res){
			$scope.query();
		});
	};
});
