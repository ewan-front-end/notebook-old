```js
{
<name> 项目名
不要在name中包含js, node字样
这个名字最终会是URL的一部分，命令行的参数，目录名，所以不能以点号或下划线开头
这个名字可能在require()方法中被调用，所以应该尽可能短
<version> 版本演进
[description] 项目说明
必须是字符串。npm search的时候会用到

[main] 模块入口文件
如：import Vue from 'vue'时，会从这里寻找入口
[module] 模块入口文件
[typings] typescript文件入口
[unpkg] "lib/index.js",
[style]  "lib/theme-chalk/index.css",
CommonJS 规范 module.exports和require()
当 require('当前模块') 的时候，就会根据 main 字段去查找入口文件
"main": "lib/index.js"
------------------------------------------------------------------
ES6 规范 export和import
"module": "es/index.js"
------------------------------------------------------------------
"types/index.d.ts"

[Dependencies] 生产依赖列表
[devDependencies] 开发依赖列表
{ 
"demo" : "2.0.1",  完全匹配
"demo" : "~1.2.3",  非常接近这个版本
"demo" : "^1.2.3",  与当前版本兼容
"demo" : "*",  任何版本都可以
"demo" : "",  任何版本都可以
"demo" : "1.0.0 - 2.9999.9999",  范围，等价于 >=version1 <=version2
"demo" : ">=1.0.2 <2.1.2",  大于等于  与  小于
"demo" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",  range1 || range2 或
"demo" : "http://asdf.com/demo.tar.gz",  Git地址
"demo" : "3.3.x",  X代表任意数字，因此3.3.1, 3.3.3等都可以，另如："two" : "2.x"
}
--------------------------------------------------------------------------------------------
如果只需要下载使用某些模块，而不下载这些模块的测试和文档框架，放在这个下面比较不错

[scripts] 参考 注01






[author] 作者(个人)
[contributors] 贡献者(组)
{ 
"name" : "Barney Rubble",
"email" : "b@rubble.com",
"url" : "http://barnyrubble.tumblr.com/" 
}
或：
"Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"


[files]
项目包含的一组文件(即项目安装后可见的文件或文件夹)。如果是文件夹，文件夹下的文件也会被包含。如果需要把某些文件不包含在项目中，添加一个”.npmignore”文件。这个文件和”gitignore”类似。



[bin]
很多的包都会有执行文件需要安装到PATH中去。这个字段对应的是一个Map，每个元素对应一个{ 命令名：文件名 }。
{ "bin" : { "npm" : "./cli.js" } }
[directories]
用于指示包的目录结构：
Directories.lib
指示库文件的位置。
Directories.bin
和前面的bin是一样的，但如果前面已经有bin，那么这个就无效。
除了以上两个，还有Directories.doc& Directories.man & Directories.example。

[repository] git仓库地址
"repository" : { 
"type" : "git"
"url" : "http://github.com/npm/npm.git"
}
 
"repository" : { 
"type" : "svn"
"url" : "http://v8.googlecode.com/svn/trunk/"
}
[homepage]
通过gh-pages发布到github的主页地址,没有http://等带协议前缀的URL
[keywords]
字符串数组。npm搜索时的关键词
[license] 许可证/协议
如果是使用一个普遍的license，比如BSD-3-Clause或MIT，
直接使用：{ "license" : "BSD-3-Clause" }
[bugs]  
问题追踪系统的URL或邮箱地址；npm bugs用的上。
{ 
"url" :"http://github.com/owner/project/issues",
"email" :"project@hostname.com" 
}



[config]
object。Config对象中的值在Scripts的整个周期中皆可用，专门用于给Scripts提供配置参数。

[peerDependencies]
兼容性依赖。如果你的包是插件，适合这种方式。
[bundledDependencies]
发布包时同时打包的其他依赖。
[optionalDependencies]
如果你想在某些依赖即使没有找到，或则安装失败的情况下，npm都继续执行。那么这些依赖适合放在这里。
[engines]
既可以指定node版本：
{ "engines" : {"node" : ">=0.10.3 <0.12" } }
也可以指定npm版本：
{ "engines" : {"npm" : "~1.0.20" } }
[engineStrick]
布尔值。如果你肯定你的程序只能在制定的engine上运行，设置为true。
[os]
指定模块可以在什么操作系统上运行：
"os" : [ "darwin","Linux" ]
"os" : [ "!win32" ]
[cpu] 指定CPU型号
"cpu" : [ "x64","ia32" ]
"cpu" : [ "!arm","!mips" ]
[preferGlobal]
布尔值。如果你的包是个命令行应用程序，需要全局安装，就可以设为true。
[private]
布尔值。如果private为true，npm会拒绝发布。这可以防止私有repositories不小心被发布出去。
[publishConfig]
发布时使用的配置值放这。
[faas] Functions-as-a-Service


  
  
  
 
  "unpkg": "lib/index.js",
  "style": "lib/theme-chalk/index.css",

。
}

注01 [scripts]
npm会在scripts区域寻找包括npm start和npm test等命令
npm run 来运行scripts里的任何条目
使用npm run的方便之处在于，npm会自动把node_modules/.bin加入$PATH，这样你可以直接运行依赖程序和开发依赖程序，不用全局安装了。
"scripts": {
        "start": "node www/development.js",       // npm start = node www/development.js
        "watch": "npm run watch-compile"          // npm watch = npm run watch-compile
}
"scripts":{"start": "node server.js"}
如果你的包里有server.js文件，npm默认将执行： node server.js.
"scripts":{"preinstall":"node-gyp rebuild"}
如果包里有binding.gyp，npm默认在preinstall命令时，使用node-gyp做编译
"scripts": {
    	"build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js",
    	"build-css": "cat static/pages/*.css tabs/*/*.css",
    	"build": "npm run build-js && npm run build-css", // 序列化子任务
    	"watch-js": "watchify browser/main.js -o static/bundle.js -dv", // 这里加了-d和-v两个参数，这样就可以看到详细的调试信息
    	"watch-css": "catw static/pages/*.css tabs/*/*.css -o static/bundle.css -v", // 用catw监视CSS文件的改动
    	"watch": "npm run watch-js & npm run watch-css", // 并行子任务
    	"start": "npm run build && node server.js",
    	"start-dev": "npm run watch & npm start",
"build-js": "bin/build.sh" // 运行命令文件,别忘了chmod +x，附：bin/build.sh
    	"test": "tap test/*.js"
}
附：bin/build.sh
#!/bin/bash
(cd site/main; browserify browser/main.js | uglifyjs -mc > static/bundle.js)
(cd site/xyz; browserify browser.js > static/bundle.js)


{
"name": "my-silly-app",
"version": "1.2.3",
"description": "说明文本",
"main": "lib/index.js",
"module": "es6/index.js",
"author": "wanyuaning",
"license": "ISC",
"private": true,

"files": [ "lib", "src", "packages", "types" ], // 安装时这些文件或文件夹会被安装
"dependencies": {
"browserify": "~2.35.2",
"uglifyjs": "~2.3.6"
  },
"devDependencies": {
"watchify": "~0.1.0",
"catw": "~0.0.1",
"tap": "~0.4.4"
},
"scripts": {
"build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js",
"build-css": "cat static/pages/*.css tabs/*/*.css",
"build": "npm run build-js && npm run build-css", 
"watch-js": "watchify browser/main.js -o static/bundle.js -dv",
"watch-css": "catw static/pages/*.css tabs/*/*.css -o static/bundle.css -v", 
"watch": "npm run watch-js & npm run watch-css", 
"start": "node server.js",
"start": "npm run build && node server.js",
"start-dev": "npm run watch & npm start",
"test": "tap test/*.js"
}
}
```
产环境下，只需运行npm run build。
本地开发，就用npm run watch