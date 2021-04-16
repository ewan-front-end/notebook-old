const path = require('path')
const fs = require('fs')

const {config, dependencies, aliasCommand} = require('./config')
const configContent = 'module.exports = ' + JSON.stringify(config, null, 4)
const runCommand = (command, args) => {
    const cp = require("child_process") 
    return new Promise((resolve, reject) => {
        const executedCommand = cp.spawn(command, args, {stdio: "inherit", shell: true});
        executedCommand.on("error", error => { reject(error) });
        executedCommand.on("exit", code => { code === 0 ? resolve() : reject() });
    });
}
const root = path.resolve(__dirname, '../../')
const rootPkge = path.resolve(root, 'package.json')
const rootDocs = path.resolve(root, 'docs')
const rootDocsUsage = __dirname
const rootDocsUsageStylesIndex = path.resolve(rootDocsUsage, 'styles/index.styl')
const rootDocsPress = path.resolve(rootDocs, '.vuepress')
const rootDocsPressPublic = path.resolve(rootDocsPress, 'public')
const rootDocsPressConfig = path.resolve(rootDocsPress, 'config.js')
const rootDocsPressStyles = path.resolve(rootDocsPress, 'styles')
const rootDocsPressStylesIndex = path.resolve(rootDocsPressStyles, 'index.styl')

console.log('文档部署中...');
if(fs.existsSync(rootDocsPress))            { console.log('已存在 docs/.vuepress') }                   else { fs.mkdirSync(rootDocsPress); console.log('已创建 docs/.vuepress') }
if(fs.existsSync(rootDocsPressPublic))      { console.log('已存在 docs/.vuepress/public') }            else { fs.mkdirSync(rootDocsPressPublic); console.log('已创建 docs/.vuepress/public') }
if(fs.existsSync(rootDocsPressConfig))      { console.log('已存在 docs/.vuepress/config.js') }         else { fs.writeFileSync(rootDocsPressConfig, configContent, { encoding: 'utf8' }); console.log('已创建 docs/.vuepress/config.js') }
if(fs.existsSync(rootDocsPressStyles))      { console.log('已存在 docs/.vuepress/styles') }            else { fs.mkdirSync(rootDocsPressStyles); console.log('已创建 docs/.vuepress/styles') }
if(fs.existsSync(rootDocsPressStylesIndex)) { console.log('已存在 docs/.vuepress/styles/index.styl') } else { fs.copyFileSync(rootDocsUsageStylesIndex, rootDocsPressStylesIndex); console.log('已创建 docs/.vuepress/styles/index.styl') }
fs.copyFileSync(path.resolve(rootDocsUsage, 'resources/logo.png'), path.resolve(rootDocsPress, 'public/logo.png')); console.log('资源 docs/.vuepress/public/logo.png')

function installVuepress(){
    // 安装vuepress
    runCommand('npm', ["install", "-D", "vuepress@1.8.2"])
    .then(() => { 
        console.log('7. 部署完成')
        console.log(`
    地图创建 node docs/.usage/create.js\n
    启动开发 npm run docs:dev\n 
    打包站点 npm run docs:build\n`)
    }).catch(error => { console.error(error) });
}
function writeScripts(){
    const package = require(rootPkge)
    // 写入scripts命令
    package.name = 'vuepress-demo'
    package.description = 'vuepress@1.8.2最佳实践'
    package.scripts = package.scripts || {}
    for (key in aliasCommand) { package.scripts[key] = aliasCommand[key] }
    fs.writeFile(rootPkge, JSON.stringify(package, null, 4), { encoding: 'utf8' }, err => {
        console.log('6. 写入 scripts 命令完成')
        installVuepress()
    })
    
}
if(fs.existsSync(rootPkge)) {
    console.log('已存在 /package.json')
    writeScripts()
} else {
    // 初始化NPM
    runCommand('npm', ["init", "-y"])
    .then(() => { 
        console.log('已创建 /package.json')
        writeScripts() 
    })
    .catch(error => { console.error(error) })
}







   


