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
            <span>N 2021.09.04 13:07</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>插件</h1><strong>插件</strong>
</div>
<div class="static-content">


<div class="anchor" name="1627821297227" id="1627821297227"></div>

::: details node-inspect node调试

<pre class="code-block">
全局安装 &gt; npm install -g node-inspect
使用实例：
demo/server.js
    var http = require("http")
    var app = http.createServer(function(req, res) {
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.end("Hello world!")
    })
    app.listen(3000, "localhost")
demo&gt; node --inspect server.js
    Debugger listening on ws://127.0.0.1:9229/29112b02-6fce-4e02-bcb1-4f232941261e
    For help, see: https://nodejs.org/en/docs/inspector
浏览器输入 chrome://inspect
    [Configure...] &gt; input[127.0.0.1:9229] [Done]
    监听列表 [inspect] 弹出调试面板
</pre>
:::

<div class="anchor" name="1627903874915" id="1627903874915"></div>

::: details gulp
[官网](https://www.gulpjs.com.cn/docs/getting-started/quick-start/)

<pre class="code-block">
┃ 1. demo&gt; npm install --save-dev gulp
┃ 2. demo/gulpfile.js                            <span class="comment"> // 在运行 gulp 命令时会被自动加载</span>
┃                                                <span class="comment"> // 默认任务</span>
┃     function defaultTask(cb) { cb() }
┃     exports.default = defaultTask              <span class="comment"> // 任何导出(export)的函数都将注册到gulp的任务(task)系统中 老版本gulp是用task()注册任务的 现仍然可以用</span>
┃     ...                                        <span class="comment"> // 注册更多的任务     </span>
┃ 3. demo&gt; gulp                                  <span class="comment"> // 默认任务（task）将执行, 如果是本地安装,则"scripts":{"dev":"gulp"}  demo&gt; npm run dev</span>
┃    demo&gt; gulp &lt;task&gt; &lt;othertask&gt;               <span class="comment"> // 运行多任务</span>

API    
    const { 
        src,                                     <span class="comment"> // 读文件到内存中并通过流(stream)进行处理,应当从任务(task)中返回 </span>
        dest(path[,options]),                    <span class="comment"> // 写文件 path只能是目录 文件名为导入文件流自身的文件名 要想改变文件名可使用插件gulp-rename</span>
        series,                                  <span class="comment"> // 串联 任务功能、组合操作组合成同时执行的较大操作</span>
        parallel                                 <span class="comment"> // 并联 </span>
    } = require('gulp') 

实例：
    gulp.src('script/jquery.js')                 <span class="comment"> // 最终生成的文件路径为 dist/foo.js/jquery.js 而不是dist/foo.js</span>
        .pipe(gulp.dest('dist/foo.js'))          <span class="comment"> // pipe用于连接转换流(Transform streams)或可写流(Writable streams)</span>

任务分割

公有&私有任务
    function clean(cb) { cb() }                  <span class="comment"> // 函数未被导出 因此被认为是私有任务 可被用在串联(series)组合中</span>
    function build(cb) { cb() }                  <span class="comment"> // 函数被导出 为公开任务 可以被`gulp`命令直接调用:demo&gt; gulp build 可被用在串联(series)组合中</span>
    exports.build = build;
    exports.default = series(clean, build);

组合任务
    const { series, parallel } = require('gulp')
    function transpile1(cb) { cb() }
    function bundle2(cb) { cb() }
    function javascript(cb) { cb() }
    function css(cb) { cb() }
    exports.build = series(transpile1, bundle2)  <span class="comment"> // 如果需要让任务按顺序执行   串联组合</span>
    exports.build2 = parallel(javascript, css)   <span class="comment"> // 希望以最大并发来运行的任务 并联组合</span>
                                                 <span class="comment"> // 嵌套组合 任意深度 ↧</span>
    exports.build3 = series(clean, parallel(cssTranspile, series(jsTranspile, jsBundle)), parallel(cssMinify, jsMinify), publish)
</pre>
:::

<div class="anchor" name="1627908583281" id="1627908583281"></div>

::: details commander 命令行编程工具

<pre class="code-block">
➤ 安装：demo&gt; npm install commander --save

➤ 实例：响应版本号
    demo/bin/demo.js    
        #!/usr/bin/env node
        var program = require('commander')
        program                                     
            .version("0.0.2")                         
            .option('-v --version', 'version info')                   <span class="comment"> // 为主命令提供参数  </span>
        program.parse(process.argv)                                   <span class="comment"> // 必须    </span>
    demo&gt; node bin/demo.js -v                                         <span class="comment"> // 运行</span>

➤ 实例：发布一个运行命令：abc
    目标：xxxx&gt; abc create name [--options]                            <span class="comment"> // 主命令 命令 参数 选项</span>
    项目：
        demo/package.json    
            {"bin": {"abc": "./bin/demo.js"<img :src="$withBase('/images/db-brace-right.png')">

        demo/bin/demo.js                                              <span class="comment"> // 定义命令、选项、帮助和业务逻辑 </span>
            #!/usr/bin/env node
            var commander = require('commander')
            commander
                .command("summary &lt;cmd&gt;")                             <span class="comment"> // 命令</span>
                .alias("sm")                                          <span class="comment"> // 命令别名</span>
                .description("generate a `SUMMARY.md` from a folder") <span class="comment"> // 命令描述</span>
                .usage()                                              <span class="comment"> // 用户使用提示</span>
                .option('-v --version', 'version info')               <span class="comment"> // 为命令提供参数</span>
                .action(function(md, cmd){                            <span class="comment"> // 命令执行体</span>
                    console.log('参数', md, cmd);
                })
            commander.parse(process.argv)                             <span class="comment"> // 解析命令行参数 一定要放到最后调用</span>

        demo&gt; node bin/demo.js summary abcd 
        demo&gt; node bin/demo.js sm aaabbb  
        
        demo&gt; npm link                                                <span class="comment"> // 本地项目和本地npm模块之间建立连接进行模块测试 npm unlink 模块名  解除</span>
        xxxx&gt; abc sm aabb
</pre>
:::

<div class="anchor" name="1627905586210" id="1627905586210"></div>

::: details chokidar 监控文件/文件夹变化

<pre class="code-block">
可以用于，我们可以传入 glob 文件匹配模式，并可以简单实现递归目录监控。 与标准库fs.watch()、fs.watchFile对比

安装：demo&gt; npm i chokidar --save-dev
实例：
    const chokidar = require('chokidar'), log = console.log  
   <span class="comment"> // chokidar.watch("E:\\work\\demo\\")                                        可以监控文件、文件夹, 参数类型file/dir/glob/array</span>
   <span class="comment"> // chokidar.watch('.')                                                       监控当前目录</span>
   <span class="comment"> // chokidar.watch('./src', {ignored: /(^|[\/\\])\../, persistent: true});  </span>
    chokidar.watch('./src')
        .on('raw', (event, path, details) =&gt; log('RAW:', event, path, details))
        .on('ready', () =&gt; console.log('初始扫描完成，准备好监听改变'))
        .on('add',       path =&gt; log('ADD:',       path))
        .on('change',    path =&gt; log('CHANGE:',    path))
        .on('unlink',    path =&gt; log('UNLINK:',    path))
        .on('addDir',    path =&gt; log('ADDDIR:',    path))
        .on('unlinkDir', path =&gt; log('UNLINKDIR:', path))
        .on('all', (event, path) =&gt; log('ALL:', event, path))                   <span class="comment"> // 可以在这做事件分支而忽略前面的具体事件    </span>
        .on('error', error =&gt; log(`监听错误: ${error}`))

实例：    
    demo/src/watcher.js
        chokidar.watch('./src/js')                                                  <span class="comment"> // 注意路径写法 非chokidar.watch('./js')    </span>
    demo&gt; node src/watcher.js

监控场景：
    新建src/b.js
        RAW: rename b.js { watchedPath: 'src' }
        ADD: src\b.js
        ALL: add src\b.js
    删除src/b.js
        RAW: rename b.js { watchedPath: 'src' }
        RAW: rename b.js { watchedPath: 'src\\b.js' }
        UNLINK: src\b.js
        ALL: unlink src\b.js
    编辑src/a.js
        RAW: change a.js { watchedPath: 'src' }
        RAW: change a.js { watchedPath: 'src\\a.js' }
        RAW: change a.js { watchedPath: 'src' }
        RAW: change a.js { watchedPath: 'src\\a.js' }
        CHANGE: src\a.js
        ALL: change src\a.js
</pre>
:::

<div class="anchor" name="1627905787356" id="1627905787356"></div>
 
::: details chalk 命令行颜色工具
颜色的插件
:::

<div class="anchor" name="1627966781710" id="1627966781710"></div>
 
::: details node-plantuml
> 绘图工具[PlantUML](/programmingLanguage/plantuml)
1. [java环境配置](/programmingLanguage/java)
2. xxxx> npm i node-plantuml --save-dev                           
3. xxxx> puml -h

- 实例 
    demo/test.js
    ```js
    var plantuml = require('node-plantuml'),fs = require('fs')
    var umlStr = `
    :Alarms;
    while (Unselect/select ?) is (unselect)
    :Unselect alarm;
    endwhile (select)
    if (Select alarm) then (accept);
    :Accept alarm;
    :Reset alarm;
    else(commit)
    :Commit alarm;
    :Audit alarm;
    endif
    :Alarm logs;
    `
    var gen = plantuml.generate(umlStr)                         // 详细参数
    gen.out.pipe(fs.createWriteStream("output-file.png"))       // 输出图片
    ```
    demo> node test.js
    
- 设置图形尺寸：(在umlStr前面)scale 1000 width
```
@startuml
scale 500*500
@enduml
```

- 详细参数
```
plantuml.generate(input, {
        format: 'png'                            // 输出格式ascii/unicode/svg/eps/png
        config: ''                               // classic/classic
        dot:
        charset: 'UTF-8'
    }, 
    () => { /* callback */ })
```
:::

<div class="anchor" name="1627970757090" id="1627970757090"></div>
 
::: details uglify-js
- npm i uglify-js -g  
- demo> uglifyjs xlsx.rich.js -o xlsx.rich.min.js // 压缩   
- demo> uglifyjs xlsx.rich.js -m -o xlsx.rich.min.js` // 压缩混淆 scss压缩参考./scss
:::

<div class="anchor" name="1627970949874" id="1627970949874"></div>

::: details child_process
> 命令执行控制 执行系统命令
:::

<div class="anchor" name="1627971037955" id="1627971037955"></div>

::: details nodemon

<pre class="code-block">
&gt; 监测开发文件变化，自动重启node, 开发环境使用，生产环境使用pm2

<span>● xxxx&gt; npm i -g nodemon 或 </span>
<span>● demo&gt; npm install --save-dev nodemon</span>
<span>● demo&gt; nodemon main.js  或               <span class="comment"> // 相当于node main.js</span></span>
<span>● demo&gt; nodemon main.js localhost 8080    <span class="comment"> // 如果没有在应用中指定端口，可以在命令中指定</span></span>

[H6] 实例
demo/src/01.js    
    module.exports = 'test text'          <span class="comment"> // 启动nodemon后可响应文件的更改</span>
demo/main.js
    var str = require('./src/01')
    console.log(str);
demo&gt; nodemon ./main.js                   
</pre>
:::

<div class="anchor" name="1628080742911" id="1628080742911"></div>
 
::: details pm2
> 生产环境使用
:::

<div class="anchor" name="1628080758946" id="1628080758946"></div>
 
::: details concurrently
[concurrently](/node/package#scripts)
:::

<div class="anchor" name="1628080852157" id="1628080852157"></div>
 
::: details node-cache
> 缓存数据
npm install node-cache --save-dev
```js
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()

//设置 key, val, [ ttl ], [callback]
myCache.set( "myKey", {name:"Jim"}, function( err, success ){ if( !err && success ){} })

// 获取 key [callback]
myCache.get( "myKey", function( err, value ){ if( !err ){} });
```

<pre class="code-block">
构建参数new NodeCache( { stdTTL: 100, checkperiod: 120 } )
    stdTTL         (默认值:0)每个生成的缓存元素的标准ttl，单位是秒。0 =无限
    checkperiod    (默认为600)自动删除检查周期，单位为秒。0 =没有定期检查。如果试图获取一个丢失的或过期的值，
    errorOnMissing (默认值:false) en/disable抛出或传递一个错误给回调。
    useClones      (默认值:true) en/disable变量克隆。如果为true，您将获得缓存变量的副本。如果为false，则保存并获得参考。注意:建议使用true，因为它的行为类似于基于服务器的缓存。
                    如果你想保存可变对象或其他涉及到可变性的复杂类型，你应该设置false。下面是一个简单的代码示例，显示了不同的行为
    deleteOnExpire (默认值:true)变量过期时是否自动删除。如果为true，该变量将被删除。如果为false，该变量将保持不变。建议您在事件过期时自行处理该变量。
</pre>
:::










</div>