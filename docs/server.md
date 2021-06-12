[上一级](../)

# 服务器

::: page-links 相关链接
[koa](/node/koa) [express](/node/express) 
:::

[Node原生](#Node原生) - [简易服务](#简易服务) - [Node框架](#Node框架) - 

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
