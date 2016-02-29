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

baseFontApp.service("userService", function ($http) {
    return {
        //用户列表
        query : function (params) {
            return $http({
                url : '/easyShopping/user/page.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        },
        //修改状态 
        changeStatus : function(userId, status){
            return $http({
                url : '/easyShopping/user/changeStatus.json',
                method : 'post',
                dataType : 'json',
                params : {
                    "userId" : userId,
                    "status" : status
                }
            });
        }
    };
});