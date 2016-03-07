/* 用户列表 */

baseFontApp.controller("menuListController", function ($rootScope, $scope, $location, Flash, $uibModal, menuService) {

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

	//菜单详情
	$scope.detail = function(menu){
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
	//新建菜单
	$scope.create = function(){

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
});
