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
        controller: function($rootScope,$scope){
            $scope.header = {};
            $scope.header.isShow = true;
            $scope.showHeader = function(){
                $scope.header.isShow = true;
            };
            $scope.hideHeader = function(){
                $scope.header.isShow = false;
            };
            $rootScope.$watch('global.showHeader', function(){
                $scope.header.isShow = $rootScope.global.showHeader;
            });
        }
    };
});