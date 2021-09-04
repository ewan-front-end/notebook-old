const fs = require('../utils/fs')
const {dataPath} = require('../config')
const DATA = require(dataPath['main']), 
    SRC_PATH = {}, 
    PATH_DATA = {}, 
    CREATOR = [],
    SCENE = [],
    USAGE = [],
    SOLUTION = [],
    STANDARD = [],
    KEYWORDS = {}

// 递归数据结构
function handleNodeIsFile(node) {
    PATH_DATA[node.path] = node
    CREATOR.push(node.path)
}
function handleNodeIsDirectory(node, children) {
    node.path += '/' 
    PATH_DATA[node.path] = node
    PATH_DATA[node.path + 'README'] = node    
    CREATOR.push(node.path)
    CREATOR.push(node.path + 'README')
    for (key in children) { handleItem(key, children[key], node) }
}
function handleItem(key, node, parent) {    
    if (key === 'ROOT') {
        handleNodeIsDirectory(node, node.children)
        SRC_PATH[node.src] = node.path
    } else {        
        Object.assign(node, {parent, key, title: node.title || node.linkName || key, linkName: node.linkName || node.title || key, path: parent.path + key})
        node.children ? handleNodeIsDirectory(node, node.children) : handleNodeIsFile(node)
        node.src && (SRC_PATH[node.src] = node.path)
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
            handleItem(i, item, node) 
            KEYWORDS[node.path].keywords += `■${item.title.toLowerCase()}(${i.toLowerCase()})`
        }        
    }    
}
handleItem('ROOT', {title: 'Home', src: 'index', path: '', children: DATA}, null)

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
fs.writeFile(dataPath["src:path"], SRC_PATH, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["src:path"]) })
fs.writeFile(dataPath["path:data"], PATH_DATA, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["path:data"]) })
fs.writeFile(dataPath["creator"], CREATOR, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["creator"]) })

fs.writeFile(dataPath["scene"], SCENE, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["scene"]) })
fs.writeFile(dataPath["usage"], USAGE, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["usage"]) })
fs.writeFile(dataPath["solution"], SOLUTION, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["solution"]) })
fs.writeFile(dataPath["standard"], STANDARD, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["standard"]) })
fs.writeFile(dataPath["path:keywords"], KEYWORDS, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["path:keywords"]) })