const Path = require('path')
const { mkdirSync } = require('../.deploy/fs')
const createFile = require('./components/createFile')
const ARG_ARR = process.argv.slice(2)  // 命令参数
const DATA = require('./index')

const PATHS = []
const PATH_DATA = {}
const RES_PATH = {}

// 数据处理
function handleDataChildren(node) {
    if (node.children) node.path += '/'
    PATH_DATA[node.path] = node            // 路径映身数据
    node.src && (RES_PATH[node.src] = node.path)
    PATHS.push(node.path)
    if (node.children) {
        for (key in node.children) { handleData(key, node.children[key], node) }
    }    
}
function handleData(key, node, parent) {
    Object.assign(node, {
        parent, 
        key, 
        title: node.title || node.linkName || key, 
        linkName: node.linkName || node.title || key, 
        path: parent ? parent.path + key : ''                      // 用于数据源查找数据
    })    
    handleDataChildren(node)
}
handleData('', DATA, null)

// MD生成
const getDataByPath = path => {
    path = path.substring(1)
    const arr = path.split('/')    
    let res = DATA, prop
    while (prop = arr.shift()) {
        prop && (res = res.children[prop])
    }
    return res
}
const createItem = item => {
    const ABSOLUTE_PATH = Path.resolve(__dirname, '../' + item.path)
    if (item.path.match(/\/$/m)) {
        mkdirSync(ABSOLUTE_PATH)
        createFile(Path.resolve(ABSOLUTE_PATH, 'README'), item)
    } else {
        createFile(ABSOLUTE_PATH, item)
    }
}
PATHS.forEach(path => {
    let item = getDataByPath(path)    
    item ? createItem(item) : console.warn(path + '创建失败！')    
})

// PATH_DATA.json
// RES_PATH.json