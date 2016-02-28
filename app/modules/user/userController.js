/* 登陆使用的controller */

baseFontApp.controller("userController", function ($rootScope, $scope, $location, Flash, userService) {
	var dictionary = $rootScope.global.dictionary;
	$scope.entity = {
		querying : false
	};
	$scope.result = {};

	$scope.buildParams = function(){

		return {
			status : $scope.entity.status || null,
			userNameLike : $scope.entity.userName || null,
			userMobileLike : $scope.entity.userMobile || null,
			userIdLike : $scope.entity.userId || null
		};
	};
	$scope.maxSize = 7;    // ...上面都讲了 ， 往上找
        $scope.totalItems = 99;
        $scope.currentPage = 1;
        $scope.bigTotalItems = 180;
        $scope.bigCurrentPage = 1;

	$scope.query = function(){
		$scope.result.userList = [];
		$scope.entity.querying = true;
		var params = $scope.buildParams();
		userService.query(params).success(function(res){
			if(res.code === 200){
				$scope.result.userList = res.data.itemList;
				$scope.result.total = 10;
			}else{
				Flash.create('danger', res.message || dictionary.response_error_tip, 5000);
			}
			$scope.entity.querying = false;
		}).error(function(rej){
			$scope.entity.querying = false;
		});
	};

	$scope.query();
});
