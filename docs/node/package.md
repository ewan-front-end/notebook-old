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
            <span>M 0000:00:00</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>描述文件</h1><strong>描述文件</strong>
</div>
<div class="static-content">
:::2021.06.28:::

```json
{
  "name": "watcher",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "chokidar": "^3.5.1"
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