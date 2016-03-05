/* 登陆使用的controller */

baseFontApp.controller("loginController", function ($rootScope, $scope, $cookies, $location, Flash, loginService) {

    Flash.clear();
    //已经登陆，跳转到首页
    if($cookies.getObject("userId") !== undefined){
        $location.path("/welcome");
    }
    var dictionary = $rootScope.global.dictionary;

    //隐藏导航栏
    $rootScope.global.header.isShow = false;

    var local = dictionary.login;
    $scope.label = local.label;
    $scope.holder = local.holder;

    $scope.entity = {
        logining : false, //避免用户重复请求
        userId : 'zhangkai',
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
                //显示导航栏
                $rootScope.global.showHeader = true;
                //增加cookie
                $cookies.putObject("userId", $scope.entity.userId);
                $cookies.putObject("nickName", $scope.entity.nickName);

                //跳转
                var path = $location.search().path;
                if(path === undefined || path === '' || path === null){
                    path = "#/welcome";
                }
                $location.url(path);
                //隐藏导航栏
                $rootScope.global.header.isShow = true;
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