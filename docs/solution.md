[上一级](../)

# 解决方案
## 相关链接
[未知](/database) [未知](#) [未知](#) 


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


## 需求分析
1. 产品需要什么样的内容和效果
2. 技术上需要做哪些工作才能达到产品要求
3. 技术上有哪些指标

#### 产品要求
- 包含登录／注册／找回密码／信息设置与修改
- 支持PC和移动端，各个子网站需要有自己的样式
- 功能逻辑必须统一和同步

#### 技术应对
- 通过JS SDK的方式，由一个团队统一开发维护，保证功能的统一以及修改的同步
- 支持PC和移动端，因此包体积要小，要分包，不能有依赖
- JS SDK要包含全部的业务逻辑，但不包含具体样式，由下游业务方进行自定义

#### 前端技术指标
- 浏览器兼容到IE8
- 支持PC和移动端,大小不能超过30k
- 支持多种引用方式：直接引用，commonJS(require([module])), AMD(require([module], callback)), ES6(import)


## 架构设计
原则：自顶向下，自外而内，从用户最先接触的地方开始

1. 对外的API接口设计
    - 原则
        简单易用，封装性，灵活性
    - 考虑下三个问题
        暴露什么样的接口？（类or普能函数or对象）<br>
        有哪些配置项？<br>
        默认值是什么？<br>
    - 编写公共模块的三个原则
        (1) 对外暴露函数：单一功能，且无内部状态<br>
        (2) 对外暴露对象：无关联的功能集合<br>
        (3) 对外暴露class(构造函数):互相关联的功能集合或存有内部状态的功能<br>
2. 模块的划分与关联
<img :src="$withBase('/images/solution-01.png')">

3. 模块的具体实现与一般性套路


App





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
















