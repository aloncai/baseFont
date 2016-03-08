/* 用户列表 */

baseFontApp.controller("userListController", function ($rootScope, $scope, $location, Flash, popup, $uibModal, userService) {
	var dictionary = $rootScope.global.dictionary;
	$scope.label = dictionary.user.label;
	$scope.holder = dictionary.user.holder;
	$scope.public = dictionary.public;
	$scope.entity = {
		querying : false
	};
	$scope.result = {};
	$scope.page = {
		pageSize : 15,
		pageNo : 1,
		totalCount:0,
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
		var msg = '确定将用户：[<strong>' + user.userName + '</strong>]';
		if(status === 0){
			msg = msg + '解冻?';
		}else{
			msg = msg + '冻结?';
		}
		popup.confim('修改状态', msg).result.then(function(res){
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

});
