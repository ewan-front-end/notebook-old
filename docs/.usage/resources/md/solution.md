es6+


SDK特点
- 纯JS 无依赖
SDK要求
- 通用性 兼容性 可靠性 封装性
- 有更多使用ES6+的场景
SDK开发
- 业务逻辑为主 忽略样式和HTML结构

架构
- 环境搭建        
        ES5-SHIM支持IE8
        工程化工具WEBPACK(模块化管理、代码优化、压缩合并)(ES6+语法的编译工具BABEL(ES6+转ES6,兼容更多的浏览器))        
        合适的脚手架工具（HTML-BUNDLER）
- 架构设计
- 开发流程
参才截图

时间线

babel
demo3/
index.js
```
const a = 1
const f = (arr) => Array.from(arr)
```
demo3> babel index.js

参才截图

html-bundler

ReferenceError: primordials is not defined
node版本太高

## 网站账号体系SDK
```
npm i html-bundler -g
hb create es6-passport -w

es6-passport> npm install
es6-passport> hb dev
```

## 环境准备
```
npm install es5-shim babel-polyfill --save-dev        //安装必要的polyfill
    es6-passport/webpack.dll.js
        const vendors = ['es5-shim', 'babel-polyfill']
    es6-passport> npm run dll              // vendors重新生成

npm install gulp-file-include --save-dev  //加入gulp-file-include
    用于HTML内引入外部模板，如header footer
    es6-passport/html-bundler.config.js
        var fileInclude = require('gulp-file-include')
        // 生产
        var destMod = {
            custom: {
                html:[{func:fileInclude, opts:{prefix:'@@',basepath:'@file'}}]
            }
        }
        // 开发
        var devMod = {
            custom: {
                html:[{func:fileInclude, opts:{prefix:'@@',basepath:'@file'}}]
            }
        }
es6-passport/html/templates
es6-passport/html/templates/header.html
    <div class="header"></div>
es6-passport/html/templates/footer.html
    <div class="footer"></div>
es6-passport/html/templates/index.html
    @@include('./template/header.html', {})
    @@include('./template/footer.html', {})
es6-passport> hb dev
```

## 开发
```












```















