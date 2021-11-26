const {fetch} = require('../../config')
const Search = fetch('PARSE|search')
const {nameRegExpParse} = fetch('UTILS|regexp')

const REG_STYLE = {STYLE: `(\\{[\\w\\s-;:'"#]+\\})?`} // color: #f00; font-size: 14px
const REG_CLASS = {CLASS: `(\\([\\w\\s-]+\\))?`}      // bd sz-16 c-0

let TAG_MAP_BLOCK = {}, blockCount = 0

function parseCustomBlock(block, path) {
    block = block.replace(/\</g, "&lt;").replace(/\>/g, "&gt;")

    ////////////////////////////////// 不会再有嵌套的格式优先解析，避免匹配到多余的其它格式的字符
    /**
     * 行注释
     * 多匹配一个前置空格 替换时空格移到标签 防止被全等注释二次替换
     * 如：// 注释 // 注释  解析成：
     * 错误：<span class="comment"><span class="comment"> // 注释</span></span> // 注释
     * 正确： <span class="comment">// 注释</span></span> <span class="comment">// 注释</span></span>
     */
    const matchComment = block.match(/\s\d?\/\/[^\n\r]+/g) || [];
    matchComment.forEach(e => {
        let colorClass = '', _e = e.trim(), firstWord = _e.substr(0,1)
        if (!isNaN(firstWord)) {_e = _e.replace(firstWord, ''); colorClass = ' color' + firstWord}
        block = block.replace(e, ` <span class="comment${colorClass}">${_e}</span>`)
    }) 
    // /* 注释 */
    const matchComment2 = block.match(/\d?\/\*[\s\S]*?\*\//g) || [];
    matchComment2.forEach(e => {
        let firstWord = e.substr(0,1), colorClass = '', _e = e
        if (!isNaN(firstWord)) {_e = _e.replace(firstWord, ''); colorClass = ' color' + firstWord}
        block = block.replace(e, `<span class="comment${colorClass}">${_e}</span>`)
    })

    ////////////////////////////////// Markdown格式   
    while (/(\[([^\]\r\n]+)\]\(([^\)\r\n]+)\))/.exec(block) !== null) { 
        block = block.replace(RegExp.$1, `<a href="${RegExp.$3}" target="_blank">${RegExp.$2}</a>`) 
    }

    // 模板符{{}}用图片表示
    block = block.replace(/\{\{/g, `<img :src="$withBase('/images/db-brace-left.png')">`)  
    block = block.replace(/\}\}/g, `<img :src="$withBase('/images/db-brace-right.png')">`)
    
    // - Markdown点列表
    while (/^\s*(-\s([^\n\r]+))/m.exec(block) !== null) {
        block = block.replace(RegExp.$1, `● <strong>${RegExp.$2}</strong>`);
        Search.add(path, RegExp.$2)
    } 

    // Markdown**局部加粗**
    while (/(\*\*([0-9a-zA-Z\u4e00-\u9fa5_-]+)\*\*)/.exec(block) !== null) {
        block = block.replace(RegExp.$1, `<strong>${RegExp.$2}</strong>`)
        Search.add(path, RegExp.$2)
    }

    // 命令行示意
    while (/^\x20*(([\w-\/]+)\&gt;)\s[^\r\n]+/m.exec(block) !== null) {
        block = block.replace(RegExp.$1, `<span class="block-command">${RegExp.$2}</span>`)
    }
    
    /**
     * Detail
     * .vuepress/theme/layouts/Layout.vue
        mounted () {    
            const $details = document.querySelectorAll('.block-detail')
            $details.forEach(dom => {
                dom.addEventListener('click', e => {
                    let tar = e.currentTarget
                    tar.className = tar.className === 'block-detail' ? 'block-detail active' : 'block-detail'
                })
            })
        }
     */
    const REG_DETAIL_STR = nameRegExpParse([        
        {DETAIL_FORMAT: [
            {DETAIL_INDENT: `\\x20*`},
            {TITLE: `.+`},
            `\\s▾\\s*[\\r\\n]`,
            {CONTENT_INDENT: `\\s*`},
            `↧`,
            {CONTENT: `[^↥]+`},
            `↥`
        ]}
    ])
    const REG_DETAIL = new RegExp(REG_DETAIL_STR.value) 
    let detailMatch
    while ((detailMatch = REG_DETAIL.exec(block)) !== null) {
        let {DETAIL_FORMAT, DETAIL_INDENT, TITLE, CONTENT_INDENT, CONTENT} =  detailMatch.groups
        block = block.replace(DETAIL_FORMAT, `<div class="block-detail">${DETAIL_INDENT}<span class="detail-desc">${TITLE}</span><div class="detail-content">${CONTENT_INDENT}<span>${CONTENT}</span></div></div>`)
    }

    /**
     * 标题
     * # TITLE TEXT
     * ## TITLE TEXT
     * ### TITLE TEXT
     * #### TITLE TEXT
     * ##### TITLE TEXT
     * ###### TITLE TEXT  
     * [####]{color:#fff}(bd) Title Text
     * 应用环境：独占一行
     */    
    const REG_TIT_STR = nameRegExpParse([
        `\\x20*`,                   // 0任意空格
        {FORMAT: [
            {INVERT: `\\[?`},       // 反相开始 [
            {LEVEL: `#{1,6}`},      // 标题字号 #-###### 
            `\\]?`,                 // 反相结束 ]
            REG_STYLE,              // 区配样式 {color: #fff} 
            REG_CLASS,              // 匹配类名 (bd)
            `\\s`,                  // 一个空格
            {TEXT: `[^\\n\\r\\{]+`} // 标题文本
        ]}
    ])
    const REG_TIT = new RegExp(REG_TIT_STR.value) 
    let titMatch
    while ((titMatch = REG_TIT.exec(block)) !== null) {   
        let {FORMAT, INVERT, LEVEL, STYLE, CLASS, TEXT} =  titMatch.groups    
        let classStr = `h${LEVEL.length}`
        if (INVERT) {
            classStr += ' bg3 cf'
            if (TEXT[0] !== ' ') TEXT = ' ' + TEXT
            if (TEXT[TEXT.length-1] !== ' ') TEXT = TEXT + ' '
        }
        CLASS && (classStr += ' ' + CLASS.replace('(', '').replace(')', ''))
        let str = `class="${classStr}"`, content = TEXT
        STYLE && (str += ` style="${STYLE.replace('{', '').replace('}', '')}"`)
        block = block.replace(FORMAT, `<span ${str}>${TEXT}</span>`)
        Search.add(path, TEXT)
    }
    
    
    

    // [img:$withBase('/images/左移位运算符.jpg')]
    const matchImage = block.match(/\[img:(.+?)\]/g) || [];
    matchImage.forEach(e => {
        const m = e.match(/\[img:(.+)?\]/)
        block = block.replace(e, `<img :src="${m[1]}">`)
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

    /**
     * 行样式：[2,17{color:#f00}(bd)  19,13{color:#0f0}(bd)]  适合于单行点缀
     * $1：$ALL=(FORMAT$SPACE$CONTENT)  FORMAT=\x20*\[SCOPES\]\x20*[\r\n]+  
     * $2：$SCOPES = ((SCOPE)+)  SCOPE =\x20*\d+,\d+((\{[\w\x20-;:'"#]+\})|(\([\w\x20-]+\))){1,2}
     * $7：$SPACE=(\x20*)
     * $8：$CONTENT=(.+)
     */
     while(block.match(/(\x20*\[((\x20*\d+,\d+((\{[\w\x20-;:'"#]+\})|(\([\w\x20-]+\))){1,2})+)\]\x20*[\r\n]+(\x20*)(.+))/)){
         const $ALL = RegExp.$1, $SCOPES = RegExp.$2, $SPACE = RegExp.$7
         let content = RegExp.$8
         $SCOPES.split(/\x20{2,}/).map(scope => scope.match(/(\d+),(\d+)(.+)/)).sort((a,b) => b[1] - a[1]).forEach(arr => {
            const s = arr[1], l = arr[2], styleMatch = arr[3].match(/\{([\w\x20-;:'"#]+)\}/), classMatch = arr[3].match(/\(([\w\x20-]+)\)/)
            let styleStr = '', classStr = '' 
            styleMatch && (styleStr = ` style="${styleMatch[1]}"`)
            classMatch && (classStr = ` class="${classMatch[1]}"`)
            content = content.replaceAt(s, l, `<span${styleStr}${classStr}>${content.substr(s, l)}</span>`)
         })
         block = block.replace($ALL, $SPACE + content)
     }     

    /**
     * 盒样式：[{color:#f00}(bd)CONTENT] 适合单行行内点缀
     * 匹配 STYLE=\{([\w\s-;:'"#]+)\} CLASS=\(([\w\s-]+)\) 内容=.+?
     * 匹配 ((STYLE)|(CLASS)){1,2}(内容)
     */
    const boxStyleMatch = block.match(/\[((\{[\w\s-;:'"#]+\})|(\([\w\s-]+\))){1,2}.+?\]/g) || []
    boxStyleMatch.forEach(e => {
        const m = e.match(/\[(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(.+?)\]/), $STYLE = m[4] || '', $CLASS = m[2] || m[6] || '', $CONTENT = m[7]
        let str = ''
        $STYLE && (str += ` style="${$STYLE}"`)
        $CLASS && (str += ` class="${$CLASS}"`)
        block = block.replace(e, `<span${str}>${$CONTENT}</span>`)
    }) 

    // 盒子：■⇤{}()content■
    while (/(\x20*)(■(⇤?)(\([\w\s-]+\))?(\{[\w\s-;:'"#]+\})?(\([\w\s-]+\))?(\x20*[\r\n]+)?([\s\S]+?)■)/.exec(block) !== null) {
        const $INDENT = RegExp.$1, $FORMAT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CLASS = RegExp.$4 || RegExp.$6, $STYLE = RegExp.$5, $CONTENT = RegExp.$8
        let str = ''        
        $CLASS && (str += ` class=${$CLASS.replace('(','"').replace(')','"')}`)
        $STYLE && (str += ` style=${$STYLE.replace('{','"').replace('}','"')}`)
        block = block.replace($FORMAT, `<div${str}>${$CONTENT}</div>`)
    }

    block = block.replace('===+', '\n<pre class="code-block">').replace('===-', '</pre>')

    blockCount++
    const CUSTOM_BLOCK_NAME = 'CUSTOM_BLOCK_' + blockCount + 'A'
    TAG_MAP_BLOCK[CUSTOM_BLOCK_NAME] = block

    return CUSTOM_BLOCK_NAME
}

module.exports = {
    start(code, path){
        const matchCustomBlock = code.match(/===\+[\s\S]+?===\-/g) || []
        matchCustomBlock.forEach((block) => {
            code = code.replace(block, parseCustomBlock(block, path))
        })
        return code
    },
    end(code){
        for (let key in TAG_MAP_BLOCK) {
            code = code.replace(key, TAG_MAP_BLOCK[key])
        } 
        Search.save()       
        return code
    }
}
