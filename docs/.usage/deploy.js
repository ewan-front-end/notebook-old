const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
// 命令输出调整 https://www.webhek.com/post/execute-a-command-line-binary-with-node-js.html

const {config, dependencies, aliasCommand} = require('./config')
const root = path.resolve(__dirname, '../../')
const rootDocs = path.resolve(__dirname, '../')
const rootDocsUsage = __dirname
const rootDocsPress = path.resolve(rootDocs, '.vuepress')
const pathConfig = path.join(rootDocsPress, 'config.js')
const pathIndex = path.join(rootDocs, 'README.md')
const pathPackage = path.join(root, 'package.json')

console.log(root);
console.log(rootDocs);
console.log(rootDocsUsage);
console.log(rootDocsPress);
console.log(pathConfig);
console.log(pathIndex);
console.log(pathPackage);

// 1. 创建 docs/.vuepress 目录
if(!fs.existsSync(rootDocsPress)) {
    fs.mkdirSync(rootDocs + '/.vuepress')
    console.log('create docs/.vuepress')
}
console.log('1111111111');
// 2. 创建 docs/.vuepress/config.js 文件
if(!fs.existsSync(pathConfig)) {
    fs.writeFile(pathConfig, 'module.exports = ' + JSON.stringify(config, null, 4), { encoding: 'utf8' }, err => {})
    console.log('create docs/.vuepress')
}
console.log('2222222222');
// 3. 创建 docs/README.md 文件(文档首页)
if(!fs.existsSync(pathIndex)) {
    fs.writeFile(pathIndex, `
# 项目添加文档功能

1. 项目根目录下创建 docs 目录
2. 复制 .usage 到 docs/
3. 基础部署 项目根目录> node docs/.usage/deploy.js 
4. 地图创建 项目根目录> node docs/.usage/create.js 
5. 项目根目录> npm run docs:dev`, { encoding: 'utf8' }, err => {})
    console.log('create docs/README.md')
}
console.log('3333333333');
// 4. 安装依赖
function handlePackage(){
    const filePackage = fs.readFileSync(pathPackage)
    let package = JSON.parse(filePackage)
    package.scripts = package.scripts || {}
    for (key in aliasCommand) {
        package.scripts[key] = aliasCommand[key]
    }
    fs.writeFile(pathPackage, JSON.stringify(package, null, 4), { encoding: 'utf8' }, err => {
        exec('npm install -D vuepress', function(error, stdout, stderr) {
            console.log('installed vuepress')
        })
    })
    //npm install("vuepress":"^1.8.2")
}
if(!fs.existsSync(pathPackage)) {
    console.log('no /package.json');
    let cmd = 'npm init -y';
    exec(cmd, function(error, stdout, stderr) {
        handlePackage()
    });
} else {
    handlePackage()
}
console.log('4444444444');






   


