#baseFont
这是一个使用angulaJs和grunt的前段项目模块。实现了以下功能：
1.多个js，css文件代码合并；
2.js，css压缩；
3.根据JSLint对js进行校验；
4.监听文件变更，自动更新；
5.开发环境（default）和正式环境（online）正式校验；

使用方法：
1.安装nodeJS，安装步骤很简单，请自行查阅资料
2.进入该目录（eg：cd ~/code/baseFont/）
3.安装grunt：
    npm install grunt-cli -g
    npm install grunt
4.运行（grunt）进行构建（这是开发环境，实时监测代码变更并自动更新）

5.运行（grunt dist）进行构建（这是生产环境，取消实时监测，也不会自动更新）
