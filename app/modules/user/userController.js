/* 登陆使用的controller */

baseFontApp.controller("userController", function ($rootScope, $scope, $location, Flash, userService) {
	var dictionary = $rootScope.global.dictionary;
	$scope.label = dictionary.user.label;
	$scope.holder = dictionary.user.holder;
	$scope.entity = {
		querying : false
	};
	$scope.result = {};
	$scope.page = {
		pageSize : 15,
		pageNo : 1,
		label: dictionary.pagination.label
	};

	$scope.buildParams = function(){

		return {
			status : $scope.entity.status || null,
			userNameLike : $scope.entity.userName || null,
			userMobileLike : $scope.entity.userMobile || null,
			userIdLike : $scope.entity.userId || null,
			pageSize : $scope.page.pageSize,
			pageNo : $scope.page.pageNo
		};
	};
	//查询列表
	$scope.query = function(){
		$scope.result.userList = null;
		$scope.entity.querying = true;
		var params = $scope.buildParams();
		userService.query(params).success(function(res){
			if(res.code === 200){
				$scope.result.userList = res.data.itemList;
				$scope.page.totalCount = res.data.total;
			}else{
				Flash.create('danger', res.message || dictionary.response_error_tip);
			}
			$scope.entity.querying = false;
		}).error(function(rej){
			$scope.entity.querying = false;
		});
	};
	$scope.query();

	//更改状态
	$scope.changeStatus = function(user, status){
		userService.changeStatus(user.userId, status).success(function(res){
			if(res.code === 200){
				Flash.create('info', res.message);
				$scope.query();
			}else{
				Flash.create('danger', res.message || dictionary.response_error_tip);
			}
		});
	};

});
