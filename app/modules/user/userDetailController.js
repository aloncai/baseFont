/* 用户详情-修改 */

baseFontApp.controller("userDetailController", function ($rootScope, $scope, $routeParams, $location, $uibModal, Flash, userService) {
	var userDbId = $routeParams.id;
	var userId = '';

	var dictionary = $rootScope.global.dictionary;
	$scope.label = dictionary.user.label;
	$scope.holder = dictionary.user.holder;
	$scope.entity = {
		querying : false
	};
	$scope.result = {};
	$scope.page = {
		pageSize : 5,
		pageNo : 1,
		totalCount: 0,
		label: dictionary.pagination.label
	};

	$scope.query = function(){
		userService.detail(userDbId).success(function(res){
			$scope.entity = res.data;
			$scope.entity.status = String($scope.entity.status);
			$scope.entity.userSex = String($scope.entity.userSex);

			userId = $scope.entity.userId;
			$scope.queryLog();
		});
	};
	$scope.query();

	$scope.queryLog = function(){
		var params = {
			createBy : userId,
			pageSize : $scope.page.pageSize,
			pageNo : $scope.page.pageNo
		};
		userService.getUserLog(params).success(function(res){
			$scope.result.logList = res.data.itemList;
			$scope.page.totalCount = res.data.total;
		});
	};
});