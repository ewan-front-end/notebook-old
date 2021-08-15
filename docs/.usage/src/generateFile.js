const {writeFile, readFile} = require('./tools-fs')
const _path = require('path')
const {RES_MAP_PATH} = require('../data/resMapPath.js')
const handleUML = require('./handleUML')
const {parseStart, parseEnd} = require('./parseCode')

module.exports = (ABSOLUTE_PATH, target, PATH) => {
    let content
    let childrenContent = '' // 主题子类 
    let linksContent = ''    // 主题链接
    let contentHeader = ''   // 主题标题、说明、详情
    let staticContent = ''   // 资源静态内容
    let modifyData = '0000.00.00 00:00'

    // 主题子类
    if(target.children) {
        let listStr = ''
        for (i in target.children){ let {linkName, path} = target.children[i]; listStr += `<li><a href="${path}">${linkName}</a></li>` } 
        childrenContent += `<div class="custom-block children"><ul>${listStr}</ul></div>`
    }
    // 主题链接
    if(target.links) {  
        let listStr = ''
        target.links.forEach(({name, href}) => { listStr += `<li><a href="${href}">${name}</a></li>\n` })  
        linksContent += `<div class="custom-block links">\n<ul class="desc">\n${listStr}</ul>\n</div>`
    }
    // 主题标题、说明、详情
    if (target.title || target.desc || target.detail) {
        const titleStr = target.title ? `<h1>${target.title}</h1><strong>${target.title}</strong>\n` : ''
        const descStr = target.desc ? `<summary class="desc">${target.desc}</summary>\n` : ''
        const detailStr = target.detail ? `<detail>${target.detail}</detail>\n` : ''
        contentHeader += `<div class="content-header">\n${titleStr}${descStr}${detailStr}</div>`
    }
    // 资源静态内容
    if (target.src) {
        let file = readFile(_path.resolve(__dirname, '../resources/md/'+target.src+'.md'))

        file = parseStart(file, PATH) // 自定义解析        

        if (RES_MAP_PATH[target.src]) modifyData = RES_MAP_PATH[target.src].updateTime

        /*
        编译目标：
            <div class="box-flex"> 
                <div class="box-flex-item flex-8">col 01</div>
                <div class="box-flex-item classname" style="flex-basis:100px">col 02</div>
            </div>
        书写格式：
            ---------- 8             小于等于10 flex-grow: 8
            col 01
            ========== 100classname  大于10 flex-basis: n  可注入自定义classname
            col 02
            ----------
         */ 
        let matchFLEX
        while ((matchFLEX = /\-{10,}\s(\d{1,4})([a-z-]*)[\r\n]([\s\S]+?)\-{10,}/.exec(file)) !== null) { 
            let itemSize = matchFLEX[1],
                itemClass = matchFLEX[2],                
                itemStyle = '',
                content = matchFLEX[3]
            
            if (itemSize > 10) { itemStyle = ` style="flex-basis:${itemSize}px"` } else { itemClass += ' flex-' + itemSize }

            let matchNext, itemsStr = ''
            while (matchNext = /([\s\S]+?)={10,}\s(\d{1,4})([a-z-]*)[\r\n]/.exec(content)){                
                content = content.replace(matchNext[0], '')
                itemsStr += `\n<div class="box-flex-item ${itemClass}"${itemStyle}>\n${matchNext[1]}\n</div>`

                itemSize = matchNext[2],
                itemClass = matchNext[3],                    
                itemStyle = ''
                if (itemSize > 10) { itemStyle = ` style="flex-basis:${itemSize}px"` } else { itemClass += ' flex-' + itemSize }                
            }
            
            itemsStr += `\n<div class="box-flex-item ${itemClass}"${itemStyle}>\n${content}\n</div>`
            file = file.replace(matchFLEX[0], `<div class="box-flex">${itemsStr}\n</div>`)            
        }        

        // PlantUML图形
        let matchUML        
        while ((matchUML = /```plantuml[\w\W]+?```/.exec(file)) !== null) {     
            const {name} = handleUML(matchUML[0])
            file = file.replace(matchUML[0], `<img :src="$withBase('/uml/${name}.png')">`)         
        }

        file = parseEnd(file)

        staticContent += `${file}\n`
    }
    
    content = `---\npageClass: theme-item\n---\n<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>M ${modifyData}</span>
        </div>
    </div>
    <div class="content">${childrenContent}${linksContent}</div>
</div>
${contentHeader}
<div class="static-content">
${staticContent}
</div>`                 
    writeFile(ABSOLUTE_PATH + '.md', content)
}