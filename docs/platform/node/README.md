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