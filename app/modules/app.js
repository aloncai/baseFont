/* app的总入口，定制angularJS接入总配置  */
//


var dependencies = ['ngRoute', 'flash', 'ngAnimate'];
var baseFontApp = angular.module("baseFontApp", dependencies);


//多语言支持
baseFontApp.factory('dictionary', function ($rootScope) {
    $rootScope.lang = '/app/modules/base/i18n/dictinoary-locale_zh-cn.lang';
    var value={};
    $.ajax({
        type: "get",
        async: false,
        url: $rootScope.lang,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: true,
        success: function (res) {
            value.dictionary = res;
        }
    });
    $rootScope.global = {};
    $rootScope.global.dictionary = value.dictionary;
    return  value.dictionary;
});

//$http拦截器
baseFontApp.factory('httpInterceptor', function ($rootScope,dictionary, Flash) {

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
            //未登录
            if (returnData.code === 10001) {
                returnData.data = dictionary.session_timeout_tip;
                //customAlert custom-class
                Flash.create('danger', returnData.data, 5000);
                $rootScope.global.showHeader = false;
            }
            return res;
        },
        requestError: function (rej) {
            return rej;
        },
        responseError: function (rej) {
            var data = {
                "code": 500,
                "data": dictionary.request_error_tip
            };
            rej.data = data;
            Flash.create('danger', rej.data.data, 5000);
            return rej;
        }
    };
    return httpInterceptor;

});

// 拦截器注入
baseFontApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});