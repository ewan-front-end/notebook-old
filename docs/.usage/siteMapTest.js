const fs = require('fs')
const _path = require('path')
const siteMap = require('./siteMap')
const R_D__ = _path.resolve(__dirname, '../')

let flatDataMap = {}

const createFile = (item) => {
    const {parent, path} = item
    flatDataMap[path] = {type: 'FILE', path: _path.resolve(R_D__, '.' + item.path), target: item}     // /tools ? ./tools
}
const createDir = (item, children) => {
    let path = item.path, absolutePath = _path.resolve(R_D__, '.' + path)
    if (!fs.existsSync(absolutePath)) {
        flatDataMap[path + '/'] = {type: 'DIRE', path: absolutePath, target: item}
        flatDataMap[path + '/README'] = {type: 'FILE', path: _path.resolve(absolutePath, 'README'), target: item}
    }
    for (key in children) { handleItem(key, children[key], item) }
}
const handleItem = (key, item, parent) => {
    let {CHILDREN} = item
    Object.assign(item, {
        parent,                          // 拼接path和id
        linkName: item.linkName || key,  // 被外部链接时 作链接名称 
        path: parent.path +'/'+ key,                     // 被外部链接时 1.链接[name||linkName](path) 2.用于从flatDataMap中查询数据
        key                              // 暂时无作用
    }) 
    CHILDREN ? createDir(item, CHILDREN) : createFile(item) 
}
for (key in siteMap) {
    let item = siteMap[key]  

    handleItem(key, item, {key:'ROOT_HOME', path: '', title: '首页标题'})
    // 首页一级导航
    //indexLinks += `[${item.linkName}](${item.path}) | `
}

for (id in flatDataMap) {
    let {type, path, target} = flatDataMap[id]
    if (type === 'DIRE') {console.log('created ' + path)} 
    if (type === 'FILE') {
        /* 相关链接  */
        if(target.links) {
            let linksStr = ``
            let dirRoot = target
            
            target.links.forEach(item => {
                let linkName, linkHref
                if(typeof item === 'string'){
                    linkHref = item
                } else {
                    linkName = item.name || ''
                    linkHref = item.href || '#'
                }
                
                let back = linkHref.match(/..\//g) || [], backNum = back.length
                console.log('=====', linkHref, back)
                if (backNum) {
                    
                    linkHref = linkHref.replace(/..\//g, '')
                    for (let i = 1; i < backNum; i++){
                        dirRoot = dirRoot.parent
                        //console.log('-----', dirRoot.key)
                        linkHref = dirRoot.key + '/' + linkHref
                    }
                }
                if (!linkName) {
                    let linkTarget = flatDataMap[linkHref] || {}
                    linkName = linkName || linkTarget.linkName || '未知'
                }
                
                //console.log(linkHref,linkName, ' - ', linkHref)
                linksStr += `[${linkName}](${linkHref}) `
            })            
            
        } 

        
    }
}

// for (path in flatDataMap) {
//     let item = flatDataMap[path]  
//     if (item.target.path === path) {
//         console.log(item.type, path, '  ', item.target.path === path) 
//     } else {
//         console.log(item.type, path, '  ', item.target.path) 
//     }
      
// }


