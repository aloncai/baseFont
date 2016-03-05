/* app的总入口，定制angularJS接入总配置  */
//


var dependencies = ['ngRoute', 'flash', 'ngAnimate', 'ngCookies', "ui.bootstrap"];
var baseFontApp = angular.module("baseFontApp", dependencies);


// 拦截器注入
baseFontApp.config(function ($httpProvider) {
    // POST method use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    $httpProvider.interceptors.push('httpInterceptor');
});