#baseFont
这是一个使用angulaJs和grunt的前段项目模块。实现了以下功能：<br/>
1. 多个js，css文件代码合并；<br/>
2. js，css压缩；<br/>
3. 根据JSLint对js进行校验；<br/>
4. 监听文件变更，自动更新；<br/>
5. 开发环境（default）和正式环境（online）正式校验；<br/>
<br/>
使用方法：<br/>
1. 安装nodeJS，安装步骤很简单，请自行查阅资料<br/>
2. 进入该目录（eg：cd ~/code/baseFont/）<br/>
3. 安装grunt：<br/>
&nbsp;&nbsp; * npm install grunt-cli -g<br/>
&nbsp;&nbsp; * npm install grunt<br/>
4. 运行（grunt）进行构建（这是开发环境，实时监测代码变更并自动更新）<br/>
5. 运行（grunt dist）进行构建（这是生产环境，取消实时监测，也不会自动更新）<br/>
