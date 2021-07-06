
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
