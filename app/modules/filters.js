// 用户状态 '状态[0-正常;1-冻结]'
baseFontApp.filter('userStatusFilter', function($rootScope) {  
   return function(input) {
      var label = $rootScope.i18n.user;
      var status = Number(input);
      if(status === 0){
      	return label.statusNormal;
      }else if(status === 1){
      	return label.statusFrozen;
      }else{
      	return $rootScope.i18n.public.unKnow;
      }
   };  
 }); 


// 日志类型 [0-创建;1-修改；2-修改密码；4-登陆]
baseFontApp.filter('userLogType', function($rootScope) {  
   return function(input) {
      var label = $rootScope.i18n.user;
      var status = Number(input);
      if(status === 0){
         return label.logTypeCreate;
      }else if(status === 1){
         return label.logTypeUpdate;
      }else if(status === 3){
         return label.logTypeChangePassword;
      }else if(status === 4){
         return label.logTypeLogin;
      }else{
         return $rootScope.i18n.public.unKnow;
      }
   };  
 });

// 菜单'状态[0-正常;1-已废除]'
baseFontApp.filter('menuStatusFilter', function($rootScope) {  
   return function(input) {
      var label = $rootScope.i18n.menu;
      var status = Number(input);
      if(status === 0){
         return label.statusNormal;
      }else if(status === 1){
         return label.statusAbolish;
      }else{
         return $rootScope.i18n.public.unKnow;
      }
   };  
 }); 