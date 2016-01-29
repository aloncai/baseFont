/* 注册使用的service */

baseFontApp.service("loginService", function ($http) {
    return {
        //登陆
        login : function (userId, passwd) {
            return $http({
                url : '/easyShopping/login.json',
                method : 'get',
                //headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                dataType : 'json',
                params : {
                    userId : userId,
                    passwd : passwd
                }
            });
        }
    };
});