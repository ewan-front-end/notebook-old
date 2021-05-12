const fs = require('fs')
const _path = require('path')
const homeObj = {key:'ROOT_HOME', id: 'home', path: '.', title: '首页标题'}
const siteMap = require('./siteMap')
const R_D__ = _path.resolve(__dirname, '../')
const R_D_I = _path.resolve(R_D__, 'README.md')

let flatDataMap = {}, // if (FILENAME || CHILDREN) {home_tools: {parent:homeObj, key:'tools', name:'tools或自定义', id:'home_tools', path:'绝对路径docs/tools'}}
errorCount = 0,       // else errorCount++
homePageStr,          // 首页模板
indexLinks = ``       // 首页链接拼接：[key||name](path)

const createFile = (item) => {
    const {id, FILENAME, key, parent} = item
    if (FILENAME) {
        item.path = parent.path +'/'+ FILENAME; flatDataMap[id] = {type: 'FILE', path: _path.resolve(R_D__, item.path), target: item}
    } else {
        console.warn(parent.path +'/'+ key, '如果作为目录，缺失CHILDREN; 如果作为文件，缺失FILENAME'); errorCount++
    }
}, createDir = (item, children) => {
    const {id, path} = item, absolutePath = _path.resolve(R_D__, path)
    if (!fs.existsSync(absolutePath)) {flatDataMap[id] = {type: 'DIRE', path: absolutePath, target: item}; flatDataMap[id + '_index'] = {type: 'FILE', path: _path.resolve(absolutePath, 'README.md'), target: item}}
    for (key in children) { handleItem(key, children[key], item) }
}, handleItem = (key, item, parent) => {
    const {CHILDREN} = item
    Object.assign(item, {parent, key, name: item.name || key, id: parent.id + '_' + key}) // 无自定义name时 key作为name
    if (CHILDREN) { 
        item.path = parent.path +'/'+ key; createDir(item, CHILDREN) 
    } else { 
        createFile(item) 
    }
}
for (key in siteMap) {
    let item = siteMap[key]
    handleItem(key, item, homeObj)
    indexLinks += `[${item.name}](${item.path}) | `
}

homePageStr = `---
home: true\nheroImage: /hero.png\nheroText: Hero 标题\ntagline: Hero 副标题\nactionText: 快速上手 →\nactionLink: /zh/guide/\nfeatures:\n- title: 简洁至上\n  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动\n  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。\n- title: 高性能\n  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You\n---\n${indexLinks}`

// 构建开始 flatDataMap{{type: 'DIRE', target: {data}, path: 'D:\\Ewan\\Hello\\aa\\docs\\tools'}, {type: 'FILE', target: {data}, path: 'D:\\Ewan\\Hello\\aa\\docs\\tools/README.md'}}
if (errorCount === 0) {
    for (id in flatDataMap) {
        let {type, path, target} = flatDataMap[id]
        if (type === 'DIRE') {fs.mkdirSync(path); console.log('created ' + path)} 
        if (type === 'FILE') {
            let content = `[上一级](../)\n\n`                     // 添加上一级按钮 
             
              /* title   */
             /* desc    */
            /* detail  */        
            target.title && (content += `# ${target.title}\n`)  
            target.desc && (content += `> ${target.desc}`)
            target.detail && (content += `${target.detail}\n`) 

            /* 相关链接  */
            if(target.links) {
                let linksStr = ``
                target.links.forEach(item => {
                    if (typeof item === 'string') {
                        linksStr += `[${target.linkName || '未知'}](${item}}) `
                    } else {
                        linksStr += `[${item.name || target.linkName || '未知'}](${item.href}) `
                    }
                })
                content += `## 相关链接\n`
                content += linksStr + `\n\n`
            } 

            /* 子类链接  */  
            if(target.CHILDREN) {
                content += `## 子类链接\n`
                for (i in target.CHILDREN){
                    let {name, FILENAME, key} = target.CHILDREN[i]; 
                    content += `[${name}](./${FILENAME || key}) `
                } 
            }                
                       
            if (fs.existsSync(path)) {} else {fs.writeFile(path, content, { encoding: 'utf8' }, err => { console.log('created ' + path) })}
        }
    }
    if (fs.existsSync(R_D_I)) { } else {fs.writeFile(R_D_I, homePageStr, { encoding: 'utf8' }, err => { console.log('created ' + R_D_I) })}
}else {
    console.warn(errorCount + ' 条数据异常, 请修复 siteMap 再构建！')
}