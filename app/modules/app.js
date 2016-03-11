/* app的总入口，定制angularJS接入总配置  */
//

var dependencies = ['ngRoute', 'flash', 'ngAnimate', 'ngCookies', "ui.bootstrap", "ngSanitize", "ngResource"];
var baseFontApp = angular.module("baseFontApp", dependencies);

    
// 拦截器注入
baseFontApp.config(function ($httpProvider) {
    // POST method use x-www-form-urlencoded Content-Type
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    $httpProvider.interceptors.push('httpInterceptor');
});

// 国际化多语言支持
baseFontApp.run(function ($rootScope, $cookies, $resource) {
  if($rootScope.global === undefined){
        $rootScope.global = {};
    }
    $rootScope.loadLangue = function(){
        $resource($rootScope.lang.path).get(function(res){
        	$rootScope.i18n = res.my;
        });
    };
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
    $rootScope.loadLangueList();
});


