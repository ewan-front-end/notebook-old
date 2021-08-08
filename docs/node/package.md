---
pageClass: theme-item
---
<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>M 0000:00:00 00:00</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>描述文件package.json</h1><strong>描述文件package.json</strong>
</div>
<div class="static-content">

```json
{
    "name": "watcher",                                          // 插件名称 不与项目目录名重复 npm install xxxx
    "version": "1.0.0",                                         // 插件版本
    "description": "",                                          // 插件描述
    "author": "",                                               // 作者
    "main": "index.js",                                         // 入口文件路径 require(name)将根据这个路径来引入
                                                                // 命令行 通过npm run 执行
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],                                             // 关键词方便npm官网搜索
    "license": "ISC",                                           // 遵循的开源协议
    "devDependencies": {
        "chokidar": "^3.5.1"
    },

    "type": "module",                                           // 以哪种模块方案进行解释 module(ESM)/commonjs 
    "private": true,                                            // 是否私有
                                                              // 环境要求
    "engines": {
        "node": ">= 6.0.0",
        "npm": ">= 3.0.0"
    },
                                                              // Github仓库项目地址 
    "repository": {
        "type": "git",
        "url": "https://github.com/xxx/my-plugin.git"
    },
    "bugs": {
        "url": "https://github.com/xxx/my-plugin/issues"
    }
}
```

## scripts
<pre>
命令关系：
    &  并列运行  
    && 顺序执行 如果前一个命令报错或挂载执行 则后命令不会执行
        vuepress dev docs && node docs/.usage/createWatch.js
    要想同时运行多条挂载命令 使用[concurrently
        1. npm i concurrently -g
        2. "scripts": { "start": "concurrently \"npm run clientServer\" \"npm run server\"" }

 
   
    
</pre>


</div>