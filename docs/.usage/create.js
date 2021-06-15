const {mkdirSync, writeFile} = require('./src/tools-fs')
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()
const path = require('path')
const siteMap = require('./siteMap')
const generateFile = require('./generateFile')
const argArr = process.argv.slice(2)
let readmeDataMap = {}

const handleItemChildren = (item, children) => {
    mkdirSync(path.resolve(__dirname, '..'+item.path))
    readmeDataMap[item.path + '/README'] = {path: item.path + '/README', target: item}
    for (key in children) { handleItem(key, children[key], item) }
}
const handleItem = (key, item, parent) => {
    // 拼接path和id / 被外部链接时 作链接名称 / 被外部链接时 1.链接[name||linkName](path) 2.用于从flatDataMap中查询数据 / 目录溯源根据    
    Object.assign(item, {parent, linkName: item.linkName || item.title || key, path: parent.path +'/'+ key, key}) 
    item.CHILDREN ? handleItemChildren(item, item.CHILDREN) : generateFile(item.path, item)
}

// 指定要创建的文件
if (argArr.length > 0) {
    console.log('************myKeyy',myCache.get( "_DATA_"))
    argArr.forEach(_path => {
        //'/tools/git'
    })
} else {
    let indexLinks = ``
    
    for (key in siteMap) {
        let item = siteMap[key]  
        handleItem(key, item, {key:'DATA_ROOT', path: '', title: '首页标题', CHILDREN: siteMap})
        indexLinks += `[${item.linkName}](${item.path}) | `
    }

    // 写首页文件
    const homePageStr = `---\nhome: true\nheroImage: /hero.png\nheroText: Hero 标题\ntagline: Hero 副标题\nactionText: 快速上手 →\nactionLink: /zh/guide/\nfeatures:\n- title: 简洁至上\n  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。\n- title: Vue驱动\n  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。\n- title: 高性能\n  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。\nfooter: MIT Licensed | Copyright © 2018-present Evan You\n---\n${indexLinks}`
    writeFile(path.resolve(__dirname, '../README.md'), homePageStr)

    for (id in readmeDataMap) {
        let {path, target} = readmeDataMap[id]
        generateFile(path, target)
    }
    myCache.set( "_DATA_", readmeDataMap, function( err, success ){ console.log('1111111111111111111111', err, success) })
}
console.log('************myKeyy',myCache.get( "_DATA_"))


