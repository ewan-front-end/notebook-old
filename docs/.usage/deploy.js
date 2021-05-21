const path = require('path')
const fs = require('fs')
const runCommand = (c, a) => {const cp = require("child_process"); return new Promise((s, j) => {const e = cp.spawn(c, a, {stdio: "inherit", shell: true}); e.on("error", e => { j(e) }); e.on("exit", c => { c === 0 ? s() : j() })})} 
const installVuepress = () => {
    console.log('安　装 vuepress...')
    runCommand('npm', ["install", "-D", "vuepress@1.8.2"]).then(() => { 
        console.log(`文档部署完成\n
        地图创建 node docs/.usage/create.js\n
        启动开发 npm run docs:dev\n 
        打包站点 npm run docs:build\n\n`)
    }).catch(error => { console.error(error) });
}
const {config, dependencies, aliasCommand} = require('./config')
const configStr = 'module.exports = ' + JSON.stringify(config, null, 4), packageScripts = {}
for (key in aliasCommand) { packageScripts[key] = aliasCommand[key] }
let packageStr = `{
    "name": "vuepress-demo",
    "version": "1.0.0",
    "description": "vuepress@1.8.2最佳实践",
    "main": "test.js",
    "directories": {"doc": "docs"},
    "dependencies": {"vuepress": "^1.8.2"},
    "devDependencies": {},
    "scripts": ${JSON.stringify(packageScripts, null, 4)},
    "keywords": [],
    "author": "",
    "license": "ISC"
}`
const R________ = path.resolve(__dirname, '../../')
const R_P______ = path.resolve(R________, 'package.json')
const R_D______ = path.resolve(R________, 'docs')
const R_D_U____ = path.resolve(__dirname)
const R_D_U_S_I = path.resolve(R_D_U____, 'styles/index.styl')
const R_D_P____ = path.resolve(R_D______, '.vuepress')
const R_D_P_P__ = path.resolve(R_D_P____, 'public')
const R_D_P_C__ = path.resolve(R_D_P____, 'config.js')
const R_D_P_S__ = path.resolve(R_D_P____, 'styles')
const R_D_P_S_I = path.resolve(R_D_P_S__, 'index.styl')

console.log('文档部署中...');
if(fs.existsSync(R_D_P____)) { console.log('已存在 ' + R_D_P____) } else { fs.mkdirSync(R_D_P____); console.log('已创建 ' + R_D_P____) }
if(fs.existsSync(R_D_P_P__)) { console.log('已存在 ' + R_D_P_P__) } else { fs.mkdirSync(R_D_P_P__); console.log('已创建 ' + R_D_P_P__) }
if(fs.existsSync(R_D_P_C__)) { console.log('已存在 ' + R_D_P_C__) } else { fs.writeFileSync(R_D_P_C__, configStr, { encoding: 'utf8' }); console.log('已创建 ' + R_D_P_C__) }
if(fs.existsSync(R_D_P_S__)) { console.log('已存在 ' + R_D_P_S__) } else { fs.mkdirSync(R_D_P_S__); console.log('已创建 ' + R_D_P_S__) }
if(fs.existsSync(R_D_P_S_I)) { console.log('已存在 ' + R_D_P_S_I) } else { fs.copyFileSync(R_D_U_S_I, R_D_P_S_I); console.log('已创建 ' + R_D_P_S_I) }
if(fs.existsSync(R_P______)) { const package = require(R_P______); Object.assign(package.scripts, packageScripts); packageStr = JSON.stringify(package, null, 4) } 
fs.writeFile(R_P______, packageStr, { encoding: 'utf8' }, err => {console.log('写　入 ' + R_P______ + ' scripts'); installVuepress()})

fs.copyFileSync(path.resolve(R_D_U____, 'resources/images/logo.png'), path.resolve(R_D_P____, 'public/logo.png')); console.log('资　源 ' + R_D_P____ + '\\public\\logo.png')