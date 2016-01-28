<%@ page contentType="text/html;charset=UTF-8" language="java" trimDirectiveWhitespaces="true"%>
<%
    //根据url前缀区分是所用的环境
    String staticHost = "http://front.qdingnet.com";
    String env = request.getServerName().split("\\.")[0];
    if (env.equalsIgnoreCase("boss")) {
        //正式环境
        staticHost = "http://front.qdingnet.com";
    }else if(env.equalsIgnoreCase("qaboss")){
        //测试环境
        staticHost = "http://qafront.qdingnet.com";
    }else if(env.equalsIgnoreCase("devboss")){
        //开发环境
        staticHost = "http://devfront.qdingnet.com";
    }else if(env.startsWith("localhost")){
        //本地环境
        staticHost = "http://localhost";
    }
%>
<!DOCTYPE html>
<html lang="zh-CN" ng-app="baseFontApp">
<head>
    <meta charset="utf-8" />
    <title>easyShopping</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

    <script src="<%=staticHost %>/js/jquery/1.12.0/jquery.min.js"></script>
    <script src="<%=staticHost %>/js/angular/1.5.0-rc.1/angular.min.js"></script>
    <script src="<%=staticHost %>/js/angular/1.5.0-rc.1/angular-route.min.js"></script>
    <script src="<%=staticHost %>/js/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="<%=staticHost %>/dist/js/baseFont.js"></script>

    <link rel="stylesheet" href="<%=staticHost %>/js/bootstrap/3.3.5/css/bootstrap.min.css"/>
    <script src="<%=staticHost %>/qding/js/cleaner.min.js"></script>
</head>
<body cs-layout></body>
</html>