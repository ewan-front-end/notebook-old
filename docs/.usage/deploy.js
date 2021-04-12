const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec

const {config, dependencies, aliasCommand} = require('./config')
const root = path.resolve(__dirname, '../../')
const rootDocs = path.resolve(__dirname, '../')
const rootDocsUsage = __dirname
const rootDocsPress = path.resolve(rootDocs, '.vuepress')
const pathConfig = path.join(rootDocsPress, 'config.js')
const pathIndex = path.join(rootDocs, 'README.md')
const pathPackage = path.join(root, 'package.json')

console.log('文档部署中...');

// 1. 创建 docs/.vuepress 目录
if(!fs.existsSync(rootDocsPress)) {
    fs.mkdirSync(rootDocs + '/.vuepress')
    console.log('create docs/.vuepress')
}

// 2. 创建 docs/.vuepress/config.js 文件
if(!fs.existsSync(pathConfig)) {
    fs.writeFile(pathConfig, 'module.exports = ' + JSON.stringify(config, null, 4), { encoding: 'utf8' }, err => {})
    console.log('create docs/.vuepress')
}

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

// 4. 安装依赖
const runCommand = (command, args) => {
    const cp = require("child_process") 
    return new Promise((resolve, reject) => {
        const executedCommand = cp.spawn(command, args, {stdio: "inherit", shell: true});
        executedCommand.on("error", error => { reject(error) });
        executedCommand.on("exit", code => { code === 0 ? resolve() : reject() });
    });
}
const installVuepress = () => {
    // 安装vuepress
    runCommand('npm', ["install", "-D", "vuepress@1.8.2"])
    .then(() => { console.log(`
    地图创建 node docs/.usage/create.js\n
    启动开发 npm run docs:dev\n 
    打包站点 npm run docs:build\n`) })
    .catch(error => { console.error(error) });
}
function writeScripts(){
    const packageStr = fs.readFileSync(pathPackage)
    const package = JSON.parse(packageStr)
    // 写入scripts命令
    package.scripts = package.scripts || {}
    for (key in aliasCommand) { package.scripts[key] = aliasCommand[key] }
    fs.writeFile(pathPackage, JSON.stringify(package, null, 4), { encoding: 'utf8' }, err => {installVuepress()})
}
if(!fs.existsSync(pathPackage)) {
    // 初始化NPM
    runCommand('npm', ["init", "-y"])
    .then(() => { writeScripts() })
    .catch(error => { console.error(error) })
} else {
    writeScripts()
}







   


