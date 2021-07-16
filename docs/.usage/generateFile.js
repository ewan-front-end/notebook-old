const {writeFile, readFile} = require('./src/tools-fs')
const _path = require('path')
const {RES_MAP_PATH} = require('./data/resMapPath.js')
const handleUML = require('./src/handleUML')
const {parseStyle} = require('./src/parseCode')

module.exports = (ABSOLUTE_PATH, target) => {
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
        let file = readFile(_path.resolve(__dirname, './resources/md/'+target.src+'.md'))
        // 解析自定义样式
        file = parseStyle(file)

        if (RES_MAP_PATH[target.src]) modifyData = RES_MAP_PATH[target.src].updateTime

        // 自定义格式 :::FLEX +++ 1 +++ FLEX:::
        let matchFLEX
        while ((matchFLEX = /\:\:\:FLEX([\s\S]+?)FLEX\:\:\:/.exec(file)) !== null) {  
            let content = matchFLEX[1], matchItem
            while ((matchItem = /\+\+\+ (\d{1,2})([\s\S]*?)\+\+\+/.exec(content)) !== null) { content = content.replace(matchItem[0], `<div class="box-flex-item flex-${matchItem[1]}">\n${matchItem[2]}\n</div>`) }
            file = file.replace(matchFLEX[0], `<div class="box-flex">${content}</div>`)            
        }        

        // PlantUML图形
        let matchUML        
        while ((matchUML = /```plantuml[\w\W]+?```/.exec(file)) !== null) {     
            const {name} = handleUML(matchUML[0])
            file = file.replace(matchUML[0], `<img :src="$withBase('/uml/${name}.png')">`)         
        }

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