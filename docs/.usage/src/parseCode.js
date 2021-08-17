const commonLinks = require('../data/commonLinks')
const TAG_MAP_BLOCK = {}
let blockCount = 0

String.prototype.replaceAt=function(scope, replacement) {
    if (scope[0] > this.length) return this
    return this.substr(0, scope[0]) + replacement + this.substr(scope[0] + scope[1]);
}

function parseStyle(code){ 
    let styleContent = styleBlock[1].match(/^\d.+/mg)
    let scope = styleBlock[2] * 1 || 10 
    //console.log(styleContent);           
    
    code = code.replace(styleBlock[0], 'STYLEBLOCK\n')
    
    let content = code.match(new RegExp(`STYLEBLOCK\n((^.*[\n\r\u2028\u2029]{1,2}){1,${scope}})`, 'm'))
    //console.log(content);
    if (!content) return code

    let contentLine = content[1].match(/^.*[\r\n]{1,2}/gm)
    console.log('contentLine', contentLine, contentLine.length, scope);

    const parseLine = str => {
        let arr = str.split('/')
        return arr
    }
    const parseIndex = index => eval(index.replace('-', ','))
    const parseStyle = str => {
        let style = ''
        str.split(' ').forEach(e => {
            if (e === 'bold') style += 'font-weight:bold;'
            if (e.match(/^C\w{3,6}/)) style += `color:${e.replace('C','#')};`
            if (e.match(/^B\w{3,6}/)) style += `background-color:${e.replace('B','#')};`
        })
        return style
    }
    const handleCodeStyle = (line, index, style) => {            
        style = parseStyle(style)
        index = parseIndex(index)
        const lineArr =  parseLine(line)
        lineArr.forEach(i => {
            let line = contentLine[i]
            let subStr = line.slice(index[0], index[1])
            contentLine[i] = line.replaceAt(index, `<span style="${style}">${subStr}</span>`)
        })
    }
    
    styleContent.forEach(e => {
        let info = e.match(/(\d{1,2}([\/-]\d{1,2})*)(\[\d{1,2}-\d{1,2}(\|\d{1,2}-\d{1,2})*\])*\(([\w ]+)\)/)
        
        // 行： 1/2/3     索引： [14-19|20-25]     样式： bold Cf00 18PX B0f0            
        handleCodeStyle(info[1], info[3], info[5])
    })
    //console.log(contentLine);
    let newContent = contentLine.join('')

    code = code.replace(content[0], newContent)
    
    return code
}
function parseAnchor(code, filePath){
    let matchAnchor
    while ((matchAnchor = /ANCHOR\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
        //console.log('====', matchAnchor[1], matchAnchor[2]);
        code = code.replace(matchAnchor[0], `<div class="anchor" name="${matchAnchor[1]}" id="${matchAnchor[1]}"></div>\n`) 
        commonLinks.addAnchor(matchAnchor[1], matchAnchor[2], filePath)
    }
    commonLinks.save()
    return code
}
function parseTitle(code, filePath){
    let m
    while ((m = /TITLE([1-6])\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
        console.log(m[1], m[2], m[3]);
        code = code.replace(m[0], `<h${m[1]} id="${m[2]}">${m[3]}</h${m[1]}>`) 
        commonLinks.addAnchor(m[1], m[2], filePath)
    }
    commonLinks.save()
    return code
}
function parseLink(code){
    let m
    while ((m = /LINK\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
        let linkObj = commonLinks.read(m[1])
        let name = m[2] || linkObj.name
        let path = ''
        linkObj.path && (path = linkObj.path + '.html')
        console.log('**',linkObj);
        code = code.replace(m[0], `<a href="${path}#${m[1]}">${name}</a>`)      
    }        
    return code
}

// 处理自定义块
function parseCustomBlock(block) {
    block = block.replace(/\</g, "&lt;").replace(/\>/g, "&gt;")

    /*
    [STYLE_START]                            // 样式描述开始
    1[2-4](bold red)                         // 行1 索引(2-4)   class
    1/2/3[10-15]{color:#f00}                 // 行1、2、3 索引(10-15) style
    [STYLE_END]                              // 样式描述结束
     */
    let styleBlock   
    while ((styleBlock = /\[STYLE_START\]\s*[\r\n]+([\s\S]+?)\s*[\r\n]+\s*\[STYLE_END\]/.exec(block)) !== null) {
        block = block.replace(styleBlock[0], 'STYLE_BLOCK') 
        let maxLineNum = 0
        const styleStrArr = styleBlock[1].trim().split(/\s*[\r\n]+\s*/)
        const styleObjArr = styleStrArr.map(e => {
            let m = e.match(/(\d+((\/\d+)*)?)\[(\d+)-(\d+)\]((\([\w\s-]+\))|(\{[\w\s-:#;]+\}))/)
            let line = m[1].split('/')
            line.forEach(item => { maxLineNum = Math.max(maxLineNum, item) })
            return {line, index: [m[4], m[5]], style: m[6]}
        })
        // 截取要格式化的内容
        const content = block.match(new RegExp(`STYLE_BLOCK\s*[\r\n]+((^.*[\n\r\u2028\u2029]+){4})`, 'm'))
        const contentArr = content[1].split(/[\r\n]/)
        //console.log(content);
        console.log(contentArr);
    } 
     
    // - Markdown点列表
    while (/^\s*(-\s([^\n\r]+))/m.exec(block) !== null) {block = block.replace(RegExp.$1, `<span>● ${RegExp.$2}</span>`)} 
    // Markdown**局部加粗**
    while (/(\*\*([0-9a-zA-Z\u4e00-\u9fa5_-]+)\*\*)/.exec(block) !== null) {block = block.replace(RegExp.$1, `<strong>${RegExp.$2}</strong>`)}

    // # 标题文本    #个数(1-6)代表尺寸
    // [#] 反相标题  [] 可增加空格为标题作内边距
    while (/^\s*((\[?)(#{1,6})\]?\s([^\n\r]+))/m.exec(block) !== null) {
        const bg = RegExp.$2 ? ' bgc3 cf' : ''
        block = block.replace(RegExp.$1, `<span class="h${RegExp.$3.length}${bg}">${RegExp.$4}</span>`)
    }
    // * 行加粗 会和多行注释相冲突
    //while (/^\s*(\*\s([^\n\r]+))/m.exec(block) !== null) {block = block.replace(RegExp.$1, `<strong>${RegExp.$2}</strong>`)} 
    
    // // 注释
    const matchComment = block.match(/\s\d?\/\/[^\n\r]+/g) || [];
    matchComment.forEach(e => {
        let firstWord = e.substr(1,1), colorClass = '', _e = e
        if (!isNaN(firstWord)) {_e = _e.replace(firstWord, ''); colorClass = ' color' + firstWord}
        block = block.replace(e, `<span class="comment${colorClass}">${_e}</span>`)
    })
    // /* 注释 */
    const matchComment2 = block.match(/\d?\/\*[\s\S]*?\*\//g) || [];
    matchComment2.forEach(e => {
        let firstWord = e.substr(0,1), colorClass = '', _e = e
        if (!isNaN(firstWord)) {_e = _e.replace(firstWord, ''); colorClass = ' color' + firstWord}
        block = block.replace(e, `<span class="comment${colorClass}">${_e}</span>`)
    })
    // [img:$withBase('/images/左移位运算符.jpg')]
    const matchImage = block.match(/\[img:(.+)?\]/g) || [];
    matchImage.forEach(e => {
        const m = e.match(/\[img:(.+)?\]/)
        block = block.replace(e, `<img :src="${m[1]}">`)
    })

    block = block.replace('===+', '\n<pre class="code-block">').replace('===-', '</pre>')

    blockCount++
    const CUSTOM_BLOCK_NAME = 'CUSTOM_BLOCK_' + blockCount
    TAG_MAP_BLOCK[CUSTOM_BLOCK_NAME] = block

    return CUSTOM_BLOCK_NAME   
}
module.exports = {
    parseStart(code, PATH){
        // 代码块
        const matchCustomBlock = code.match(/===\+[\s\S]+?===\-/g) || []
        matchCustomBlock.forEach((block) => {code = code.replace(block, parseCustomBlock(block))})

        // 解析自定义样式
        //code = parseStyle(code)
        // 通用链接
        code = parseAnchor(code, PATH) // 锚点
        code = parseTitle(code, PATH)  // 标题
        code = parseLink(code)
        
        return code        
    },
    parseEnd(code){
        for (let key in TAG_MAP_BLOCK) {
            code = code.replace(key, TAG_MAP_BLOCK[key])
        }        
        return code
    }

}
//<h2 id="node插件开发"> node插件开发</h2>
//<a href="#node插件开发" class="header-anchor">#</a>