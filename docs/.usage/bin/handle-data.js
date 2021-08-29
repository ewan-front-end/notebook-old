const fs = require('fs')
const DATA_CONFIG = require('../data2/config')
const DATA_MAIN = require(DATA_CONFIG.data_main), SRC_PATH = {}, PATH_DATA = {}, CREATOR = []

const handleNodeIsFile = (node) => {
    PATH_DATA[node.path] = node
    CREATOR.push(node.path)
}
const handleNodeIsDirectory = (node, children) => {
    node.path += '/' 
    PATH_DATA[node.path] = node
    PATH_DATA[node.path + 'README'] = node    
    CREATOR.push(node.path)
    CREATOR.push(node.path + 'README')
    for (key in children) { handleItem(key, children[key], node) }
}
const handleItem = (key, node, parent) => {
    if (key === 'ROOT') {
        handleNodeIsDirectory(node, node.children)
        SRC_PATH[node.src] = node.path
    } else {        
        Object.assign(node, {parent, key, title: node.title || node.linkName || key, linkName: node.linkName || node.title || key, path: parent.path + key})
        node.children ? handleNodeIsDirectory(node, node.children) : handleNodeIsFile(node)
        node.src && (SRC_PATH[node.src] = node.path)
    }    
}
handleItem('ROOT', {children:DATA_MAIN, src:'index', path: ''}, null)

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

fs.writeFile(DATA_CONFIG["src:path"], JSON.stringify(SRC_PATH, null, 4), { encoding: 'utf8' }, err => { err ? console.log(err) : console.log('written: ' + DATA_CONFIG["src:path"]) })
fs.writeFile(DATA_CONFIG["path:data"], JSON.stringify(PATH_DATA, null, 4), { encoding: 'utf8' }, err => { err ? console.log(err) : console.log('written: ' + DATA_CONFIG["path:data"]) })
fs.writeFile(DATA_CONFIG["creator"], JSON.stringify(CREATOR, null, 4), { encoding: 'utf8' }, err => { err ? console.log(err) : console.log('written: ' + DATA_CONFIG["creator"]) })