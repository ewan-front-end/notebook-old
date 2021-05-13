const fs = require('fs')
const _path = require('path')
const homeObj = {key:'ROOT_HOME', id: '', path: '.', title: '首页标题'}
const siteMap = require('./siteMap')
const R_D__ = _path.resolve(__dirname, '../')
const R_D_I = _path.resolve(R_D__, 'README.md')

/**
 * {home_tools: {
 *     parent:homeObj,          // 拼接path
 *     key:'tools', 
 *     name:'tools或自定义',     // 链接[name](path)
 *     id:'home_tools', 
 *     path:'绝对路径docs/tools' // 链接[name](path)
 * }}
 */
let flatDataMap = {},
homePageStr,          // 首页模板
indexLinks = ``       // 首页链接拼接：[key||name](path)

const createFile = (item) => {
    const {id, FILENAME, key, parent} = item
    const _fileName = FILENAME || key + '.md'
    item.path = parent.path +'/'+ _fileName
    flatDataMap[id] = {type: 'FILE', path: _path.resolve(R_D__, item.path), target: item}    
}, createDir = (item, children) => {
    const {id, path} = item, absolutePath = _path.resolve(R_D__, path)
    if (!fs.existsSync(absolutePath)) {flatDataMap[id] = {type: 'DIRE', path: absolutePath, target: item}; flatDataMap[id + '_index'] = {type: 'FILE', path: _path.resolve(absolutePath, 'README.md'), target: item}}
    for (key in children) { handleItem(key, children[key], item) }
}, handleItem = (key, item, parent) => {
    const {CHILDREN} = item, 
    _name = item.name || key
    Object.assign(item, {parent, key, linkName: item.linkName || key, id: parent.id + '/' + _name}) // 无自定义name时 key作为name
    if (CHILDREN) { 
        item.path = parent.path +'/'+ key; createDir(item, CHILDREN) 
    } else { 
        createFile(item) 
    }
}
for (key in siteMap) {
    let item = siteMap[key]    
    handleItem(key, item, homeObj)
    // 首页一级导航
    indexLinks += `[${item.linkName}](${item.path}) | `
}

homePageStr = `---
home: true\nheroImage: /hero.png\nheroText: Hero 标题\ntagline: Hero 副标题\nactionText: 快速上手 →\nactionLink: /zh/guide/\nfeatures:\n- title: 简洁至上\n  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动\n  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。\n- title: 高性能\n  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You\n---\n${indexLinks}`

// 构建开始 flatDataMap{{type: 'DIRE', target: {data}, path: 'D:\\Ewan\\Hello\\aa\\docs\\tools'}, {type: 'FILE', target: {data}, path: 'D:\\Ewan\\Hello\\aa\\docs\\tools/README.md'}}
for (id in flatDataMap) {
    let {type, path, target} = flatDataMap[id]
    if (type === 'DIRE') {fs.mkdirSync(path); console.log('created ' + path)} 
    if (type === 'FILE') {
        let content = `[上一级](../)\n\n`                     // 添加上一级按钮 
            
        /* title   */
        /* desc    */
        /* detail  */        
        target.title && (content += `# ${target.title}\n`)  
        target.desc && (content += `> ${target.desc}\n`)
        target.detail && (content += `${target.detail}\n`) 

        /* 相关链接  */
        if(target.links) {
            let linksStr = ``
            target.links.forEach(item => {
                const _href = typeof item === 'string' ? item : item.href, 
                const _linkTarget = flatDataMap[_href] || {}
                const _title = item.name || _linkTarget.linkName || '未知'
                linksStr += `[${_title}](${_href}) `
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
