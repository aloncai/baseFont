

baseFontApp.config( function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller:'loginController',
            templateUrl:'/app/modules/login/htmls/login.html'
        })
        .when('/login', {
            controller:'loginController',
            templateUrl:'/app/modules/login/htmls/login.html'
        })
        .when('/welcome', {
            templateUrl:'/app/modules/base/htmls/welcome.part.html'
        })
        .when('/user/userList', {
            controller:'userListController',
            templateUrl:'/app/modules/user/htmls/user_list.html'
        })
        .otherwise({
            templateUrl: "/app/modules/base/htmls/unknow.part.html"
        })
    ;
    //$stateProvider.
    //    state('login', {
    //    url : '/login',
    //    templateUrl : 'app/modules/login/htmls/Login.html',
    //    controller: 'loginController'
    //});
});