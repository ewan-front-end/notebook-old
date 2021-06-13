[NPM](/tools/npm)

## fs
- 递归创建目录
- 拷贝目录

## 插件开发
- 账户 
  u:wanyuaning  p:wanyuan...ew.. e:wanyuaning@163.com
- 组织：seahan、angg
- 规范
  ├── bin                           #可执行二进制文件
  ├── lib                           #主代码目录
  ├── doc                           #主代码目录
  ├── example                       #示例目录
  ├── test                          #测试目录，提供单元测试
  ├── .travis.yml               #集成自动测试配置
  ├── .npmignore             #npm发布时忽略的文件
  ├── CHANGELOG.md   #版本更新说明
  ├── LICENSE                 #许可证书
  ├── README.md           #README
  ├── package.json          #npm配置    
  
  package.json  包描述
  {
    "name": "@angg/express"
    "repository": { "type": "git", "url": "https://github.com/wmgcuan/express.git" },
    "homepage": "https://github.com/wmgcuan/express",
    "bugs": { "url": "https://github.com/wmgcuan/express/issues" }
  }

- 开发

- 发布 
  https://segmentfault.com/a/1190000009315989
  1. $ npm adduser // 命令向导分别要求填入username/password/email,可通过 npm whoami 查看当前用户
  2. $ npm publish --access public // npm publish 默认发布私有，所以会导致失败，如果是二次发布，则需先迭代version

- 多人发布
  ```
  npm owner add <user> [<@scope>/]<pkg> # 将用户添加到包的所有者列表,如 npm owner add wanyuaning @angg/express>
  npm owner rm <user> [<@scope>/]<pkg>  # 从包的所有这列表中删除用户
  npm owner ls [<@scope>/]<pkg>         # 列出包的所有者
  ```

## 插件
- [uglify-js](/node/plugin.html#uglify-js)
    `npm install uglify-js -g  压缩 uglifyjs xlsx.rich.js -o xlsx.rich.min.js   压缩混淆 uglifyjs xlsx.rich.js -m -o xlsx.rich.min.js` //scss压缩  参考./scss
- [chalk](/node/plugin.html#chalk)         颜色的插件
- [commander](/node/plugin.html#commander) 命令行编程工具
- [nodemon](/node/plugin.html#nodemon)     监测开发文件变化，自动重启node
- [gulp](/node/plugin.html#gulp)           开发任务流
- [chokidar](/node/plugin.html#chokidar)   监听文件的改变



## 版本管理
- nvm<br>
nodejs的版本管理工具, 可以安装和切换不同版本的nodejs, 当版本改变会带来npm的匹配版本改变<br>
下载安装：nvm-setup.zip (https://github.com/coreybutler/nvm-windows/releases)<br>

  ```cmd
  nvm                   帮助
  nvm list              显示已安装的列表
  nvm list available    显示可安装的所有版本

  nvm install 12.18.2   安装特定版本                 nvm install <version> [arch]
  nvm install latest    安装最新稳定版本

  nvm use 12.18.2       使用指定版本                 nvm use [version] [arch]

  nvm uninstall 12.18.2 卸载指定版本

  nvm arch ：显示node是运行在32位还是64位。
  nvm on ：开启node.js版本管理。
  nvm off ：关闭node.js版本管理。
  nvm proxy [url] ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
  nvm node_mirror [url] ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
  nvm npm_mirror [url] ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
  nvm root [path] ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
  nvm version ：显示nvm版本。version可简化为v。
  ```


似全局变量却不是(仅存在于模块的作用域中)
```
__dirname      //当前 执行文件 的相对路径
__filename     //当前 执行文件 的绝对路径
exports
module
require()
```

global（全局变量）
```
process                                //提供了有关当前Node.js进程的信息并对其进行控制
  env                                  //process.env    返回一个包含用户环境信息的对象
  cwd                                  //process.cwd()  当前 用户环境 node命令运行的文件夹目录名
Buffer 类      //用于处理二进制数据
clearImmediate(immediateObject)
clearInterval(intervalObject)
clearTimeout(timeoutObject)
console
global

queueMicrotask(callback)
setImmediate(callback[, ...args])
setInterval(callback, delay[, ...args])
setTimeout(callback, delay[, ...args])
TextDecoder
TextEncoder
URL
URLSearchParams
WebAssembly
```
```js
// 触发 当Node.js清空其事件循环并且没有其他工作要调度时
// 不发 显式终止如调用 process.exit() 或未捕获的异常
process.on('beforeExit', (code) => {// code退出码: 0/其它 可通过process.exitCode获取
  console.log(code, '通常，当没有工作被调度时，则 Node.js 进程会退出，但是在 beforeExit 事件上注册的监听器可以进行异步的调用，从而使 Node.js 进程继续');
});

// 触发 当Node.js清空其事件循环并且没有其他工作要调度时
// 触发 显式终止如调用 process.exit()
process.on('exit', (code) => {
  console.log(code, '除非打算调度额外的工作，否则不应该使用 beforeExit 代替 exit 事件');
  setTimeout(() => {
    console.log('仍在事件循环中排队的工作都被放弃此处不会运行 监听器函数必须只执行同步的操作 在调用 exit 事件监听器之后 Node.js进程会立即退出');
  }, 0);
});



cluster.on('disconnect', function(worker) {
  console.log('工作进程 #' + worker.id + ' 断开了连接');
});
```
## 使用 IPC 通道衍生 Node.js 进程



## 命令交互
- node test.js 带参
  ```js
  demo> a=1 node test.js   传参a值1<br>
  console.log(**global.process.env.a**)

  demo> node test.js a=3 b=4<br>
  console.log(**process.argv**) // ['C:\\...\\nodejs\\node.exe', 'D:\\demo\\test.js', 'a=3', 'b=4' ]
  console.log(**process.argv.slice(2)**) // [ 'a=3', 'b=4' ]
  ```

- 复杂参数


/package.json
```js
{
  "name": "[b ci|ewan]",                   // 项目名称

  // 命令入口 [本地库命令](#创建一个CLI)
  "bin": {
    "ewan": "./bin/ewan.js"
  },

  // 模板入口[(c0)HELP/package02]
  "main": "./lib/index.js",
  "module": "./es/index.js",
  "browser": "",
  "types": "./es/index.d.ts",
  // 软件包作为依赖项被安装时要包括的条目[(c0)HELP/package01]
  "files": [ "dist", "es", "lib" ],
}
```

## 创建一个CLI

```



▉
▉package02▉
场景：当外部require("[b ci|ewan]"), 就返回main路径内容
如果 npm 包导出的是 ESM 规范的包，使用 module
如果 npm 包只在 web 端使用，并且严禁在 server 端使用，使用 browser。
如果 npm 包只在 server 端使用，使用 main
如果 npm 包在 web 端和 server 端都允许使用，使用 browser 和 main
▉
▉package01▉
以下文件无论是否设置，总是包含：
*   `package.json`
*   `README`
*   `CHANGES`/`CHANGELOG`/`HISTORY`
*   `LICENSE`/`LICENCE`
*   `NOTICE`
*   The file in the “main” field

以下文件总是被忽略：
*   `.git`
*   `CVS`
*   `.svn`
*   `.hg`
*   `.lock-wscript`
*   `.wafpickle-N`
*   `.*.swp`
*   `.DS_Store`
*   `._*`
*   `npm-debug.log`
*   `.npmrc`
*   `node_modules`
*   `config.gypi`
*   `*.orig`
*   `package-lock.json`(use shrinkwrap instead)
▉

```

#### child_process
- exec execFile fork
- spawnSync execFileSync execSync
<br>
<br>
<div class="color-group color-card inline collapse c-atv-0">
  <i>child_process.spawn(command[, args][, options])</i> <c i='1'></c> 基本的创建子进程函数 行指定的程序<br>  
  <div class="c-item-1">    
    const { <strong>spawn</strong> } = require('child_process');<br>
    const ls = <strong>spawn</strong>('ls', ['-lh', '/usr']);<br>
    ls.stdout.on('data', (data) => {<br>
    　console.log(`stdout: ${data}`);<br>
    });<br>
    ls.stderr.on('data', (data) => {<br>
    　console.log(`stderr: ${data}`);<br>
    });<br>
    ls.on('close', (cd) => {<br>
    　console.log(`子进程退出码：${cd}`);<br>
    });    
  </div>
  <i>child_process.exec(command[, options], callback)</i> <c i='2'></c><br>
  <div class="c-item-2">
    const { <strong>exec</strong> } = require('child_process');<br>
    <strong>exec</strong>('cat *.js missing_file | wc -l', (error, stdout, stderr) => {<br>
    　if (error) {<br>
    　　console.error(`执行出错: ${error}`);<br>
    　　return;<br>
    　}
    　console.log(`stdout: ${stdout}`);<br>
    　console.log(`stderr: ${stderr}`);<br>
    });
  </div>
</div>
<br>
<br>

**spawn与exec的相同点**
1. 都用于开一个子进程执行指定命令。
2. 都可以自定义子进程的运行环境。
3. 都返回一个ChildProcess对象，所以他们都可以取得子进程的标准输入流、标准输出流和标准错误流。

**spawn与exec的不同点**
1. 接受参数的方式:spawn使用了参数数组，而exec则直接接在命令后。
比如要运行 du -sh /disk1 命令， 使用spawn函数需要写成spawn('du', ['-sh ', '/disk1'])，而使用exec函数时，可以直接写成exec('du -sh /disk1')。exec是会先进行Shell语法解析，因此用exec函数可以更方便的使用复杂的Shell命令，包括管道、重定向等。
2. 子进程返回给Node的数据量:spawn没有限制子进程可以返回给Node的数据大小，而exec则在options配置对象中有maxBuffer参数限制，且默认为200K，如果超出，那么子进程将会被杀死，并报错：Error：maxBuffer exceeded，虽然可以手动调大maxBuffer参数，但是并不被推荐。由此可窥见一番Node.js设置这两个API时的部分本意，spawn应用来运行返回大量数据的子进程，如图像处理，文件读取等。而exec则应用来运行只返回少量返回值的子进程，如只返回一个状态码。
3. exec方法相比spawn方法，多提供了一个回调函数，可以更便捷得获取子进程输出。这与从返回的ChildProcess对象的stdout或stderr监听data事件来获得输出的区别是: data事件的方式，会在子进程一有数据时就触发，并把数据返回给Node。而回调函数，则会先将数据缓存在内存中（数据量小于maxBuffer参数），等待子进程运行完毕后，再调用回调函数，并把最终数据交给回调函数。

github webHook

- npm i chalk --save-dev
- semver 分析 语义化版本规范 工具
npm install semver
const semver = require('semver')
// 比较两个版本号的大小
semver.gt(‘1.2.3’, ‘2.3.4’) // false
semver.lt(‘1.2.3’, ‘2.3.4’) // true
// 验证版本号是否合法，返回null即不合法
semver.valid(‘1.2.3’) // ‘1.2.3’
semver.valid(‘a.b.c’) // null
// 提取版本号
semver.clean(’ =v1.2.3 ') // ‘1.2.3’
semver.major(‘1.2.3’) // ‘1’
semver.minor(‘1.2.3’) // ‘2’
semver.patch(‘1.2.3’) // ‘3’
// 尝试将字符串解析为SemVer对象 { ...raw: '1.2.3', version: '1.2.3' }
semver.parse('1.2.3');        
// 分析版本号是否属于某个范围或符合一系列条件


autoprefixer
cheerio
colors
commander
del
file-loader": "0.9.0",
fs-extra": "^1.0.0",
gulp": "^3.9.1",
gulp-base64": "0.1.3",
gulp-bird": "0.2.4",
gulp-changed": "1.3.2",
gulp-clean-css": "2.3.2",
gulp-concat": "^2.6.1",
gulp-connect": "5.0.0",
gulp-debug": "3.0.0",
gulp-file-count
gulp-if
gulp-inline-source
gulp-less
gulp-minify-html
gulp-plumber
gulp-postcss
gulp-sourcemaps
gulp-uglify
gulp-util
happypack
html-loader
is_js
json-loader
lodash
node-sloc
through2
url-loader
webpack
webpack-stream
is-stream




[GIT项目管理](/tools/git-npm)  
[NPM部署与发布](/tools/git-npm)

## 爬虫
demo> npm init -y
demo> npm install puppeteer --save
```js
const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('http://www.baidu.com')
    await page.screenshot({
        path: 'c:/data/baidu.png'
    })
})()

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(puppeteer.devices['iPhone 6']);
  await page.goto('https://www.baidu.cn');
  await page.screenshot({ path: 'full.png', fullPage: true });
  await browser.close();
})();
```
点击
填写表单
读取数据
https://www.cnblogs.com/yfacesclub/p/9245068.html

#### 功能
- 判断模块是否安装 const isInstalled = packageName => { try {require.resolve(packageName); return true} catch (err) {return false} }

#### 交互
- 执行命令
    ```
    npm WARN webpack-cli@4.6.0 requires a peer of webpack@4.x.x || 5.x.x but none is installed. You must install peer dependencies yourself.
    npm WARN @webpack-cli/configtest@1.0.2 requires a peer of webpack@4.x.x || 5.x.x but none is installed. You must install peer dependencies yourself.
    ```
    ```js    
    const runCommand = (command, args) => {
        const cp = require("child_process") 
        return new Promise((resolve, reject) => {
            const executedCommand = cp.spawn(command, args, {stdio: "inherit", shell: true});
            executedCommand.on("error", error => { reject(error) });
            executedCommand.on("exit", code => { code === 0 ? resolve() : reject() });
        });
    }
    process.exitCode = 0
    runCommand('npm', ["install", "-D", "webpack-cli"]).then(() => { /*完成*/ }).catch(error => { console.error(error); process.exitCode = 1 });
    ```


- 提问获取选项 readline
    ```
    Do you want to install 'webpack-cli' (yes/no): y
    Installing 'webpack-cli' (running 'npm install -D webpack-cli')...
    npm WARN webpack-cli@4.6.0 requires a peer of webpack@4.x.x || 5.x.x but none is installed. You must install peer dependencies yourself.
    npm WARN @webpack-cli/configtest@1.0.2 requires a peer of webpack@4.x.x || 5.x.x but none is installed. You must install peer dependencies yourself.
    ```
    ```js
    const readLine = require("readline")
    const questionInterface = readLine.createInterface({input: process.stdin, output: process.stderr}) // 创建Readline实例 传入标准输入输出作为数据的输入输出流
    process.exitCode = 1 // 使用标准输出码 函盖从[提问]到[命令执行]整个生命周期
    questionInterface.question(`Do you want to install 'webpack-cli' (yes/no): `, answer => {
		questionInterface.close(); 
		const normalizedAnswer = answer.toLowerCase().startsWith("y");
		if (!normalizedAnswer) return; 
		process.exitCode = 0; 
		console.log(`Installing 'webpack-cli' (running 'npm install -D webpack-cli')...`);
		// runCommand参考 执行命令
	});
    ```
    





require.resolve('webpack-cli')                                         // D:\Ewan\Hello\aa\node_modules\webpack-cli\lib\index.js
require.resolve('webpack-cli/package.json')                            // D:\Ewan\Hello\aa\node_modules\webpack-cli\package.json 
path.dirname('D:\Ewan\Hello\aa\node_modules\webpack-cli\package.json') // D:\Ewan\Hello\aa\node_modules\webpack-cli

#### 读取文件
```js
// 方法一 
const packagePath = path.join(__dirname, 'package.json')
const packageStr = fs.readFileSync(packagePath)
const package = JSON.parse(filePackage)
// 方法二 通常用于处理node_module里的模块
const packagePath = require.resolve('webpack-cli/package.json')
const package = require(packagePath)
```


标准输入输出
process.stdin
process.stderr


process.exit()        强制进程退出
process.exitCode = 1  协商定义
process.exitCode = 0  协商定义



## Node.js v14.16.0 文档
http://nodejs.cn/api/

#### child_process
child_process.exec 一次性返回执行结果 默认buffer大小为200kb
```
const exec = require('child_process').exec
exec('npm install -D vuepress', function(error, stdout, stderr) {
    console.log('installed vuepress')
})
```


```js

const fs = require('fs');
console.log('启动API自动生成命令成功...');
fs.watch('./router/', {
    recursive: true
}, ((event, filename) => {
    console.warn(new Date(),' 检测到文件变化，正在执行编译命令...');
    const exec = require('child_process').exec;
    const cmdStr = 'npm run apidoc';
    exec(cmdStr, (err, stdout, stderr) => {
        if (err){
            console.log(err);
            console.warn(new Date(),' API文档编译命令执行失败');
        } else {
            console.log(stdout);
            console.warn(new Date(),' API文档编译命令执行成功');
        }
    });




Node.js 任务状态监控
https://www.jianshu.com/p/2f8ab7253523
```