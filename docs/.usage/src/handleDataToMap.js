
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
const RES_MAP_PATH = {
    // "system": "/system",
    // "system-linux": "/system/linux",
    // "node/index": "/node",
    // "node/package": "/node/package"
}
/*源数据第一层目录：首页展示子目录时*/
const INDEX_CHILDREN = '' // `[操作系统](/system) | [服务器](/server)`
const ROOT_PATH = '..'

  
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
    if (item.src) RES_MAP_PATH[item.src] = item.path
    item.children ? handleItemChildren(item, item.children) : handleItemFile(item)
}

module.exports = (siteMap) => { 
    const DATA_ROOT = {key:'ROOT', title: '首页标题', path: ROOT_PATH, children: siteMap, src:'index'}   
    for (key in siteMap) {
        let item = siteMap[key]  
        handleItem(key, item, DATA_ROOT)
    }
    PATH_MAP_CREATOR[DATA_ROOT.path] = {type: 'FILE', path: DATA_ROOT.path, target: DATA_ROOT}

    return {ROOT_PATH, PATH_MAP_CREATOR, INDEX_CHILDREN, RES_MAP_PATH}
}

