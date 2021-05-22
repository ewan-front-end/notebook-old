const fs = require('fs')
const _path = require('path')
const siteMap = require('./siteMap')
const argArr = process.argv.slice(2)
const R_D__ = _path.resolve(__dirname, '../')
const R_D_I = _path.resolve(R_D__, 'README.md')

let flatDataMap = {}, // 扁平化数据
    indexLinks = ``       // 首页链接拼接：[key||name](path)
let DATA_ROOT  = {key:'DATA_ROOT', path: '', title: '首页标题', CHILDREN: siteMap},
    _DATA_ROOT = {key:'DATA_ROOT', path: '', title: '首页标题'},
    usageArr = []

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
    // 收集 使用摘要
    if (item.usage){
        usageArr.push({
            title: item.title || item.linkName || '未命名',
            usage: item.usage
        })
    }
    // 创建
    CHILDREN ? createDir(item, CHILDREN) : createFile(item) 
}



if (argArr.length > 0) {
    let root, _root
    argArr.forEach(path => {
        root = DATA_ROOT
        _root = _DATA_ROOT
        path = path.replace(/^\/|\/$/g, '')
        path.split('/').forEach(key => {
            let item = JSON.parse(JSON.stringify(root.CHILDREN[key]))
            delete item.CHILDREN
            if(!_root.CHILDREN) _root.CHILDREN = {}
            _root.CHILDREN[key] = item
            _root = item
            root = root.CHILDREN[key]
        })
    })
    
    for (key in _DATA_ROOT.CHILDREN) {
        let item = _DATA_ROOT.CHILDREN[key] 
        handleItem(key, item, _DATA_ROOT)
    }
} else {
    for (key in siteMap) {
        let item = siteMap[key]          
        // 数据规范化&扁平化
        handleItem(key, item, DATA_ROOT)
        // 首页一级导航
        indexLinks += `[${item.linkName}](${item.path}) | `
    }
    // 首页模板
    const homePageStr = `---
    home: true\nheroImage: /hero.png\nheroText: Hero 标题\ntagline: Hero 副标题\nactionText: 快速上手 →\nactionLink: /zh/guide/\nfeatures:\n- title: 简洁至上\n  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
    - title: Vue驱动\n  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。\n- title: 高性能\n  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
    footer: MIT Licensed | Copyright © 2018-present Evan You\n---\n${indexLinks}`
    if (fs.existsSync(R_D_I)) { } else {fs.writeFile(R_D_I, homePageStr, { encoding: 'utf8' }, err => { console.log('created ' + R_D_I) })}

    /**
     * 使用摘要生成
     * 依赖数据{title:'', linkName:'', usage:{}}
     */ 
    
}

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
    let {type, path, target} = flatDataMap[id]
    if (type === 'DIRE') {fs.mkdirSync(path); console.log('created ' + path)} 
    if (type === 'FILE') {
        let content = `[上一级](../)\n\n`                     // 添加上一级按钮 

        /* 子类链接  */  
        if(target.CHILDREN) {
            content += `## 子类链接\n`
            for (i in target.CHILDREN){
                let {linkName, path} = target.CHILDREN[i]
                content += `[${linkName}](${path}) `
            } 
        }
            
        /* title   */
        /* desc    */
        /* detail  */        
        target.title  && (content += `# ${target.title}\n`)  
        target.desc   && (content += `> ${target.desc}\n`)
        target.detail && (content += `${target.detail}\n`) 

        /* 相关链接  */
        if(target.links) {
            if (Object.prototype.toString.call(target.links) !== "[object Array]") console.error(target.links, '非数组类型')
            let linksStr = ``
            content += `## 相关链接\n`
            target.links.forEach(item => {
                let linkName, linkHref
                let tracingObj = target
                if(typeof item === 'string'){
                    linkHref = item
                } else {
                    linkName = item.name || ''
                    linkHref = item.href || '#'
                }
                // 相对路径转绝对路径
                let twoPoint = linkHref.match(/\.\.\//g)                
                if (twoPoint) {                                        
                    linkHref = linkHref.replace(/\.\.\//g, '')                                                                                                                     // 去除相对结构                    
                    let count = twoPoint.length; while(count > 0){ tracingObj = tracingObj.parent; tracingObj.key === 'DATA_ROOT' && console.log(item, '相对目录越界！'); count-- } // 跳过目录层级                    
                    while(tracingObj.key !== 'DATA_ROOT'){ linkHref = tracingObj.key + '/' + linkHref; tracingObj = tracingObj.parent }                                            // 补充父级路径                    
                    linkHref = '/' + linkHref                                                                                                                                      // 加上根目录标识
                }
                let singlePoint = linkHref.match(/\.\//g)
                if (singlePoint) {
                    tracingObj = target.parent
                    linkHref = linkHref.replace(/\.\//g, '')
                    while(tracingObj.key !== 'DATA_ROOT'){ linkHref = tracingObj.key + '/' + linkHref; tracingObj = tracingObj.parent }
                    linkHref = '/' + linkHref
                }

                if (!linkName) {
                    let linkTarget = flatDataMap[linkHref] || {}
                    linkName = linkName || linkTarget.linkName || '未知'
                }
                
                console.log(linkHref,linkName, ' - ', linkHref)
                linksStr += `[${linkName}](${linkHref}) `
            })            
            content += linksStr + `\n\n`
        } 
        
        /* 外部资源  */
        if (target.SRC) {
            const file = fs.readFileSync(_path.resolve(__dirname, './resources/md/'+target.SRC+'.md'), 'utf8')
            content += `\n${file}\n`
        }
                    
        if (fs.existsSync(path)) {} else {fs.writeFile(path + '.md', content, { encoding: 'utf8' }, err => { console.log('created ' + path) })}
    }
}

