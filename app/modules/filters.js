baseFontApp.filter('userStatusFilter', function() {  
   return function(input) {
      var status = Number(input);
      if(status === 0){
      	return "正常";
      }else if(status === 1){
      	return "冻结";
      }else{
      	return "未知";
      }
   };  
 }); 