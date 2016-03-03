// 用户状态 '状态[0-正常;1-冻结]'
baseFontApp.filter('userStatusFilter', function($rootScope) {  
   return function(input) {
      var label = $rootScope.global.dictionary.user.label;
      var status = Number(input);
      if(status === 0){
      	return label.statusNormal;
      }else if(status === 1){
      	return label.statusFrozen;
      }else{
      	return label.statusUnknow;
      }
   };  
 }); 


// 日志类型 [0-创建;1-修改；2-修改密码；4-登陆]
baseFontApp.filter('userLogType', function($rootScope) {  
   return function(input) {
      var label = $rootScope.global.dictionary.user.label;
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
         return label.statusUnknow;
      }
   };  
 });