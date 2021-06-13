<div class="extend-header">
<div class="info">
<a class="back" href="./">上一级</a>
<div class="mini">
<span>2021.01.02</span>
</div>
</div>
<div class="content">


</div>
</div>



1 nodejs交互壳外安装，即，运行cmd后直接安装 npm install socket.io



了解下 WebSocket 协议及socket.io。nodejs和socket.io是不错的组合，对于不支持 WebSocket 协议的也做了轮询的fallback，使用很简单(来自于socket.io官网)：

后端：
```js
var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
```

前端：
```js
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>
```







```

ws web
package.json
{
  "name": "websocket-web",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "ws": "^7.2.0"
  }
}
server.js
var express = require('express');
var http = require('http');
var WebSocket = require('ws');

var app = express();
app.use(express.static(__dirname));

var server = http.createServer(app);
var wss = new WebSocket.Server({ server });

wss.on('connection', function connection (ws) {
  console.log('链接成功！');
  ws.on('message', function incoming (data) {
    /**
     * 把消息发送到所有的客户端, wss.clients获取所有链接的客户端
     */
    wss.clients.forEach(function each (client) {
      client.send(data);
    });
  });
});
server.listen(8000, function listening () {
  console.log('服务器启动成功！');
});
index.html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>在线聊天</title>
</head>

<body>
  <input type="text" onblur="wsServer.onopen(this.value)">
  <script>
    var wsServer = new WebSocket('ws://127.0.0.1:8000');
    wsServer.onopen = function (e) {
      (typeof e == 'string') && wsServer.send(e);//向后台发送数据
    };
    wsServer.onclose = function (e) {//当链接关闭的时候触发

    };
    wsServer.onmessage = function (e) {//后台返回消息的时候触发
      console.log(e);
    };
    wsServer.onerror = function (e) {//错误情况触发

    }
  </script>
</body>
</html>

ws app
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection (ws) {
  console.log('Server:用户加入成功！');

  ws.on('message', function incoming (message) {
    console.log('Server接收到Client端信息：', message);
  });
  console.log('Server:欢迎加入群聊！');
  ws.send('Server:欢迎加入群聊！');
});


const ws = new WebSocket('ws://localhost:8080');
ws.on('open', function open () {
  console.log('Client:连接服务成功！')
  console.log('Client：我上线啦！')
  ws.send('Client：大家好！');
});

ws.on('message', function incoming (data) {
  console.log('Client接收到Server端信息：' + data)
});

> node app.js
> Server:用户加入成功！
> Server:欢迎加入群聊！
> Client:连接服务成功！
> Client：我上线啦！
> Client接收到Server端信息：Server:欢迎加入群聊！
> Server接收到Client端信息： Client：大家好！




nodejs-websocket 
1. 创建项目： mkdir web-socket & cd web-socket
2.初始项目： npm init 创建 package.json 
3. 安装nodejs-websocket 入库: sudo npm install nodejs-websocket 
4. 创建 server.js文件
// 引入WebSocket模块  
var ws = require('nodejs-websocket')
var PORT = 3000

// on就是addListener，添加一个监听事件调用回调函数  
// Scream server example:"hi"->"HI!!!",服务器把字母大写  
var server = ws.createServer(function(conn){
  console.log('New connection')
  conn.on("text",function(str){
    console.log("Received"+str)
    // conn.sendText(str.toUpperCase()+"!!!") //大写收到的数据
    conn.sendText(str)  //收到直接发回去
  })
  conn.on("close",function(code,reason){
    console.log("connection closed")
  })
  conn.on("error",function(err){
    console.log("handle err")
    console.log(err)
  })
}).listen(3000)

5. node server.js

官方服务测试
<h1>Echo Test</h1>
<input id="sendTxt" type="text"/>
<button id="sendBtn">发送</button>
<div id="recv"></div>
<script>
var websocket = new WebSocket('ws://echo.websocket.org/')
websocket.onopen = () => { console.log('websocket open') }
websocket.onclose = () => { console.log('websocket cloase') }
websocket.onmessage = (e) => { console.log(e.data) }
document.getElementById('sendBtn').onclick = () => {
var text = document.getElementById('sendTxt').value;
websocket.send(text);
}
</script>

搭建自己的服务
1 npm install nodejs-websocket
2 ws-server.js
var ws = require("nodejs-websocket")
var PORT = 3000
var server = ws.createServer(function (conn) {
console.log("New connection")
conn.on("text", function (str) {
console.log("Received "+str)
conn.sendText(str.toUpperCase()+"!!!")
})
conn.on("close", function (code, reason) {
console.log("Connection closed")
})
conn.on("error", function (err) {
console.log(err)
})
}).listen(PORT)
console.log("websocket server listening on port " + PORT)
3 index.html
<h1>Echo Test</h1>
<input id="sendTxt" type="text"/>
<button id="sendBtn">发送</button>
<div id="recv"></div>
<script>
var websocket = new WebSocket('ws://localhost:8001')
websocket.onopen = () => { console.log('websocket open') }
websocket.onclose = () => { console.log('websocket cloase') }
websocket.onmessage = (e) => { console.log(e.data) }
document.getElementById('sendBtn').onclick = () => {
var text = document.getElementById('sendTxt').value;
websocket.send(text);
}
</script>
4 node ws-server.js

简单的聊天功能
1 npm install nodejs-websocket
2 index.html
<h1>Chat Room</h1>
<input id="sendTxt" type="text"/>
<button id="sendBtn">发送</button>
<script>
var websocket = new WebSocket('ws://localhost:3000')
websocket.onopen = () => {
document.getElementById('sendBtn').onclick = () => {
var text = document.getElementById('sendTxt').value;
if (text) { websocket.send(text) }
}
}
websocket.onclose = () => {
console.log('websocket cloase')
}
websocket.onmessage = (e) => {
var mes = JSON.parse(e.data)
showMessage(mes, mes.type)
}
function showMessage(mes, type) {
var div = document.createElement('div')
if (type == 'enter') {div.innerHTML = mes.data; div.style.color = '#00f'}
if (type == 'leave') {div.innerHTML = mes.data; div.style.color = '#f00'}
if (type == 'message') {div.innerHTML = mes.user + ': ' + mes.data}
document.body.appendChild(div)
}
</script>
3 ws-server.js
var ws = require("nodejs-websocket")
var PORT = 3000
// 客户端计数
var clientCount = 0
var server = ws.createServer(function (conn) {
clientCount++
conn.nickname = 'user' + clientCount
var mes = {type: "enter", user: conn.nickname, data: conn.nickname + ' comes in'}
broadcast(JSON.stringify(mes)) // 广播
conn.on("text", function (str) {
 		var mes = {type: "message", user: conn.nickname, data: str}
broadcast(JSON.stringify(mes)) // 广播
})
conn.on("close", function (code, reason) {
var mes = {type: "leave", user: conn.nickname, data: conn.nickname + ' out'}
broadcast(JSON.stringify(mes)) // 广播
})
conn.on("error", function (err) {
console.log(err)
})
}).listen(PORT)
console.log("websocket server listening on port " + PORT)
function broadcast(str) {
server.connections.forEach(function (connection) {
connection.sendText(str)
})
}



SOCKET.IO(相当于nodejs-websocket SDK)  https://socket.io/docs/
1 npm install socket.io
2 ws-server.js
var app = require('http').createServer()
var io = require('socket.io')(app)
var PORT = 3000
var clientCount = 0 // 客户端计数
app.listen(3000)
io.on('connection', function (socket) {
clientCount++
socket.nickname = 'user' + clientCount
var mes = {user: socket.nickname, data: socket.nickname + ' comes in'}
io.emit('enter', mes) // 广播 注：socket.emit为向特定用户发送

socket.on('message', function (data) {
var mes = {user: socket.nickname, data: data}
io.emit('message', mes) // 广播
});
// 内置断开事件
socket.on('disconnect', function () {
var mes = {user: socket.nickname, data: socket.nickname + ' out'}
io.emit('leave', mes) // 广播
})
})
console.log("websocket server listening on port " + PORT)
3 index.html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
<h1>Chat Room</h1>
<input id="sendTxt" type="text"/>
<button id="sendBtn">发送</button>
<script>
var socket = io('ws://localhost:3000')
document.getElementById('sendBtn').onclick = () => {
var text = document.getElementById('sendTxt').value;
if (text) {
socket.emit('message', text)
}
}
socket.on('enter', function (mes) {
var div = document.createElement('div')
div.innerHTML = mes.data;
div.style.color = '#00f'
document.body.appendChild(div)
})
socket.on('message', function (mes) {
var div = document.createElement('div')
div.innerHTML = mes.user + ': ' + mes.data
document.body.appendChild(div)
})
socket.on('leave', function (mes) {
var div = document.createElement('div')
div.innerHTML = mes.data
div.style.color = '#f00'
document.body.appendChild(div)
})
</script>









```
