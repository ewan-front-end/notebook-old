const { fetch } = require('../../config')
const Search = fetch('PARSE|search')
const Aggregate = fetch('PARSE|aggregate')
const { regexpPresetParse, PRESET_CSS } = fetch('UTILS|regexp-preset')

let TAG_MAP_BLOCK = {}, blockCount = 0
const REG_STYLE_STR = `(\\{[\\w\\s-;:'"#]+\\})?` // color: #f00; font-size: 14px
const REG_CLASS_STR = `(\\([\\w\\s-]+\\))?`      // bd sz-16 c-0

function parseCustomBlock(block, path) {
    block = block.replace(/\</g, "&lt;").replace(/\>/g, "&gt;")
    
    // 聚合之采集
    block = Aggregate.pick(block, 'vuepress')
    
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

    // Markdown格式 [链接](#)、- 点列表、**局部加粗**   
    while (/(\[([^\]\r\n]+)\]\(([^\)\r\n]+)\))/.exec(block) !== null) { 
        block = block.replace(RegExp.$1, `<a href="${RegExp.$3}" target="_blank">${RegExp.$2}</a>`) 
    }
    while (/^\s*(-\s([^\n\r]+))/m.exec(block) !== null) {
        block = block.replace(RegExp.$1, `● <strong>${RegExp.$2}</strong>`);
        Search.add(path, RegExp.$2)
    }
    while (/(\*\*([0-9a-zA-Z\u4e00-\u9fa5_-]+)\*\*)/.exec(block) !== null) {
        block = block.replace(RegExp.$1, `<strong>${RegExp.$2}</strong>`)
        Search.add(path, RegExp.$2)
    } 

    // 模板符{{}}用图片表示
    block = block.replace(/\{\{/g, `<img :src="$withBase('/images/db-brace-left.png')">`)  
    block = block.replace(/\}\}/g, `<img :src="$withBase('/images/db-brace-right.png')">`)

    // 命令行示意
    while (/^\x20*(([\w-\/]+)\&gt;)\s[^\r\n]+/m.exec(block) !== null) {
        block = block.replace(RegExp.$1, `<span class="block-command">${RegExp.$2}</span>`)
    }

    /**
     * 点缀集
     * ▧content 1►text◄ 2►text◄▨
     */
    while (/(▧([^▨]+)▨)/.exec(block) !== null) {
        let format = RegExp.$1, content = RegExp.$2
        while (/((\d)►([^◄]+)◄)/.exec(content) !== null) {
            content = content.replace(RegExp.$1, `<i class="i${RegExp.$2}">${RegExp.$3}</i>`)
        }
        /(❶([^❶]+)❶)/.exec(content)
        content = content.replace(RegExp.$1, `<i class="order1">${RegExp.$2}</i>`);
        /(❷([^❷]+)❷)/.exec(content)
        content = content.replace(RegExp.$1, `<i class="order2">${RegExp.$2}</i>`);
        /(❸([^❸]+)❸)/.exec(content)
        content = content.replace(RegExp.$1, `<i class="order3">${RegExp.$2}</i>`);
        /(❹([^❹]+)❹)/.exec(content)
        content = content.replace(RegExp.$1, `<i class="order4">${RegExp.$2}</i>`);
        /(❺([^❺]+)❺)/.exec(content)
        content = content.replace(RegExp.$1, `<i class="order5">${RegExp.$2}</i>`);
        /(❻([^❻]+)❻)/.exec(content)
        content = content.replace(RegExp.$1, `<i class="order6">${RegExp.$2}</i>`);
        /(❼([^❼]+)❼)/.exec(content)
        content = content.replace(RegExp.$1, `<i class="order7">${RegExp.$2}</i>`);
        /(❽([^❽]+)❽)/.exec(content)
        content = content.replace(RegExp.$1, `<i class="order8">${RegExp.$2}</i>`);
        /(❾([^❾]+)❾)/.exec(content)
        content = content.replace(RegExp.$1, `<i class="order9">${RegExp.$2}</i>`);

        block = block.replace(format, `<span class="format-block">${content}</span>`)
    }    
    
    /**
     * Detail
     * 突出简介隐藏详情
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
    const REG_DETAIL_STR = regexpPresetParse([        
        {DETAIL_FORMAT: [{DETAIL_INDENT: `\\x20*`}, {TITLE: `.+`}, `\\s▾`, {STYLE: REG_STYLE_STR}, {COMMENT:`\\s*(.+)?`}, `[\\r\\n]`, {CONTENT_INDENT: `\\x20*`}, `↧`, {CONTENT: `[^↥]+`}, `↥`]}
    ])
    const REG_DETAIL = new RegExp(REG_DETAIL_STR.value) 
    let detailMatch
    while ((detailMatch = REG_DETAIL.exec(block)) !== null) {
        let {DETAIL_FORMAT, DETAIL_INDENT, TITLE, STYLE, COMMENT, CONTENT_INDENT, CONTENT} =  detailMatch.groups, descStyle = 'class="detail-desc"'
        if (STYLE) descStyle += ` style="${STYLE.replace('{', '').replace('}', '')}"`
        block = block.replace(DETAIL_FORMAT, `<div class="block-detail">${DETAIL_INDENT}<span ${descStyle}>${TITLE}</span>${COMMENT}<div class="detail-content">${CONTENT_INDENT}<span>${CONTENT}</span></div></div>`)
    }

    /**
     * 标题
     * # TITLE H1 12
     * ## TITLE H2 14
     * ### TITLE H3 16
     * #### TITLE H4 18
     * ##### TITLE H5 20
     * ###### TITLE H6 22  
     * [####]{color:#fff}(bd) TITLE INVERT
     * 应用环境：独占一行
     */    
    const REG_TIT_STR = regexpPresetParse([
        `\\x20*`,                   // 0任意空格
        {FORMAT: [
            {INVERT: `\\[?`},       // 反相开始 [
            {LEVEL: `#{1,6}`},      // 标题字号 #-###### 
            `\\]?`,                 // 反相结束 ]
            {STYLE: REG_STYLE_STR}, // 区配样式 {color: #fff} 
            {CLASS: REG_CLASS_STR}, // 匹配类名 (bd)
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
    
    
    

    // 图片 [img:$withBase('/images/左移位运算符.jpg')]
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

    // 行样式[{color:#f00}(bd)]
    const REG_LINE_STYLE_STR = regexpPresetParse([
        `^\\x20*`,           // 行缩进 
        {CONTENT_FORMAT: [
            {CONTENT: `.+`}, // 格式内容       
            {STYLE_FORMAT: [`\\[`, PRESET_CSS, `\\]`]}
        ]}
    ])
    const REG_LINE_STYLE = new RegExp(REG_LINE_STYLE_STR.value, 'gm') 
    let lineStyleMatch
    while ((lineStyleMatch = REG_LINE_STYLE.exec(block)) !== null) {   
        let {CONTENT_FORMAT, CONTENT, CSS, CSS_1, CSS_2} = lineStyleMatch.groups, cssStr = ''
        if (CSS_1) {
            let text = CSS_1.substr(1, CSS_1.length - 2)
            cssStr += CSS_1.includes('{') ? ` style="${text}"` : ` class="${text}"`
        }
        if (CSS_2) {
            let text = CSS_2.substr(1, CSS_2.length - 2)
            cssStr += CSS_2.includes('{') ? ` style="${text}"` : ` class="${text}"`
        }       
        block = block.replace(CONTENT_FORMAT, `<span${cssStr}>${CONTENT}</span>`)
    }    

    // [盒样式{color:#f00}(bd)] 适合单行行内点缀
    const REG_BOX_STYLE_STR = regexpPresetParse([{BOX_FORMAT: [`\\[`, {CONTENT: `[^\\{\\}\\[\\]\\(\\)]+`}, PRESET_CSS, `\\]` ]}])
    const REG_BOX_STYLE = new RegExp(REG_BOX_STYLE_STR.value, 'gm') 
    let boxStyleMatch
    while ((boxStyleMatch = REG_BOX_STYLE.exec(block)) !== null) {   
        let {BOX_FORMAT, CONTENT, CSS, CSS_1, CSS_2} = boxStyleMatch.groups, cssStr = ''
        if (CSS_1) {
            let text = CSS_1.substr(1, CSS_1.length - 2)
            cssStr += CSS_1.includes('{') ? ` style="${text}"` : ` class="${text}"`
        }
        if (CSS_2) {
            let text = CSS_2.substr(1, CSS_2.length - 2)
            cssStr += CSS_2.includes('{') ? ` style="${text}"` : ` class="${text}"`
        }
        block = block.replace(BOX_FORMAT, `<span${cssStr}>${CONTENT}</span>`)
    }
    // 【盒样式】{color:#f00}(bd) 适合多行大段格式化
    const REG_BOX_STYLE_STR2 = regexpPresetParse([{BOX_FORMAT: [`【`, {CONTENT: `[^】]+`}, `】`, PRESET_CSS]}])
    const REG_BOX_STYLE2 = new RegExp(REG_BOX_STYLE_STR2.value, 'gm') 
    let boxStyleMatch2
    while ((boxStyleMatch2 = REG_BOX_STYLE2.exec(block)) !== null) {   
        let {BOX_FORMAT, CONTENT, CSS, CSS_1, CSS_2} = boxStyleMatch2.groups, cssStr = ''
        if (CSS_1) {
            let text = CSS_1.substr(1, CSS_1.length - 2)
            cssStr += CSS_1.includes('{') ? ` style="${text}"` : ` class="${text}"`
        }
        if (CSS_2) {
            let text = CSS_2.substr(1, CSS_2.length - 2)
            cssStr += CSS_2.includes('{') ? ` style="${text}"` : ` class="${text}"`
        }
        block = block.replace(BOX_FORMAT, `<span${cssStr}>${CONTENT}</span>`)
    }

    /**
     * 盒子：■⇤{}()content■
     * 一个纯粹的块级元素包装
     */
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
