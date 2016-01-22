/* 登陆使用的controller */

baseFontApp.controller("loginController", function ($scope, loginService) {

    $scope.entity = {
        logining : false, //避免用户重复请求
        userId : 'admin',
        passwd: '123456'
    };

    //登陆操作
    $scope.login = function () {
        $scope.entity.logining = true;

        var userId = $scope.entity.userId;
        var passwd = $scope.entity.passed;

        loginService.login(userId, passwd).success(function (res) {
            if(res.code === 200){
                //$scope.alert("登陆成功");
                $scope.entity.msg = res.data || "登陆成功";
            }else{
                $scope.entity.msg = res.data || "登陆失败";
            }
            $scope.entity.logining = false;
        }).error(function () {
            //$scope.alert("服务可能正在维护，请稍后重试！！");
            $scope.entity.msg = "网络连接失败，请检查网络。";
            $scope.entity.logining = false;

        });
    };

});