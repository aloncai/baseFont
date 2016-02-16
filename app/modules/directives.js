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
        controller: function($rootScope,$scope,$location,Flash,dictionary,loginService){
            $scope.label = dictionary.header.label;
            var loginLocal = dictionary.login;
            $scope.header = {};
            //只有在登陆的时候才显示导航栏
            $scope.header.isShow = (getCookie("userId") !== '');
            //监听是否显示导航栏
            $rootScope.$watch('global.showHeader', function(){
                if($rootScope.global.showHeader != null){
                    $scope.header.isShow = $rootScope.global.showHeader;
                }
            });

            $scope.logout = function(){
                loginService.logout().success(function (res) {
                    if(res.code === 200){
                        //隐藏导航栏
                        $rootScope.global.showHeader = false;
                        //消除cookie
                        deleteCookie("userId");
                        $location.path("/login");
                    }else{
                        Flash.create("danger", loginLocal.logout_failed_msg);
                    }
                });
            }
        }
    };
});