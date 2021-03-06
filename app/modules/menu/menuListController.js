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
		var msg = $rootScope.i18n.menu.changeConfirm + '：[<strong>' + menu.name + '</strong>]';
		if(targetStatus === 0){
			msg = msg + $rootScope.i18n.menu.optNormal + '?';
		}else{
			msg = msg + $rootScope.i18n.menu.optAbolish + '?';
		}
		var confimTitle = $rootScope.i18n.public.update + $rootScope.i18n.public.status;
		popup.confim(confimTitle , msg).result.then(function(res){
			menuService.changeStatus(menu.id, targetStatus).success(function(res){
				Flash.create('success', $rootScope.i18n.public.update + $rootScope.i18n.public.successed);
				$scope.query();
			});
		});
	};
	//删除
	$scope.delete = function(menu){
		var msg = $rootScope.i18n.menu.deleteConfirm + '，' + $rootScope.i18n.menu.changeConfirm + '：[<strong>' + menu.name + '</strong>]' + $rootScope.i18n.public.delete + '?';
		var confimTitle = $rootScope.i18n.public.delete + $rootScope.i18n.menu.menu;
		popup.confim(confimTitle, msg).result.then(function(res){
			menuService.delete(menu.id).success(function(res){
				Flash.create('success', $rootScope.i18n.public.delete + $rootScope.i18n.public.successed);
				$scope.query();
			}).error(function(rej){
				switch(rej.code ){
					case 1:
						Flash.create('danger', $rootScope.i18n.menu.deleteNotExist);
						break;
					case 2:
						Flash.create('danger', $rootScope.i18n.menu.deleteCanntNormal);
						break;
					case 3:
						Flash.create('danger', $rootScope.i18n.menu.deleteCanntSubMenu);
						break;
				}
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
