

baseFontApp.config( function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl:'/app/modules/base/htmls/welcome.part.html'
        })
        .when('/login', {
            controller:'loginController',
            templateUrl:'/app/modules/login/htmls/Login.html'
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