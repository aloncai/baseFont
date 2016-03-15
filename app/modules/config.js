//$http拦截器
baseFontApp.factory('httpInterceptor', function ($q, $rootScope , $locale, $cookies, Flash) {
    var httpInterceptor = {
        //请求拦截
        request: function (config) {
            return $q.when(config);
        },
        //相应拦截
        response: function (res) {
            //请求成功
            var returnData = res.data;
            //登录失效
            if (returnData.code === 10001) {
                returnData.data = $rootScope.i18n.network.session_timeout_tip;
                //customAlert custom-class
                var path = encodeURIComponent(window.location.hash.substring(1));
                var msg = $rootScope.i18n.network.session_timeout_tip + '<a class="btn btn-warning" href="#/login?path=' + path + '" ng-click="$dismiss()" role="button">' + $rootScope.i18n.login.loginButton + '</a>';
                Flash.create("warning", msg, 10000);
                $cookies.remove("userId");
            }
            if(returnData.code === undefined || returnData.code === 200){
                return res; 
            }else{
               return $q.reject(res);
           }
       },
       requestError: function (rej) {
            var data = {
                "code": 500,
                "data": $rootScope.i18n.network.request_error_tip
            };
            rej.data = data;
            Flash.create('danger', rej.data.data);
            return $q.reject(rej);
        },
        responseError: function (rej) {
            var data = {
                "code": 500,
                "data": $rootScope.i18n.network.response_error_tip
            };
            rej.data = data;
            Flash.create('danger', rej.data.data);
            return $q.reject(rej);
        }
    };
    return httpInterceptor;

});

// 拦截器注入
baseFontApp.config(function ($httpProvider) {
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    $httpProvider.interceptors.push('httpInterceptor');
});

// 分页配置 (ui.bootstrap.datepicker)
baseFontApp.config(function (uibPaginationConfig) {
    uibPaginationConfig.boundaryLinkNumbers = true;
    uibPaginationConfig.rotate = true;
});

// 时间控件配置
baseFontApp.config(function (uibDatepickerConfig, uibDatepickerPopupConfig) {
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerPopupConfig.datepickerPopup = 'yyyy-MM-dd';
});