const PATH = require('path')
const {fetch, fetchPath, config, dependencies, aliasCommand} = require('../center')
const {existsSync, mkdirSync, writeFile, writeFileSync,copyFileSync} = fetch('UTILS|fs')
const runCommand = (c, a) => {
    const cp = require("child_process"); 
    return new Promise((s, j) => {
        const e = cp.spawn(c, a, {stdio: "inherit", shell: true}); 
        e.on("error", e => { j(e) }); 
        e.on("exit", c => { c === 0 ? s() : j() })
    })
} 
const installVuepress = () => {
    console.log('安　装 vuepress...')
    runCommand('npm', ["install", "-D", "vuepress@1.8.2"]).then(() => { 
        console.log(`文档部署完成\n
        地图创建 node docs/.usage/create.js\n
        启动开发 npm run docs:dev\n 
        打包站点 npm run docs:build\n\n`)
    }).catch(error => { console.error(error) });
}
let fullCreateFile = '▯▯▯▯▯▯ '
 
/**
 * 生成或更新package.json文件
 *   1.配置的scripts命令
 *   2.安装vuepress
 */
const packagePath = fetchPath('FILE|package')
if(existsSync(packagePath)) { 
    const package = require(packagePath); 
    package.scripts ? Object.assign(package.scripts, aliasCommand) : package.scripts = aliasCommand     
    writeFile(packagePath, package, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'),'在package.json写入scripts命令：' + JSON.stringify(aliasCommand)) })
} else {
    writeFile(packagePath, 
        `{\n"name": "vuepress-for-project",\n"version": "1.0.0",\n"description": "vuepress@1.8.2最佳实践",\n"main": "test.js",\n"directories": {"doc": "docs"},\n"dependencies": {"vuepress": "^1.8.2"},\n"devDependencies": {},\n"scripts": ${JSON.stringify(aliasCommand, null, 4)},\n"keywords": [],\n"author": "",\n"license": "ISC"\n}`, 
        () => {console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), '生成package.json文件, 并写入scripts命令：' + JSON.stringify(aliasCommand))})
}

/**
 * 部署核心结构
 *   1.创建目录：docs/.vuepress
 *   2.创建资源目录：docs/.vuepress/public
 *   3.创建文档配置：docs/.vuepress/config.js
 *   4.创建样式目录：docs/.vuepress/styles
 *   5.文档LOGO资源：docs/.vuepress/public/logo.png
 */
console.log(fullCreateFile + ' 文档部署中...')
mkdirSync(fetchPath('DIR|.vuepress'), res => {console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), res.message, fetchPath('DIR|.vuepress'))})
mkdirSync(fetchPath('DIR|.vuepress/public'), res => {console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), res.message, fetchPath('DIR|.vuepress/public'))})
mkdirSync(fetchPath('DIR|.vuepress/styles'), res => {console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), res.message, fetchPath('DIR|.vuepress/styles'))})
writeFileSync(fetchPath('FILE|.vuepress/config'), 'module.exports = ' + JSON.stringify(config, null, 4), () => {console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), '文件已创建', fetchPath('FILE|.vuepress/config'))})
copyFileSync(fetchPath('RES|logo'), fetchPath('FILE|logo'))
console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), '文件已拷贝', fetchPath('FILE|logo'))