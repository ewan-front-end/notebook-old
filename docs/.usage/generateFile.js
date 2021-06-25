const fs = require('fs')
const {writeFile} = require('./src/tools-fs')
const _path = require('path')

module.exports = (ABSOLUTE_PATH, target) => {
    let content
    let childrenContent = '' // 子类链接
    let linksContent = ''    // 相关链接
    let topicContent = ''
    let contentHeader = ''
    let staticContent = ''      // 静态资源
    let modifyData = '0000.00.00'
    
    if(target.children) {
        let listStr = ''
        for (i in target.children){
            let {linkName, path} = target.children[i]
            listStr += `<li><a href="${path}">${linkName}</a></li>`
        } 
        childrenContent += `<div class="custom-block children"><ul>${listStr}</ul></div>`
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
    if (target.src) {
        let file = fs.readFileSync(_path.resolve(__dirname, './resources/md/'+target.src+'.md'), 'utf8')
        let date = file.match(/:::(\d{4}\.\d{2}\.\d{2}):::/) 
        if (date) {
            modifyData = date[1]
            file = file.replace(date[0]+'\n\n', '')
            file = file.replace(date[0]+'\n', '')
            file = file.replace(date[0], '')
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
    <div class="content">${childrenContent}${linksContent}${topicContent}</div>
</div>
${contentHeader}

${staticContent}`          
   
    
                
    writeFile(ABSOLUTE_PATH + '.md', content)
}