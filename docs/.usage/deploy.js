const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec

const {config, dependencies, aliasCommand} = require('./config')
const root = path.resolve(__dirname, '../../')
const rootPkge = path.resolve(root, 'package.json')
const rootDocs = path.resolve(root, 'docs')
const rootDocsIndex = path.resolve(rootDocs, 'README.md')
const rootDocsUsage = __dirname
const rootDocsPress = path.resolve(rootDocs, '.vuepress')
const rootDocsPressPublic = path.resolve(rootDocsPress, 'public')
const rootDocsPressConfig = path.resolve(rootDocsPress, 'config.js')
const runCommand = (command, args) => {
    const cp = require("child_process") 
    return new Promise((resolve, reject) => {
        const executedCommand = cp.spawn(command, args, {stdio: "inherit", shell: true});
        executedCommand.on("error", error => { reject(error) });
        executedCommand.on("exit", code => { code === 0 ? resolve() : reject() });
    });
}

 

console.log('文档部署中...');


if(fs.existsSync(rootDocsPress)) {
    console.log('1. 创建 docs/.vuepress   已存在')
} else {
    fs.mkdirSync(rootDocsPress)
    console.log('1. 创建 docs/.vuepress   已创建');
}


if(fs.existsSync(rootDocsPressPublic)) {
    console.log('2. 创建 docs/.vuepress/public   已存在')
} else {
    fs.mkdirSync(rootDocsPressPublic)
    console.log('2. 创建 docs/.vuepress/public   已创建');
}


if(fs.existsSync(rootDocsPressConfig)) {
    console.log('3. 创建 docs/.vuepress/config.js   已存在')
} else {
    fs.writeFile(rootDocsPressConfig, 'module.exports = ' + JSON.stringify(config, null, 4), { encoding: 'utf8' }, err => {})
    console.log('3. 创建 docs/.vuepress/config.js   已创建')
}


// if(fs.existsSync(rootDocsIndex)) {
//     console.log('4. 创建 docs/README.md   已存在')
// } else {
//     fs.writeFile(rootDocsIndex, `
// # 项目添加文档功能

// 1. 项目根目录下创建 docs 目录
// 2. 复制 .usage 到 docs/
// 3. 基础部署 项目根目录> node docs/.usage/deploy.js 
// 4. 地图创建 项目根目录> node docs/.usage/create.js 
// 5. 项目根目录> npm run docs:dev`, { encoding: 'utf8' }, err => {})
//     console.log('4. 创建 docs/README.md   已创建')
// }


runCommand('copy', [path.resolve(rootDocsUsage, 'resources/logo.png'), path.resolve(rootDocsPress, 'public/logo.png')])
    .then(() => { console.log('5. 资源部署public/logo.png') })
    .catch(error => { console.error(error) });


const installVuepress = () => {
    // 安装vuepress
    runCommand('npm', ["install", "-D", "vuepress@1.8.2"])
    .then(() => { 
        console.log('8. 安装vuepress完成')
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
        console.log('7. 写入 scripts 命令完成')
        installVuepress()
    })
    
}
if(fs.existsSync(rootPkge)) {
    console.log('6. 创建 /package.json   已存在')
    writeScripts()
} else {
    // 初始化NPM
    runCommand('npm', ["init", "-y"])
    .then(() => { 
        console.log('6. 创建 /package.json   已创建')
        writeScripts() 
    })
    .catch(error => { console.error(error) })
}







   


