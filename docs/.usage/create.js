const fs = require('fs')
const {mkdirSync} = require('./src/tools-fs')
const _path = require('path')
const siteMap = require('./siteMap')
const R_D__ = _path.resolve(__dirname, '../')
const R_D_I = _path.resolve(R_D__, 'README.md')
const generateFile = require('./generateFile')

let flatDataMap = {}, // 扁平化数据
    indexLinks = ``       // 首页链接拼接：[key||name](path)
let DATA_ROOT  = {key:'DATA_ROOT', path: '', title: '首页标题', CHILDREN: siteMap},
    _DATA_ROOT = {key:'DATA_ROOT', path: '', title: '首页标题'}
let searchStr = ``

const createFile = (item) => {
    const {parent, path} = item
    flatDataMap[path] = {type: 'FILE', path: _path.resolve(R_D__, '.' + item.path), target: item}     // /tools ? ./tools
}
const createDir = (item, children) => {
    let path = item.path, absolutePath = _path.resolve(R_D__, '.' + path)


    if (!fs.existsSync(absolutePath)) { flatDataMap[path + '/'] = {type: 'DIRE', path: absolutePath, target: item} }
    flatDataMap[path + '/README'] = {type: 'FILE', path: _path.resolve(absolutePath, 'README'), target: item}

    
    for (key in children) { handleItem(key, children[key], item) }
}
const handleItem = (key, item, parent) => {
    let {CHILDREN} = item
    Object.assign(item, {
        parent,                                        // 拼接path和id
        linkName: item.linkName || item.title || key,  // 被外部链接时 作链接名称 
        path: parent.path +'/'+ key,                   // 被外部链接时 1.链接[name||linkName](path) 2.用于从flatDataMap中查询数据
        key                                            // 暂时无作用
    })     
    // 创建
    CHILDREN ? createDir(item, CHILDREN) : createFile(item) 
}


for (key in siteMap) {
    let item = siteMap[key]          
    // 数据规范化&扁平化
    handleItem(key, item, DATA_ROOT)
    // 首页一级导航
    indexLinks += `[${item.linkName}](${item.path}) | `
}
// 首页模板
const homePageStr = `---\nhome: true\nheroImage: /hero.png\nheroText: Hero 标题\ntagline: Hero 副标题\nactionText: 快速上手 →\nactionLink: /zh/guide/\nfeatures:\n- title: 简洁至上\n  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。\n- title: Vue驱动\n  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。\n- title: 高性能\n  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。\nfooter: MIT Licensed | Copyright © 2018-present Evan You\n---\n${indexLinks}`
fs.writeFile(R_D_I, homePageStr, { encoding: 'utf8' }, err => { console.log('created ' + R_D_I) })

    


/** 
 * 构建开始 
 * flatDataMap{{
 *     type: 'DIRE', 
 *     target: {data}, 
 *     path: 'D:\\Ewan\\Hello\\aa\\docs\\tools'
 * }, {
 *     type: 'FILE', 
 *     target: {data}, 
 *     path: 'D:\\Ewan\\Hello\\aa\\docs\\tools\\README'
 * }}
 */ 
for (id in flatDataMap) {
    console.log('id', id);
    let {type, path, target} = flatDataMap[id]
    if (type === 'DIRE') {mkdirSync(path)} 
    if (type === 'FILE') {
        generateFile(path, target)
    }
}

