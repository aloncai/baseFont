/* app的总入口，定制angularJS接入总配置  */
//

var dependencies = ['ngRoute', 'flash', 'ngAnimate', 'ngCookies', "ui.bootstrap", "ngSanitize", "ngResource", "ui.bootstrap.datetimepicker"];
var baseFontApp = angular.module("baseFontApp", dependencies);


// 国际化多语言支持
baseFontApp.run(function ($rootScope, $cookies, $resource, uibPaginationConfig, uibDatepickerPopupConfig) {
  if($rootScope.global === undefined){
        $rootScope.global = {};
    }
    // 加载语言总入口
    $rootScope.loadLangue = function(){
        $resource($rootScope.lang.path).get(function(res){
        	$rootScope.i18n = res.my;
            $rootScope.initLib(res.lib);
            $rootScope.initMoment();
        });
    };
    // 加载语言列表
    $rootScope.loadLangueList = function(){
        $.ajax({
            type: "get",
            url: '/app/modules/base/i18n/langue-list.json',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: true,
            success: function (res) {
                $rootScope.global.langueList = res;
                $rootScope.lang = $cookies.getObject("lang");
                if($rootScope.lang === undefined){
                   $rootScope.lang = $rootScope.global.langueList[0]; 
                }
                $rootScope.loadLangue();
            }
        });
    };
    // 加载插件语言
    $rootScope.initLib = function(lib){
        // 加载分页控件
        angular.extend(uibPaginationConfig, lib.uibPagination);
        // 加载日期控件
        angular.extend(uibDatepickerPopupConfig, lib.uibDatepickerPopup);
        
    };
    // 加载moment插件
    $rootScope.initMoment = function(){
        moment.locale($rootScope.lang.id);
    };

    //加载语言
    $rootScope.loadLangueList();
});


