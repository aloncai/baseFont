/* 用户列表 */

baseFontApp.controller("menuListController", function ($rootScope, $scope, $location, $locale, Flash, popup, $uibModal, menuService) {

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
			urlLikd : $scope.entity.url || null,
			level : $scope.entity.level || null,
			status : $scope.entity.status || null,
			pageSize : $scope.page.pageSize,
			pageNo : $scope.page.pageNo
		};
	};
	//查询列表
	$scope.query = function(){
		$scope.result.menuList = null;
		$scope.entity.querying = true;
		var params = $scope.buildParams();

		menuService.query(params).success(function(res){
			$scope.result.menuList = res.data.itemList;
			$scope.page.totalCount = res.data.total;
			$scope.entity.querying = false;
		}).error(function(rej){
			$scope.entity.querying = false;
		});
	};
	$scope.query();

	//更改状态
	$scope.changeStatus = function(menu, targetStatus){
		var msg = '确定将菜单：[<strong>' + menu.name + '</strong>]';
		if(targetStatus === 0){
			msg = msg + '启用?';
		}else{
			msg = msg + '废除?';
		}
		popup.confim('修改状态', msg).result.then(function(res){
			menuService.changeStatus(menu.id, targetStatus).success(function(res){
				Flash.create('success', '修改成功');
				$scope.query();
			});
		});
	};
	//更改状态
	$scope.delete = function(menu){
		var msg = '删除后将不能恢复，确定将菜单：[<strong>' + menu.name + '</strong>]删除?';
		popup.confim('删除菜单', msg).result.then(function(res){
			menuService.delete(menu.id).success(function(res){
				Flash.create('success', '修改成功');
				$scope.query();
			});
		});
	};
	//新建+修改菜单
	$scope.createUpdate = function(menu){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/app/modules/menu/htmls/menu_create_update.part.html',
			controller: 'menuCreateUpdateController',
			resolve: {
				params: function () {
					return menu;
				}
			}
		});
		modalInstance.result.then(function(res){
			$scope.query();
		});
	};
	//层级关系
	$scope.levelRelation = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/app/modules/menu/htmls/menu_relation.part.html',
			controller: 'menuRelationController',
			size : 'lg'
		});
	};
	//菜单级别
	$scope.level = function(menu){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/app/modules/menu/htmls/menu_level.part.html',
			controller: 'menuLevelController',
			resolve: {
				params: function () {
					return menu;
				}
			}
		});
	};
});
