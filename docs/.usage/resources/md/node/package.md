
```json
{
  "name": "watcher",                                          // 项目名称 不与项目目录名重复
  "version": "1.0.0",                                         // 项目版本
  "description": "",                                          // 项目描述
  "author": "",                                               // 作者
  "main": "index.js",
                                                              // 脚本缩写
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],  
  "license": "ISC",
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

 
   
{
    "name": "my-plugin",             插件的名字
    "version": "1.0.0",                插件版本号
    "description": "一个简单的插件",    插件描述
    "author": "名字",     作者名
    "license": "MIT",     许可证书，一般开源是MIT
    "main": "myPlugin.js",  入口文件路径，require(name)将根据这个路径来引入
    "scripts": {},          命令行，通过npm run 执行
                           github仓库项目地址 
    "repository": {
    "type": "git",
    "url": "https://github.com/xxx/my-plugin.git"
    },
    "keywords": ["my", "plugin"],   关键词，使用数组形式，方便npm官网搜索
    
    "bugs": {
        "url": "https://github.com/xxx/my-plugin/issues"
    }
}     
</pre>
