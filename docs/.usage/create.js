const fs = require('fs')
const path = require('path')
const siteMap = require('./siteMap')
const rootDocs = path.resolve(__dirname, '../')
const rootDocsIndex = path.resolve(rootDocs, 'README.md')
const rootHomePage = {key:'ROOT_HOME', id: 'home', path: '.', title: '首页标题'}

let errorCount = 0
const flatDataMap = {}

function createFile(item) {
    if (item.fileName) {
        item.path = item.parent.path +'/'+ item.fileName
        flatDataMap[item.id] = {type: 'FILE', path: path.resolve(rootDocs, item.path), target: item}
    } else {
        console.warn(item.parent.path +'/'+ item.key, '如果作为目录，缺失children; 如果作为文件，缺失fileName')
        errorCount++
    }
}
function createDir(item, children) {
    const absolutePath = path.resolve(rootDocs, item.path)
    if (!fs.existsSync(absolutePath)) {
        flatDataMap[item.id] = {type: 'DIRE', path: absolutePath, target: item}
        flatDataMap[item.id + '_index'] = {type: 'FILE', path: path.resolve(absolutePath, 'README.md'), target: item}
    }
    for (key in children) { handleItem(key, children[key], item) }
}

function handleItem(key, item, parent){
    item.parent = parent
    item.key = key
    item.name = item.name || key
    item.id = parent.id + '_' + key
    if (item.children) { item.path = parent.path +'/'+ key; createDir(item, item.children) } else { createFile(item) }
}

let indexLinks = ``
for (key in siteMap) {
    let item = siteMap[key]
    handleItem(key, item, rootHomePage)
    indexLinks += `[${item.name}](${item.path}) | `
}

/**
 * 构建开始
 * flatDataMap{
 *     {type: 'DIRE', target: {data}, path: 'D:\\Ewan\\Hello\\aa\\docs\\tools'},
 *     {type: 'FILE', target: {data}, path: 'D:\\Ewan\\Hello\\aa\\docs\\tools/README.md'}
 * }
 */
if (errorCount === 0) {
    for (id in flatDataMap) {
        let item = flatDataMap[id]
        if (item.type === 'DIRE') {
            fs.mkdirSync(item.path)
            console.log('created ' + item.path)
        } 
        if (item.type === 'FILE') {
            const target = item.target
            let content = ``
            // 添加标题
            target.title && (content += `# ${target.title}\n`)
            // 添加上一级按钮
            content += `[上一级](../)\n\n`
            // 子类链接
            content += `## child links\n`
            for (key in target.children){
                let child = target.children[key]
                content += `[${child.name}](./${child.fileName || child.key}) `
            }
            
            if (fs.existsSync(item.path)) {

            } else {
                fs.writeFile(item.path, content, { encoding: 'utf8' }, err => {
                    console.log('created ' + item.path)
                })
            }
        }
    }
    if (fs.existsSync(rootDocsIndex)) {

    } else {
        fs.writeFile(rootDocsIndex, `---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
${indexLinks}        
        `, { encoding: 'utf8' }, err => {
            console.log('created ' + rootDocsIndex)
        })
    }
}else {
    console.warn(errorCount + ' 条数据异常, 请修复 siteMap 再构建！')
}

