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
            <span>N 2022.01.11 14:32</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>框架</h1><strong>框架</strong>
</div>
<div class="static-content">

- demo> npm install express --save

- demo/server.js
```
const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World222!')
})

// 通过多次使用静态中间件 可设置多个静态目录
app.use(express.static('public'))
app.use(express.static('files'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

- demo> node server.js

- 浏览器：http://localhost:3000

访问静态文件
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html

app.use('/static', express.static('public'))
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html


# KOA
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