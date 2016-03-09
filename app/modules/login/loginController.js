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
    //背景图片
    $("body").css('background-image', 'url("/app/imgs/background_001.jpg")');
    $("body").addClass('body-img');

    //登陆操作
    $scope.login = function () {
        $scope.entity.logining = true;

        var userId = $scope.entity.userId;
        var passwd = $scope.entity.passwd;

        loginService.login(userId, passwd).success(function (res) {
            //$scope.alert("登陆成功");
            $scope.entity.msg = local.login_success_msg;
            //显示导航栏
            $rootScope.global.showHeader = true;
            //增加cookie
            $cookies.putObject("userId", res.data.userId);
            $cookies.putObject("nickName", res.data.nickName);
            $cookies.putObject("userName", res.data.userName);

            //跳转
            var path = $location.search().path;
            if(path === undefined || path === '' || path === null){
                path = "/welcome";
            }
            //背景图片
            $("body").css('background-image', '');
            $("body").removeClass('body-img');
            $location.url(path);
            //显示导航栏
            $rootScope.global.header.isShow = true;
            $rootScope.global.session = {
                userId : $cookies.getObject("userId"),
                nickName : $cookies.getObject("nickName"),
                userName : $cookies.getObject("userName")
            };
            //加载菜单
            $rootScope.loadMenu();
            $scope.entity.logining = false;
        }).error(function (rej) {
            if(rej.code === 1){
                $scope.entity.msg = '用户名或者密码不能为空';
            }else if(rej.code === 2){
                $scope.entity.msg = '用户名或者密码错误';
            }else if(rej.code === 3){
                $scope.entity.msg = '账户已被冻结';
            }
            $scope.entity.logining = false;

        });
    };

});