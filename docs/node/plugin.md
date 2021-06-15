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
<div class="content-header">
<h1>插件</h1>
</div>


## node插件开发
.
├── bin                          #运行目录
├── lib                           #主代码目录
├── example                 #示例目录
├── test                         #测试目录，提供单元测试
├── .travis.yml               #集成自动测试配置
├── .npmignore             #npm发布时忽略的文件
├── CHANGELOG.md   #版本更新说明
├── LICENSE                 #许可证书
├── package.json          #npm配置
├── README.md           #README

## gulp
[gulp](https://www.gulpjs.com.cn/docs/getting-started/quick-start/)
1. demo> npm install --save-dev gulp
2. demo/gulpfile.js
> 在运行 gulp 命令时会被自动加载
```js
// 默认任务
function defaultTask(cb) {
  // place code for your default task here
  cb();
}
// 老版本gulp是用task()注册任务的，现仍然可以用
exports.default = defaultTask // 任何导出(export)的函数都将注册到gulp的任务(task)系统中
// 注册更多的任务
```
3. demo> gulp                     // 默认任务（task）将执行, 如果是本地安装,则"dev":"gulp",demo> npm run dev<br>
   `demo> gulp <task> <othertask>`  // 运行多任务

- API
```js
// gulp API
const { src, dest, series, parallel } = require('gulp')
src()   // 用于处理计算机上存放的文件 接受(匹配文件系统文件)参数，将所有匹配的文件读取到内存中并通过流(stream)进行处理,应当从任务(task)中返回
dest()  // 用于处理计算机上存放的文件
series() 或 parallel()
// stream API
.pipe() // 用于连接转换流(Transform streams)或可写流(Writable streams)
```
- 任务分割
- 公有&私有任务
```js
// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {
  // body omitted
  cb();
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用:demo> gulp build
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
  // body omitted
  cb();
}
exports.build = build;
exports.default = series(clean, build);
```
- 组合任务
```js
const { series, parallel } = require('gulp')
function transpile1(cb) {/* body omitted */ cb()}
function bundle2(cb) {/* body omitted */ cb()}
function javascript(cb) {/* body omitted */ cb()}
function css(cb) {/* body omitted */ cb()}
exports.build = series(transpile1, bundle2) // series()   如果需要让任务按顺序执行
exports.build2 = parallel(javascript, css)  // parallel() 希望以最大并发来运行的任务
/* series() 和 parallel() 可以被嵌套到任意深度
exports.build = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify),
  publish
);
*/
```
- 文件监控
参考chokidar

## chokidar
> 可以用于监控文件、文件夹变化，我们可以传入 glob 文件匹配模式，并可以简单实现递归目录监控。 与标准库fs.watch()、fs.watchFile对比
1. demo> npm init -y 
2. demo> npm i chokidar --save-dev
3. 实例
```js
const chokidar = require('chokidar');
const log = console.log
// chokidar.watch("E:\\work\\demo\\") 可以监控文件、文件夹, 参数类型file/dir/glob/array
// chokidar.watch('.') 监控当前目录
// chokidar.watch('./src', {ignored: /(^|[\/\\])\../, persistent: true});
chokidar.watch('./src')
  .on('raw', (event, path, details) => log('RAW:', event, path, details))
  .on('ready', () => console.log('初始扫描完成，准备好监听改变'))
  .on('add',       path => log('ADD:',       path))
  .on('change',    path => log('CHANGE:',    path))
  .on('unlink',    path => log('UNLINK:',    path))
  .on('addDir',    path => log('ADDDIR:',    path))
  .on('unlinkDir', path => log('UNLINKDIR:', path))
  .on('all', (event, path) => log('ALL:', event, path)) // 可以在这做事件分支而忽略前面的具体事件    
  .on('error', error => log(`监听错误: ${error}`))
```
路径：
<pre>
demo> node src/watcher.js
demo/src/watcher.js
    chokidar.watch('./src/js') 而非 chokidar.watch('./js')
</pre>
场景：
<pre>
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


## chalk
> 颜色的插件

## uglify-js
> `npm install uglify-js -g  压缩 uglifyjs xlsx.rich.js -o xlsx.rich.min.js   压缩混淆 uglifyjs xlsx.rich.js -m -o xlsx.rich.min.js` //scss压缩  参考./scss

## commander
> 命令行编程工具
command      自定义执行的命令
option       可选参数
alias        用于 执行命令的别名
description  命令描述
action       执行命令后所执行的方法
usage        用户使用提示
parse        解析命令行参数，注意这个方法一定要放到最后调用

## nodemon
> 监测开发文件变化，自动重启node, 开发环境使用，生产环境使用pm2
1. npm install -g nodemon 或 demo> npm install --save-dev nodemon
2. demo> nodemon main.js                 // 相当于demo> node main.js
   demo> nodemon main.js localhost 8080  // 如果没有在应用中指定端口，可以在命令中指定

demo/src/01.js
```js
module.exports = 'test text' // 启动nodemon后可响应文件的更改
```
demo/main.js
```js
var str = require('./src/01')
console.log(str);
```
demo> nodemon ./main.js  // 如果是本地安装的nodemon,则"dev":"nodemon ./main.js"

## pm2
> 生产环境使用

## concurrently
[concurrently](/node/package#scripts)

## node-cache
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
<pre>
构建参数new NodeCache( { stdTTL: 100, checkperiod: 120 } )
    stdTTL         (默认值:0)每个生成的缓存元素的标准ttl，单位是秒。0 =无限
    checkperiod    (默认为600)自动删除检查周期，单位为秒。0 =没有定期检查。如果试图获取一个丢失的或过期的值，
    errorOnMissing (默认值:false) en/disable抛出或传递一个错误给回调。
    useClones      (默认值:true) en/disable变量克隆。如果为true，您将获得缓存变量的副本。如果为false，则保存并获得参考。注意:建议使用true，因为它的行为类似于基于服务器的缓存。
                    如果你想保存可变对象或其他涉及到可变性的复杂类型，你应该设置false。下面是一个简单的代码示例，显示了不同的行为
    deleteOnExpire (默认值:true)变量过期时是否自动删除。如果为true，该变量将被删除。如果为false，该变量将保持不变。建议您在事件过期时自行处理该变量。
</pre>


## 响应版本号
- demo> npm install commander --save
- demo/bin/demo.js
```js
#!/usr/bin/env node
var program = require('commander')
program                                     
  .version("0.0.2")                         
  .option('-v --version', 'version info')   
program.parse(process.argv)
```
- demo> node bin/demo.js -v

## 自定义命令deploy
```js
program
    .command('deploy <name>')                                      // 参数name必填
    .description('部署一个服务节点')                                 // help时可看到
    .action(function(name){ console.log('Deploying "%s"', name) }) // 命令处理函数 带入处理好的参数
program.parse(process.argv);
```
- demo> node bin/demo.js deploy projectname

## 发布为运行命令
之前都是通过node命令来运行执行文件
【主命令 命令 参数 选项】形式：$ abc create name [--options] 
1. 给工具起名字(命令名)如：abc
    /package.json
    ```json
    {
        "bin": {
            "abc": "./bin/demo.js"
        }
    }
   ```
2. 定义命令、选项、帮助和业务逻辑
    ```js
    #!/usr/bin/env node

    var program = require('commander')


    program
        .command("summary <cmd>")
        .alias("sm") //提供一个别名
        .description("generate a `SUMMARY.md` from a folder") //描述，会显示在帮助信息里
        .action(function(md, cmd){
            console.log('参数', md, cmd);
        }) 
        
    ```
    node bin/demo.js summary abcd 
    node bin/demo.js sm aaabbb 
3. 本地项目和本地npm模块之间建立连接进行模块测试
    demo> npm link      //npm unlink 模块名  解除

abc sm aabb









必须参数<> 可选参数[]

hb create --help


```js
var program = require('commander')

program
  .version('0.0.1', '-v, --version') //<版本值>,[响应标识默认-V,--version] 长标识必需

program
  .command('rm <dir>')
  .option('-r, --recursive', 'Remove recursively')
  .action(function (dir, cmd) {
    console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''))
  })

// 自定义命令 create
commander.command('create [project]')  
    .description('create a empty project')  // 如--help 罗列Commands时：create [options] [project]  create a empty project
    .option('-w --webpack')
    .action(function(project, webpack) {
        fs.copySync(DEFAULT_STRUCTURE, path.join(currentPath, project));
        fs.copySync(DEFAULT_CONFIG, path.join(currentPath, project, './html-bundler.config.js'));
        logger.notice('项目' + project + '创建成功');
        if (webpack.webpack) {
            fs.copySync(DEFAULT_WEBPACK_CONFIG, path.join(currentPath, project, './webpack.config.js'));
            fs.copySync(DEFAULT_DLL_CONFIG, path.join(currentPath, project, './webpack.dll.js'));
            logger.info('webpack配置文件创建成功, 请根据项目情况进行修改并安装依赖');
        }
    })

demo> hb create --help
    Usage: create [options] [project]
    create a empty project
    Options:
        -h, --help    output usage information
        -w --webpack




Usage: html-bundler [options] [command]


Commands:

init [options]              if your project rootpath has not `html-bundler.config.js` & `webpack.config.js`, this command will create these files
create [options] [project]  create a empty project
dev [options]               dev
dest                        dest
qa                          qa
rd                          rd

Options:






#!/usr/bin/env node

var inquirer = require('inquirer');
var program = require('commander');//一个帮助快速开发Nodejs命令行工具的package
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs-extra'));
var chalk = require('chalk');//终端输出时颜色样式输出工具
var figlet = require('figlet');
var ora = require('ora');
var exec = require('promise-exec');
var shell =require('shelljs');//用于执行shell脚本的包
console.log(
    chalk.green(
        figlet.textSync("NODE CLI")
    )
);
program
  .version(require('../package').version)
  .usage('<command> [options] 快速启动项目') //-h 打印的用户提示

program
  .option('-n, --yourname [yourname]', 'Your name')
  .option('-g, --glad', 'Tell us you are happy')

/** 自定义命令revert 
 * 
 */
program
  .command('revert <name>')
  .description('我是一段描述')                      //描述
  .option('--rules', 'list all module rule names') //选项
  .option('--plugins', 'list all plugin names')
  .alias('rv')//命令别名
  .action((name,cmd) => {
    //如果传了选项，这样可以取到
    var rules = cmd.rules ? true : false;
    //name取到命令后面的参数
        console.log(`回复啦${name}`)
  })


// 添加一些有用的信息到help选项
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`vue <command> --help`)} for detailed usage of given command.`)
  console.log()
})

//解析参数这一行要放到定义的命令最后面
program.parse(process.argv);

if (program.yourname) {
  console.log(`Hello, ${program.yourname}! ${program.glad ? 'I am very happy to see you!' : ''}`);
}

  ```

USAGE:




  bin> node app.js --help
