/* 注册使用的service */

baseFontApp.service("loginService", function ($http) {
    return {
        //登陆
        login : function (userId, passwd) {
            return $http({
                url : '/easyShopping/user/login.json',
                method : 'get',
                dataType : 'json',
                params : {
                    userId : userId,
                    password : passwd
                }
            });
        },
        //登出
        logout : function () {
            return $http({
                url : '/easyShopping/user/logout.json',
                method : 'get',
                dataType : 'json'
            });
        }
    };
});