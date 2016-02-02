/* app的总入口，定制angularJS接入总配置  */
//


var dependencies = ['ngRoute','flash', 'ngAnimate'];
var baseFontApp = angular.module("baseFontApp", dependencies);

//$http拦截器
baseFontApp.factory('httpInterceptor', ['$rootScope', 'Flash',function($rootScope, Flash) {

    var httpInterceptor = {
        //请求拦截
        request: function(config) {
            config.headers["charset"] = "UTF-8";
            return config;
        },
        //相应拦截
        response: function(res){
            console.log(res);
            //请求成功
            if(res.status === 200){
                var returnData = res.data;
                //未登录
                returnData.code = 10001;
                if(returnData.code === 10001){
                    returnData.data = '回话已失效，请重新登陆。';
                    //customAlert custom-class
                    Flash.create('danger',"回话已失效，请重新登陆。",5000);
                    //return;
                }
            }else{

                var data = {
                    "code" : 500,
                    "data" : "服务器不开心！！！"
                };
                res.data = data;
            }
            return res;
        }
    };
    return httpInterceptor;

}]);

// 拦截器注入
baseFontApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});