/* 注册使用的service */

//登陆信息
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

//用户信息
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
                data : {
                    "userId" : userId,
                    "status" : status
                }
            });
        },
        //修改信息 
        update : function(params){
            return $http({
                url : '/easyShopping/user/update.json',
                method : 'post',
                dataType : 'json',
                data : params
            });
        },
        //创建用户 
        create : function(params){
            return $http({
                url : '/easyShopping/user/create.json',
                method : 'post',
                dataType : 'json',
                data : params
            });
        },
        //获取详情
        detail : function(id){
            return $http({
                url : '/easyShopping/user/getById.json',
                method : 'get',
                dataType : 'json',
                params : {
                    "id" : id
                }
            });
        },
        //修改状态 
        getUserLog : function(params){
            return $http({
                url : '/easyShopping/userLog/page.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        },
        getUserMenu : function(params){
            return $http({
                url : '/easyShopping/menu/list.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        }
    };
});

//菜单信息
baseFontApp.service("menuService", function ($http) {
    return {
        //用户列表
        query : function (params) {
            return $http({
                url : '/easyShopping/menu/page.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        },
        //用户列表
        list : function (params) {
            return $http({
                url : '/easyShopping/menu/list.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        },
        //获取详情
        detail : function(id){
            return $http({
                url : '/easyShopping/menu/getById.json',
                method : 'get',
                dataType : 'json',
                params : {
                    "id" : id
                }
            });
        },
        //获取详情
        delete : function(id){
            return $http({
                url : '/easyShopping/menu/delete.json',
                method : 'post',
                dataType : 'json',
                data : id
            });
        },
        //创建菜单
        create : function(params){
            return $http({
                url : '/easyShopping/menu/create.json',
                method : 'post',
                dataType : 'json',
                data : params
            });
        },
        //修改状态 
        changeStatus : function(menuId, status){
            return $http({
                url : '/easyShopping/menu/update.json',
                method : 'post',
                dataType : 'json',
                data : {
                    "id" : menuId,
                    "status" : status
                }
            });
        },
        //修改状态 
        update : function(params){
            return $http({
                url : '/easyShopping/menu/update.json',
                method : 'post',
                dataType : 'json',
                data : params
            });
        },
        //根据roleIds获取菜单列表
        getByRoleIds : function(roleIdList){
            return $http({
                url : '/easyShopping/menu/getByRoleIds.json',
                method : 'get',
                dataType : 'json',
                params : {
                    roleIds : roleIdList
                }
            });
        }
    };
});


//角色信息
baseFontApp.service("roleService", function ($http) {
    return {
        //用户列表
        query : function (params) {
            return $http({
                url : '/easyShopping/role/page.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        }, 
        //用户列表
        list : function (params) {
            return $http({
                url : '/easyShopping/role/list.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        },
        //删除
        delete : function(id){
            return $http({
                url : '/easyShopping/role/delete.json',
                method : 'post',
                dataType : 'json',
                data : id
            });
        },
        //创建
        create : function(params){
            return $http({
                url : '/easyShopping/role/create.json',
                method : 'post',
                dataType : 'json',
                data : params
            });
        },
        //获取详情
        detail : function(id){
            return $http({
                url : '/easyShopping/role/getById.json',
                method : 'get',
                dataType : 'json',
                params : {
                    "id" : id
                }
            });
        },
        //修改状态 
        changeStatus : function(roleId, status){
            return $http({
                url : '/easyShopping/role/update.json',
                method : 'post',
                dataType : 'json',
                data : {
                    "id" : roleId,
                    "status" : status
                }
            });
        },
        //修改
        update : function(params){
            return $http({
                url : '/easyShopping/role/update.json',
                method : 'post',
                dataType : 'json',
                data : params
            });
        }
    };
});


//用户角色关系
baseFontApp.service("roleUserService", function ($http) {
    return {
        //用户列表
        query : function (params) {
            return $http({
                url : '/easyShopping/roleUser/page.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        }, 
        //用户列表
        list : function (params) {
            return $http({
                url : '/easyShopping/roleUser/list.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        },
        authority : function(params){
            return $http({
                url : '/easyShopping/roleUser/authority.json',
                method : 'post',
                dataType : 'json',
                data : params
            });
        }
    };
});


//菜单角色关系
baseFontApp.service("roleMenuService", function ($http) {
    return {
        //用户列表
        query : function (params) {
            return $http({
                url : '/easyShopping/roleMenu/page.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        }, 
        //用户列表
        list : function (params) {
            return $http({
                url : '/easyShopping/roleMenu/list.json',
                method : 'get',
                dataType : 'json',
                params : params
            });
        },
        distributeMenu : function(params){
            return $http({
                url : '/easyShopping/roleMenu/distributeMenu.json',
                method : 'post',
                dataType : 'json',
                data : params
            });
        }
    };
});
