<%@ page contentType="text/html;charset=UTF-8" language="java" trimDirectiveWhitespaces="true"%>
<%
    //根据url前缀区分是所用的环境
    String staticHost = "http://" + request.getHeader("host") + ":9000";
%>
<!DOCTYPE html>
<html lang="zh-CN" ng-app="baseFontApp">
<head>
    <meta charset="utf-8" />
    <title>easyShopping</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">


    <script src="<%=staticHost %>/js/jquery/1.12.0/jquery.min.js"></script>
    <script src="<%=staticHost %>/js/angular/1.5.0-rc.1/angular.min.js"></script>
    <script src="<%=staticHost %>/js/angular/1.5.0-rc.1/angular-route.min.js"></script>
    <script src="<%=staticHost %>/js/angular/1.5.0-rc.1/angular-animate.min.js"></script>
    <script src="<%=staticHost %>/js/angular/1.5.0-rc.1/angular-cookies.min.js"></script>
    <script src="<%=staticHost %>/js/angular/1.5.0-rc.1/angular-touch.min.js"></script>
    <script src="<%=staticHost %>/js/angular/1.5.0-rc.1/angular-sanitize.min.js"></script>
    <script src="<%=staticHost %>/js/angular/1.5.0-rc.1/angular-resource.min.js"></script>

    <script src="<%=staticHost %>/js/angular-ui-bootstrap/1.2.0/ui-bootstrap-tpls.min.js"></script>
    <script src="<%=staticHost %>/js/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="<%=staticHost %>/js/bootstrap/3.3.5/css/bootstrap.min.css"/>

    <link rel="stylesheet" href="<%=staticHost %>/js/font-awesome/3.2.1/font-awesome.min.css"/>

    <script src="<%=staticHost %>/js/moment/2.10.6/moment.min.js"></script>
    <script src="<%=staticHost %>/js/moment/2.10.6/moment-with-locales.min.js"></script>
    <script src="<%=staticHost %>/js/angular-bootstrap-datetimepicker/1.0.1/js/datetimepicker.js"></script>
    <script src="<%=staticHost %>/js/angular-bootstrap-datetimepicker/1.0.1/js/datetimepicker.templates.js"></script>
    <link rel="stylesheet" href="<%=staticHost %>/js/angular-bootstrap-datetimepicker/1.0.1/css/datetimepicker.css"/>


    <script src="<%=staticHost %>/js/angular-flash/angular-flash.min.js"></script>
    <link rel="stylesheet" href="<%=staticHost %>/js/angular-flash/angular-flash.min.css"/>

    <script src="<%=staticHost %>/js/angular-file-upload/3.0.0-alpha/angular-file-upload.min.js"></script>

    <link rel="shortcut icon" href="<%=staticHost %>/app/imgs/favicon_min.jpg" type="image/x-icon" />

    <script src="<%=staticHost %>/dist/js/baseFont.js"></script>
    <link rel="stylesheet" href="<%=staticHost %>/dist/css/baseFont.min.css"/></head>
<body cs-layout></body>
</html>