const {writeFile, readFile} = require('../tools-fs.js')
const PATH = require('path')

const DATA_CONFIG = require('../data2/config')
const SRC_UPDATETIME = require(DATA_CONFIG["src:updateTime"])
const PATH_DATA = require(DATA_CONFIG["path:data"])
const parseCode = require('./create-file-parse.js')

module.exports = (ABSOLUTE_PATH, target, path) => {
    let content
    let childrenContent = '' // 主题子类 
    let linksContent = ''    // 主题链接
    let contentHeader = ''   // 主题标题、说明、详情
    let staticContent = ''   // 资源静态内容
    let date = new Date()
    let modifyData = 'N ' + date.toJSON().slice(0, 10).replace(/-/g, '.') + ' ' + date.toString().match(/(\d{2}\:\d{2})\:\d{2}/)[1] // 创建或更新时间

    // 主题子类
    if(target.children) childrenContent = `<div class="custom-block children"><ul>${target.children.map(p => `<li><a href="${p}">${PATH_DATA[p].title}</a></li>`).join('')}</ul></div>`   
    // 主题链接
    if(target.links) linksContent = `<div class="custom-block links">\n<ul class="desc">\n${target.links.map(({name, href}) => `<li><a href="${href}">${name}</a></li>\n`).join('')}</ul>\n</div>`    
    // 主题标题、说明、详情    
    if (target.title || target.desc || target.detail) {
        const titleStr = target.title ? `<h1>${target.title}</h1><strong>${target.title}</strong>\n` : ''
        const descStr = target.desc ? `<summary class="desc">${target.desc}</summary>\n` : ''
        const detailStr = target.detail ? `<detail>${target.detail}</detail>\n` : ''
        contentHeader += `<div class="content-header">\n${titleStr}${descStr}${detailStr}</div>`
    }
    // 资源静态内容
    if (target.src) {
        let file = readFile(PATH.resolve(__dirname, '../resources/md/'+target.src+'.md'))
        
        file = parseCode(file, path) // 解析代码
        
        SRC_UPDATETIME[target.src] && (modifyData = 'M ' + SRC_UPDATETIME[target.src]) 

        staticContent += `${file}\n`
    }
    
    content = `---\npageClass: theme-item\n---\n<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>${modifyData}</span>
        </div>
    </div>
    <div class="content">${childrenContent}${linksContent}</div>
</div>
${contentHeader}
<div class="static-content">
\n${staticContent}
</div>`                 
    writeFile(ABSOLUTE_PATH + '.md', content)
}