```table
__dirname      当前 执行文件 所在目录的完整目录名
__filename     当前 执行文件 的带有完整绝对路径的文件名
process.cwd()  当前 node命令 所定位的文件夹目录名 
./             文件所在目录


[h4|package.json]

{
  "name": "[b ci|ewan]",                   // 项目名称
  // 命令入口[(c0)HELP/package03]
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

▉package03▉
命令对应的可执行文件，通常放在bin目录下

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