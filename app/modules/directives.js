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
        controller: function($rootScope, $scope, $cookies, $location, $route, Flash, loginService, userService){
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
                    //cookie存100年,持久化到本地
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getYear() + 100);
                    $cookies.putObject("lang", $rootScope.lang, {'expires': expireDate});
                    window.location.reload();
                }
                
            };
           
            $rootScope.loadMenu = function(userId){
                 $rootScope.global.menu = {
                    menuList : []
                };
                if(userId === undefined){
                    userId = $cookies.getObject('userId');
                }
                var reqParams = {
                    userId : userId || null,
                    status : 0
                };
                userService.getUserMenu(reqParams).success(function(res){
                    var menuList = res.data;
                    //目前只支持两级目录
                    angular.forEach(menuList, function(menu){
                        if(menu.level === 1){
                            $rootScope.global.menu.menuList.push(menu);
                            menu.subMenuList = [];
                            angular.forEach(menuList, function(subMenu){
                                if(subMenu.parentId === menu.id){
                                    subMenu.parent = menu;
                                    menu.subMenuList.push(subMenu);
                                }
                            });
                        }
                    });
                    //定位目前的菜单
                    var nowMenuId = $cookies.getObject("nowMenuId");
                    angular.forEach(menuList, function(menu){
                        if(nowMenuId === menu.id){
                            $rootScope.global.menu.nowMenu = menu;
                        }
                    });
                });
            };

            //强制刷新
            if($cookies.getObject('userId') !== undefined){
                $rootScope.loadMenu();
            }
            
            $scope.go = function(menu){
                $rootScope.global.menu.nowMenu = menu;
                //避免强制刷新，造成菜单失效
                $cookies.putObject("nowMenuId", menu.id);
                $location.path(menu.url);
            };

        }
    };
});