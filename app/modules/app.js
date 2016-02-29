/* app的总入口，定制angularJS接入总配置  */
//


var dependencies = ['ngRoute', 'flash', 'ngAnimate', 'ngCookies', "ui.bootstrap"];
var baseFontApp = angular.module("baseFontApp", dependencies);


//多语言支持
baseFontApp.factory('langue', function ($rootScope, $cookies) {
    
    if($rootScope.global === undefined){
        $rootScope.global = {};
    }
    
    $rootScope.loadLangue = function(){
        $.ajax({
            type: "get",
            async: false,
            url: $rootScope.lang.path,
            dataType: "json",
            cache: false,
            success: function (res) {
                $rootScope.global.dictionary = res;
            }
        });
    };

    $rootScope.loadLangueList = function(){
        $.ajax({
            type: "get",
            url: '/app/modules/base/i18n/langue-list.json',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: true,
            success: function (res) {
                $rootScope.global.langueList = res;
                //$cookies.remove("lang");
                $rootScope.lang = $cookies.getObject("lang");
                if($rootScope.lang === undefined){
                   $rootScope.lang = $rootScope.global.langueList[0]; 
                }
                $rootScope.loadLangue();
            }
        });
    };
    $rootScope.loadLangueList();
    return  '';
});

//$http拦截器
baseFontApp.factory('httpInterceptor', function ($rootScope, langue, $cookies, Flash) {
    var dictionary = $rootScope.global.dictionary;
    var httpInterceptor = {
        //请求拦截
        request: function (config) {
            config.headers["charset"] = "UTF-8";
            return config;
        },
        //相应拦截
        response: function (res) {
            //请求成功
            var returnData = res.data;
            //登录失效
            if (returnData.code === 10001) {
                returnData.data = dictionary.session_timeout_tip;
                //customAlert custom-class
                var msg = dictionary.session_timeout_tip + '<a class="btn btn-warning" href="#/login" ng-click="$dismiss()" role="button">重新登陆</a>';
                Flash.create("warning", msg, 10000);
                $rootScope.global.showHeader = false;
                $cookies.remove("userId");
            }
            return res;
        },
        requestError: function (rej) {
            var data = {
                "code": 500,
                "data": dictionary.request_error_tip
            };
            rej.data = data;
            Flash.create('danger', rej.data.data);
            return rej;
        },
        responseError: function (rej) {
            var data = {
                "code": 500,
                "data": dictionary.response_error_tip
            };
            rej.data = data;
            //Flash.create('danger', rej.data.data, 5000);
            return rej;
        }
    };
    return httpInterceptor;

});

// 拦截器注入
baseFontApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});