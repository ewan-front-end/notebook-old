[GIT项目管理](/tools/git-npm)  
[NPM部署与发布](/tools/git-npm)

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