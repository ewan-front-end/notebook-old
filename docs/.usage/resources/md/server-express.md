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