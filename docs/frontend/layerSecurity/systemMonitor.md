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
<h1>监控系统</h1><strong>监控系统</strong>
<summary class="desc">从用户的角度判断系统的可用性，关注的是实时数据，提高团队的故障响应能力</summary>
</div>
<div class="static-content">
ProjectRoot
┬website
│├client
││├js
││├css
││└index.html
│├middleware
│└app.js
├eagle-sdk   
└eagle-server


> cd website
> npm init -y
> npm i koa koa-static --save
> npm i nodemon --save-dev  // 自动检测到目录中的文件更改时通过重新启动应用程序来调试基于node.js的应用程序
package.json  "scripts": { "dev": "nodemon app.js"}

> npm run dev

website/app.js
const Koa = require('koa')
const Serve = require('koa-static') // 静态服务

const app = new Koa()
const port = 3003

// app.use((c) => { c.body = 123 }) // 中间件
app.use(serve(__dirname + '/client')) // 静态目录

app.listen(port, ()=>{
console.log(`${port} is listen`)
})

website/client/index.html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Eagle-monitor</title>
</head>

<body>
    <h1>Eagle-monitor</h1>
</body>

</html>


SDK环境搭建与项目架构
ProjectRoot
┬website
│├client
││└js
││   └eagle-monitor
││      └bundle.umd.js
├eagle-sdk  
│├index.js
│└rollup.config.js
└dist
   └bundle.umd.js

> cd eagle-sdk
> npm init -y
> npm i rollup rollup-plugin-babel babel @babel/core --save-dev
> npm i cross-env --save-dev // 用来修改NODE_ENV以切换开发/生产环境
package.json
"scripts": {
    "dev": "cross-env NODE_ENV=develop rollup -c --watch",
    "build": "cross-env NODE_ENV=production rollup -c"
}
> touch index.js
> touch rollup.config.js
> npm run dev // 观察../website/client/js/eagle-monitor/多了一个文件


eagle-sdk/rollup.config.js
import babel from 'rollup-plugin-babel'
let isDev = process.env.NODE_ENV === 'develop'

let babelConfig = {
"presets": [
["env", {"modules": false, "targets": {"browsers": ["chrome > 40", "safari >= 7"]}}]
]
}

export default {
input: 'index.js',
watch: { // 监听入口文件改动后打包
exclude: 'node_modules'
},
output: {
file: isDev ? '../website/client/js/eagle-monitor/bundle.umd.js' : '../dist/bundle.umd.js',
name: 'EagleMonitor', // 挂在window下的名称：window.EagleMonitor
format: 'umd',
sourcemap: true
},
plugin: {
babel: babel({
babelrc: false,
presets: babelConfig.presets,
plugins: babelConfig.plugins,
exclude: 'node_modules/**'
})
}
}

eagle-sdk/index.js
console.log('eagle-monitor SDK')


监控体系
技术监控行为监控页面性能监控静态资源性能监控错误监控接口性能监控用户行为路径打点监控大量log上报策略时效策略

性能监控
ProjectRoot
┬eagle-sdk
│└perf.js

eagle-sdk/perf.js
export default {
init: (cb) => {
cb()
let performance = window.performance
console.log(performance.timing) 注：performance.timing
debugger
}
}

eagle-sdk/index.js
import perf from 'perf.js'

console.log('eagle-monitor SDK')
perf.init()

> npm run dev

静态资源性能监控
eagle-sdk/resource.js
export default {
performance.getEntries
}
eagle-sdk/index.js
import perf from 'perf.js'

console.log('eagle-monitor SDK')
perf.init()



注：performance.timing
参数含义默认值备注navigationStart: 1575306035338前一个网页卸载时间fetchStartredirectStart: 0重定向开始时间0需要同域unloadEventEnd: 1575306035349前一个网页unload事件结束0unloadEventStart: 1575306035349前一个网页unload事件开始0redirectEnd: 0重定向结束时间0需要同域fetchStart: 1575306035339开始请求网页domainLookupStart: 1575306035339DNS查询开始fetchStartdomainLookupEnd: 1575306035339DNS查询结束fetchStartconnectStart: 1575306035339向服务器建立握手开始fetchStartsecureConnectionStart: 0安全握手开始0非https的没有connectEnd: 1575306035339向服务器建立握手结束fetchStartrequestStart: 1575306035341向服务器发送请求开始responseStart: 1575306035343服务器返回数据开始responseEnd: 1575306035343服务器返回数据结束domLoading: 1575306035354解析DOM开始document.readyState为loadingdomInteractive: 0解析DOM结束document.readyState为interactivedomContentLoadedEventStart: 0ContentLoaded开始ContentLoaded所有回调开始运行domContentLoadedEventEnd: 0ContentLoaded结束ContentLoaded所有回调结束运行domComplete: 0文档解析完成loadEventStart: 0load事件发送前loadEventEnd: 0load事件发送后


兼容性https://caniuse.com/



</div>