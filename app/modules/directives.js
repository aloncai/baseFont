/**
 * Created by zhangkai on 16-1-28.
 */

/* 页面模板-内容 */
baseFontApp.directive('csLayout', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/modules/base/htmls/layout.part.html'
    };
});


/* 页面模板-页脚 */
baseFontApp.directive('csFooter', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/modules/base/htmls/footer.part.html'
    };
});

/* 页面模板-页眉 */
baseFontApp.directive('csHeader', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/modules/base/htmls/header.part.html',
        controller: function($rootScope, $scope, $cookies, $location, $route, Flash, loginService){
            var dictionary = $rootScope.global.dictionary;
            $scope.label = dictionary.header.label;
            var loginLocal = dictionary.login;
            $scope.header = {};
            $scope.header.langueList = $rootScope.global.langueList;

            //只有在登陆的时候才显示导航栏
            $rootScope.global.header = {};
            $rootScope.global.header.isShow = ($location.path() !== '/login' && $location.path() !== '/');
            $rootScope.global.session = {
                userId : $cookies.getObject("userId"),
                nickName : $cookies.getObject("nickName"),
                userName : $cookies.getObject("userName")
            };
            //退出登陆
            $scope.logout = function(){
                loginService.logout().success(function (res) {
                    if(res.code === 200){
                        //消除cookie
                        $cookies.remove("userId");
                        $location.path("/login");
                    }else{
                        //消除cookie
                        $cookies.remove("userId");
                        $location.path("/login");
                        Flash.create("danger", loginLocal.logout_failed_msg);
                    }
                });
            };
            //切换语言
            $scope.changeLangue = function (langue) {
                if($rootScope.lang.name !== langue.name){
                    $rootScope.lang = langue;
                    $rootScope.loadLangue();
                    //cookie存100年
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getYear() + 100);
                    $cookies.putObject("lang", $rootScope.lang, {'expires': expireDate});
                    window.location.reload();
                }
                
            };
        }
    };
});