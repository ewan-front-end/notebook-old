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
> 监测开发文件变化，自动重启node
1. npm install -g nodemon 或 demo> npm install --save-dev nodemon
2. demo> nodemon main.js                 // 相当于demo> node main.js
   demo> nodemon main.js localhost 8080  // 如果没有在应用中指定端口，可以在命令中指定

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