const {fetch, fetchPath} = require('../config')
const fs = fetch('UTILS|fs')
const ARG_ARR = process.argv.slice(2)                    // 命令参数
const DATA = fetch('DATA|main'), 
    SRC_PATH = {}, 
    PATH_DATA = {}, 
    CREATOR = [],
    SCENE = [],
    USAGE = [],
    SOLUTION = [],
    STANDARD = [],
    KEYWORDS = {}

// 递归数据结构
function handleNodeFile(node) {
    PATH_DATA[node.path] = node
    CREATOR.push(node.path)
}
function handleNodeDir(node, children) {
    node.path += '/'                       // 目录特有标识
    PATH_DATA[node.path] = node            // 路径映身数据 
    PATH_DATA[node.path + 'README'] = node // 路径映身数据 主页   
    CREATOR.push(node.path)                // c
    CREATOR.push(node.path + 'README')
    for (key in children) { handleTreeToData(key, children[key], node) }
}
function handleTreeToData(key, node, parent) {    
    if (typeof key === 'string') {
        Object.assign(node, {
            parent, 
            key, 
            title: node.title || node.linkName || key, 
            linkName: node.linkName || node.title || key, 
            path: parent.path + key                       // 用于数据源查找数据
        })
        node.children ? handleNodeDir(node, node.children) : handleNodeFile(node)
        node.src && (SRC_PATH[node.src] = node.path)
    } else {
        handleNodeDir({title: 'Home', src: 'index', path: '', children: key}, key)
        SRC_PATH['index'] = '/'
        return
    }
    KEYWORDS[node.path] = {key, keywords: `${node.title.toLowerCase()}(${key.toLowerCase()})`}
    if (node.usage) USAGE.push({title: node.title, data:node.usage}) 
    if (node.standard) STANDARD.push({title: node.title, data:node.standard})
    if (node.links) {
        node.links.forEach(e => {KEYWORDS[node.path].keywords += `■${e.name.toLowerCase()}`})
    }
    if (node.scene) {
        SCENE.push({title: node.title, data:node.scene})
        node.scene.forEach(e => {KEYWORDS[node.path].keywords += `■${e.title.toLowerCase()}`})
    }
    if (node.solution) {
        SOLUTION.push({title: node.title, data:node.solution})
        node.solution.forEach(e => {KEYWORDS[node.path].keywords += `■${e.title.toLowerCase()}`})
    }    
    if (node.peripheral) {
        for (i in node.peripheral) { 
            let item = node.peripheral[i]
            handleTreeToData(i, item, node) 
            KEYWORDS[node.path].keywords += `■${item.title.toLowerCase()}(${i.toLowerCase()})`
        }        
    }    
}
if (ARG_ARR.length > 0) {
    for (let i = 0; i < ARG_ARR.length; i++) {
        let resName = ARG_ARR[i] 
        let item = RES_DATA[resName]
        handleTreeToData(item)
    }
} else {
    handleTreeToData(DATA)
}


// 扁平化数据避免嵌套
for (i in PATH_DATA) {
    const item = PATH_DATA[i]
    item.parent && (item.parent = item.parent.path)
    item.children && (item.children2 = Object.keys(item.children).map(key => item.children[key].path))
}
for (i in PATH_DATA) {
    const item = PATH_DATA[i]
    if (item.children2) {item.children = item.children2; delete item.children2} 
}

// 写文件
let fullCreateFile = '▯▯▯▯▯▯▯▯ '
fs.writeFile(fetchPath("DATA|src:path"), SRC_PATH, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), fetchPath("DATA|src:path")) })
fs.writeFile(fetchPath("DATA|path:data"), PATH_DATA, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), fetchPath("DATA|path:data")) })
fs.writeFile(fetchPath("DATA|creator"), CREATOR, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), fetchPath("DATA|creator")) })

fs.writeFile(fetchPath("DATA|scene"), SCENE, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), fetchPath("DATA|scene")) })
fs.writeFile(fetchPath("DATA|usage"), USAGE, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), fetchPath("DATA|usage")) })
fs.writeFile(fetchPath("DATA|solution"), SOLUTION, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), fetchPath("DATA|solution")) })
fs.writeFile(fetchPath("DATA|standard"), STANDARD, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), fetchPath("DATA|standard")) })
fs.writeFile(fetchPath("DATA|path:keywords"), KEYWORDS, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), fetchPath("DATA|path:keywords")) })