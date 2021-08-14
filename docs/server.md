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
    <div class="content"><div class="links">
<ul class="desc">
<li><a href="/node/koa">koa</a></li>
<li><a href="/node/express">express</a></li>
</ul>
</div></div>
</div>
<div class="content-header">
<h1>服务器</h1><strong>服务器</strong>
</div>
<div class="static-content">

# Node原生
```
var http = require("http");

var app = http.createServer(function(req, res) {
res.writeHead(200, {"Content-Type": "text/plain"});
res.end("Hello world!");
});

app.listen(3000, "localhost");
//注01 文件操作
```

# 简易服务
**http-server**
  ```
  anywhere> npm install http-server -g  
  // 全写server-demo> http-server 默人端口8080 指定端口-p 8887
  server-demo> hs
  ```
**lite-server**



# Node框架
[Express](pages/server/express/index.md)
[Koa](pages/server/koa/index.md)

</div>