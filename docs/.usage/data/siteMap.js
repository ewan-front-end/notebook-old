const {reWriteFile} = require('./common')
const PATH = './.SITE_MAP.js'
const SITE_MAP = require(PATH)

/* 创建目录或文件时数据依据 */
// 路径               拼接path依据   目录溯源时     主题名称         作链接名称          查询PATH_MAP_CREATOR时key
// "/system/linux": { parent: ROOT, key: 'linux', title: 'Linux', linkName: 'Linux', path: '/system/linux' }
const PATH_MAP_CREATOR = {}
/* 响应资源文件更改时 RES_MAP_PATH > {"docs": {"path": "/docs", "updateTime": "0000:00:00"}}  setResMapPath(obj) */
const {RES_MAP_PATH, setResMapPath} = require('../data/resMapPath.js')
/*源数据第一层目录 首页展示子目录时 [操作系统](/system) | [服务器](/server)*/
let INDEX_CHILDREN_STR = '' 

const handleItemFile = (item) => { PATH_MAP_CREATOR[item.path] = {type: 'FILE', path: item.path, target: item} }
const handleItemChildren = (item, children) => {
    PATH_MAP_CREATOR[item.path] = {type: 'DIR', path: item.path, target: item}
    PATH_MAP_CREATOR[item.path + '/README'] = {type: 'FILE', path: item.path + '/README', target: item}
    for (key in children) { handleItem(key, children[key], item) }
}
const handleItem = (key, item, parent) => { 
    Object.assign(item, { parent, key, title:item.title || item.linkName || key, linkName: item.linkName || item.title || key, path: parent.path +'/'+ key }) 
    if (item.src) { if (RES_MAP_PATH[item.src]) { RES_MAP_PATH[item.src].path = item.path } else { RES_MAP_PATH[item.src] = {path: item.path, updateTime: '0000:00:00 00:00'} } }
    item.children ? handleItemChildren(item, item.children) : handleItemFile(item)
}

module.exports = {
    SITE_MAP,
    setSiteMap: obj => { reWriteFile(PATH, obj) },
    handleSiteMap: () => {
        const DATA_ROOT = {key:'ROOT', title: '文档开发', path: '', children: SITE_MAP, src:'index'}   
        for (key in SITE_MAP) {
            let item = SITE_MAP[key]  
            handleItem(key, item, DATA_ROOT)
            INDEX_CHILDREN_STR += `- [︳${item.linkName}](${item.path})\n`
        }
        INDEX_CHILDREN_STR = `<div class="root-children block-main">\n\n${INDEX_CHILDREN_STR}\n</div>` 
        
        RES_MAP_PATH['index'] = {path:'/README', updateTime:'0000:00:00'}          
        RES_MAP_PATH && setResMapPath(RES_MAP_PATH)

        return {PATH_MAP_CREATOR, INDEX_CHILDREN_STR}
    }
}