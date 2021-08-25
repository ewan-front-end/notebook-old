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

    block = block.replace(/\{\{/g, `<img :src="$withBase('/images/db-brace-left.png')">`)  
    block = block.replace(/\}\}/g, `<img :src="$withBase('/images/db-brace-right.png')">`)
     
    // - Markdown点列表
    while (/^\s*(-\s([^\n\r]+))/m.exec(block) !== null) {block = block.replace(RegExp.$1, `<span>● ${RegExp.$2}</span>`)} 
    // Markdown**局部加粗**
    while (/(\*\*([0-9a-zA-Z\u4e00-\u9fa5_-]+)\*\*)/.exec(block) !== null) {block = block.replace(RegExp.$1, `<strong>${RegExp.$2}</strong>`)}

    // 盒子：■⇤{}()content■
    while (/(\x20*)(■(⇤?)(\([\w\s-]+\))?(\{[\w\s-;:'"#]+\})?(\([\w\s-]+\))?(\x20*[\r\n]+)?([\s\S]+?)■)/.exec(block) !== null) {
        const $INDENT = RegExp.$1, $FORMAT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CLASS = RegExp.$4 || RegExp.$6, $STYLE = RegExp.$5, $CONTENT = RegExp.$8
        let str = ''
        console.log('---',$CONTENT);
        $CLASS && (str += ` class=${$CLASS.replace('(','"').replace(')','"')}`)
        $STYLE && (str += ` style=${$STYLE.replace('{','"').replace('}','"')}`)
        block = block.replace($FORMAT, `<div${str}>${$CONTENT}</div>`)
    }

    // 标题：# Title Text{color:red}    #个数(1-6)代表尺寸 [#] 反相标题  [] 可增加空格为标题作内边距
    while (/^\x20*((\[?)(#{1,6})\]?\s([^\n\r\{]+)(\{([\w\s-;:'"#]+)\})?)/m.exec(block) !== null) {
        const $FORMAT = RegExp.$1, $NVERT = RegExp.$2, $LEVEL = RegExp.$3, $CONTENT = RegExp.$4, $STYLE = RegExp.$6        
        let classStr = `h${$LEVEL.length}`
        $NVERT && (classStr += ' bg3 cf')
        let str = `class="${classStr}"`, content = $CONTENT
        if ($STYLE) {
            str += ` style="${$STYLE}"`
            content = content.replace(/\{([\w\s-;:'"#]+)\}/, '')
        }        
        block = block.replace($FORMAT, `<span ${str}>${content}</span>`)
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
    const matchImage = block.match(/\[img:(.+?)\]/g) || [];
    matchImage.forEach(e => {
        const m = e.match(/\[img:(.+)?\]/)
        block = block.replace(e, `<img :src="${m[1]}">`)
    })

    // ↧Headers
    const matchDown = block.match(/↧.?\b([\w-]+)\b/g) || [];
    matchDown.forEach(e => {
        const word = e.replace('↧', '')
        block = block.replace(e, `<span class="cc">${word}</span>`)
    })
    // ↥Body
    const matchUp = block.match(/↥.?\b([\w-]+)\b/g) || [];
    matchUp.forEach(e => {
        const word = e.replace('↥', '')
        block = block.replace(e, `<strong class="c0">${word}</strong>`)
    })      

    // 表单元素[FORM_START][FORM_END] 
    // [FORM_START|vtop]
    const matchForm = block.match(/\s*\[FORM_START\][\s\S]+?\[FORM_END\]\s*[\r\n]+/g) || [];
    matchForm.forEach(e => {
        let content = e.replace(/\s*\[FORM_START\]\s*[\r\n]+/, '').replace(/\s*\[FORM_END\]/, '') 
        // ↴classname ↤ ↦
        while (/(↴([\w\s-;:'"#]+[\w'";])?([\s\S]*)↤([\s\S]+)↦)/.exec(content) !== null) {
            const $ALL = RegExp.$1, $STYLE = RegExp.$2, $CONTENT = RegExp.$4
            content = content.replace($ALL, `<span class="inline" style="${$STYLE}">${$CONTENT}</span>`)
        }    
        
        // INPUT:▭{}()value▭
        while (/(▭(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(.+?)▭)/.exec(content) !== null) {
            const $ALL = RegExp.$1, $STYLE = RegExp.$5, $CLASS = RegExp.$3 || RegExp.$7 || '', $VALUE = RegExp.$8, styleStr = $STYLE ? ` style="${$STYLE}"` : ''
            content = content.replace($ALL, `<span class="input ${$CLASS}"${styleStr}>${$VALUE}</span>`)
        }
        // [BTN|正常置灰] [BTN>主题激活] [BTNbg3 cf|自定义类]
        while (/(\[BTN([\w\s-]*)([\>\|]|&gt;)(.+?)\])/.exec(content) !== null) { 
            const $ALL = RegExp.$1, $CLASS = RegExp.$2, $TYPE = RegExp.$3, $VAL = RegExp.$4
            let classStr = 'button'
            $CLASS && (classStr = 'button ' + $CLASS)
            $TYPE === '&gt;' && (classStr = 'button active')
            content = content.replace($ALL, `<span class="${classStr}">${$VAL}</span>`)
        }
        
        // 选项卡：▥⇤Params  Authorization  [Headers]  Body  Pre-request Script  Tests  Settings▥  
        while (/((\x20*)▥(⇤?)(.+?)▥)/.exec(content) !== null) {
            const $FORMAT = RegExp.$1, $INDENT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CONTENT = RegExp.$4 
            let html = ''         
            $CONTENT.split(/\x20{2,}/).forEach(item => { html += item.indexOf('[') > -1 ? item.replace('[', '<strong>').replace(']', '</strong>') : `<i>${item}</i>` })
            html = $SET_FLUSH ? `<span class="tab">${html}</span>` : `${$INDENT}<span class="tab">${html}</span>`
            content = content.replace($FORMAT, html) 
        }  
        // 单选框：◉⇤none  form-data  [x-www-form-urlencoded]  raw  binary  GraphQL◉
        while (/((\x20*)◉(⇤?)(.+?)◉)/.exec(content) !== null) {
            const $FORMAT = RegExp.$1, $INDENT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CONTENT = RegExp.$4 
            let html = ''         
            $CONTENT.split(/\x20{2,}/).forEach(item => { html += item.indexOf('[') > -1 ? item.replace('[', '<strong>').replace(']', '</strong>') : `<i>${item}</i>` })
            html = $SET_FLUSH ? `<span class="radio">${html}</span>` : `${$INDENT}<span class="radio">${html}</span>`
            content = content.replace($FORMAT, html) 
        } 
        // 单选框：▣⇤none  [form-data]  x-www-form-urlencoded  raw  [binary]  GraphQL▣
        while (/((\x20*)▣(⇤?)(.+?)▣)/.exec(content) !== null) {
            const $FORMAT = RegExp.$1, $INDENT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CONTENT = RegExp.$4 
            let html = ''         
            $CONTENT.split(/\x20{2,}/).forEach(item => { html += item.indexOf('[') > -1 ? item.replace('[', '<strong>').replace(']', '</strong>') : `<i>${item}</i>` })
            html = $SET_FLUSH ? `<span class="checkbox">${html}</span>` : `${$INDENT}<span class="checkbox">${html}</span>`
            content = content.replace($FORMAT, html) 
        } 
        
        // ▼collection-name{color:#f11}(bd)▼   
        // ▼{}()选项一{}()  选项二▼
        let drapdownMatch
        while ((drapdownMatch = /▼(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(.+?)▼/.exec(content)) !== null) {
            const $ALL = drapdownMatch[0], $WRAPPER_STYLE = drapdownMatch[4], $WRAPPER_CLASS = drapdownMatch[2] || drapdownMatch[6], $CONTENT = drapdownMatch[7] 
            let optionsStr = ''
            $CONTENT.split('  ').forEach(option => {
                const m = option.match(/([\w\s\u4e00-\u9fa5-]+)(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?/), $OPTION_TEXT = m[1], $OPTION_CLASS = m[3] || m[7] || '', $OPTION_STYLE = m[5] || ''
                let str = ''
                $OPTION_CLASS && (str += ` class="${$OPTION_CLASS}"`)
                $OPTION_STYLE && (str += ` style="${$OPTION_STYLE}"`)
                optionsStr += `<i${str}>${$OPTION_TEXT}</i>`
            })
            content = content.replace($ALL, `<span class="drop-down">${optionsStr}</span>`)
        }
         
        // ▤{color:#ccc}(bd)目录名称一{}()[子类名称{}(),子类名称{}()]  目录名称二▤
        // ▤菜单名称▤
        let listMatch
        while ((listMatch = /▤(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(.+?)▤/.exec(content)) !== null) {        
            const $ALL = listMatch[0], $WRAPPER_STYLE = listMatch[4], $WRAPPER_CLASS = listMatch[2] || listMatch[6], $CONTENT = listMatch[7] 
            let styleStr = '', className = 'list', html = ''

            $WRAPPER_STYLE && (styleStr = ` style="${$WRAPPER_STYLE}"`)
            $WRAPPER_CLASS && (className += ' ' + $WRAPPER_CLASS)
            $CONTENT.split(/\s{2,}/).forEach(item => {                
                const m = item.match(/([\w\s\u4e00-\u9fa5-]+)(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(\[(.+?)\])?/), $ITEM_TEXT = m[1], $ITEM_CLASS = m[3] || m[7] || '', $ITEM_STYLE = m[5] || '', $ITEM_SUB = m[9]
                let itemClassName = 'item-title', itemStyleStr = ''
                $ITEM_CLASS && (itemClassName += ' ' + $ITEM_CLASS)
                $ITEM_STYLE && (itemStyleStr = ` style="${$ITEM_STYLE}"`)
                let itemStr = `<span class="${itemClassName}"${itemStyleStr}>${$ITEM_TEXT}</span>`
                if ($ITEM_SUB) {  
                    let childrenStr = ''                  
                    $ITEM_SUB.split(',').forEach((e, i) => {
                        const m2 = e.match(/([\w\u4e00-\u9fa5-]+)(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?/), $SUB_TEXT = m2[1], $SUB_CLASS = m2[3] || m2[7] || '', $SUB_STYLE = m2[5] || ''
                        let str = '' 
                        $SUB_STYLE && (str += ` style="${$STYLE}"`)
                        $SUB_CLASS && (str += ` class="${$SUB_CLASS}"`)
                        childrenStr += `<i${str}>${$SUB_TEXT}</i>`                        
                    })
                    itemStr += `<span class="sub-box">${childrenStr}</span>`
                }
                html += `<span class="list-item">${itemStr}</span>`
            })
            content = content.replace($ALL, `<span class="${className}"${styleStr}><div class="list-wrapper">${html}</div></span>`)
        }
        /** 
         * 表格
         * ▦⇤VARIABLE(变量){color:26f}  INITIAL VALUE(初始值)  CURRENT VALUE(当前值)
         *     API{color:26f}  https://api.com:4432  https://api.com:4432
         * ▦
         */
        while (/((\x20*)▦(⇤?)([\s\S]+?)[\r\n]+\x20*▦)/.exec(content) !== null) {
            const $FORMAT = RegExp.$1, $INDENT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CONTENT = RegExp.$4            
            let tableHtml = ''
            const lines = $CONTENT.split(/\x20*[\r\n]+\x20*/)
            const header = lines.splice(0, 1)[0].split(/\s{2,}/)
            const colArr = [], colsNum = header.length
            header.forEach(tit => { 
                let hasStyle = tit.match(/\{([\w\s-;:'"#]+)\}/), styleStr = ''
                if (hasStyle) {
                    styleStr = ` style="${hasStyle[1]}"`
                    tit = tit.replace(/\{([\w\s-;:'"#]+)\}/, '')
                }
                colArr.push(`<strong>${tit}</strong>`) 
            })
            lines.forEach(line => {
                const valArr = line.split(/\s{2,}/)
                for (let i = 0; i < colsNum; i++){
                    let val = valArr[i] || '', hasStyle = val.match(/\{([\w\s-;:'"#]+)\}/), styleStr = ''                    
                    if (hasStyle) {
                        styleStr = ` style="${hasStyle[1]}"`
                        val = val.replace(/\{([\w\s-;:'"#]+)\}/, '')
                    }                  
                    colArr[i] += `<i${styleStr}>${val}</i>`
                }
            })
            colArr.forEach(col => {
                tableHtml += `<span class="col">${col}</span>`
            })            
            content = content.replace($FORMAT, `<span class="table">${tableHtml}</span>`) 
        }

        block = block.replace(e, `<div class="form-elements">${content}</div>`)
    })

    // STYLE&CLASS:[{color:#f00}(bd)text content]
    // STYLE=\{([\w\s-;:'"#]+)\} CLASS=\(([\w\s-]+)\) 内容=.+?
    // ((STYLE)|(CLASS)){1,2}(内容)
    const styleClassMatch = block.match(/\[((\{[\w\s-;:'"#]+\})|(\([\w\s-]+\))){1,2}.+?\]/g) || []
    styleClassMatch.forEach(e => {
        const m = e.match(/\[(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(.+?)\]/), $STYLE = m[4] || '', $CLASS = m[2] || m[6] || '', $CONTENT = m[7]
        let str = ''
        $STYLE && (str += ` style="${$STYLE}"`)
        $CLASS && (str += ` class="${$CLASS}"`)
        block = block.replace(e, `<span${str}>${$CONTENT}</span>`)
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