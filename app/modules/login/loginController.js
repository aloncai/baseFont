/* 登陆使用的controller */

baseFontApp.controller("loginController", function ($rootScope, $scope, dictionary, Flash, loginService) {
    var local = dictionary.login;
    $scope.label = local.label;
    $scope.holder = local.holder;

    $scope.entity = {
        logining : false, //避免用户重复请求
        userId : 'admin',
        passwd: '123456'
    };

    //登陆操作
    $scope.login = function () {
        $scope.entity.logining = true;

        var userId = $scope.entity.userId;
        var passwd = $scope.entity.passwd;

        loginService.login(userId, passwd).success(function (res) {
            if(res.code === 200){
                //$scope.alert("登陆成功");
                $scope.entity.msg = local.login_success_msg;
            }else{
                $scope.entity.msg = local.login_failed_msg;
            }
            $scope.entity.logining = false;
        }).error(function (res) {
            $scope.entity.msg = dictionary.request_error_tip;
            $scope.entity.logining = false;

        });
    };

});