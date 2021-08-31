const fs = require('../utils/fs')
const {dataPath} = require('../config')
const DATA = require(dataPath['main']), 
    SRC_PATH = {}, 
    PATH_DATA = {}, 
    CREATOR = []

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
}
handleItem('ROOT', {children: DATA, src: 'index', path: ''}, null)

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
let fullCreateFile = '▯▯▯ '
console.log(fullCreateFile)
fs.writeFile(dataPath["src:path"], SRC_PATH, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["src:path"]) })
fs.writeFile(dataPath["path:data"], PATH_DATA, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["path:data"]) })
fs.writeFile(dataPath["creator"], CREATOR, () => { console.log(fullCreateFile = fullCreateFile.replace('▯', '▮'), dataPath["creator"]) })