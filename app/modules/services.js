/* 注册使用的service */

baseFontApp.service("loginService", function ($http) {
    return {
        //登陆
        login : function (userId, passwd) {
            return $http({
                url : '/easyShopping/login.json',
                medhod : 'get',
                dataType : 'json',
                params : {
                    userId : userId,
                    passwd : passwd
                }
            });
        }
    };
});