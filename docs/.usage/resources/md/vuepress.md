

{
    namespace: 'VUEPRESS',
    links: []
}

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
    const Path= require("path")

    // 递归创建目录 同步方法
    function checkDirSync(dirname) {
        if (fs.existsSync(dirname)) {
            // console.log('目录已存在：' + dirname)
            return {message: "目录已存在", state: 1}
        } else {
            if (checkDirSync(Path.dirname(dirname))) {
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
            if (ifNoCreateOne) {
                checkDirSync(Path.dirname(path))
                if (!fs.existsSync(path)) module.exports.writeFileSync(path, `新建文件：${path}`)
            }
            return fs.readFileSync(path, 'utf8')
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
        let arr = path.substring(1).split('/'), res = data, prop
        while (prop = arr.shift()) {prop && (res = res.children[prop])}
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
        //const {fetch} = require('../config')
        const { writeFile, readFile } = require('../../.deploy/fs')
        // const SRC_UPDATETIME = fetch("DATA|src:updateTime")
        const parseCode = require('./parseCode')

        module.exports = (fullPath, target) => {
            let content
            let childrenContent = '' // 主题子类 
            let linksContent = ''    // 主题链接
            let contentHeader = ''   // 主题标题、说明、详情
            let staticContent = ''   // 资源静态内容
            let date = new Date()
            let modifyData = 'N ' + date.toJSON().slice(0, 10).replace(/-/g, '.') + ' ' + date.toString().match(/(\d{2}\:\d{2})\:\d{2}/)[1] // 创建或更新时间

            // 主题子类
            //if(target.children) childrenContent = `<div class="custom-block children"><ul>${target.children.map(({path, title}) => `<li><a href="${path}">${title}</a></li>`).join('')}</ul></div>`   
            if(target.children) {
                let liItems = ''
                for (i in target.children) {
                    const {path, title} = target.children[i]
                    liItems += `<li><a href="${path}">${title}</a></li>`
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
                let file = readFile(PATH.resolve(__dirname, '../md/'+target.src+'.md'), true)        
                file = parseCode(file, target.path) // 解析代码        
                //SRC_UPDATETIME[target.src] && (modifyData = 'M ' + SRC_UPDATETIME[target.src]) 
                staticContent += `${file}\n`
            }
            let recordContent = target.prarent ? `<a class="back" href="${target.prarent.path}">上一级</a><a class="back" href="javascript:history.back();">返回</a>` : `<a class="back" href="javascript:history.back();">返回</a>`
            content = `---\npageClass: theme-item\n---\n<div class="extend-header">
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
        </div>`                 
            writeFile(fullPath + '.md', content)
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
        ↧✪const { fetch } = require('../../config')
        const Search = fetch('PARSE|search')
        const Aggregate = fetch('PARSE|aggregate')
        const { regexpPresetParse, PRESET_CSS } = fetch('UTILS|regexp-preset')


        let TAG_MAP_BLOCK = {}, block_count = 0
        const REG_STYLE_STR = `(\\{[\\w\\s-;:'"#]+\\})?` // color: #f00; font-size: 14px
        const REG_CLASS_STR = `(\\([\\w\\s-]+\\))?`      // bd sz-16 c-0

        function parseCustomBlock(block, path) {    
            

            block = block.replace(/\</g, "&lt;").replace(/\>/g, "&gt;")

            3// ❖ 项目Project
            if (/(❖\s项目Project)/.exec(block)) {
                block = block.replace(RegExp.$1, `<div>工具</div>`)
            }

            
            2// 聚合之采集
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
                Search.add(path, RegExp.$2)
            }
            while (/(\*\*([0-9a-zA-Z\u4e00-\u9fa5_-]+)\*\*)/.exec(block) !== null) {
                block = block.replace(RegExp.$1, `<strong>${RegExp.$2}</strong>`)
                Search.add(path, RegExp.$2)
            } 

            // 模板符{{}}用图片表示
            // block = block.replace(/\{\{/g, `<img :src="$withBase('/images/db-brace-left.png')">`)  
            // block = block.replace(/\}\}/g, `<img :src="$withBase('/images/db-brace-right.png')">`)
            block = block.replace(/\{\{/g, `&#123; &#123;`)  
            block = block.replace(/\}\}/g, `&#125; &#125;`)

            // 命令行示意
            while (/^\x20*(([\w-\/]+)\&gt;)\s[^\r\n]+/m.exec(block) !== null) {
                block = block.replace(RegExp.$1, `<span class="block-command">${RegExp.$2}</span>`)
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
                {DETAIL_FORMAT: [{DETAIL_INDENT: `\\x20*`}, {TITLE: `.+`}, `\\s▾`, {STYLE: REG_STYLE_STR}, {COMMENT:`[^\\n]*`}, `[\\r\\n]`, {CONTENT_INDENT: `\\x20*`}, `↧`, {CONTENT: `[^↥]+`}, `↥`]}
            ])
            const REG_DETAIL = new RegExp(REG_DETAIL_STR.value) 
            // const REG_DETAIL = /(?<DETAIL_FORMAT>((?<DETAIL_INDENT>\x20*)(?<TITLE>.+)\s▾(?<STYLE>(\{[\w\s-;:'"#]+\})?)(?<COMMENT>\s*(.+)?)[\r\n](?<CONTENT_INDENT>\x20*)↧(?<CONTENT>[^↥]+)↥))/
            let detailMatch
            while ((detailMatch = REG_DETAIL.exec(block)) !== null) {
                let {DETAIL_FORMAT, DETAIL_INDENT, TITLE, STYLE, COMMENT, CONTENT_INDENT, CONTENT} =  detailMatch.groups, descStyle = 'class="detail-desc"'
                if (STYLE) descStyle += ` style="${STYLE.replace('{', '').replace('}', '')}"`
                block = block.replace(DETAIL_FORMAT, `<div class="block-detail">${DETAIL_INDENT}<span ${descStyle}>${TITLE}</span><span class="comment">${COMMENT}</span><div class="detail-content">${CONTENT_INDENT}<span>${CONTENT}</span></div></div>`)
            }

        ✪↥
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
    const diffPath = []
    const addChild = (node, path) => {
        if (node.children) {
            diffPath.push(path + '/')
            addChildren(node.children, path + '/')
        } else {
            diffPath.push(path)
        }
    }
    const addChildren = (children, parentPath) => {for (var key in children) {addChild(children[key], parentPath + key)}}
    function handleDataChildren(oChildren, nChildren, parentPath) {for (key in nChildren) { compareDiff(oChildren[key], nChildren[key], key, parentPath) }}
    function compareDiff(oNode, nNode, key, parentPath) {
        let path = parentPath + key    
        if (nNode.children) {
            path += '/'
            if (oNode.children) {
                handleDataChildren(oNode.children, nNode.children, path)
            } else {
                diffPath.push(path)
                addChildren(nNode.children, path)
            }        
        }
        for (var key in nNode) {
            if (key === 'children' || key === 'path' || key === 'scene' || key === 'usage' || key === 'links') continue
            if (nNode[key] !== oNode[key]) diffPath.push(path)
        }
    }

    chokidar.watch(Path.resolve(__dirname, 'index.js'))
        .on('error', error => log(`data监听错误: ${error}`)) 
        .on('change', path => {
            delete require.cache[require.resolve('./index')]
            setTimeout(() => {
                const dataFile2 = require('./index')
                compareDiff(dataFile, dataFile2, '', '')
                if (diffPath.length) {
                    exec(`node ${Path.resolve(__dirname, 'data-create.js')} ${diffPath.join(' ')}`, function(error, stdout, stderr) {
                        error && console.log(error)
                        stdout && console.log(stdout)
                        stderr && console.log(stderr)
                    })
                }            
                diffPath.length = 0
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
                let {title} = children[i]
                childStr += `- &#91;︳${title}&#93;(/${i})\n`
            }
            content = `---\nsidebar: false\n---\n\n<div class="root-children block-main">\n\n${childStr}\n</div>\n\n## 文档地图\n` + content
            writeFile(path + '.md', content)
        }↥
notebook/docs/.data/res-watch.js ▾{background-color:#6d6;color:#fff}
    ↧const exec = require('child_process').exec, Path = require('path'), chokidar = require('chokidar')

    chokidar.watch(Path.resolve(__dirname, './md'))
        .on('error', error => log(`资源监听错误: ${error}`)) 
        .on('change', path => {            
            /md[\\\/]([\w-]+)\.md/.exec(path)
            if (RegExp.$1) { 
                exec(`node ${Path.resolve(__dirname, 'res-create.js')} ${RegExp.$1}`, function(error, stdout, stderr) {
                    error && console.log(error)
                    stdout && console.log(stdout)
                    stderr && console.log(stderr)
                })
            }        
        })↥

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





