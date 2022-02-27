---
pageClass: theme-item
---
<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>M 2022.02.27 06:34</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>Vuepress</h1><strong>Vuepress</strong>
</div>
<div class="static-content">



{
    namespace: 'VUEPRESS',
    links: []
}



<pre class="code-block">
<span class="h2 bg3 cf"> 入门使用 </span>
notebook/
<span class="block-command">notebook</span> npm init -y
<span class="block-command">notebook</span> npm install vuepress@1.8.2 --save-dev
notebook/docs/
<div class="block-detail"><span class="detail-desc">notebook/docs/README.md</span><span class="comment"> </span><div class="detail-content">    <span>Hello VuePress</span></div></div>
<div class="block-detail"><span class="detail-desc">notebook/package.json</span><span class="comment"></span><div class="detail-content">    <span>"scripts": {
        "docs:dev": "vuepress dev docs", 
        "docs:build": "vuepress build docs"
    }</span></div></div>
<span class="block-command">notebook</span> npm run docs:dev
    http://localhost:8080

<span class="h2 bg3 cf"> 部署基础功能 </span>
notebook/docs/.deploy/
<div class="block-detail"><span class="detail-desc">notebook/docs/.deploy/config.js</span><span class="comment"> 配置 目录定位、资源调度、工具整理、结构配置</span><div class="detail-content">    <span>const PATH = require('path')
    const MAP_DIR = {
        ".vuepress": "../.vuepress"
    }

    module.exports.dir = key =&gt; {
        return PATH.resolve(__dirname, MAP_DIR[key])
    }</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.deploy/index.js</span><span class="comment">  创建 .vuepress 目录</span><div class="detail-content">    <span>const {utils, dir} = require('./config.js')
    const { mkdirSync } = require('./fs.js')

    mkdirSync(dir('.vuepress'), res =&gt; {
        console.log('创建目录：docs/.vuepress', res.message)
    })</span></div></div>
<div class="block-detail"><span class="detail-desc">notebook/docs/.deploy/fs.js</span><span class="comment"></span><div class="detail-content">    <span>const fs = require('fs')
    const Path= require("path")

    <span class="comment">// 递归创建目录 同步方法</span>
    function checkDirSync(dirname) {
        if (fs.existsSync(dirname)) {
            <span class="comment">// console.log('目录已存在：' + dirname)</span>
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
        writeFileSync: (absPath, content, next) =&gt; {
            typeof content !== "string" && (content = JSON.stringify(content, null, 4))
            try {
                fs.writeFileSync(absPath, content)
                next && next()
            } catch (err) {
                console.error(err)
            }        
        },
        writeFile: (absPath, content, success) =&gt; { 
            typeof content !== "string" && (content = JSON.stringify(content, null, 4))
            fs.writeFile(absPath, content, { encoding: 'utf8' }, err =&gt; { 
                if(err){ 
                    console.log(err) 
                } else {
                    success && success()
                    !success && console.log('written: ' + absPath)
                } 
            })
        },
        readFile: (path, ifNoCreateOne) =&gt; {
            if (ifNoCreateOne) {
                checkDirSync(Path.dirname(path))
                if (!fs.existsSync(path)) module.exports.writeFileSync(path, `新建文件：${path}`)
            }
            return fs.readFileSync(path, 'utf8')
        },
        editWritCommonFile: (path, editHandler) =&gt; {
            const fileObj = require(path)
            const next = editHandler(fileObj)
            next && module.exports.writeFile(path, `module.exports = ${JSON.stringify(fileObj, null, 4)}`)
        },
        mkdirSync(absPath, next){
            let res = checkDirSync(absPath)
            next && next(res)
        },
        saveFile(filePath, fileData) {
            return new Promise((resolve, reject) =&gt; {
                <span class="comment">/*fs.createWriteStream(path,[options])
                options &lt;String&gt; | &lt;Object&gt;
                {
                    flags: 'w',
                    defaultEncoding: 'utf8',
                    fd: null,
                    mode: 0o666,
                    autoClose: true
                }
                */</span>
                const wstream = fs.createWriteStream(filePath)
                wstream.on('open', () =&gt; {
                    const blockSize = 128
                    const nbBlocks = Math.ceil(fileData.length / (blockSize))
                    for (let i = 0; i &lt; nbBlocks; i += 1) {
                        const currentBlock = fileData.slice(blockSize * i, Math.min(blockSize * (i + 1), fileData.length),)
                        wstream.write(currentBlock)
                    }
                    wstream.end()
                })
                wstream.on('error', (err) =&gt; { reject(err) })
                wstream.on('finish', () =&gt; { resolve(true) })
            })
        },
        copyFileSync(from, to){
            fs.copyFileSync(from, to)
        },
        existsSync(path) {
            return fs.existsSync(path)
        }
    }</span></div></div>   
<div class="block-detail"><span class="detail-desc">notebook/package.json</span><span class="comment">           添加 deploy 脚本命令</span><div class="detail-content">    <span>"scripts": {
        "deploy": "node docs/.deploy/index.js"        
    }</span></div></div>
<span class="block-command">notebook</span> npm run <span style="color:#0c0">deploy</span> 

<span class="h2 bg3 cf"> 建立文档体系 </span>
notebook/docs/.data/
<div class="block-detail"><span class="detail-desc">notebook/docs/.data/index.js</span><span class="comment"> 数据源</span><div class="detail-content">    <span>module.exports = {
        vue: {
            title: 'Vue', src: 'vue/index',
            links: [{ name: 'vue-element-admin', href: 'vue/vue-element-admin/index' }],
            children: {},
            peripheral: {
                mvvm: { title: 'MVVM模式', src: 'vue/mvvm' }
            }
        }
    }</span></div></div>
<div class="block-detail"><span class="detail-desc">notebook/docs/.data/md/</span><span class="comment"> 资源库</span><div class="detail-content">    <span>vue.md</span></div></div>
    
<div class="block-detail"><span class="detail-desc">notebook/package.json</span><span class="comment"> <span class="comment">// 设置scripts</span></span><div class="detail-content">    <span>"scripts": { 
        "data:create": "node docs/.data/data-create.js", <span class="comment">// 创建DATA到MD</span>
        "data:watch": "node docs/.data/data-watch.js",   <span class="comment">// 监听数据变化创建DATA到MD</span>
        "res:create": "node docs/.data/res-create.js",    <span class="comment">// 创建MD到DOC</span>
        "res:watch": "node docs/.data/res-watch.js"        <span class="comment">// 监听MD变化创建MD到DOC</span>
    }</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.data/data-create.js</span><span class="comment"></span><div class="detail-content">    <span>const Path = require('path')
    const { mkdirSync } = require('../.deploy/fs')
    const createFile = require('./components/createFile')
    const ARG_ARR = process.argv.slice(2)  <span class="comment">// 命令参数</span>
    const DATA = require('./index')

    const PATHS = []
    const PATH_DATA = {}
    const RES_PATH = {}

    <span class="comment">// 数据处理</span>
    function handleDataChildren(node) {
        if (node.children) node.path += '/'
        PATH_DATA[node.path] = node            <span class="comment">// 路径映身数据</span>
        node.src && (RES_PATH[node.src] = node.path)
        PATHS.push(node.path)
        if (node.children) {
            for (key in node.children) { handleData(key, node.children[key], node) }
        }    
    }
    function handleData(key, node, parent) {
        Object.assign(node, {
            parent, 
            key, 
            title: node.title || node.linkName || key, 
            linkName: node.linkName || node.title || key, 
            path: parent ? parent.path + key : ''                      <span class="comment">// 用于数据源查找数据</span>
        })    
        handleDataChildren(node)
    }
    handleData('', DATA, null)

    <span class="comment">// MD生成</span>
    const getDataByPath = path =&gt; {
        path = path.substring(1)
        const arr = path.split('/')    
        let res = DATA, prop
        while (prop = arr.shift()) {
            prop && (res = res.children[prop])
        }
        return res
    }
    const createItem = item =&gt; {
        const ABSOLUTE_PATH = Path.resolve(__dirname, '../' + item.path)
        if (item.path.match(/\/$/m)) {
            mkdirSync(ABSOLUTE_PATH)
            createFile(Path.resolve(ABSOLUTE_PATH, 'README'), item)
        } else {
            createFile(ABSOLUTE_PATH, item)
        }
    }
    PATHS.forEach(path =&gt; {
        let item = getDataByPath(path)    
        item ? createItem(item) : console.warn(path + '创建失败！')    
    })</span></div></div>
<div class="block-detail">    <span class="detail-desc">notebook/docs/.data/components/createFile.js</span><span class="comment"></span><div class="detail-content">        <span>const PATH = require('path')
        <span class="comment">//const {fetch} = require('../config')</span>
        const { writeFile, readFile } = require('../../.deploy/fs')
        <span class="comment">// const SRC_UPDATETIME = fetch("DATA|src:updateTime")</span>
        const parseCode = require('./parseCode')

        module.exports = (fullPath, target) =&gt; {
            let content
            let childrenContent = '' <span class="comment">// 主题子类</span>
            let linksContent = ''    <span class="comment">// 主题链接</span>
            let contentHeader = ''   <span class="comment">// 主题标题、说明、详情</span>
            let staticContent = ''   <span class="comment">// 资源静态内容</span>
            let date = new Date()
            let modifyData = 'N ' + date.toJSON().slice(0, 10).replace(/-/g, '.') + ' ' + date.toString().match(/(\d{2}\:\d{2})\:\d{2}/)[1] <span class="comment">// 创建或更新时间</span>

            <span class="comment">// 主题子类</span>
            <span class="comment">//if(target.children) childrenContent = `&lt;div class="custom-block children"&gt;&lt;ul&gt;${target.children.map(({path, title}) =&gt; `&lt;li&gt;&lt;a href="${path}"&gt;${title}&lt;/a&gt;&lt;/li&gt;`).join('')}&lt;/ul&gt;&lt;/div&gt;`</span>
            if(target.children) {
                let liItems = ''
                for (i in target.children) {
                    const {path, title} = target.children[i]
                    liItems += `&lt;li&gt;&lt;a href="${path}"&gt;${title}&lt;/a&gt;&lt;/li&gt;`
                }
                childrenContent = `&lt;div class="custom-block children"&gt;&lt;ul&gt;${liItems}&lt;/ul&gt;&lt;/div&gt;`
            }
            <span class="comment">// 主题链接</span>
            if(target.links) linksContent = `&lt;div class="custom-block links"&gt;\n&lt;ul class="desc"&gt;\n${target.links.map(({name, href}) =&gt; `&lt;li&gt;&lt;a href="${href}"&gt;${name}&lt;/a&gt;&lt;/li&gt;\n`).join('')}&lt;/ul&gt;\n&lt;/div&gt;`    
            <span class="comment">// 主题标题、说明、详情</span>
            if (target.title || target.desc || target.detail) {
                const titleStr = target.title ? `&lt;h1&gt;${target.title}&lt;/h1&gt;&lt;strong&gt;${target.title}&lt;/strong&gt;\n` : ''
                const descStr = target.desc ? `&lt;summary class="desc"&gt;${target.desc}&lt;/summary&gt;\n` : ''
                const detailStr = target.detail ? `&lt;detail&gt;${target.detail}&lt;/detail&gt;\n` : ''
                contentHeader += `&lt;div class="content-header"&gt;\n${titleStr}${descStr}${detailStr}&lt;/div&gt;`
            }
            <span class="comment">// 资源静态内容</span>
            if (target.src) {
                let file = readFile(PATH.resolve(__dirname, '../md/'+target.src+'.md'), true)
                
                file = parseCode(file, target.path) <span class="comment">// 解析代码</span>
                
                <span class="comment">//SRC_UPDATETIME[target.src] && (modifyData = 'M ' + SRC_UPDATETIME[target.src])</span>

                staticContent += `${file}\n`
            }
            
            content = `---\npageClass: theme-item\n---\n&lt;div class="extend-header"&gt;
            &lt;div class="info"&gt;
                &lt;div class="record"&gt;
                    &lt;a class="back" href="./"&gt;上一级&lt;/a&gt;
                    &lt;a class="back" href="./"&gt;返回&lt;/a&gt;
                &lt;/div&gt;        
                &lt;div class="mini"&gt;
                    &lt;span&gt;${modifyData}&lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="content"&gt;${childrenContent}${linksContent}&lt;/div&gt;
        &lt;/div&gt;
        ${contentHeader}
        &lt;div class="static-content"&gt;
        \n${staticContent}
        &lt;/div&gt;`                 
            writeFile(fullPath + '.md', content)
        }</span></div></div>
<div class="block-detail">    <span class="detail-desc">notebook/docs/.data/components/parseCode.js</span><span class="comment"></span><div class="detail-content">        <span><span class="comment">/**
        * 弹性盒子
        * 目标：&lt;div class="box-flex"&gt;&lt;div class="box-flex-item flex-8"&gt;col 01&lt;/div&gt;&lt;div class="box-flex-item classname" style="flex-basis:100px"&gt;col 02&lt;/div&gt;&lt;/div&gt;
        * 格式：
            ---------- 8             小于等于10 flex-grow: 8
            col 01
            ========== 100classname  大于10 flex-basis: n  可注入自定义classname
            col 02
            ----------
        */</span>
            const parseFlex = code =&gt; {
                let matchFLEX
                while ((matchFLEX = /\-{10,}\s(\d{1,4})([a-z-]*)<a href="[\s\S]+?" target="_blank">\r\n</a>\-{10,}/.exec(code)) !== null) { 
                    let itemSize = matchFLEX[1],
                        itemClass = matchFLEX[2],                
                        itemStyle = '',
                        content = matchFLEX[3]
                    
                    if (itemSize &gt; 10) { itemStyle = ` style="flex-basis:${itemSize}px"` } else { itemClass += ' flex-' + itemSize }
            
                    let matchNext, itemsStr = ''
                    while (matchNext = /([\s\S]+?)={10,}\s(\d{1,4})([a-z-]*)[\r\n]/.exec(content)){                
                        content = content.replace(matchNext[0], '')
                        itemsStr += `\n&lt;div class="box-flex-item ${itemClass}"${itemStyle}&gt;\n${matchNext[1]}\n&lt;/div&gt;`
            
                        itemSize = matchNext[2],
                        itemClass = matchNext[3],                    
                        itemStyle = ''
                        if (itemSize &gt; 10) { itemStyle = ` style="flex-basis:${itemSize}px"` } else { itemClass += ' flex-' + itemSize }                
                    }
                    
                    itemsStr += `\n&lt;div class="box-flex-item ${itemClass}"${itemStyle}&gt;\n${content}\n&lt;/div&gt;`
                    code = code.replace(matchFLEX[0], `&lt;div class="box-flex"&gt;${itemsStr}\n&lt;/div&gt;`)            
                }
                return code
            }
            const parseUML = code =&gt; {
                <span class="comment">// PlantUML图形</span>
                let matchUML        
                while ((matchUML = /```plantuml[\w\W]+?```/.exec(code)) !== null) {     
                    const {name} = handleUML(matchUML[0])
                    code = code.replace(matchUML[0], `&lt;img :src="$withBase('/uml/${name}.png')"&gt;`)         
                }
                return code
            }
            const parseCustomBlock = require('./parseCustomBlock')
            <span class="comment">// const Anchor = fetch('PARSE|anchor')</span>
            <span class="comment">// const Search = fetch('PARSE|search')</span>
            <span class="comment">// const {debounce} = fetch('UTILS|ewan')</span>
            
            
            module.exports = (code, path) =&gt; {
                <span class="comment">// 通用链接</span>
                <span class="comment">//code = Anchor.parseAnchor(code, path) // 锚点</span>
                <span class="comment">//code = Anchor.parseTitle(code, path)  // 标题</span>
                <span class="comment">//code = Anchor.parseLink(code)</span>
            
                code = parseCustomBlock.start(code, path)
                
                code = parseFlex(code) <span class="comment">// 弹性盒子</span>
                code = parseUML(code)  <span class="comment">// 图例</span>
            
                code = parseCustomBlock.end(code)
            
                <span class="comment">//Anchor.save() // 保存链接数据</span>
                
                return code        
            }</span></div></div>
<div class="block-detail">    <span class="detail-desc">notebook/docs/.data/components/parseCustomBlock.js</span><span class="comment"></span><div class="detail-content">        <span>
        <span class="comment">//const Search = fetch('PARSE|search')</span>
        <span class="comment">//const Aggregate = fetch('PARSE|aggregate')</span>
        const { regexpPresetParse, PRESET_CSS } = require('./regexp-preset')

        let TAG_MAP_BLOCK = {}, blockCount = 0
        const REG_STYLE_STR = `(\\{[\\w\\s-;:'"#]+\\})?` <span class="comment">// color: #f00; font-size: 14px</span>
        const REG_CLASS_STR = `(\\([\\w\\s-]+\\))?`      <span class="comment">// bd sz-16 c-0</span>

        function parseCustomBlock(block, path) {
            block = block.replace(/\&lt;/g, "&lt;").replace(/\&gt;/g, "&gt;")

            <span class="comment">// <div>工具</div></span>
            if (/(❖\s项目Project)/.exec(block)) {
                block = block.replace(RegExp.$1, `&lt;div&gt;工具&lt;/div&gt;`)
            }

            
            <span class="comment">// 聚合之采集</span>
            <span class="comment">//block = Aggregate.pick(block, 'vuepress')</span>
            
            <span class="comment">////////////////////////////////// 不会再有嵌套的格式优先解析，避免匹配到多余的其它格式的字符</span>
            <span class="comment">/**
            * 行注释
            * 多匹配一个前置空格 替换时空格移到标签 防止被全等注释二次替换
            * 如：// 注释 <span class="comment">// 注释  解析成：</span>
            * 错误：&lt;span class="comment"&gt;&lt;span class="comment"&gt; <span class="comment">// 注释&lt;/span&gt;&lt;/span&gt; // 注释</span>
            * 正确： &lt;span class="comment"&gt;// 注释&lt;/span&gt;&lt;/span&gt; &lt;span class="comment"&gt;// 注释&lt;/span&gt;&lt;/span&gt;
            */</span>
            const matchComment = block.match(/\s\d?\/\/[^\n\r]+/g) || [];
            matchComment.forEach(e =&gt; {
                let colorClass = '', _e = e.trim(), firstWord = _e.substr(0,1)
                if (!isNaN(firstWord)) {_e = _e.replace(firstWord, ''); colorClass = ' color' + firstWord}
                block = block.replace(e, ` &lt;span class="comment${colorClass}"&gt;${_e}&lt;/span&gt;`)
            }) 
            <span class="comment">// <span class="comment">/* 注释 */</span></span>
            const matchComment2 = block.match(/\d?\/\*[\s\S]*?\*\//g) || [];
            matchComment2.forEach(e =&gt; {
                let firstWord = e.substr(0,1), colorClass = '', _e = e
                if (!isNaN(firstWord)) {_e = _e.replace(firstWord, ''); colorClass = ' color' + firstWord}
                block = block.replace(e, `&lt;span class="comment${colorClass}"&gt;${_e}&lt;/span&gt;`)
            })
            <span class="comment">// <span class="comment">&#60;&#33;&#45;&#45;HTML注释&#45;&#45;&#62;</span></span>
            const matchHtmlComment = block.match(/<span class="comment">&#60;&#33;&#45;&#45;\s*[\s\S]*?\s*&#45;&#45;&#62;</span>/g) || [];
            matchHtmlComment.forEach(e =&gt; {
                let content = e.replace(/<span class="comment">&#60;&#33;&#45;&#45;\s*/, '&lt;span class="comment"&gt;&#60;&#33;&#45;&#45;').replace(/\s*&#45;&#45;&#62;</span>/, '&#45;&#45;&#62;&lt;/span&gt;')
                block = block.replace(e, content)
            })

            <span class="comment">// Markdown格式 <a href="#" target="_blank">链接</a>、- 点列表、<strong>局部加粗</strong></span>
            while (/(\[([^\]\r\n]+)\]\(([^\)\r\n]+)\))/.exec(block) !== null) { 
                block = block.replace(RegExp.$1, `&lt;a href="${RegExp.$3}" target="_blank"&gt;${RegExp.$2}&lt;/a&gt;`) 
            }
            while (/^\s*(-\s([^\n\r]+))/m.exec(block) !== null) {
                block = block.replace(RegExp.$1, `● &lt;strong&gt;${RegExp.$2}&lt;/strong&gt;`);
                <span class="comment">//Search.add(path, RegExp.$2)</span>
            }
            while (/(\*\*([0-9a-zA-Z\u4e00-\u9fa5_-]+)\*\*)/.exec(block) !== null) {
                block = block.replace(RegExp.$1, `&lt;strong&gt;${RegExp.$2}&lt;/strong&gt;`)
                <span class="comment">//Search.add(path, RegExp.$2)</span>
            } 

            <span class="comment">// 模板符&#123; &#123;&#125; &#125;用图片表示</span>
            <span class="comment">// block = block.replace(/\{\{/g, `&lt;img :src="$withBase('/images/db-brace-left.png')"&gt;`)</span>
            <span class="comment">// block = block.replace(/\}\}/g, `&lt;img :src="$withBase('/images/db-brace-right.png')"&gt;`)</span>
            block = block.replace(/\{\{/g, `&#123; &#123;`)  
            block = block.replace(/\}\}/g, `&#125; &#125;`)

            <span class="comment">// 命令行示意</span>
            while (/^\x20*(([\w-\/]+)\&gt;)\s[^\r\n]+/m.exec(block) !== null) {
                block = block.replace(RegExp.$1, `&lt;span class="block-command"&gt;${RegExp.$2}&lt;/span&gt;`)
            }

            <span class="comment">/**
            * 点缀集
            * <i class="i1">text</i> <i class="i2">text</i> ❶❷❸❹❺❻❼❽❾<i class="order10">text</i>
            */</span>
            const orderMap = {"❶": 1, "❷": 2, "❸": 3, "❹": 4,"❺": 5,"❻": 6,"❼": 7,"❽": 8,"❾": 9,"❿": 10}
            while (/((\d)?([❶❷❸❹❺❻❼❽❾❿])?<i class="i0">([^</i>]+)◄)/.exec(block) !== null) {
                let className = 'i' + (RegExp.$2 || 0)
                if (RegExp.$3) className = 'order' + orderMap[RegExp.$3]
                block = block.replace(RegExp.$1, `&lt;i class="${className}"&gt;${RegExp.$4}&lt;/i&gt;`)
            }
            
            <span class="comment">/**
            * Detail
            * 突出简介隐藏详情
            * .vuepress/theme/layouts/Layout.vue
                mounted () {    
                    const $details = document.querySelectorAll('.block-detail')
                    $details.forEach(dom =&gt; {
                        dom.addEventListener('click', e =&gt; {
                            let tar = e.currentTarget
                            tar.className = tar.className === 'block-detail' ? 'block-detail active' : 'block-detail'
                        })
                    })
                }
            */</span>
            const REG_DETAIL_STR = regexpPresetParse([        
                {DETAIL_FORMAT: [{DETAIL_INDENT: `\\x20*`}, {TITLE: `.+`}, `\\s▾`, {STYLE: REG_STYLE_STR}, {COMMENT:`[^\\n]*`}, `[\\r\\n]`, {CONTENT_INDENT: `\\x20*`}, `↧`, {CONTENT: `[^</span></div></div>]+`}, `↥`]}
            ])
            const REG_DETAIL = new RegExp(REG_DETAIL_STR.value) 
            <span class="comment">// const REG_DETAIL = /(?&lt;DETAIL_FORMAT&gt;((?&lt;DETAIL_INDENT&gt;\x20*)(?&lt;TITLE&gt;.+)\s▾(?&lt;STYLE&gt;(\{[\w\s-;:'"#]+\})?)(?&lt;COMMENT&gt;\s*(.+)?)<a href="?&lt;CONTENT_INDENT&gt;\x20*" target="_blank">\r\n</a>↧(?&lt;CONTENT&gt;[^↥]+)↥))/</span>
            let detailMatch
            while ((detailMatch = REG_DETAIL.exec(block)) !== null) {
                let {DETAIL_FORMAT, DETAIL_INDENT, TITLE, STYLE, COMMENT, CONTENT_INDENT, CONTENT} =  detailMatch.groups, descStyle = 'class="detail-desc"'
                if (STYLE) descStyle += ` style="${STYLE.replace('{', '').replace('}', '')}"`
                block = block.replace(DETAIL_FORMAT, `&lt;div class="block-detail"&gt;${DETAIL_INDENT}&lt;span ${descStyle}&gt;${TITLE}&lt;/span&gt;&lt;span class="comment"&gt;${COMMENT}&lt;/span&gt;&lt;div class="detail-content"&gt;${CONTENT_INDENT}&lt;span&gt;${CONTENT}&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;`)
            }

            <span class="comment">/**
            * 标题表示一
            * <span class="title1" style="margin-top:15px;"><i></i> 52PX</span>
            * <span class="title2" style="margin-top:12px;"><i></i> 40PX</span>
            * <span class="title3" style="margin-top:9px;"><i></i> 30PX</span>
            * <span class="title4" style="margin-top:6px;"><i></i> 22PX</span>
            * <span class="title5" style="margin-top:3px;"><i></i> 16PX</span>
            * <span class="title6" style="margin-top:0px;"><i></i> 12PX</span>
            * <span class="title1 reverse1" style="margin-top:15px;color:#fff;background-color:#333"><i></i>颜色#等级#背景</span>
            */</span>
            while (/\s*(【(\w{3,6}#)?(-)?(\d)(#\w{3,6})?】(.+))/.exec(block) !== null) {
                let classStr = `title${RegExp.$4}`
                let styleStr = `margin-top:${(6 - RegExp.$4) * 3}px;`
                if (RegExp.$2) styleStr += `color:#${RegExp.$2.replace('#', '')};`
                if (RegExp.$3) classStr += ` reverse${RegExp.$4}`
                if (RegExp.$5) {
                    classStr += ` reverse1`
                    styleStr += `background-color:${RegExp.$5}`
                }
                block = block.replace(RegExp.$1, `&lt;span class="${classStr}" style="${styleStr}"&gt;&lt;i&gt;&lt;/i&gt;${RegExp.$6}&lt;/span&gt;`)
            }
            <span class="comment">/**
            * 标题表示二
            * <span class="h2">TITLE H2 14</span>
            * <span class="h3">TITLE H3 16</span>
            * <span class="h4">TITLE H4 18</span>
            * <span class="h5">TITLE H5 20</span>
            * <span class="h6">TITLE H6 22  </span>
            * <span class="h4 bg3 cf bd" style="color:#fff"> TITLE INVERT </span>
            * 应用环境：独占一行
            */</span>    
            const REG_TIT_STR = regexpPresetParse([
                `\\x20*`,                   <span class="comment">// 0任意空格</span>
                {FORMAT: [
                    {INVERT: `\\[?`},       <span class="comment">// 反相开始 [</span>
                    {LEVEL: `#{2,6}`},      <span class="comment">// 标题字号 #-######</span>
                    `\\]?`,                 <span class="comment">// 反相结束 ]</span>
                    {STYLE: REG_STYLE_STR}, <span class="comment">// 区配样式 {color: #fff}</span>
                    {CLASS: REG_CLASS_STR}, <span class="comment">// 匹配类名 (bd)</span>
                    `\\s`,                  <span class="comment">// 一个空格</span>
                    {TEXT: `[^\\n\\r\\{]+`} <span class="comment">// 标题文本</span>
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
                block = block.replace(FORMAT, `&lt;span ${str}&gt;${TEXT}&lt;/span&gt;`)
                <span class="comment">//Search.add(path, TEXT)</span>
            }
            
            
            

            <span class="comment">// 图片 <img :src="$withBase('/images/左移位运算符.jpg')"></span>
            const matchImage = block.match(&#47;&#92;<img :src="(&#46;&#43;&#63;)&#92;">&#47;g) &#124;&#124; [];
            matchImage.forEach(e =&gt; {
                const m = e.match(/\<img :src="(.+)?\">/)
                block = block.replace(e, `&lt;img :src="${m[1]}"&gt;`)
            })    

            <span class="comment">// 表单元素[FORM_START][FORM_END]</span>
            <span class="comment">// [FORM_START|vtop]</span>
            const matchForm = block.match(/\s*\[FORM_START\][\s\S]+?\[FORM_END\]\s*[\r\n]+/g) || [];
            matchForm.forEach(e =&gt; {
                let content = e.replace(/\s*\[FORM_START\]\s*[\r\n]+/, '').replace(/\s*\[FORM_END\]/, '') 
                <span class="comment">// ↴classname ↤ ↦</span>
                while (/(↴([\w\s-;:'"#]+[\w'";])?([\s\S]*)↤([\s\S]+)↦)/.exec(content) !== null) {
                    const $ALL = RegExp.$1, $STYLE = RegExp.$2, $CONTENT = RegExp.$4
                    content = content.replace($ALL, `&lt;span class="inline" style="${$STYLE}"&gt;${$CONTENT}&lt;/span&gt;`)
                }    
                
                <span class="comment">// INPUT:▭{}()value▭</span>
                while (/(▭(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(.+?)▭)/.exec(content) !== null) {
                    const $ALL = RegExp.$1, $STYLE = RegExp.$5, $CLASS = RegExp.$3 || RegExp.$7 || '', $VALUE = RegExp.$8, styleStr = $STYLE ? ` style="${$STYLE}"` : ''
                    content = content.replace($ALL, `&lt;span class="input ${$CLASS}"${styleStr}&gt;${$VALUE}&lt;/span&gt;`)
                }
                <span class="comment">// [BTN|正常置灰] [BTN&gt;主题激活] [BTNbg3 cf|自定义类]</span>
                while (/(\[BTN([\w\s-]*)([\&gt;\|]|&gt;)(.+?)\])/.exec(content) !== null) { 
                    const $ALL = RegExp.$1, $CLASS = RegExp.$2, $TYPE = RegExp.$3, $VAL = RegExp.$4
                    let classStr = 'button'
                    $CLASS && (classStr = 'button ' + $CLASS)
                    $TYPE === '&gt;' && (classStr = 'button active')
                    content = content.replace($ALL, `&lt;span class="${classStr}"&gt;${$VAL}&lt;/span&gt;`)
                }
                
                <span class="comment">// 选项卡：▥⇤Params  Authorization  [Headers]  Body  Pre-request Script  Tests  Settings▥</span>
                while (/((\x20*)▥(⇤?)(.+?)▥)/.exec(content) !== null) {
                    const $FORMAT = RegExp.$1, $INDENT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CONTENT = RegExp.$4 
                    let html = ''         
                    $CONTENT.split(/\x20{2,}/).forEach(item =&gt; { html += item.indexOf('[') &gt; -1 ? item.replace('[', '&lt;strong&gt;').replace(']', '&lt;/strong&gt;') : `&lt;i&gt;${item}&lt;/i&gt;` })
                    html = $SET_FLUSH ? `&lt;span class="tab"&gt;${html}&lt;/span&gt;` : `${$INDENT}&lt;span class="tab"&gt;${html}&lt;/span&gt;`
                    content = content.replace($FORMAT, html) 
                }  
                <span class="comment">// 单选框：◉⇤none  form-data  [x-www-form-urlencoded]  raw  binary  GraphQL◉</span>
                while (/((\x20*)◉(⇤?)(.+?)◉)/.exec(content) !== null) {
                    const $FORMAT = RegExp.$1, $INDENT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CONTENT = RegExp.$4 
                    let html = ''         
                    $CONTENT.split(/\x20{2,}/).forEach(item =&gt; { html += item.indexOf('[') &gt; -1 ? item.replace('[', '&lt;strong&gt;').replace(']', '&lt;/strong&gt;') : `&lt;i&gt;${item}&lt;/i&gt;` })
                    html = $SET_FLUSH ? `&lt;span class="radio"&gt;${html}&lt;/span&gt;` : `${$INDENT}&lt;span class="radio"&gt;${html}&lt;/span&gt;`
                    content = content.replace($FORMAT, html) 
                } 
                <span class="comment">// 单选框：▣⇤none  [form-data]  x-www-form-urlencoded  raw  [binary]  GraphQL▣</span>
                while (/((\x20*)▣(⇤?)(.+?)▣)/.exec(content) !== null) {
                    const $FORMAT = RegExp.$1, $INDENT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CONTENT = RegExp.$4 
                    let html = ''         
                    $CONTENT.split(/\x20{2,}/).forEach(item =&gt; { html += item.indexOf('[') &gt; -1 ? item.replace('[', '&lt;strong&gt;').replace(']', '&lt;/strong&gt;') : `&lt;i&gt;${item}&lt;/i&gt;` })
                    html = $SET_FLUSH ? `&lt;span class="checkbox"&gt;${html}&lt;/span&gt;` : `${$INDENT}&lt;span class="checkbox"&gt;${html}&lt;/span&gt;`
                    content = content.replace($FORMAT, html) 
                } 
                
                <span class="comment">// ▼collection-name{color:#f11}(bd)▼</span>
                <span class="comment">// ▼{}()选项一{}()  选项二▼</span>
                let drapdownMatch
                while ((drapdownMatch = /▼(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(.+?)▼/.exec(content)) !== null) {
                    const $ALL = drapdownMatch[0], $WRAPPER_STYLE = drapdownMatch[4], $WRAPPER_CLASS = drapdownMatch[2] || drapdownMatch[6], $CONTENT = drapdownMatch[7] 
                    let optionsStr = ''
                    $CONTENT.split('  ').forEach(option =&gt; {
                        const m = option.match(/([\w\s\u4e00-\u9fa5-]+)(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?/), $OPTION_TEXT = m[1], $OPTION_CLASS = m[3] || m[7] || '', $OPTION_STYLE = m[5] || ''
                        let str = ''
                        $OPTION_CLASS && (str += ` class="${$OPTION_CLASS}"`)
                        $OPTION_STYLE && (str += ` style="${$OPTION_STYLE}"`)
                        optionsStr += `&lt;i${str}&gt;${$OPTION_TEXT}&lt;/i&gt;`
                    })
                    content = content.replace($ALL, `&lt;span class="drop-down"&gt;${optionsStr}&lt;/span&gt;`)
                }
                
                <span class="comment">// ▤{color:#ccc}(bd)目录名称一{}()[子类名称{}(),子类名称{}()]  目录名称二▤</span>
                <span class="comment">// ▤菜单名称▤</span>
                let listMatch
                while ((listMatch = /▤(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(.+?)▤/.exec(content)) !== null) {        
                    const $ALL = listMatch[0], $WRAPPER_STYLE = listMatch[4], $WRAPPER_CLASS = listMatch[2] || listMatch[6], $CONTENT = listMatch[7] 
                    let styleStr = '', className = 'list', html = ''

                    $WRAPPER_STYLE && (styleStr = ` style="${$WRAPPER_STYLE}"`)
                    $WRAPPER_CLASS && (className += ' ' + $WRAPPER_CLASS)
                    $CONTENT.split(/\s{2,}/).forEach(item =&gt; {                
                        const m = item.match(/([\w\s\u4e00-\u9fa5-]+)(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?(\[(.+?)\])?/), $ITEM_TEXT = m[1], $ITEM_CLASS = m[3] || m[7] || '', $ITEM_STYLE = m[5] || '', $ITEM_SUB = m[9]
                        let itemClassName = 'item-title', itemStyleStr = ''
                        $ITEM_CLASS && (itemClassName += ' ' + $ITEM_CLASS)
                        $ITEM_STYLE && (itemStyleStr = ` style="${$ITEM_STYLE}"`)
                        let itemStr = `&lt;span class="${itemClassName}"${itemStyleStr}&gt;${$ITEM_TEXT}&lt;/span&gt;`
                        if ($ITEM_SUB) {  
                            let childrenStr = ''                  
                            $ITEM_SUB.split(',').forEach((e, i) =&gt; {
                                const m2 = e.match(/([\w\u4e00-\u9fa5-]+)(\(([\w\s-]+)\))?(\{([\w\s-;:'"#]+)\})?(\(([\w\s-]+)\))?/), $SUB_TEXT = m2[1], $SUB_CLASS = m2[3] || m2[7] || '', $SUB_STYLE = m2[5] || ''
                                let str = '' 
                                $SUB_STYLE && (str += ` style="${$STYLE}"`)
                                $SUB_CLASS && (str += ` class="${$SUB_CLASS}"`)
                                childrenStr += `&lt;i${str}&gt;${$SUB_TEXT}&lt;/i&gt;`                        
                            })
                            itemStr += `&lt;span class="sub-box"&gt;${childrenStr}&lt;/span&gt;`
                        }
                        html += `&lt;span class="list-item"&gt;${itemStr}&lt;/span&gt;`
                    })
                    content = content.replace($ALL, `&lt;span class="${className}"${styleStr}&gt;&lt;div class="list-wrapper"&gt;${html}&lt;/div&gt;&lt;/span&gt;`)
                }
                <span class="comment">/** 
                * 表格
                * ▦⇤VARIABLE(变量){color:26f}  INITIAL VALUE(初始值)  CURRENT VALUE(当前值)
                *     API{color:26f}  https://api.com:4432  https://api.com:4432
                * ▦
                */</span>
                while (/((\x20*)▦(⇤?)([\s\S]+?)[\r\n]+\x20*▦)/.exec(content) !== null) {
                    const $FORMAT = RegExp.$1, $INDENT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CONTENT = RegExp.$4            
                    let tableHtml = ''
                    const lines = $CONTENT.split(/\x20*[\r\n]+\x20*/)
                    const header = lines.splice(0, 1)[0].split(/\s{2,}/)
                    const colArr = [], colsNum = header.length
                    header.forEach(tit =&gt; { 
                        let hasStyle = tit.match(/\{([\w\s-;:'"#]+)\}/), styleStr = ''
                        if (hasStyle) {
                            styleStr = ` style="${hasStyle[1]}"`
                            tit = tit.replace(/\{([\w\s-;:'"#]+)\}/, '')
                        }
                        colArr.push(`&lt;strong&gt;${tit}&lt;/strong&gt;`) 
                    })
                    lines.forEach(line =&gt; {
                        const valArr = line.split(/\s{2,}/)
                        for (let i = 0; i &lt; colsNum; i++){
                            let val = valArr[i] || '', hasStyle = val.match(/\{([\w\s-;:'"#]+)\}/), styleStr = ''                    
                            if (hasStyle) {
                                styleStr = ` style="${hasStyle[1]}"`
                                val = val.replace(/\{([\w\s-;:'"#]+)\}/, '')
                            }                  
                            colArr[i] += `&lt;i${styleStr}&gt;${val}&lt;/i&gt;`
                        }
                    })
                    colArr.forEach(col =&gt; {
                        tableHtml += `&lt;span class="col"&gt;${col}&lt;/span&gt;`
                    })            
                    content = content.replace($FORMAT, `&lt;span class="table"&gt;${tableHtml}&lt;/span&gt;`) 
                }

                block = block.replace(e, `&lt;div class="form-elements"&gt;${content}&lt;/div&gt;`)
            })

            <span style="color:#f00" class="bd"><span class="comment">// 行样式</span></span>
            const REG_LINE_STYLE_STR = regexpPresetParse([
                `^\\x20*`,           <span class="comment">// 行缩进</span>
                {CONTENT_FORMAT: [
                    {CONTENT: `.+`}, <span class="comment">// 格式内容</span>
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
                block = block.replace(CONTENT_FORMAT, `&lt;span${cssStr}&gt;${CONTENT}&lt;/span&gt;`)
            }    

            <span class="comment">// <span style="color:#f00" class="bd">盒样式</span> 适合单行行内点缀</span>
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
                block = block.replace(BOX_FORMAT, `&lt;span${cssStr}&gt;${CONTENT}&lt;/span&gt;`)
            }
            <span class="comment">// <span style="color:#f00" class="bd">盒样式</span> 适合多行大段格式化</span>
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
                block = block.replace(BOX_FORMAT, `&lt;span${cssStr}&gt;${CONTENT}&lt;/span&gt;`)
            }

            <span class="comment">/**
            * 盒子：<div>{}()content</div>
            * 一个纯粹的块级元素包装
            */</span>
            while (/(\x20*)(<div>(⇤?)(\([\w\s-]+\))?(\{[\w\s-;:'"#]+\})?(\([\w\s-]+\))?(\x20*[\r\n]+)?([\s\S]+?)</div>)/.exec(block) !== null) {
                const $INDENT = RegExp.$1, $FORMAT = RegExp.$2, $SET_FLUSH = RegExp.$3, $CLASS = RegExp.$4 || RegExp.$6, $STYLE = RegExp.$5, $CONTENT = RegExp.$8
                let str = ''        
                $CLASS && (str += ` class=${$CLASS.replace('(','"').replace(')','"')}`)
                $STYLE && (str += ` style=${$STYLE.replace('{','"').replace('}','"')}`)
                block = block.replace($FORMAT, `&lt;div${str}&gt;${$CONTENT}&lt;/div&gt;`)
            }

            block = block.replace('===+', '\n&lt;pre class="code-block"&gt;').replace('</pre>', '</pre>')

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
        }↥
    notebook/docs/.data/components/regexp-preset.js ▾
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
    ↧{}↥
notebook/docs/.data/res-create.js ▾{background-color:#6d6;color:#fff}
    ↧↥
notebook/docs/.data/res-watch.js ▾{background-color:#6d6;color:#fff}
    ↧{}↥

notebook/docs/.data/PATH_DATA.json ▾
    ↧↥
notebook/docs/.data/RES_PATH.json ▾{color:#ccc;background-color:transparent}   // data:create时tree数据映射到资源名(资源扁平唯一)
    ↧↥


notebook/docs/.data/RES_INFO.json ▾
    ↧{
        links:[],
        editTime: ''
    }↥
notebook/docs/.doctree/data/KEY_RES.json       // 索引关键词  搜索 下拉
notebook/docs/.doctree/data/TIT_RES.json       // 索引标题    搜索 下拉
notebook/docs/.doctree/data/RES_SCENE.json     // 暴露的场景  主题 
notebook/docs/.doctree/data/RES_USAGE.json     // 暴露的攻略  主题
notebook/docs/.doctree/data/RES_SOLUTION.json  // 暴露的方案  主题
notebook/docs/.doctree/data/RES_STANDARD.json  // 暴露的标准  主题
notebook/docs/.doctree/data/RES_LINK.json      // 采集链接    外链






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


<pre class="code-block">
:::FLEX
+++ 1
&lt;strong&gt;<div> 资源&lt;/strong&gt;
● <strong><a href="http://icomoon.io/app" target="_blank">icomoon</a></strong>
+++
+++ 2
&lt;strong&gt;</div> 常用工具&lt;/strong&gt;
● <strong><a href="https://jsrun.net/new" target="_blank">JSRun</a></strong>
+++
+++ 1
&lt;strong&gt;■ 平台&文档&lt;/strong&gt;
● <strong><a href="https://github.com/" target="_blank">GitHub</a></strong>
+++
FLEX:::
</pre>







</div>