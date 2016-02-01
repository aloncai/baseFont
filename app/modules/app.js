/* app的总入口，定制angularJS接入总配置  */
//


var dependencies = ['ngRoute'];
var baseFontApp = angular.module("baseFontApp", dependencies);

//$http拦截器
baseFontApp.factory('httpInterceptor', [function() {
    var httpInterceptor = {
        request: function(config) {
            console.log(config);
            config.headers["Content-Type"] = "application/json;charset=UTF-8";
            if(config.method == 'POST' || config.method == 'post'){
            }else{

            }
            return config;
        }
    };
    return httpInterceptor;

}]);

// 拦截器注入
baseFontApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});
