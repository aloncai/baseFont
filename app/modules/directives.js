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
        controller: function($rootScope, $scope, $cookies, $location, $route, Flash, loginService, menuService){
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
                    //消除cookie
                    $cookies.remove("userId");
                    $location.path("/login");
                });
            };
            //切换语言
            $scope.changeLangue = function (langue) {
                if($rootScope.lang.id !== langue.id){
                    $rootScope.lang = langue;
                    $rootScope.loadLangue();
                    //cookie存100年,持久化到本地
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getYear() + 100);
                    $cookies.putObject("lang", $rootScope.lang, {'expires': expireDate});

                }
                
            };
           
            $rootScope.loadMenu = function(){
                 $rootScope.global.menu = {};
                var userId = $cookies.getObject('userId');
                menuService.getValidByUserId(userId).success(function(res){
                    var menuList = res.data;
                    //目前只支持两级目录
                    $rootScope.global.menu.menuList = [];
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

/* 图片上传模板 
eg : <img-uploader width="200px" height="200px" disabled="false" src="entity.src"></img-uploader>
*/
baseFontApp.directive('imgUploader', function () {
    return {
        restrict: 'AE',
        scope: {
            width : '@width',
            height : '@height',
            isDisabled : '@disabled',
            src : '=src'
        },
        templateUrl: '/app/modules/base/htmls/img_upload.part.html',
        controller : function($scope, $rootScope, Flash, FileUploader) {
            $scope.uploader = new FileUploader({
                url: 'upload/img.json'
            });
            $scope.uploader.onAfterAddingFile = function(fileItem) {
                $scope.fileItem = fileItem;
                fileItem.upload();
                $scope.$watch('fileItem.progress', function(value){
                    if(value % 20 === 0 && value > 0){
                        Flash.create("info", $rootScope.i18n.upload.uploadProgress + value + '%', '1000');
                    }
                });
            };
            $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                $scope.src = response.data;
                Flash.create("success", $rootScope.i18n.upload.uploadSuccess);
            };
            $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
                if(status === 413){
                    Flash.create("danger",  $rootScope.i18n.upload.uploadSuccess.uploadFailedTooLarge);
                }else{
                    Flash.create("danger", uploadFailedTooLarge.uploadFailed);
                }
            };
        }
    };
});

