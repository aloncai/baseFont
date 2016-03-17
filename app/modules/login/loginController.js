/* 登陆使用的controller */

baseFontApp.controller("loginController", function ($rootScope, $scope, $cookies, $location, $locale, Flash, loginService) {

    Flash.clear();
    //已经登陆，跳转到首页
    if($cookies.getObject("userId") !== undefined){
        $location.path("/welcome");
    }

    //隐藏导航栏
    $rootScope.global.header.isShow = false;

    $scope.entity = {
        logining : false, //避免用户重复请求
        //userId : 'zhangkai',
        //passwd: '123456'
    };
    //背景图片
    $("body").css('background-image', 'url("/app/imgs/background_001.jpg")');
    $("body").addClass('body-img');

    $scope.myKeyup = function(e){
        var keycode = window.event ? e.keyCode : e.which;
        if(keycode === 13){
            $scope.login();
        }
    };

    //登陆操作
    $scope.login = function () {
        $scope.entity.logining = true;

        var userId = $scope.entity.userId;
        var passwd = $scope.entity.passwd;
        if(userId === undefined || passwd === undefined){
            $scope.entity.msg = $rootScope.i18n.login.login_failed_msg_empty;
            $scope.entity.logining = false;
            return ;
        }

        loginService.login(userId, passwd).success(function (res) {
            //$scope.alert("登陆成功");
            $scope.entity.msg = $rootScope.i18n.login.login_success_msg;
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
                $scope.entity.msg = $rootScope.i18n.login.login_failed_msg_empty;
            }else if(rej.code === 2){
                $scope.entity.msg = $rootScope.i18n.login.login_failed_msg_error;
            }else if(rej.code === 3){
                $scope.entity.msg = $rootScope.i18n.login.login_failed_msg_frozen;
            }
            $scope.entity.logining = false;

        });
    };

});