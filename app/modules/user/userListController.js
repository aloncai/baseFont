/* 用户列表 */

baseFontApp.controller("userListController", function ($rootScope, $scope, $location, Flash, popup, $uibModal, userService) {

	$scope.entity = {
		querying : false
	};
	$scope.result = {};
	$scope.page = {
		pageSize : 15,
		pageNo : 1,
		totalCount:0
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
			$scope.result.userList = res.data.itemList;
			$scope.page.totalCount = res.data.total;
			$scope.entity.querying = false;
		}).error(function(rej){
			$scope.entity.querying = false;
		});
	};
	$scope.query();

	//更改状态
	$scope.changeStatus = function(user, status){
		var msg = $rootScope.i18n.user.changeConfirm + '：[<strong>' + user.userName + '</strong>]';
		if(status === 1){
			msg = msg + $rootScope.i18n.user.statusOptNormal +'?';
		}else{
			msg = msg + $rootScope.i18n.user.statusOptFrozen +'?';
		}
		var title = $rootScope.i18n.public.update + $rootScope.i18n.public.status;
		popup.confim(title, msg).result.then(function(res){
			userService.changeStatus(user.userId, status).success(function(res){
				Flash.create('info', res.message);
				$scope.query();
			});
		});
		
	};

	//更改用户信息
	$scope.update = function(user){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/app/modules/user/htmls/user_update.part.html',
			controller: 'userUpdateController',
			resolve: {
				params: function () {
					return {
						id : user.id
					};
				}
			}
		});
		//窗口响应函数
		modalInstance.result.then(function (params) {
			//确定按钮
			$scope.query();
		}, function () {
			//q取消按钮
		});

	};

	//更改用户信息
	$scope.create = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/app/modules/user/htmls/user_create.part.html',
			controller: 'userCreateController'
		});
		//窗口响应函数
		modalInstance.result.then(function (params) {
			//确定按钮
			$scope.query();
		}, function () {
			//q取消按钮
		});
	};

	//分配权限
	$scope.authority = function(user){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/app/modules/user/htmls/user_authority.part.html',
			controller: 'userAuthorityController',
			resolve: {
				params: function () {
					return {
						user : user
					};
				}
			}
		});
	};
	


});
