/* app的总入口，定制angularJS接入总配置  */
//


var dependencies = ['ngRoute'];
var baseFontApp = angular.module("baseFontApp", dependencies);

// HTTP拦截器
baseFontApp.config(function ($httpProvider) {
    // POST method use x-www-form-urlencoded Content-Type

    $httpProvider.defaults.headers.get = {"Content-Type" : "application/json;charset=utf-8"}
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    console.log($httpProvider.defaults.headers);

});
