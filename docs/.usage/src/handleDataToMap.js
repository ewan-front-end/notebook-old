const {writeFile} = require('./tools-fs')
const Path = require('path')
/*创建目录或文件时数据依据*/
const PATH_MAP_CREATOR = {
    // "/system/linux": {        
    //     parent: {parent:{/*DATA_ROOT*/}, key:'system', title:'操作系统', linkName:'操作系统', path:'/system'}, // 拼接path依据
    //     key: 'linux',                                                                                         // 目录溯源时
    //     title: 'Linux',              // title || linkName || key                                              // 主题名称
    //     linkName: 'Linux',           // linkName || title || key                                              // 作链接名称 
    //     path: '/system/linux'                                                                                 // 查询PATH_MAP_CREATOR时key
    // }
}
/*响应资源文件更改时*/
const RES_MAP_PATH = require('../.RES_MAP_PATH.json')
//{
    // "system": "/system",
    // "system-linux": "/system/linux",
    // "node/index": "/node",
    // "node/package": "/node/package"
//}
/*源数据第一层目录：首页展示子目录时*/
let INDEX_CHILDREN_STR = '' // `[操作系统](/system) | [服务器](/server)`
const ROOT_PATH = ''

  
const handleItemFile = (item) => {    
    PATH_MAP_CREATOR[item.path] = {type: 'FILE', path: item.path, target: item}
}
const handleItemChildren = (item, children) => {
    PATH_MAP_CREATOR[item.path] = {type: 'DIR', path: item.path, target: item}
    PATH_MAP_CREATOR[item.path + '/README'] = {type: 'FILE', path: item.path + '/README', target: item}
    for (key in children) { handleItem(key, children[key], item) }
}
const handleItem = (key, item, parent) => { 
    Object.assign(item, {
        parent, 
        key, 
        title:item.title || item.linkName || key,
        linkName: item.linkName || item.title || key, 
        path: parent.path +'/'+ key
    }) 
    if (item.src) {
        if (RES_MAP_PATH[item.src]) {
            RES_MAP_PATH[item.src].path = item.path
        } else {
            RES_MAP_PATH[item.src] = {path: item.path, updateTime: '0000:00:00'}
        } 
    }
    item.children ? handleItemChildren(item, item.children) : handleItemFile(item)
}

module.exports = (siteMap) => { 
    const DATA_ROOT = {key:'ROOT', title: '文档开发', path: ROOT_PATH, children: siteMap, src:'index'}   
    for (key in siteMap) {
        let item = siteMap[key]  
        handleItem(key, item, DATA_ROOT)
        INDEX_CHILDREN_STR += `- [︳${item.linkName}](${item.path})\n`
    }
    INDEX_CHILDREN_STR = `<div class="root-children block-main">\n\n${INDEX_CHILDREN_STR}\n</div>` 
    RES_MAP_PATH['index'] = {path:'/README', updateTime:'0000:00:00'}  
    writeFile(Path.resolve(__dirname, '../.RES_MAP_PATH.json'), JSON.stringify(RES_MAP_PATH, null, 4)) 

    return {PATH_MAP_CREATOR, INDEX_CHILDREN_STR}
}

