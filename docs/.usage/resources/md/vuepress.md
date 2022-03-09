

===+
【1】实现一个VuePress插件
docs/.vuepress/config.js ▾
    ↧module.exports = {
        plugins: [
            require('./vuepress-plugin-super-block'), // path.resolve(__dirname, './vuepress-plugin-super-block/index.js')
        ]
    }↥
docs/.vuepress/vuepress-plugin-super-block/
vuepress-plugin-super-block> npm init -y
docs/.vuepress/vuepress-plugin-super-block/index.js ▾
    ↧/** 
     * @param {*} options 插件的配置选项
     * @param {*} ctx 编译期上下文
     * @returns 
     */
    module.exports = (options, ctx) => {
        return {
            name: 'vuepress-plugin-super-block',
            async ready() {
                console.log('Hello World superblock!');
            }
        }
    }↥



===-


===+
[##] 入门使用
notebook/
notebook> npm init -y
notebook> npm install vuepress@1.8.2 --save-dev
notebook/docs/
notebook/docs/README.md ▾ 
    ↧Hello VuePress↥
notebook/package.json ▾
    ↧"scripts": {
        "docs:dev": "vuepress dev docs", 
        "docs:build": "vuepress build docs"
    }↥
notebook> npm run docs:dev
    http://localhost:8080

[##] 部署基础功能
notebook/docs/.deploy/
notebook/docs/.deploy/config.js ▾ 配置 目录定位、资源调度、工具整理、结构配置
    ↧const PATH = require('path')
    const MAP_DIR = {
        ".vuepress": "../.vuepress"
    }

    module.exports.dir = key => {
        return PATH.resolve(__dirname, MAP_DIR[key])
    }↥
notebook/docs/.deploy/index.js ▾{background-color:#6d6;color:#fff}  创建 .vuepress 目录
    ↧const {utils, dir} = require('./config.js')
    const { mkdirSync } = require('./fs.js')

    mkdirSync(dir('.vuepress'), res => {
        console.log('创建目录：docs/.vuepress', res.message)
    })↥
notebook/docs/.deploy/fs.js ▾
    ↧const fs = require('fs')
    const path= require("path")

    // 递归创建目录 同步方法
    function checkDirSync(dirname) {
        if (fs.existsSync(dirname)) {
            // console.log('目录已存在：' + dirname)
            return {message: "目录已存在", state: 1}
        } else {
            if (checkDirSync(path.dirname(dirname))) {
                try {
                    fs.mkdirSync(dirname)                
                    return {message: "目录已创建", state: 2}
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }

    module.exports = {    
        writeFileSync: (absPath, content, next) => {
            typeof content !== "string" && (content = JSON.stringify(content, null, 4))
            try {
                fs.writeFileSync(absPath, content)
                next && next()
            } catch (err) {
                console.error(err)
            }        
        },
        writeFile: (absPath, content, success) => { 
            typeof content !== "string" && (content = JSON.stringify(content, null, 4))
            fs.writeFile(absPath, content, { encoding: 'utf8' }, err => { 
                if(err){ 
                    console.log(err) 
                } else {
                    success && success()
                    !success && console.log('written: ' + absPath)
                } 
            })
        },
        readFile: (path, ifNoCreateOne) => {
            if (fs.existsSync(path)) {
                return fs.readFileSync(path, 'utf8')
            } else if (ifNoCreateOne) {
                module.exports.writeFileSync(path, ``)
                return fs.readFileSync(path, 'utf8')
            }
            return null
        },
        editWritCommonFile: (path, editHandler) => {
            const fileObj = require(path)
            const next = editHandler(fileObj)
            next && module.exports.writeFile(path, `module.exports = ${JSON.stringify(fileObj, null, 4)}`)
        },
        mkdirSync(absPath, next){
            let res = checkDirSync(absPath)
            next && next(res)
        },
        saveFile(filePath, fileData) {
            return new Promise((resolve, reject) => {
                /*fs.createWriteStream(path,[options])
                options <String> | <Object>
                {
                    flags: 'w',
                    defaultEncoding: 'utf8',
                    fd: null,
                    mode: 0o666,
                    autoClose: true
                }
                */
                const wstream = fs.createWriteStream(filePath)
                wstream.on('open', () => {
                    const blockSize = 128
                    const nbBlocks = Math.ceil(fileData.length / (blockSize))
                    for (let i = 0; i < nbBlocks; i += 1) {
                        const currentBlock = fileData.slice(blockSize * i, Math.min(blockSize * (i + 1), fileData.length),)
                        wstream.write(currentBlock)
                    }
                    wstream.end()
                })
                wstream.on('error', (err) => { reject(err) })
                wstream.on('finish', () => { resolve(true) })
            })
        },
        copyFileSync(from, to){
            fs.copyFileSync(from, to)
        },
        existsSync(path) {
            return fs.existsSync(path)
        }
    }↥   
notebook/package.json ▾           添加 deploy 脚本命令
    ↧"scripts": {
        "deploy": "node docs/.deploy/index.js"        
    }↥
notebook> npm run [deploy{color:#0c0}] 

[##] 建立文档体系
notebook/docs/.data/
notebook/docs/.data/index.js ▾ 数据源
    ↧module.exports = {
        vue: {
            title: 'Vue', src: 'vue/index',
            links: [{ name: 'vue-element-admin', href: 'vue/vue-element-admin/index' }],
            children: {},
            peripheral: {
                mvvm: { title: 'MVVM模式', src: 'vue/mvvm' }
            }
        }
    }↥
notebook/docs/.data/md/ ▾ 资源库
    ↧vue.md↥
    
notebook/package.json ▾ // 设置scripts
    ↧"scripts": { 
        "docs:dev": "concurrently \"npm run data:watch\" \"npm run res:watch\" \"vuepress dev docs\"", // npm install concurrently -g
        "data:create": "node docs/.data/data-create.js", // 创建DATA到MD
        "data:watch": "node docs/.data/data-watch.js",   // 监听数据变化创建DATA到MD
        "res:create": "node docs/.data/res-create.js",    // 创建MD到DOC
        "res:watch": "node docs/.data/res-watch.js"        // 监听MD变化创建MD到DOC
    }↥
notebook/docs/.data/data-create.js ▾{background-color:#6d6;color:#fff} ./components/
    ↧const Path = require('path'), ARG_ARR = process.argv.slice(2)  // 命令参数
    const { mkdirSync } = require('../.deploy/fs')
    const createFile = require('./components/createFile')
    const createHome = require('./components/createHome')
    let data = require('./index')

    // 依据路径获取数据
    const getDataByPath = path => {
        console.log('---',path);
        let arr = path.substring(1).split('/'), res = data, prop
        res.path = '/'
        console.log(arr);
        while (prop = arr.shift()) {
            const parentPath = res.path
            if (prop) {
                res = res.children[prop]
                res.path = parentPath + prop
            }
        }
        res.path = path
        return res
    }
    // 生成文件与结构
    const createItem = (item, path) => { 
        const absolutePath = Path.resolve(__dirname, '..' + path)
        if (item.children) {
            mkdirSync(absolutePath)
            let readmePath = Path.resolve(absolutePath, 'README')
            if (path === '/') {
                createHome(readmePath, item)
            } else {
                createFile(readmePath, item)
            }
        } else {
            createFile(absolutePath, item)
        }
    }
    if (ARG_ARR.length > 0) {
        delete require.cache[require.resolve('./index')]
        setTimeout(() => {
            data = require('./index')
            ARG_ARR.forEach(path => {            
                let item = getDataByPath(path)
                createItem(item, path)
            })
        })    
    } else {
        function handleDataChildren(node) {
            if (node.children) node.path += '/'
            createItem(node, node.path)
            if (node.children) for (key in node.children) {handleData(key, node.children[key], node)}
        }
        function handleData(key, node, parent) {
            Object.assign(node, {parent, key, title: node.title || node.linkName || key, linkName: node.linkName || node.title || key, path: parent ? parent.path + key : ''})    
            handleDataChildren(node)
        }
        handleData('', data, null)
    }↥    
    createFile.js ▾
        ↧const PATH = require('path')
        const { writeFile, readFile } = require('../../.deploy/fs')
        const parseCode = require('./parseCode')

        module.exports = (fullPath, target) => {
            let childrenContent = '' // 主题子类
            let linksContent = ''    // 主题链接
            let contentHeader = ''   // 主题标题、说明、详情
            let staticContent = ''   // 资源静态内容
            let date = new Date()
            let modifyData = 'N ' + date.toJSON().slice(0, 10).replace(/-/g, '.') + ' ' + date.toString().match(/(\d{2}\:\d{2})\:\d{2}/)[1] // 创建或更新时间
            // 主题子类
            if(target.children) {
                let liItems = ''
                for (i in target.children) {
                    const child = target.children[i]
                    const title = child.title || child.linkName || i
                    liItems += `<li><a href="${target.path + i}">${title}</a></li>`
                }
                childrenContent = `<div class="custom-block children"><ul>${liItems}</ul></div>`
            }
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
                let file = readFile(PATH.resolve(__dirname, '../md/'+target.src+'.md'))
                if (file) {
                    file = parseCode(file, target.path)
                    staticContent += `${file}\n`
                }
            }
            let recordContent = target.prarent ? `<a class="back" href="${target.prarent.path}">上一级</a><a class="back" href="javascript:history.back();">返回</a>` : `<a class="back" href="javascript:history.back();">返回</a>`

            writeFile(fullPath + '.md',
`---
pageClass: theme-item
---
<div class="extend-header">
    <div class="info">
        <div class="record">
            ${recordContent}
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
</div>`)
        }↥
    parseCode.js ▾
        ↧/**
        * 弹性盒子
        * 目标：<div class="box-flex"><div class="box-flex-item flex-8">col 01</div><div class="box-flex-item classname" style="flex-basis:100px">col 02</div></div>
        * 格式：
            ---------- 8             小于等于10 flex-grow: 8
            col 01
            ========== 100classname  大于10 flex-basis: n  可注入自定义classname
            col 02
            ----------
        */
        const parseFlex = code => {
            let matchFLEX
            while ((matchFLEX = /\-{10,}\s(\d{1,4})([a-z-]*)[\r\n]([\s\S]+?)\-{10,}/.exec(code)) !== null) {
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
                code = code.replace(matchFLEX[0], `<div class="box-flex">${itemsStr}\n</div>`)
            }
            return code
        }
        const parseUML = code => {
            // PlantUML图形
            let matchUML
            while ((matchUML = /```plantuml[\w\W]+?```/.exec(code)) !== null) {
                const {name} = handleUML(matchUML[0])
                code = code.replace(matchUML[0], `<img :src="$withBase('/uml/${name}.png')">`)
            }
            return code
        }
        const parseCustomBlock = require('./parseCustomBlock')
        // const Anchor = fetch('PARSE|anchor')
        // const Search = fetch('PARSE|search')
        // const {debounce} = fetch('UTILS|ewan')

        module.exports = (code, path) => {
            // 模板符{{}} 如果有 向<pre>标签输出hasTemplate属性 用于在插件环节还原模板符
            code = code.replace(/\{\{/g, `{TEMPLATE{`)
            code = code.replace(/\}\}/g, `}TEMPLATE}`)

            // 超级代码块
            let SUPER_BLOCK = {}, super_block_count = 0
            const SUPER_BLOCK_MATCH = code.match(/✪[\s\S]+✪/m) || [];
            SUPER_BLOCK_MATCH.forEach(e => {
                const SUPER_BLOCK_NAME = 'SUPER_BLOCK_' + super_block_count + 'A'
                code = code.replace(e, SUPER_BLOCK_NAME)
                e = e.replace(/✪/g, '')
                .replace(/↧/g, '&#8615;').replace(/↥/g, '&#8613;')
                .replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')
                .replace(/\</g, '&#60;').replace(/\>/g, '&#62;')
                .replace(/\./g, '&#46;')
                .replace(/\+/g, '&#43;')
                .replace(/\?/g, '&#63;')
                .replace(/:/g, '&#58;')
                .replace(/\//g, '&#47;').replace(/\\/g, '&#92;')
                //console.log(e);
                SUPER_BLOCK[SUPER_BLOCK_NAME] = e
                super_block_count++
            })

            // 通用链接
            //code = Anchor.parseAnchor(code, path) // 锚点
            //code = Anchor.parseTitle(code, path)  // 标题
            //code = Anchor.parseLink(code)

            code = parseCustomBlock.start(code, path)

            code = parseFlex(code) // 弹性盒子
            code = parseUML(code)  // 图例

            code = parseCustomBlock.end(code)

            //Anchor.save() // 保存链接数据

            return code
        }↥
    parseCustomBlock.js ▾
        ↧✪//const Search = fetch('PARSE|search')
        //const Aggregate = fetch('PARSE|aggregate')
        const { regexpPresetParse, PRESET_CSS } = require('./regexp-preset')

        let TAG_MAP_BLOCK = {}, blockCount = 0
        const REG_STYLE_STR = `(\\{[\\w\\s-;:'"#]+\\})?` // color: #f00; font-size: 14px
        const REG_CLASS_STR = `(\\([\\w\\s-]+\\))?`      // bd sz-16 c-0

        function parseCustomBlock(block, path) {
            block = block.replace(/\</g, "&lt;").replace(/\>/g, "&gt;")

            // ❖ 项目Project
            if (/(❖\s项目Project)/.exec(block)) {
                block = block.replace(RegExp.$1, `<div>工具</div>`)
            }

            // 聚合之采集
            //block = Aggregate.pick(block, 'vuepress')

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
            // <!-- HTML注释 -->
            const matchHtmlComment = block.match(/&lt;!--\s*[\s\S]*?\s*--&gt;/g) || [];
            matchHtmlComment.forEach(e => {
                let content = e.replace(/&lt;!--\s*/, '<span class="comment">&#60;&#33;&#45;&#45;').replace(/\s*--&gt;/, '&#45;&#45;&#62;</span>')
                block = block.replace(e, content)
            })

            // Markdown格式 [链接](#)、- 点列表、**局部加粗**
            while (/(\[([^\]\r\n]+)\]\(([^\)\r\n]+)\))/.exec(block) !== null) {
                block = block.replace(RegExp.$1, `<a href="${RegExp.$3}" target="_blank">${RegExp.$2}</a>`)
            }
            while (/^\s*(-\s([^\n\r]+))/m.exec(block) !== null) {
                block = block.replace(RegExp.$1, `● <strong>${RegExp.$2}</strong>`);
                //Search.add(path, RegExp.$2)
            }
            while (/(\*\*([0-9a-zA-Z\u4e00-\u9fa5_-]+)\*\*)/.exec(block) !== null) {
                block = block.replace(RegExp.$1, `<strong>${RegExp.$2}</strong>`)
                //Search.add(path, RegExp.$2)
            }

            // 模板符{{}}用图片表示
            block = block.replace(/\{\{/g, `&#123; &#123;`)
            block = block.replace(/\}\}/g, `&#125; &#125;`)

            /**
            * 运行命令
            * hello> npm run dev
            */
            while (/^\x20*(([\w-\/]+)\&gt;)\s[^\r\n]+/m.exec(block) !== null) {
                block = block.replace(RegExp.$1, `<span class="run-command">${RegExp.$2}</span>`)
            }

            /**
            * 点缀集
            * 1►text◄ 2►text◄ ❶❷❸❹❺❻❼❽❾❿►text◄
            */
            const orderMap = {"❶": 1, "❷": 2, "❸": 3, "❹": 4,"❺": 5,"❻": 6,"❼": 7,"❽": 8,"❾": 9,"❿": 10}
            while (/((\d)?([❶❷❸❹❺❻❼❽❾❿])?►([^◄]+)◄)/.exec(block) !== null) {
                let className = 'i' + (RegExp.$2 || 0)
                if (RegExp.$3) className = 'order' + orderMap[RegExp.$3]
                block = block.replace(RegExp.$1, `<i class="${className}">${RegExp.$4}</i>`)
            }

            /**
            * Detail
            * 突出简介隐藏详情
            * .vuepress/theme/layouts/Layout.vue
                mounted () {
                    const $details = document.querySelectorAll('.fold-detail')
                    $details.forEach(dom => {
                        dom.addEventListener('click', e => {
                            let tar = e.currentTarget
                            tar.className = tar.className === 'fold-detail' ? 'fold-detail active' : 'fold-detail'
                        })
                    })
                }
            */
            const REG_DETAIL_STR = regexpPresetParse([
                {DETAIL_FORMAT: [{DETAIL_INDENT: `\\x20*`}, {TITLE: `.+`}, `\\s▾`, {STYLE: REG_STYLE_STR}, {COMMENT:`[^\\n]*`}, `[\\r\\n]`, {CONTENT_INDENT: `\\x20*`}, `↧`, {CONTENT: `[^↥]+`}, `↥`]}
            ])
            const REG_DETAIL = new RegExp(REG_DETAIL_STR.value)
            // const REG_DETAIL = /(?<DETAIL_FORMAT>((?<DETAIL_INDENT>\x20*)(?<TITLE>.+)\s▾(?<STYLE>(\{[\w\s-;:'"#]+\})?)(?<COMMENT>\s*(.+)?)[\r\n](?<CONTENT_INDENT>\x20*)↧(?<CONTENT>[^↥]+)↥))/
            let detailMatch
            while ((detailMatch = REG_DETAIL.exec(block)) !== null) {
                let {DETAIL_FORMAT, DETAIL_INDENT, TITLE, STYLE, COMMENT, CONTENT_INDENT, CONTENT} =  detailMatch.groups, descStyle = 'class="detail-desc"'
                if (STYLE) descStyle += ` style="${STYLE.replace('{', '').replace('}', '')}"`
                block = block.replace(DETAIL_FORMAT, `<div class="fold-detail">${DETAIL_INDENT}<span ${descStyle}>${TITLE}</span><span class="comment">${COMMENT}</span><div class="detail-content">${CONTENT_INDENT}<span>${CONTENT}</span></div></div>`)
            }

            /**
            * 标题表示一
            * 【1】 52PX
            * 【2】 40PX
            * 【3】 30PX
            * 【4】 22PX
            * 【5】 16PX
            * 【6】 12PX
            * 【fff#1#333】颜色#等级#背景
            */
            while (/\s*(【(\w{3,6}#)?(-)?(\d)(#\w{3,6})?】(.+))/.exec(block) !== null) {
                let classStr = `title${RegExp.$4}`
                let styleStr = `margin-top:${(6 - RegExp.$4) * 3}px;`
                if (RegExp.$2) styleStr += `color:#${RegExp.$2.replace('#', '')};`
                if (RegExp.$3) classStr += ` reverse${RegExp.$4}`
                if (RegExp.$5) {
                    classStr += ` reverse1`
                    styleStr += `background-color:${RegExp.$5}`
                }
                block = block.replace(RegExp.$1, `<span class="${classStr}" style="${styleStr}"><i></i>${RegExp.$6}</span>`)
            }
            /**
            * 标题表示二
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
                    {LEVEL: `#{2,6}`},      // 标题字号 #-######
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
                //Search.add(path, TEXT)
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
                //Search.save()
                return code
            }
        }✪↥
    regexp-preset.js ▾
        ↧function htmlEscape(content) {
            return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        }

        function arrayToRegStr(arr, parentKey) {
            let value = ``, html = ``
            arr.forEach(item => { 
                let res = objToRegStr(item)
                value += res.value 
                html += res.html
            })
            return {
                value: `(${value})`, 
                html
            }
        }
        function objToRegStr(e) {        
            if (typeof e === 'string') return { value: e, html: e }        
            if (Object.prototype.toString.call(e) === '[object Object]') {
                let value = `(?`, html, count = 0
                for (let i in e) {
                    if (count > 0) throw '自定义正则字符串格式，不能包含一个以上命名: ' + i
                    value += `<${i}>`
                    html = `【i data-add="${i}"】(?`
                    if (typeof e[i] === 'string') {
                        value += e[i]
                        html += e[i]
                    } else if (Object.prototype.toString.call(e[i]) === '[object Array]') {
                        let res = arrayToRegStr(e[i], i)
                        value += res.value
                        html += res.html
                    } else {
                        throw '命名正则段值类型仅能为string和字面量数组'
                    }
                    count++
                }
                value += `)`
                html += `)【/i】`
                //console.log(value);
                return {
                    value,
                    html
                }
            } else {
                throw '非法自定义正则段格式: ' + e
            }       
        }

        module.exports = {
            regexpPresetParse: arr => {
                let value = ``, html = ``
                arr.forEach(item => { 
                    let res = objToRegStr(item)
                    value += res.value 
                    html += res.html
                })
                return {
                    value,
                    html: `<span class="regexp">${htmlEscape(html).replace(/【/g, '<').replace(/】/g, '>')}</span>`
                }       
            },
            PRESET_CSS: {
                CSS: [
                    {CSS_1: `\\{[\\w\\s-;:'"#]+\}|\\([\\w\\s-]+\\)`},
                    {CSS_2: `(\\{[\\w\\s-;:'"#]+\\})?(\\([\\w\\s-]+\\))?`}
                ]
            }
        }↥
notebook/docs/.data/data-watch.js ▾{background-color:#6d6;color:#fff}
    ↧const exec = require('child_process').exec, Path = require('path'), chokidar = require('chokidar')

    let dataFile = require('./index')

    // 对比差异
    let diffPath = {}
    const addChild = (node, path) => {
        if (node.children) {
            diffPath[path + '/'] = true
            addChildren(node.children, path + '/')
        } else {
            diffPath[path] = true
        }
    }
    const addChildren = (children, parentPath) => {for (var key in children) {addChild(children[key], parentPath + key)}}
    function handleDataChildren(oChildren, nChildren, parentPath) {for (key in nChildren) { compareDiff(oChildren[key], nChildren[key], key, parentPath) }}
    function compareDiff(oNode, nNode, key, parentPath) {
        let path = parentPath + key
        if (nNode.children) {
            path += '/'
            if (oNode && oNode.children) {
                handleDataChildren(oNode.children, nNode.children, path)
            } else {
                diffPath[path] = true
                addChildren(nNode.children, path)
            }
        }
        for (var key in nNode) {
            if (key === 'title' || key === 'desc' || key === 'src') {
                if (oNode) {
                    nNode[key] !== oNode[key] && (diffPath[path] = true)
                } else {
                    diffPath[path] = true
                }
            }
        }
    }
    chokidar.watch(Path.resolve(__dirname, 'index.js'))
        .on('error', error => log(`data监听错误: ${error}`))
        .on('change', path => {
            delete require.cache[require.resolve('./index')]
            setTimeout(() => {
                const dataFile2 = require('./index')
                compareDiff(dataFile, dataFile2, '', '')
                const arr = Object.keys(diffPath)
                if (arr.length) {
                    exec(`node ${Path.resolve(__dirname, 'data-create.js')} ${arr.join(' ')}`, function(error, stdout, stderr) {
                        error && console.log(error)
                        stdout && console.log(stdout)
                        stderr && console.log(stderr)
                    })
                }
                diffPath = {}
                dataFile = dataFile2
            })
        })↥
notebook/docs/.data/res-create.js ▾{background-color:#6d6;color:#fff}
    ↧const Path = require('path'), ARG_ARR = process.argv.slice(2)  // 命令参数
    const createFile = require('./components/createFile')
    const createHome = require('./components/createHome')

    // 依资源名(一维命名)查找数据
    let data = require('./index')
    function queryDataByResName(resName) {
        function handleDataChildren(node) {
            if (node.children) node.path += '/'
            if (node.src === resName) throw node        
            if (node.children) for (key in node.children) {handleData(key, node.children[key], node)}
        }
        function handleData(key, node, parent) {
            Object.assign(node, {parent, key, title: node.title || node.linkName || key, linkName: node.linkName || node.title || key, path: parent ? parent.path + key : ''})    
            handleDataChildren(node)
        }
        try{
            handleData('', data, null)
        } catch (node) {
            return node
        }
    }


    if (ARG_ARR.length > 0) {
        const name = ARG_ARR[0]
        const node = queryDataByResName(name)    
        if (node) {
            let path = node.path
            if (path.match(/\/$/m)) path += 'README'
            if (path === '/README') {
                createHome(Path.resolve(__dirname, '..' + path), node)
            } else {
                createFile(Path.resolve(__dirname, '..' + path), node)
            }
        } else {
            console.log(`数据结构里不存在资源：${name}.md`)
        }    
    }↥
    ./components/createHome.js ▾
        ↧const Path = require('path')
        const { writeFile, readFile } = require('../../.deploy/fs')

        module.exports = (path, node) => { 
            let {src, children} = node
            let content = readFile(Path.resolve(__dirname, '../md/'+src+'.md'))
            let childStr = ''
            for (i in children) {
                let child = children[i], title = child.title || child.linkName || i
                childStr += `- [︳${title}](/${i})\n`
            }
            content = `---\nsidebar: false\n---\n\n<div class="root-children brick-wall">\n\n${childStr}\n</div>\n\n## 文档地图\n` + content
            writeFile(path + '.md', content)
        }↥
notebook/docs/.data/res-watch.js ▾{background-color:#6d6;color:#fff}
    ↧const exec = require('child_process').exec, Path = require('path'), chokidar = require('chokidar')

    chokidar.watch(Path.resolve(__dirname, './md'))
        .on('error', error => log(`资源监听错误: ${error}`)) 
        .on('change', path => {            
            /md&#91;\\\/&#93;([\w-]+)\.md/.exec(path)
            if (RegExp.$1) { 
                exec(`node ${Path.resolve(__dirname, 'res-create.js')} ${RegExp.$1}`, function(error, stdout, stderr) {
                    error && console.log(error)
                    stdout && console.log(stdout)
                    stderr && console.log(stderr)
                })
            }        
        })↥

[##] 为体系定义一个新主题
    参考主题结构规范 ▾
    ↧├── global-components           该目录下的组件都会被自动注册为全局组件
    │   └── xxx.vue
    ├── components                  普通Vue组件
    │   └── xxx.vue
    ├── layouts                     布局组件
    │   ├── Layout.vue              所有的页面会将此组件作为默认布局
    │   ├── 404.vue                 匹配不到的路由
    │   ├── AnotherLayout.vue       如有其它布局的需求: 1.创建此文件  2.在有此需求的.md文件顶部标识为 ---回车layout: AnotherLayout回车
    │   └── GlobalLayout.vue        如想设置全局的UI如<header> #使用全局布局组件
    ├── styles                      全局的样式和调色板
    │   ├── index.styl
    │   └── palette.styl
    ├── templates                   修改默认的模板文件
    │   ├── dev.html
    │   └── ssr.html
    ├── index.js                    主题文件的入口文件 如缺失 需要将package.json中的"main"字段设置为layouts/Layout.vue
    ├── enhanceApp.js               主题水平的客户端增强文件
    └── package.json↥
    notebook/docs> vuepress eject   // 克隆默认主题代码
    notebook/docs/.vuepress/theme/styles/index.styl ▾
        ↧{$contentClass}:not(.custom)
        //@extend $wrapper 注释掉这一行
        
        // 最底部
        @require './code-r'
        @require './custom-blocks-r'
        @require './wrapper-r'
        @require './index-r'
        @require './main/index'↥
        code-r.styl ▾
            ↧{$contentClass}
                pre, pre[class*="language-"]
                    line-height 1.15
                    padding 0.2rem 1.5rem 0.4rem 1.5rem
                    background-color transparent
                    border-radius 0px
            div[class*="language-"]
                border-radius 0px
            div[class~="language-"]
                background-color transparent
            div[class~="language-"] pre[class~="language-text"] code
                color #333↥
        custom-blocks-r.styl ▾
            ↧.custom-block
                &.tip, &.warning, &.danger
                    padding .1rem 1.5rem
                    margin 1rem 0
                &.tip
                    .custom-block-title
                        display none
                    p
                        line-height: 1.2
                        padding 5px 0
                &.warning
                    .custom-block-title
                        display none
                    p
                        line-height: 1.2
                        padding 5px 0
                &.danger
                    .custom-block-title
                        display none
                    p
                        line-height: 1.2
                        padding 5px 0
                &.details
                    margin 0.2em 0
                    padding 0.3em 1em↥
        wrapper-r.styl ▾
            ↧$wrapper
                max-width none
                padding 1rem 2.5rem 2rem 2.5rem↥
        index-r.styl ▾
            ↧html, body
                font-size 12px

            .sidebar
                background-color #fafafa
            blockquote
                margin 0.5rem 0
                padding 0 0 0 1rem
            ul, ol
                margin: 0.3rem 0
            p, ul, ol
                line-height 1.2↥
        main/index.styl ▾ 自定义的所有样式
            ↧.theme-item .theme-default-content { min-height: 450px; }
            .theme-default-content { padding: 10px 20px; position: relative; }
            .static-content { padding-left: 50px; }    
            .plantuml-demo {
                .start { color: #0c0; font-size: 18px; }
                .end { color: #f00; font-size: 18px; }
            }
            .code-block {
                line-height: 1.24; font-family: 'consolas', 'monospace', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            }
            .test { border: #f00 1px solid; }
            .inline { display: inline-block; }
            .vtop { vertical-align: top; }
            .vmid { vertical-align: middle; }
            .vbom { vertical-align: bottom; }

            @require './common'
            @require './col'
            @require './format-block'
            @require './title'
            @require './content-header'
            @require './form-elements'
            @require './extend-header'
            @require './home'
            @require './formatter'↥
            common.styl ▾
                ↧.fs12 { font-size: 12px; }
                .fs14 { font-size: 14px; }
                .fs16 { font-size: 16px; }
                .fs18 { font-size: 18px; }
                .fs20 { font-size: 20px; }
                .fs22 { font-size: 22px; }
                .fs24 { font-size: 24px; }
                .fs26 { font-size: 26px; }
                .fs28 { font-size: 28px; }
                .fs30 { font-size: 30px; }
                .fs32 { font-size: 32px; }
                .fs34 { font-size: 34px; }
                .fs36 { font-size: 36px; }
                .fs38 { font-size: 38px; }
                .fs40 { font-size: 40px; }

                .bd { font-weight: bold; }

                .c0 { color: #000;}
                .c1 { color: #111;}
                .c2 { color: #222;}    
                .c3 { color: #333;}
                .c4 { color: #444;}
                .c5 { color: #555;}
                .c6 { color: #666;}
                .c7 { color: #777;}    
                .c8 { color: #888;}    
                .c9 { color: #999;}
                .ca { color: #aaa;}
                .cb { color: #bbb;}
                .cc { color: #ccc;}
                .cd { color: #ddd;}
                .ce { color: #eee;}
                .cf { color: #fff;}
                .green { color: #0b0;}
                .blue { color: #17e;}
                .red { color: #f33;}

                .bg0 { background-color: #000; }
                .bg1 { background-color: #111; }
                .bg2 { background-color: #222; }
                .bg3 { background-color: #333; }
                .bg4 { background-color: #444; }
                .bg5 { background-color: #555; }
                .bg6 { background-color: #666; }
                .bg7 { background-color: #777; }
                .bg8 { background-color: #888; }
                .bg9 { background-color: #999; }
                .bga { background-color: #aaa; }
                .bgb { background-color: #bbb; }
                .bgc { background-color: #ccc; }
                .bgd { background-color: #ddd; }
                .bge { background-color: #eee; }
                .bgf { background-color: #fff; }

                .bd0 { border: #000 1px solid; }
                .bd1 { border: #111 1px solid; }
                .bd2 { border: #222 1px solid; }
                .bd3 { border: #333 1px solid; }
                .bd4 { border: #444 1px solid; }
                .bd5 { border: #555 1px solid; }
                .bd6 { border: #666 1px solid; }
                .bd7 { border: #777 1px solid; }
                .bd8 { border: #888 1px solid; }
                .bd9 { border: #999 1px solid; }
                .bda { border: #aaa 1px solid; }
                .bdb { border: #bbb 1px solid; }
                .bdc { border: #ccc 1px solid; }
                .bdd { border: #ddd 1px solid; }
                .bde { border: #eee 1px solid; }
                .bdf { border: #fff 1px solid; }

                .h1, .h2, .h3, .h4, .h5, .h6 { font-weight: bold; }
                .h1 { font-size: 12px; line-height: 18px; }
                .h2 { font-size: 14px; line-height: 20px; }
                .h3 { font-size: 16px; line-height: 22px; }
                .h4 { font-size: 18px; line-height: 24px; }
                .h5 { font-size: 20px; line-height: 26px; }
                .h6 { font-size: 22px; line-height: 28px; }↥
            col.styl ▾
                ↧.custom-block {
                    &.col-1, &.col-2, &.col-3, &.col-4, &.col-5, &.col-6, &.col-7, &.col-8, &.col-9, &.col-10, &.col-11, &.col-12 {
                        display: inline-block; box-sizing: border-box; padding: 1em;
                        summary {
                            outline: none; margin: 0; padding: 0; font-weight: blod; border-bottom: #eee 1px solid;
                            &:before {
                                content: '█ ';
                            }
                        }
                    }
                    &.col-1 { width: 8%; }
                    &.col-2 { width: 16%; }
                    &.col-3 { width: 24%; }
                    &.col-4 { width: 33%; }
                    &.col-5 { width: 41%; }
                    &.col-6 { width: 49%; }
                    &.col-7 { width: 58%; }
                    &.col-8 { width: 66%; }
                    &.col-9 { width: 74%; }
                    &.col-10 { width: 83%; }
                    &.col-11 { width: 91%; }
                    &.col-12 { width: 100%; }
                }↥
            format-block.styl ▾
                ↧.format-block {
                    color: #ccc;
                    i { font-weight: bold; position: relative; }
                    .i0 { color: #333; }
                    .i1, .order1 { color: #eb9b00; }
                    .i2, .order2 { color: #00cf00; }
                    .i3, .order3 { color: #009ceb; }
                    .i4, .order4 { color: #a523e8; }
                    .i5, .order5 { color: #ff3a3a; }
                    .i6, .order6 { color: #7bbb00; }
                    .i7, .order7 { color: #00c381; }
                    .i8, .order8 { color: #5454ff; }
                    .i9, .order9 { color: #ec33ae; }
                    .order1::before, .order2::before, .order3::before, .order4::before, .order5::before, .order6::before, .order7::before, .order8::before, .order9::before {
                        position: absolute; top: -2px; left: -10px; font-size: 18px; line-height: 18px; vertical-align: middle; 
                    }
                    .order1::before { content: '❶'; }
                    .order2::before { content: '❷'; }
                    .order3::before { content: '❸'; }
                    .order4::before { content: '❹'; }
                    .order5::before { content: '❺'; }
                    .order6::before { content: '❻'; }
                    .order7::before { content: '❼'; }
                    .order8::before { content: '❽'; }
                    .order9::before { content: '❾'; }
                }↥
            title.styl ▾
                ↧.title1, .title2, .title3, .title4, .title5, .title6 {
                    font-weight: bold; display: inline-block; color: #2c3e50; vertical-align: top;
                    i {
                        display: inline-block; vertical-align: top; width: 0; border-style: solid; border-color: transparent #2c3e50 transparent #eee; margin-right: 6px; position: relative;
                        &::before, &::after { content: ''; width: 22px; position: absolute; }
                    }
                }
                .reverse1, .reverse2, .reverse3, .reverse4, .reverse5, .reverse6 {
                    border-width: 0 !important; padding: 0 5px;
                    i { display: none; }
                }
                .reverse1 { color: #fff; background-color: #222; }
                .reverse2 { color: #fff; background-color: #444; }
                .reverse3 { color: #fff; background-color: #666; }
                .reverse4 { color: #fff; background-color: #888; }
                .reverse5 { color: #fff; background-color: #aaa; }
                .reverse6 { color: #fff; background-color: #ccc; }

                .title1 {
                    font-size: 32px; border-width: 0 0 0 10px; line-height: 38px;
                    i {
                        border-width: 0 22px 0 0; height: 27px; transform: translateY(5px);
                        &::before {
                            border-style: solid;
                            border-width: 1px 0 1px 0;
                            border-color: #eee transparent transparent transparent;
                            left: -4px;
                            top: 5px;
                            height: 0;
                            width: 20px;
                            transform: rotate(45deg);
                        }
                        &::after {
                            border-style: solid;
                            border-width: 1px 0 0 0;
                            border-color: #eee transparent transparent transparent;
                            left: -4px;
                            top: 20px;
                            height: 0;
                            width: 20px;
                            transform: rotate(-45deg);
                        }
                    }
                }
                .title2 {
                    font-size: 24px; border-width: 0 0 0 8px; line-height: 28px;
                    i {
                        border-width: 0 16px 0 6px; height: 21px; transform: translateY(4px);
                        &::before {
                            border-style: solid;
                            border-width: 1px 0 0 0;
                            border-color: #eee transparent transparent transparent;
                            right: -16px;
                            top: 10px;
                        }
                    }
                }
                .title3 {
                    font-size: 20px; border-width: 0 0 0 6px; line-height: 24px;
                    i {
                        border-width: 0 11px 0 11px; height: 17px; transform: translateY(3px);
                        &::before {
                            border-style: solid;
                            border-width: 1px 0 1px 0;
                            border-color: #eee transparent #eee transparent;
                            right: -11px;
                            top: 5px;
                            height: 5px;
                        }
                    }
                }
                .title4 {
                    font-size: 16px; border-width: 0 0 0 4px; line-height: 20px;
                    i {
                        border-width: 0 7px 0 14px; height: 15px; transform: translateY(2px);
                        &::before {
                            border-style: solid;
                            border-width: 1px 0 1px 0;
                            border-color: #eee transparent #eee transparent;
                            right: -7px;
                            top: 3px;
                            height: 3px;
                        }
                        &::after {
                            border-style: solid;
                            border-width: 1px 0 0 0;
                            border-color: #eee transparent transparent transparent;
                            right: -7px;
                            top: 11px;
                        }
                    }
                }
                .title5 {
                    font-size: 14px; border-width: 0 0 0 4px; line-height: 18px;
                    i { border-width: 0 4px 0 17px; height: 13px; transform: translateY(2px); }
                }
                .title6 {
                    font-size: 12px; border-width: 0 0 0 2px; line-height: 16px;
                    i { border-width: 0 2px 0 19px; height: 12px; transform: translateY(2px); }
                }↥
            content-header.styl ▾
                ↧.content-header {
                    padding: 72px 0 50px 150px;
                    position: relative;
                    h1 {
                        padding: 0;
                        margin: 0;
                        line-height: 36px;
                        color: #3eaf7c;
                        font-size: 36px;
                        line-height: 36px;
                    }
                    strong {
                        padding: 0;
                        margin: 0;
                        color: #3eaf7c;
                        font-size: 120px;
                        line-height: 120px;
                        position: absolute;
                        top: 30px;
                        left: 80px;
                        opacity: 0.06;
                        border-bottom: #3eaf7c 1px solid;
                        overflow: hidden;
                        height: 80px;
                    }
                    summary {
                        color: #666;
                        line-height: 16px;
                        padding-left: 12px;
                        margin-top: 5px;
                        border-color: #4bba88;
                    }
                    detail {
                        color: #333;
                        line-height: 16px;
                    }
                }↥
            form-elements.styl ▾
                ↧.form-elements {
                    line-height: 18px;
                    color: #ccc;
                    i {
                        font-style: normal;
                    }
                    .drop-down {
                        border: #ccc 1px solid;
                        padding: 0px 15px 0 5px;
                        position: relative;
                        z-index: 1;
                        font-weight: bold;
                        &:after {
                            position: absolute;
                            top: 5px;
                            right: 3px;
                            content: '';
                            display: block;
                            width: 0;
                            height: 0;
                            border-width: 5px 3px 0px 3px;
                            border-style: solid solid solid solid;
                            border-color: #999 transparent transparent transparent;
                        }
                    }
                    .input {
                        border: #ccc 1px solid;
                        padding: 0px 8px;
                        background-color: #fff;
                    }
                    .button {
                        background-color: #ccc;
                        border-radius: 3px;
                        padding: 0px 5px;
                        color: #fff;
                        &.active {
                            background-color: #20b477;
                        }
                    }
                    .tab {
                        color: #ccc;
                        display: inline-block;
                        padding: 1px 0;
                        i {
                            display: inline-block;
                            padding: 0 10px;
                            border-bottom: #ccc 1px solid;
                        }
                        strong {
                            color: #333;
                            display: inline-block;
                            padding: 0 10px;
                            border: #ccc 1px solid;
                            border-bottom: 0;
                        }
                    }
                    .radio {
                        color: #ccc;
                        display: inline-block;
                        padding: 1px 0;
                        i {
                            display: inline-block;
                            margin-right: 15px;
                            &:before {
                                content: '⊙';
                            }
                        }
                        strong {
                            color: #333;
                            display: inline-block;
                            margin-right: 15px;
                            &:before {
                                content: '◉';
                                font-weight: normal;
                            }
                        }
                    }
                    .checkbox {
                        color: #ccc;
                        display: inline-block;
                        padding: 1px 0;
                        i {
                            display: inline-block;
                            margin-right: 15px;
                            &:before {
                                content: '▢';
                            }
                        }

                        strong {
                            color: #333;
                            display: inline-block;
                            margin-right: 15px;
                            &:before {
                                content: '▣';
                                font-weight: normal;
                            }
                        }
                    }
                    .table {
                        display: inline-flex;
                        .col {
                            border-top: #ccc 1px solid;
                            border-right: #ccc 1px solid;
                            border-bottom: #ccc 1px solid;
                            flex: 1 1 auto;
                            &:nth-child(1) {
                                border-left: #ccc 1px solid;
                            }
                            strong {
                                display: block;
                                padding: 0 5px;
                                text-align: center;
                            }
                            i {
                                display: block;
                                border-top: #ccc 1px solid;
                                padding: 0 5px;
                                min-height: 16px;
                                white-space: nowrap;
                            }
                        }
                    }
                    .list {
                        display: inline-block;
                        &.left, &.right, &.top, &.bottom {
                            position: absolute;
                            z-index: 2;
                            .list-wrapper {
                                position: absolute;
                                z-index: 3;
                            }
                        }
                        &.left .list-wrapper {
                            top: 0;
                            right: 5px;
                        }
                        .list-wrapper {
                            border-top: #ccc 1px solid;
                            border-bottom: #ccc 1px solid;
                            background-color: #eee;
                            .list-item {
                                .item-title {
                                    border-bottom: #ccc 1px solid;
                                    display: block;
                                    padding: 2px 10px;
                                    i {
                                        background-color: #20b477;
                                        color: #fff;
                                        border-radius: 10px;
                                        margin-left: 20px;
                                        padding: 0 3px;
                                    }
                                    &:last-child {
                                        border: 0;
                                    }
                                }
                                .sub-box {
                                    display: block;
                                    i {
                                        display: block;
                                        border-bottom: #ccc 1px solid;
                                        position: relative;
                                        padding: 1px 10px 1px 20px;
                                        &.active {
                                            color: #20b477;
                                        }
                                        &.active:before {
                                            position: absolute;
                                            top: 6px;
                                            left: 10px;
                                            content: '';
                                            display: block;
                                            width: 0;
                                            height: 0;
                                            border-width: 3px 0px 3px 6px;
                                            border-style: solid solid solid solid;
                                            border-color: transparent transparent transparent #20b477;
                                        }
                                        &:last-child {
                                            border: 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }↥
            extend-header.styl ▾
                ↧.extend-header {
                    display: flex;
                    .info {
                        flex: 0 0 150px;
                        .record {
                            width: 120px;
                            line-height: 25px;
                            display: block;
                            text-align: right;
                            box-sizing: border-box;
                            padding-right: 5px;
                            color: #ccc;
                            position: relative;
                            &:after {
                                content: '';
                                display: block;
                                width: 100%;
                                height: 10px;
                                border-right: #eee 0px solid;
                                border-bottom: #ddd 1px solid;
                                position: absolute;
                                right: 0;
                                bottom: 0;
                            }
                            a {
                                display: inline-block;
                                padding: 0 5px;
                            }
                        }
                        .mini {
                            color: #ccc;
                            padding-top: 2px;
                            width: 118px;
                            text-align: right;
                        }
                    }
                    .content {
                        flex: 1 1 auto;
                        .children {
                            font-size: 14px;
                            ul {
                                padding: 0;
                                margin: 0;
                                list-style: none;
                                li {
                                    display: inline-block;
                                    padding: 1px 2px;
                                    a {
                                        background-color: #ccc;
                                        display: block;
                                        line-height: 24px;
                                        padding: 0 10px;
                                        border-radius: 20px;
                                        color: #fff;
                                        &:hover {
                                            background-color: #46bd87;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                        .links {
                            line-height: 18px;
                            padding-top: 5px;
                            ul {
                                padding: 0 0 0 10px;
                                margin: 0;
                                list-style: none;
                                border-color: #ccc;
                                li {
                                    display: inline-block;
                                    a {
                                        padding: 0 5px;
                                        color: #ccc;
                                        font-size: 12px;
                                        border-radius: 3px;
                                        line-height: 16px;
                                        &:hover {
                                            color: #46bd87;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }↥
            home.styl ▾
                ↧.brick-wall {
                    ul, li {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }
                    ul {
                        padding: 0;
                        background: #F9F9F9 url('/images/test2.jpg') no-repeat 0 bottom / 100% auto;
                        display: flex;
                        flex-flow: row wrap;
                    }
                    li {
                        flex: 1 0 200px;
                        a {
                            display: block;
                            font-size: 14px;
                            font-weight: blod;
                            width: 100%;
                            height: 100px;
                            box-sizing: border-box;
                            padding: 10px;
                            border: #fff 3px solid;
                            text-align: left;
                            position: relative;
                            color: #169a73;
                            &:after {
                                content: '';
                                display: block;
                                width: 0;
                                height: 0;
                                border-style: solid;
                                border-color: #f0f0f0 #fff #fff #f0f0f0;
                                border-width: 7px;
                                position: absolute;
                                right: -1px;
                                bottom: -1px;
                            }
                            &:hover {
                                background-color: #3eaf7c;
                                color: #fff;
                                text-decoration: none !important;
                            }
                        }
                    }
                }↥
            formatter.styl ▾
                ↧// 运行命令
                // hello> npm run dev
                .run-command {
                    background-color: #ccc;
                    color: #fff;
                    display: inline-block;
                    padding-right: 2px;
                    line-height: 13px;
                    &:after {
                        content: '>';
                    }
                }

                // 折叠详情
                .fold-detail {
                    display: inline-block;
                    .detail-desc {
                        background-color: #f9f9f9;
                        cursor: pointer;
                        padding-right: 5px;
                        font-weight: bold;
                        display: inline-block;
                        line-height: 13px;
                        &:after {
                            content: '▼';
                            display: inline-block;
                            margin-left: 8px;
                            transform: scaleX(1.2) scaleY(0.7);
                        }
                    }
                    .detail-content {
                        border: #f00 0px solid;
                        display: none;
                        color: #ccc;
                    }
                    &.active .detail-content {
                        display: block;
                    }
                    &.active .detail-desc:after {
                        content: '▲';
                    }
                }

                // 注释
                .comment { color: #ccc; font-weight: normal; }
                .comment.color1 { color: #d7acac; }
                .comment.color2 { color: #b8a9ce; }
                .comment.color3 { color: #acbfd7; }
                .comment.color4 { color: #a4d3d3; }
                .comment.color5 { color: #aad4a2; }
                .comment.color6 { color: #f0cd87; }

                // 点缀    
                .i0, .i1, .i2, .i3, .i4, .i5, .i6, .i7, .i8, .i9, .order1, .order2, .order3, .order4, .order5, .order6, .order7, .order8, .order9, .order10 { font-weight: bold; font-style: normal; position: relative;}
                .i0 { color: #4975a4; }
                .i1, .order1 { color: #eb9b00; }
                .i2, .order2 { color: #00cf00; }
                .i3, .order3 { color: #009ceb; }
                .i4, .order4 { color: #a523e8; }
                .i5, .order5 { color: #ff3a3a; }
                .i6, .order6 { color: #7bbb00; }
                .i7, .order7 { color: #00c381; }
                .i8, .order8 { color: #5454ff; }
                .i9, .order9 { color: #ec33ae; }
                .order10 { color: #e0d400; }
                .order1::before, .order2::before, .order3::before, .order4::before, .order5::before, .order6::before, .order7::before, .order8::before, .order9::before, .order10::before {
                    font-size: 18px; line-height: 18px; vertical-align: middle; position: absolute; top: -3px; left: -11px;
                }
                .order1::before { content: '❶'; }
                .order2::before { content: '❷'; }
                .order3::before { content: '❸'; }
                .order4::before { content: '❹'; }
                .order5::before { content: '❺'; }
                .order6::before { content: '❻'; }
                .order7::before { content: '❼'; }
                .order8::before { content: '❽'; }
                .order9::before { content: '❾'; }
                .order10::before { content: '❿'; }

                // 弹性盒子
                .box-flex {
                    display: flex;
                    .box-flex-item {
                        flex-shrink: 0;
                        flex-basis: 1%;
                    }
                    .flex-1 {
                        flex-grow: 1;
                    }
                    .flex-2 {
                        flex-grow: 2;
                    }
                    .flex-3 {
                        flex-grow: 3;
                    }
                }↥
    用插件协助代码解析
        .vuepress/config.js ▾
            ↧module.exports = {
                plugins: [
                    require('./vuepress-plugin-super-block'), // path.resolve(__dirname, './vuepress-plugin-super-block/index.js')
                ]
            }↥
        .vuepress/vuepress-plugin-super-block/index.js ▾
            ↧const path = require('path')
            /**
             * @param {*} options 插件的配置选项
             * @param {*} ctx 编译期上下文
             * @returns
             */
            module.exports = (options, ctx) => {
                return {
                    name: 'vuepress-plugin-super-block',
                    async ready() {
                        console.log('********Hello World superblock!');
                    },
                    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
                }
            }↥
        .vuepress/vuepress-plugin-super-block/clientRootMixin.js ▾
            ↧// 可以控制根组件的生命周期
            export default {
                created () {
                    console.log('created');
                },
                mounted () {
                    console.log('mounted')
                },
                updated() {
                    console.log('updated')
                    document.querySelectorAll('pre').forEach(el => {
                        //el.innerHTML = el.innerHTML.replace(/\{TEMPLATE\{/g, '{{').replace(/\}TEMPLATE\}/g, '}}')
                        //console.log(document.querySelector('body').innerHTML.match(/\{TEMPLATE\{/));
                        const arr = el.innerHTML.match(/\{TEMPLATE\{/g)
                        if (arr) {
                            console.log(arr);
                            el.innerHTML = el.innerHTML.replace(/\{TEMPLATE\{/g, '{{').replace(/\}TEMPLATE\}/g, '}}')
                        }
                    })
                    const $details = document.querySelectorAll('.detail-desc')
                    $details.forEach(dom => {
                        dom.addEventListener('click', e => {
                            let tar = e.currentTarget.parentNode
                            tar.className = tar.className === 'fold-detail' ? 'fold-detail active' : 'fold-detail'
                        })
                    })
                },
                // 生产环境的构建结束后被调用
                async generated (pagePaths) {
                    console.log('generated')
                }
            }↥


[##] 聚合与维持
notebook/docs/.data/RES_INFO.json ▾
    ↧{
        links:[],
        editTime: ''
    }↥
notebook/docs/.data/
    KEY_RES.json       // 索引关键词  搜索 下拉
    TIT_RES.json       // 索引标题    搜索 下拉
    RES_SCENE.json     // 暴露的场景  主题 
    RES_USAGE.json     // 暴露的攻略  主题
    RES_SOLUTION.json  // 暴露的方案  主题
    RES_STANDARD.json  // 暴露的标准  主题
    RES_LINK.json      // 采集链接    外链






[######] 开发规范
    &#45; Markdown点列表
    &#42;*行内加粗*&#42;

    &#35; 标题文本
    [&#35;] 反相标题
    标题 [1][2][3][4][5][6] [fff#1#333]颜色#等级#背景
    序号标题 (1)(2)(3)(4)(5)(6)(7)(8)(9)

    &#9658;全局点缀&#9668;
    1&#9658;预设颜色1-9&#9668;
    
    // 单行注释给你
    /* 多行注释 */

    &#91;img:$withBase('/images/插入图片.jpg')&#93; 

    行样式&#91;{color:#f00}(bd)&#93;    
    &#91;盒样式{color:#f00}(bd)&#93;

    Description Of Detail &#9662;{color:#3ac}
    &#8615;Detail Content&#8613;

    &#9632;⇤&#123;&#125;&#40;bd&#41;盒子：包装一个块级元素&#9632;  // ⇤为是否顶格
    ■⇤{}(bd)CONTENT■
    ↴background-color:#eef7f4; vertical-align:top; padding:10px↤包装一个行级元素↦

    表单:
    ﹃
        ⊙Radio◉
        ☐Checkbox▣
        ⅠInput▏
        ▎Textarea▎
        ▭ Button▭
        ▼ Select
        ▤Table▥
        ☰List☷
        ▮Tab▯
        TreeSelect
        ↦ ↔ → ⇥ Step
        ⚠Alert⊗
    ﹄
[######] 内容规范
    搜索
        埋码：1.[KEY#id:KEY1KEY2KEY3] 2.# 标题 
        数据：
        "KEY1KEY2KEY3":filename#id

    链接
        引入：[优先标题:vuepress#id]
        埋码：[ANCHOR#id:入库标题] 
        数据： ▾
            ↧vuepress:{
                path:'', 
                links: {
                    usage: '入库标题'
                }
            }↥
    场景Scene
        ◒ Identity:场景名称
        
        ◓ 
        数据：[
            {Identity:{
                title:'场景名称',
                res: 'reskey'
            }}
        ]
    攻略Usage
        
        ★ Identity:攻略名称
        1 第一点
        2 第二点
        3 第三点
        ☆
        数据：[
            {Identity:{
                title:'攻略名称',
                res: 'reskey',
                steps: ['第一点','第二点','第三点']
            }}
        ]
    方案Solution
        ✿ Identity:方案名称❀
        数据：[
            {filename: [
                {
                    id: '',
                    title:'方案名称',
                    "需求分析": {
                        1: '产品需要什么样的内容和效果'
                        2: '技术上需要做哪些工作才能达到产品要求'
                        3: '技术上有哪些指标'
                    },
                    "产品要求": {},
                    "技术应对": {},
                    "技术指标": {},
                    "架构设计": {}
                }
            ]}
        ]
        展示：<a href="path#id">&#91;方案名称:solution#filename-id&#93;</a>
    标准Standard
        ◐ Identity:标准名称
        ◑
        数据：[
            {Identity:{
                title:'标准名称',
                res: 'reskey',
                list: [
                    {"标准一": "标准一文案"}
                    {"标准二": "标准二文案"}
                ]
            }}
        ]
    ❖ 项目Project

[######] config.js    
    资源调度 // 应对重构导至的工具、插件等变更
[######] 文档体系
    结构：树形        
    作用：生成成体系的文档系统，可扩展、重构、穿插、链接、特种图形图表、层次表达、主次表达等
    目标：响应变动，包括增删改，搜索
    实现：响应增删改：watch-tree.js
         搜索：依赖资源收集的数据：SEARCH_KEY.js、SEARCH_TITLE.js等
[######] MD文件的命名规范
- 扁平化文件管理，保持文件名唯一，防止资源树重构造成的路径改变，文件名可用于资源、链接索引

[######] 链接方案
依赖md文件的命名规范
- 目标
    1. 格式 &#91;链接名&#93;&#40;url&#41; 面临链接地址变更的问题
    2. 链接数可自动提取
    3. 可扩展
- 场景
    【内容】里需要外链的【数据块】做【标识】
    解析内容时提取【标识】入库【】
    在需要插入链接的地方插入【链接】引用【标识】从【】
标识基于文件名 避免目录变更引起的资源丢失
"1627903874915": {
    "stamp": "1627903874915",
    "path": "/biaozhun/README",
    "name": "gulp"
}

create-resource.js
vuepress: {
    path: '/framework/vuepress' // 资源树路径    
}
create-links.js
目标 [######] 链接方案

{
    vuepress: {
        "链接方案": {href:}
    }
}



[######] 配置与调度
docs/.usage/config.js
{
    "DATA": {
        "main": "data/.MAIN.js",                       // 主数据
        "src:path": "data/.SRC_PATH.json",             // 用于：编辑资源文件时查找主数据路径
        "src:updateTime": "data/.SRC_UPDATETIME.json", // 用于：编辑资源文件时记录更新时间
        "path:data": "data/.PATH_DATA.json",           // 用于：编辑资源文件时记录更新时间     
        "creator": "data/.CREATOR.json",               // 用于：创建目录与文件的依据
        "stamp:link": "data/.STAMP_LINK.json",         // 解析内容时收集的链接表
        "scene": "data/.SCENE.json",                   // 场景
        "usage": "data/.USAGE.json",                   // 攻略
        "solution": "data/.SOLUTION.json",             // 方案
        "standard": "data/.STANDARD.json",             // 标准
        "path:keywords": "data/.PATH_KEYWORDS.json",   // 数据结构关键词
        "path:search": "data/.SEARCH.json",            // 可用于搜索(数据结构和内容摘要)
    },
    "UTILS": {
        "fs": "scripts/utils/fs",
        "ewan": "scripts/utils/ewan.js",
        "regexp": "scripts/utils/regexp.js"
    },
    "CORE": {
        "create": "core/create.js",
        "create-file": "core/create-file.js",
        "create-file-parse.js": "core/create-file-parse.js"
    },
    "PARSE": {
        "flex": "core/parse/flex.js",
        "uml": "core/parse/uml.js",
        "custom-block": "core/parse/custom-block.js",
        "anchor": "core/parse/anchor.js",
        "search": "core/parse/search.js"
    },
    "FILE": {
        "package": "../../package.json",
        ".vuepress/config": "../.vuepress/config.js",
        "logo": "../.vuepress/public/logo.png",
        "doc.scene": "../scene.md",
        "doc.usage": "../usage.md",
        "doc.solution": "../solution.md",
        "doc.standard": "../standard.md"
    },
    "RES": {
        "logo": "resources/images/logo.png",
        "markdown.scene": "resources/md/scene.md",
        "markdown.usage": "resources/md/usage.md",
        "markdown.solution": "resources/md/solution.md",
        "markdown.standard": "resources/md/standard.md"
    }
}
{
    config: {},
    dependencies: [],
    aliasCommand: {},
    fetch = identifier => { const [type, key] = identifier.split('|'); return fetchFileByType[type](key) },
    fetchPath = identifier => { const [type, key] = identifier.split('|'); return fetchPathByType[type](key) },
    read = identifier => { const [type, key] = identifier.split('|'); return readFileByType[type](key) }
}
用法：
    const {fetch} = require('../config')
    fetch('UTILS|fs')
    fetch("DATA|creator")
    fetch('CORE|create-file')
===-


[官网](https://vuepress.vuejs.org/zh/guide/)

::: details Q&A
```
锚链接失效
    [用户帐户体系](/solution#用户帐户体系sdk) 改为 [用户帐户体系](/solution.html#用户帐户体系sdk)

```
:::

## 
::: details
demo> npm init -y<br>
demo> npm install -D vuepress
1. demo/docs/README.md  `# Hello VuePress `
2. demo/package.json    `"scripts": { "docs:dev": "vuepress dev docs", "docs:build": "vuepress build docs" }`
3. npm run docs:dev
:::

## 最佳实践
::: details
项目根目录/
1. 创建 docs 目录
2. 复制 .usage 到 docs/
3. 基础部署 node docs/.usage/deploy.js
4. docs/README.md
    `# 文档部署`
5. npm run docs:dev
- 附 
> 创建地图文件 node docs/.usage/create.js<br>
> 创建指定文件 node docs/.usage/create.js /scene /tools/npm<br>
> 地图数据测试 node docs/.usage/siteMapTest.js <br>
> 收集更新攻略 node docs/.usage/updateUsage.js<br>
> 收集更新场景 node docs/.usage/updateScene.js<br>

- 部署到一个非根路径: .vuepress/config.js  `module.exports = {base: '/bar/'}`
- 公共资源库: .vuepress/public/
- 图片资源: .vuepress/public/images/  `<img :src="$withBase('/images/logo.png')">`
- 背景图片：background-image url($withBase('/images/content-bg.png')) 10px 50px no-repeat
:::

## 基础配置
::: details
```js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {},                    // #默认主题配置
  base: '/bar/',                      // 当站点被部署到一个非根路径
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  },
  // 被注入页面 HTML <head> 额外的标签
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }]
  ],
  port: '8080',           // 指定用于dev服务器的端口
  dest: '.vuepress/dist', // 指定vuepress build的输出目录
}
```
:::

## 基础配置-默认主题
- docs/.vuepress/config.js
::: details
```js
module.exports = {
  themeConfig: {
    /** 全局 **
     * 1 显示所有页面的标题链接 默认只显示当前页标题
     * 2 活动的标题链接(浏览器地址栏)禁用 默认启用
     * 3 启用页面滚动效果 默认值false
     * 4 上一篇/下一篇 默认值true
     * 5 Algolia全文搜索 会覆盖内置搜索框
     * 6 内置搜索框 默认搜索结果数量10 设置页面tags可优化搜索结果 禁用搜索框: search: false */
    displayAllHeaders: false,
    activeHeaderLinks: false,
    smoothScroll: false, 
    nextLinks: true, prevLinks: true,
    algolia: {apiKey: '<API_KEY>', indexName: '<INDEX_NAME>'},
    searchMaxSuggestions: 10,

    /** 导航栏 **
     **********************************************************************
      * 包含LOGO、页面标题、搜索框、 导航栏链接、多语言切换、仓库链接等
      * 公共资源库：docs/.vuepress/public/logo.png
      * 菜单写法：普通菜单、外链菜单、下拉菜单、下拉菜单子类分组
      * 禁用导航栏: navbar: false */
    logo: '/logo.png', 
    nav: [
      { text: 'Home', link: '/' },                                              
      { text: 'External', link: 'https://google.com', target:'_self', rel:'' }, 
      {                                                                         
        text: 'Languages',
        ariaLabel: 'Language Menu',          
        items: [{ text: 'Chinese', link: '/language/chinese/' }, { text: 'Japanese', link: '/language/japanese/' }] // 普通子目录          
        items: [                                                                                                    // 分组子目录
          { text: 'Group1', items: [{ text: 'Chinese', link: '/language/chinese/' }] }, 
          { text: 'Group2', items: [{ text: 'Japanese', link: '/language/japanese/' }] }
        ] 
      }
    ],

    /** 侧边栏
     **********************************************************************
      * 禁用侧边栏：sidebar: false
      * 自动侧栏：sidebar: 'auto'
      * 嵌套深度 sidebarDepth: 1 默认为 1 为0时禁用标题链接 注：重写深度
      * 普通菜单：自动获取链接文本、显式指定链接文本、嵌套标题链接
      * 分组菜单：组标题(必要),跳转链接(可选),可折叠(可选默认true/false),深度(可选默认1/2...),初始展开(可选默认0/-1),子类
      * 多个侧边栏:依赖文件组织结构 '/foo/'对应docs/foo/ 'one'对应docs/foo/one.md */
    sidebar: [
      '/',                             
      ['/b', 'Explicit link text'],
      {title: "工具", collapsable: false, children:[['../tools/doc/', '文档'], ['../tools/webpack/', 'Webpack']]}
    ],
    sidebar: [
      {title: 'Group 1', path: '/foo/', collapsable: false, sidebarDepth: 1, initialOpenGroupIndex: -1, children: ['/']},
      {title: 'Group 2', children: [ /* ... */ ]}
    ],
    sidebar: {'/foo/': ['', 'one', 'two'], '/bar/': ['', 'three', 'four']},

    /** Git仓库和编辑链接
     **********************************************************************
      * 1 假定是GitHub. 同时也可以是一个完整的 GitLab URL
      * 2 自定义仓库链接文字。默认自动推断为"GitHub"/"GitLab"/"Bitbucket" 或"Source"
      * 3 假如你的文档仓库和项目本身不在一个仓库：
      * 4 假如文档不是放在仓库的根目录下：
      * 5 假如文档放在一个特定的分支下：
      * 6 默认是 false, 设置为 true 来启用
      * 7 默认为 "Edit this page" */        
    repo: 'vuejs/vuepress',            
    repoLabel: '查看源码',             
    docsRepo: 'vuejs/vuepress',        
    docsDir: 'docs',                   
    docsBranch: 'master',             
    editLinks: true,                  
    editLinkText: '帮助我们改善此页面！'
  }
}
```
:::
- 页面级配置
```front matter
---
navbar: false
sidebar: false   禁用侧边栏
sidebar: auto    自动侧栏
sidebarDepth: 2  重写侧栏深度
search: false
tags:            设置tags优化搜索结果
  - 配置
  - 主题
  - 索引 
prev: ./page1    上一篇
next: false      下一篇
editLink: false  禁用编辑链接
pageClass: custom-page-class  便针对该页添加一些专门的CSS 参考##自定义CLASS
---
```
- 路由级配置
```js
  themeConfig: {
    '/zh/': {
      navbar: false,
      sidebar: false,
      sidebar: auto,
      sidebarDepth: 2,
      search: false
    }
  }
```


## 默认主题改造
- 克隆默认主题代码 `vuepress-demo/docs> vuepress eject`  
  1. 使用vuepress命令,需全局安装VUEPRESS：**npm i vuepress -g**
  2. 代码会克隆到 vuepress-demo/docs/.vuepress/theme/ 下

::: details 样式调整
```styl
--------------------------------styles/index.styl
html, body
                                                    font-size 12px        字号基础值
body
  font-size 16px                                    x       

blockquote                                                                引用块      
  margin 1rem 0                                     margin 0.5rem 0
  padding .25rem 0 .25rem 1rem                      padding 0 0 0 1rem

ul, ol
                                                    margin: 0.3rem 0

p, ul, ol
  line-height 1.7                                   line-height 1.2

--------------------------------styles/wrapper.styl
$wrapper                                          
  max-width $contentWidth                           max-width none        页面内容宽

--------------------------------styles/code.styl                          代码块
{$contentClass}
pre, pre[class*="language-"]
  line-height 1.0                                   line-height 1.2
  padding 1.25rem 1.5rem                            padding 0.2rem 1.5rem 0.4rem 1.5rem
  margin 0.85rem 0                                   margin 0.5rem 0

--------------------------------styles/custom-blocks.styl                 自定义代码块
参考：自定义容器
```
:::

::: details 自定义容器
1. docs/.vuepress/theme/index.js
```js
plugins: [
    ['container', {type: 'customname', before: info => `<div class="custom-block customclass">${info ? `<summary>${info}</summary>` : ''}\n`, after: () => '</div>\n'}]
]
```
2. docs/.vuepress/theme/styles/custom-blocks.styl
```css
.custom-block
  .customclass
    color #f00
```
:::


## 自定义主题 
精简版：
- 创建目录：.vuepress/theme
- 创建文件：.vuepress/themeLayout.vue

项目版：
```
.vuepress/theme
  ├── global-components           自动注册为全局组件
  │   └── xxx.vue
  ├── components                  普通Vue组件
  │   └── xxx.vue
  ├── layouts                     布局组件
  │   ├── Layout.vue              所有的页面会将此组件作为默认布局 #开发Layout.vue
  │   ├── AnotherLayout.vue       ----如有其它布局的需求: 1.创建此文件  2.在有此需求的.md文件顶部标识为 ---回车layout: AnotherLayout回车---
  │   ├── GlobalLayout.vue        ----如想设置全局的UI如<header> #使用全局布局组件
  │   └── 404.vue                 ----匹配不到的路由
  ├── styles                      全局的样式和调色板
  │   ├── index.styl
  │   └── palette.styl
  ├── templates                   修改默认的模板文件
  │   ├── dev.html
  │   └── ssr.html
  ├── index.js                    主题文件的入口文件 如缺失 需要将package.json中的"main"字段设置为layouts/Layout.vue
  ├── enhanceApp.js               主题水平的客户端增强文件
  └── package.json
```


#### 主题应用插件
.vuepress/theme/index.js
```js
module.exports = {
  plugins: [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: true
    }
  ]
}
```

#### 开发Layout.vue
  - .vuepress/theme/index.js
  ```js
    module.exports = {
      // Layout.vue不需要显式暴露
    }
  ```
  - .vuepress/theme/layouts/Layout.vue
    需要用到的组件都写到 .vuepress/theme/components 下
    ```vue
    <template>
      <div>
        <Header />
        <Content />
      </div>
    </template>

    <script>
    import Header from "../components/Header"
    export default { components: { Header } }
    </script>
    ```
  - demo> npm run docs:dev

#### 使用全局布局组件
  - .vuepress/theme/index.js 
  ```js
    module.exports = {
      globalLayout: './layouts/GlobalLayout.vue'
    }
  ```
  - .vuepress/theme/layouts/GlobalLayout.vue
  ```vue
  <template>
    <div id="global-layout">
      <header><h1>Header</h1></header>
      <component :is="layout"/>
      <footer><h1>Footer</h1></footer>
    </div>
  </template>
  <script>
  export default {
    computed: {
      layout () {
        if (this.$page.path) {
          if (this.$frontmatter.layout) {
            // 你也可以像默认的 globalLayout 一样首先检测 layout 是否存在:https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/components/GlobalLayout.vue
            return this.$frontmatter.layout
          }
          return 'Layout'
        }
        return 'NotFound'
      }
    }
  }
  </script>
  ```
  - demo> npm run docs:dev

#### 集成第三方到主题
  - npm init -y
  - .vuepress/theme> npm i element-ui --save
  - 如果要按需引入 则
    .vuepress/theme> npm i babel-plugin-component --save-dev<br>
    .vuepress/theme/.babelrc `{"presets": [["es2015", { "modules": false }]], "plugins": [["component", {"libraryName": "element-ui", "styleLibraryName": "theme-chalk"}]]}`
  - .vuepress/theme/enhanceApp.js
    ```js
    import ElementUI from 'element-ui' /* {Menu, Submenu, MenuItem, MenuItemGroup} */
    import 'element-ui/lib/theme-chalk/index.css';

    export default ({
      Vue,     // VuePress 正在使用的 Vue 构造函数
      options, // 附加到根实例的一些选项
      router,  // 当前应用的路由实例
      siteData // 站点元数据
    }) => {
      Vue.use(ElementUI);
      /* Vue.use(Menu); Vue.use(Submenu); Vue.use(MenuItem); Vue.use(MenuItemGroup) */
    }
    ```


## 样式组件
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

```md
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::
```




## 主页
docs/README.md
```
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。

>>>>>>>>>>【YAML front matter】体外的内容将以普通的 markdown 被渲染并插入到这里 <<<<<<<<<<

footer: MIT Licensed | Copyright © 2018-present Evan You
---
```
- heroText: null // 禁用标题
- tagline: null  // 禁用副标题


## 自定义CLASS
```
---
pageClass: custom-page-class 
---

docs/.vuepress/styles/index.styl
.theme-container.custom-page-class {
  /* 特定页面的 CSS */
}
```

## 自定义布局
```
---
layout: SpecialLayout
---


```

## 自定义格式

===+
:::FLEX
+++ 1
<strong>■ 资源</strong>
- [icomoon](http://icomoon.io/app)
+++
+++ 2
<strong>■ 常用工具</strong>
- [JSRun](https://jsrun.net/new)
+++
+++ 1
<strong>■ 平台&文档</strong>
- [GitHub](https://github.com/)
+++
FLEX:::
===-





