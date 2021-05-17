## 使用手册



### qiankun



```
Beyoud compare
1.自动文件夹对比
会话 > 新建会话 > 文件夹比较  [保存会话]
主页 > 左则 目标会话 右键 > 编辑
选项卡 比较 > 需要打开的文件
  复选 比较内容
    单选 二进制比较
  保存

2.复制文件 特别是独有文件([差别]下拉 > 显示...项) 
  ctrl点选左则独有项 > 右键 > 复制到文件夹 “复制到文件夹”功能面板指定目标文件夹 如果点选了多个文件且不属相同文件夹 则应考虑是否勾选 保持相对文件夹结构
  
3.同步修改文件
  打开文件 启用编辑功能 对差异文本复制粘贴即可

4.FTP协议上传到远程服务器

5.禁止编辑文件
会话 > 会话设置 勾选禁止编辑
6.Tab空格
工具 > 文件格式”选项 杂项 勾选“插入空格而不是制表符” 制表位:4

▃
▅
▇12
[h4|Linux][DETAIL&#/pages/system/linux.md]
mkdir
touch index.js                                        
▇
▇12
[h4|Windows][DETAIL&#/pages/system/windows.md]
/
touch index.js(需npm i touch-cli -g)  
▇
▅
▃

▃
▅
▇12
[h4|rollup][HELP/rollup-webpack-02] 
偏向应用于js库                                                              
> npm i [b ci|rollup] -g 
> [b ci|rollup] -v      

mkdir demo & cd rollupdemo
mkdir src & cd src
touch main.js
  import foo from './foo.js';
  export default function () {
    console.log(foo);
  }
touch foo.js
  export default 'hello rollup!'

|demo> [b c0|rollup] src/main.js [cg|-o lib/bundle.js] [ch|-f cjs] [HELP/rollup-webpack-01]
▇
▇12
[h4|webpack][DETAIL&#/pages/common/webpack.md]
偏向应用于前端工程
demo> yarn init -y
demo> yarn add [b ci|webpack webpack-cli] -D

[cf b b9|/webpack.config.js]
const [b cg|HtmlWebpackPlugin] = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  [b ch|mode]: 'development', // 值：production/development/none
  [b ch|entry]: './src/index.js',                           // 相对路径
  [b ch|output]: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),           // 绝对路径
  },
  [b ch|module]: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
  [b ch|plugins]: [
    new [b cg|HtmlWebpackPlugin]({template: './src/index.html'})
  ]
}
▇
▅
▃

▉rollup-webpack-01▉
[cg|-o表示输出bundle.js文件] [ch|-f cjs表示使用commonjs标准输出]
▉
▉rollup-webpack-02▉
npm i rollup -g 
rollup -v

项目打包及更复杂功能：https://www.rollupjs.com/guide/command-line-reference
[开发一个NPM插件]($SCENE?id=开发一个NPM插件)
▉




      

[h4|npm][h4|yarn] 
npm config set registry https://registry.npm.taobao.org  添加镜像  npm config delete registry
▃
▅
▇8
install node                                        
[cl|npm -v]                                             
[cl|npm init]	                                          
[cl|npm install/link]	
[cl|npm publish/login/logout]	                          
[cl|npm run/test]                                  
[ci|npm install xx —save]  
[ci|npm install xx --save-dev]                              
npm uninstall taco —save
npm update taco —save	                             
npm install taco --global
▇
▇16
npm i yarn -g                   安装                          
[cl|yarn -v                         版本]                                        
[cl|yarn init    	                  初始化某个项目]                                      
[cl|yarn install/link               默认的安装依赖操作]
[cl|yarn publish/login/logout    	  发布/登录/登出，一系列NPM Registry操作]                      
[cl|yarn run/test    	              运行某个命令]                                
[ci|yarn add xx                     安装某个依赖，并且默认保存到package]
[ci|yarn add xx --dev               安装某个开发时依赖项目]                                   
yarn remove taco                移除某个依赖项目           
yarn upgrade taco	              更新某个依赖项目                            
yarn global add taco            安装某个全局依赖项目            
▇
▅
▃
npm view vue            更丰富 npm info vue        https://www.npmjs.com/
npm view vue version    服务器上包的最新的版本信息   https://www.npmjs.com/
npm view vue versions   服务器上包的所有的版本信息   https://www.npmjs.com/
npm ls vue              本地安装包版本信息          project/
npm ls vue -g           本地全局安装的pkg版本       全局



[h4|nginx]
[detail3](/pages/common/nginx.md)

windows: 
    安装：http://nginx.org/en/download.html   [b5 cf| 配置 ]
    [b-green cf| 启动 ] [green|c:\nginx\ nginx.exe]  [cc|或 c:\nginx\ start nginx]
    [b-yellow cf| 重启 ] [yellow|c:\nginx\ nginx.exe -s reload]  
    [b-red cf| 停止 ] [red|c:\nginx\ nginx.exe -s stop] [cc|或 c:\nginx\ nginx.exe -s quit]
mac: 
    安装：[brew](/pages/lang/index?id=ruby) install nginx  [b5 cf| 配置 ]
    [b-green cf| 启动 ] [green|nginx]    
    [b-yellow cf| 重启 ] [yellow|nginx -s reload]  
    [b-red cf| 停止 ] [red|nginx -s stop]

[CLASS s12 l12]
[b5 cf|Windows c:\nginx\conf\nginx.conf] [b5 cf|Mac /usr/local/etc/nginx/nginx.conf][DETAIL](/pages/common/nginx?id=nginx.conf)
http {
    server {
        listen 8080;
        server_name localhost;
        # 反向代理 把默认location注释掉
        location [blue b|/] {
            proxy_pass [blue alpha5|http://localhost:8001];
        }
        location [blue b|/api/] {
            proxy_pass [blue alpha5|http://localhost:8000];
            proxy_set_header Host $host;
        }
    }
}
验证nginx.conf配置是否正确：
  nginx -t                     默认/conf/nginx.conf
  nginx -tc /conf/aliase.conf  自定义名称


[h4|文档]
>$ sudo npm i docsify-cli -g<br>
>$ docsify init ./docs<br>
>$ docsify serve docs
windows系统变量：C:\Users\new\AppData\Roaming\npm\docsify


[h4|express(Web Back-End/node/express)]
>$ sudo npm install express-generator -g<br>
>$ express --version<br>
>$ express projectname<br>
>$ cd projectname & npm install & npm start & http://localhost:3000/<br>
 开发工具 <br>
>$ sudo npm i -g nodemon cross-env  - package.json/scripts/"dev":"cross-env NODE_ENV=dev nodemon node ./bin/www"  - npm run dev


[h4|cross-env]

[h4|nodemon]
通过监视启动文件来监视node.js应用程序中的任何更改并自动重启服务
全局
$ sudo npm install -g nodemon
$ cd 项目
$ nodemon bin/www.js
本地
$ npm install --save-dev nodemon
{
"scripts": {
    "dev": "nodemon bin/www.js"
}
}
$ npm run dev


[h4|nvm]
nodejs的版本管理工具
windows: https://github.com/coreybutler/nvm-windows/releases (nvm-setup.zip)下载安装
nvm install v8.16.0  
nvm use v8.16.0  
nvm list    


[h4|nrm]
+ sudo npm i nrm -g
+ nrm ls // 代理源列表
+ nrm use taobao 使用taobao源

[h4|http-server]
- sudo npm i http-server -g
- 项目目录 $ hs   
- 访问http://127.0.0.1:8080


[h4|curl]
客户端Web服务请求工具, mac机自带，curl --version
 * -d 参数用于发送POST请求时带参数据体 *
+ $ curl -d 'login=ewan＆password=123' -X POST https://google.com/login
+ $ curl -d 'login=ewan' -d 'password=123' -X POST https://google.com/login
+ $ curl -d '{"login":"ewan"}' -X POST https://google.com/login
 * -u 参数用来设置服务器认证的用户名和密码 *
+ $ curl -u 'ewan:123456' https://google.com/login   自动化构建时，配置为王
+ $ curl -u 'ewan' https://google.com/login  命令行交互时，后续有一步输入密码的交互
 * -X 参数指定 HTTP 请求的方法 *
+ $ curl -X POST https://google.com/login


[h4|parcel-bundler]
极速零配置Web应用打包工具
+ $ sudo npm i -g parcel-bundler
+ 项目目录 $parcel index.html


[h4|VScode][DETAIL&#/pages/tools/vscode]
+ auto close tag
+ auto rename tag
+ path-alias
+ 首选项／用户片断 
+ koroFileHeader
+ code snippets
+ node readme
+ npm dependency links


```





































