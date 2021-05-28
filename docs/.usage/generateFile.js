const fs = require('fs')
const _path = require('path')

module.exports = (path, target) => {
    let content = `[上一级](../)\n\n`                     // 添加上一级按钮 
    /* 子类链接  */  
    if(target.CHILDREN) {
        content += `## 子类链接\n`
        for (i in target.CHILDREN){
            let {linkName, path} = target.CHILDREN[i]
            content += `[${linkName}](${path}) `
        } 
        content += `\n`
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

        let titleArr = file.match(/(?:^|\n)#{1,6}\s.+/g) || []  
        let titleStr = ``
        titleArr.forEach((title, i) => {
            title = title.replace(/(?:^|\n)#{1,6}\s/, '')
            titleStr += `[${title}](#${title}) - `
        })
        content += `\n${titleStr}\n`
        
        content += `\n${file}\n`
    }
                
    fs.writeFile(path + '.md', content, { encoding: 'utf8' }, err => { console.log('created ' + path) })
}