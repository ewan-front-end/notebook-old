const fs = require('fs')
const {writeFile} = require('./src/tools-fs')
const _path = require('path')

module.exports = (path, target) => {
    let content
    let childrenContent = '' // 子类链接
    let linksContent = ''    // 相关链接
    let topicContent = ''
    let contentHeader = ''
    let staticContent = ''      // 静态资源
    if(target.CHILDREN) {
        let listStr = ''
        for (i in target.CHILDREN){
            let {linkName, path} = target.CHILDREN[i]
            listStr += `<li><a href="${path}">${linkName}</a></li>\n`
        } 
        childrenContent += `<div class="custom-block children">\n<ul>\n${listStr}</ul>\n</div>`
    }
    if(target.links) {        
        if (Object.prototype.toString.call(target.links) !== "[object Array]") console.error(target.links, '非数组类型')
        let listStr = ''
        target.links.forEach(({name, href}) => {
            listStr += `<li><a href="${href}">${name}</a></li>\n`
        })  
        linksContent += `<div class="custom-block links">\n<ul class="desc">\n${listStr}</ul>\n</div>`
    }
    if (target.title || target.desc || target.detail) {
        const titleStr = target.title ? `<h1>${target.title}</h1>\n` : ''
        const descStr = target.desc ? `<summary class="desc">${target.desc}</summary>\n` : ''
        const detailStr = target.detail ? `<detail>${target.detail}</detail>\n` : ''
        contentHeader += `<div class="content-header">\n${titleStr}${descStr}${detailStr}</div>`
    }
    // target.title  && (content += `# ${target.title}\n`)  
    // target.desc   && (content += `> ${target.desc}\n`)
    // target.detail && (content += `${target.detail}\n`) 
    if (target.SRC) {
        const file = fs.readFileSync(_path.resolve(__dirname, './resources/md/'+target.SRC+'.md'), 'utf8')
        staticContent += `\n${file}\n`
    }

    content = `<div class="extend-header">
<div class="info">
<a class="back" href="./">上一级</a>
<div class="mini">
<span>2021.01.02</span>
</div>
</div>
<div class="content">
${childrenContent}
${linksContent}
${topicContent}</div>\n</div>
${contentHeader}

${staticContent}`
                
    writeFile(path, content)
}