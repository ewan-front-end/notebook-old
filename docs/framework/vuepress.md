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
            <span>M 2022.03.05 09:37</span>
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
<span class="title1" style="margin-top:15px;"><i></i>实现一个VuePress插件</span>
<div class="block-detail"><span class="detail-desc">docs/.vuepress/config.js</span><span class="comment"></span><div class="detail-content">    <span>module.exports = {
        plugins: [
            require('./vuepress-plugin-super-block'), <span class="comment">// path.resolve(__dirname, './vuepress-plugin-super-block/index.js')</span>
        ]
    }</span></div></div>
docs/.vuepress/vuepress-plugin-super-block/
<span class="block-command">vuepress-plugin-super-block</span> npm init -y
<div class="block-detail"><span class="detail-desc">docs/.vuepress/vuepress-plugin-super-block/index.js</span><span class="comment"></span><div class="detail-content">    <span><span class="comment">/** 
     * @param {*} options 插件的配置选项
     * @param {*} ctx 编译期上下文
     * @returns 
     */</span>
    module.exports = (options, ctx) =&gt; {
        return {
            name: 'vuepress-plugin-super-block',
            async ready() {
                console.log('Hello World superblock!');
            }
        }
    }</span></div></div>



</pre>



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
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.data/data-create.js</span><span class="comment"></span><div class="detail-content">    <span>const Path = require('path'), ARG_ARR = process.argv.slice(2)  <span class="comment">// 命令参数</span>
    const { mkdirSync } = require('../.deploy/fs'), createFile = require('./components/createFile')
    let data = require('./index')

    <span class="comment">// 依据路径获取数据</span>
    const getDataByPath = path =&gt; {
        let arr = path.substring(1).split('/'), res = data, prop
        while (prop = arr.shift()) {prop && (res = res.children[prop])}
        return res
    }
    <span class="comment">// 生成文件与结构</span>
    const createItem = (item, path) =&gt; {    
        const absolutePath = Path.resolve(__dirname, '../' + path)
        if (item.children) {
            mkdirSync(absolutePath)
            createFile(Path.resolve(absolutePath, 'README'), item)
        } else {
            createFile(absolutePath, item)
        }
    }
    if (ARG_ARR.length &gt; 0) {
        delete require.cache[require.resolve('./index')]
        setTimeout(() =&gt; {
            data = require('./index')
            ARG_ARR.forEach(path =&gt; {            
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
    }</span></div></div>
<div class="block-detail">    <span class="detail-desc">./components/createFile.js</span><span class="comment"></span><div class="detail-content">        <span>const PATH = require('path')
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
<div class="block-detail">    <span class="detail-desc">./components/parseCode.js</span><span class="comment"></span><div class="detail-content">        <span><span class="comment">/**
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
<div class="block-detail">    <span class="detail-desc">./components/parseCustomBlock.js</span><span class="comment"></span><div class="detail-content">        <span>const &#123; fetch &#125; = require('&#46;&#46;&#47;&#46;&#46;&#47;config')
        const Search = fetch('PARSE|search')
        const Aggregate = fetch('PARSE|aggregate')
        const &#123; regexpPresetParse, PRESET_CSS &#125; = fetch('UTILS|regexp-preset')


        let TAG_MAP_BLOCK = &#123;&#125;, block_count = 0
        const REG_STYLE_STR = `(&#92;&#92;&#123;[&#92;&#92;w&#92;&#92;s-;&#58;'"#]&#43;&#92;&#92;&#125;)&#63;` &#47;&#47; color&#58; #f00; font-size&#58; 14px
        const REG_CLASS_STR = `(&#92;&#92;([&#92;&#92;w&#92;&#92;s-]&#43;&#92;&#92;))&#63;`      &#47;&#47; bd sz-16 c-0

        function parseCustomBlock(block, path) &#123;    
            

            block = block&#46;replace(&#47;&#92;&#60;&#47;g, "&lt;")&#46;replace(&#47;&#92;&#62;&#47;g, "&gt;")

            3&#47;&#47; ❖ 项目Project
            if (&#47;(❖&#92;s项目Project)&#47;&#46;exec(block)) &#123;
                block = block&#46;replace(RegExp&#46;$1, `&#60;div&#62;工具&#60;&#47;div&#62;`)
            &#125;

            
            2&#47;&#47; 聚合之采集
            block = Aggregate&#46;pick(block, 'vuepress')
            
            &#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47;&#47; 不会再有嵌套的格式优先解析，避免匹配到多余的其它格式的字符
            &#47;**
            * 行注释
            * 多匹配一个前置空格 替换时空格移到标签 防止被全等注释二次替换
            * 如：&#47;&#47; 注释 &#47;&#47; 注释  解析成：
            * 错误：&#60;span class="comment"&#62;&#60;span class="comment"&#62; &#47;&#47; 注释&#60;&#47;span&#62;&#60;&#47;span&#62; &#47;&#47; 注释
            * 正确： &#60;span class="comment"&#62;&#47;&#47; 注释&#60;&#47;span&#62;&#60;&#47;span&#62; &#60;span class="comment"&#62;&#47;&#47; 注释&#60;&#47;span&#62;&#60;&#47;span&#62;
            *&#47;
            const matchComment = block&#46;match(&#47;&#92;s&#92;d&#63;&#92;&#47;&#92;&#47;[^&#92;n&#92;r]&#43;&#47;g) || [];
            matchComment&#46;forEach(e =&#62; &#123;
                let colorClass = '', _e = e&#46;trim(), firstWord = _e&#46;substr(0,1)
                if (!isNaN(firstWord)) &#123;_e = _e&#46;replace(firstWord, ''); colorClass = ' color' &#43; firstWord&#125;
                block = block&#46;replace(e, ` &#60;span class="commentSUPER_BLOCK_0A#123;colorClass&#125;"&#62;SUPER_BLOCK_0A#123;_e&#125;&#60;&#47;span&#62;`)
            &#125;) 
            &#47;&#47; &#47;* 注释 *&#47;
            const matchComment2 = block&#46;match(&#47;&#92;d&#63;&#92;&#47;&#92;*[&#92;s&#92;S]*&#63;&#92;*&#92;&#47;&#47;g) || [];
            matchComment2&#46;forEach(e =&#62; &#123;
                let firstWord = e&#46;substr(0,1), colorClass = '', _e = e
                if (!isNaN(firstWord)) &#123;_e = _e&#46;replace(firstWord, ''); colorClass = ' color' &#43; firstWord&#125;
                block = block&#46;replace(e, `&#60;span class="commentSUPER_BLOCK_0A#123;colorClass&#125;"&#62;SUPER_BLOCK_0A#123;_e&#125;&#60;&#47;span&#62;`)
            &#125;)
            &#47;&#47; &#60;!-- HTML注释 --&#62;
            const matchHtmlComment = block&#46;match(&#47;&lt;!--&#92;s*[&#92;s&#92;S]*&#63;&#92;s*--&gt;&#47;g) || [];
            matchHtmlComment&#46;forEach(e =&#62; &#123;
                let content = e&#46;replace(&#47;&lt;!--&#92;s*&#47;, '&#60;span class="comment"&#62;&#60;&#33;&#45;&#45;')&#46;replace(&#47;&#92;s*--&gt;&#47;, '&#45;&#45;&#62;&#60;&#47;span&#62;')
                block = block&#46;replace(e, content)
            &#125;)

            &#47;&#47; Markdown格式 [链接](#)、- 点列表、**局部加粗**   
            while (&#47;(&#92;[([^&#92;]&#92;r&#92;n]&#43;)&#92;]&#92;(([^&#92;)&#92;r&#92;n]&#43;)&#92;))&#47;&#46;exec(block) !== null) &#123; 
                block = block&#46;replace(RegExp&#46;$1, `&#60;a href="SUPER_BLOCK_0A#123;RegExp&#46;$3&#125;" target="_blank"&#62;SUPER_BLOCK_0A#123;RegExp&#46;$2&#125;&#60;&#47;a&#62;`) 
            &#125;
            while (&#47;^&#92;s*(-&#92;s([^&#92;n&#92;r]&#43;))&#47;m&#46;exec(block) !== null) &#123;
                block = block&#46;replace(RegExp&#46;$1, `● &#60;strong&#62;SUPER_BLOCK_0A#123;RegExp&#46;$2&#125;&#60;&#47;strong&#62;`);
                Search&#46;add(path, RegExp&#46;$2)
            &#125;
            while (&#47;(&#92;*&#92;*([0-9a-zA-Z&#92;u4e00-&#92;u9fa5_-]&#43;)&#92;*&#92;*)&#47;&#46;exec(block) !== null) &#123;
                block = block&#46;replace(RegExp&#46;$1, `&#60;strong&#62;SUPER_BLOCK_0A#123;RegExp&#46;$2&#125;&#60;&#47;strong&#62;`)
                Search&#46;add(path, RegExp&#46;$2)
            &#125; 

            &#47;&#47; 模板符&#123;TEMPLATE&#123;&#125;TEMPLATE&#125;用图片表示
            &#47;&#47; block = block&#46;replace(&#47;&#92;&#123;&#92;&#123;&#47;g, `&#60;img &#58;src="$withBase('&#47;images&#47;db-brace-left&#46;png')"&#62;`)  
            &#47;&#47; block = block&#46;replace(&#47;&#92;&#125;&#92;&#125;&#47;g, `&#60;img &#58;src="$withBase('&#47;images&#47;db-brace-right&#46;png')"&#62;`)
            block = block&#46;replace(&#47;&#92;&#123;&#92;&#123;&#47;g, `&#123; &#123;`)  
            block = block&#46;replace(&#47;&#92;&#125;&#92;&#125;&#47;g, `&#125; &#125;`)

            &#47;&#47; 命令行示意
            while (&#47;^&#92;x20*(([&#92;w-&#92;&#47;]&#43;)&#92;&gt;)&#92;s[^&#92;r&#92;n]&#43;&#47;m&#46;exec(block) !== null) &#123;
                block = block&#46;replace(RegExp&#46;$1, `&#60;span class="block-command"&#62;SUPER_BLOCK_0A#123;RegExp&#46;$2&#125;&#60;&#47;span&#62;`)
            &#125;

            &#47;**
            * 点缀集
            * 1►text◄ 2►text◄ ❶❷❸❹❺❻❼❽❾❿►text◄
            *&#47;
            const orderMap = &#123;"❶"&#58; 1, "❷"&#58; 2, "❸"&#58; 3, "❹"&#58; 4,"❺"&#58; 5,"❻"&#58; 6,"❼"&#58; 7,"❽"&#58; 8,"❾"&#58; 9,"❿"&#58; 10&#125;
            while (&#47;((&#92;d)&#63;([❶❷❸❹❺❻❼❽❾❿])&#63;►([^◄]&#43;)◄)&#47;&#46;exec(block) !== null) &#123;
                let className = 'i' &#43; (RegExp&#46;$2 || 0)
                if (RegExp&#46;$3) className = 'order' &#43; orderMap[RegExp&#46;$3]
                block = block&#46;replace(RegExp&#46;$1, `&#60;i class="SUPER_BLOCK_0A#123;className&#125;"&#62;SUPER_BLOCK_0A#123;RegExp&#46;$4&#125;&#60;&#47;i&#62;`)
            &#125;
            
            &#47;**
            * Detail
            * 突出简介隐藏详情
            * &#46;vuepress&#47;theme&#47;layouts&#47;Layout&#46;vue
                mounted () &#123;    
                    const $details = document&#46;querySelectorAll('&#46;block-detail')
                    $details&#46;forEach(dom =&#62; &#123;
                        dom&#46;addEventListener('click', e =&#62; &#123;
                            let tar = e&#46;currentTarget
                            tar&#46;className = tar&#46;className === 'block-detail' &#63; 'block-detail active' &#58; 'block-detail'
                        &#125;)
                    &#125;)
                &#125;
            *&#47;
            const REG_DETAIL_STR = regexpPresetParse([        
                &#123;DETAIL_FORMAT&#58; [&#123;DETAIL_INDENT&#58; `&#92;&#92;x20*`&#125;, &#123;TITLE&#58; `&#46;&#43;`&#125;, `&#92;&#92;s▾`, &#123;STYLE&#58; REG_STYLE_STR&#125;, &#123;COMMENT&#58;`[^&#92;&#92;n]*`&#125;, `[&#92;&#92;r&#92;&#92;n]`, &#123;CONTENT_INDENT&#58; `&#92;&#92;x20*`&#125;, `&#8615;`, &#123;CONTENT&#58; `[^&#8613;]&#43;`&#125;, `&#8613;`]&#125;
            ])
            const REG_DETAIL = new RegExp(REG_DETAIL_STR&#46;value) 
            &#47;&#47; const REG_DETAIL = &#47;(&#63;&#60;DETAIL_FORMAT&#62;((&#63;&#60;DETAIL_INDENT&#62;&#92;x20*)(&#63;&#60;TITLE&#62;&#46;&#43;)&#92;s▾(&#63;&#60;STYLE&#62;(&#92;&#123;[&#92;w&#92;s-;&#58;'"#]&#43;&#92;&#125;)&#63;)(&#63;&#60;COMMENT&#62;&#92;s*(&#46;&#43;)&#63;)[&#92;r&#92;n](&#63;&#60;CONTENT_INDENT&#62;&#92;x20*)&#8615;(&#63;&#60;CONTENT&#62;[^&#8613;]&#43;)&#8613;))&#47;
            let detailMatch
            while ((detailMatch = REG_DETAIL&#46;exec(block)) !== null) &#123;
                let &#123;DETAIL_FORMAT, DETAIL_INDENT, TITLE, STYLE, COMMENT, CONTENT_INDENT, CONTENT&#125; =  detailMatch&#46;groups, descStyle = 'class="detail-desc"'
                if (STYLE) descStyle &#43;= ` style="SUPER_BLOCK_0A#123;STYLE&#46;replace('&#123;', '')&#46;replace('&#125;', '')&#125;"`
                block = block&#46;replace(DETAIL_FORMAT, `&#60;div class="block-detail"&#62;SUPER_BLOCK_0A#123;DETAIL_INDENT&#125;&#60;span SUPER_BLOCK_0A#123;descStyle&#125;&#62;SUPER_BLOCK_0A#123;TITLE&#125;&#60;&#47;span&#62;&#60;span class="comment"&#62;SUPER_BLOCK_0A#123;COMMENT&#125;&#60;&#47;span&#62;&#60;div class="detail-content"&#62;SUPER_BLOCK_0A#123;CONTENT_INDENT&#125;&#60;span&#62;SUPER_BLOCK_0A#123;CONTENT&#125;&#60;&#47;span&#62;&#60;&#47;div&#62;&#60;&#47;div&#62;`)
            &#125;

        </span></div></div>
<div class="block-detail">    <span class="detail-desc">./components/regexp-preset.js</span><span class="comment"></span><div class="detail-content">        <span>function htmlEscape(content) {
            return content.replace(/&/g, '&amp;').replace(/&lt;/g, '&lt;').replace(/&gt;/g, '&gt;')
        }

        function arrayToRegStr(arr, parentKey) {
            let value = ``, html = ``
            arr.forEach(item =&gt; { 
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
                    if (count &gt; 0) throw '自定义正则字符串格式，不能包含一个以上命名: ' + i
                    value += `&lt;${i}&gt;`
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
                <span class="comment">//console.log(value);</span>
                return {
                    value,
                    html
                }
            } else {
                throw '非法自定义正则段格式: ' + e
            }       
        }

        module.exports = {
            regexpPresetParse: arr =&gt; {
                let value = ``, html = ``
                arr.forEach(item =&gt; { 
                    let res = objToRegStr(item)
                    value += res.value 
                    html += res.html
                })
                return {
                    value,
                    html: `&lt;span class="regexp"&gt;${htmlEscape(html).replace(/【/g, '&lt;').replace(/】/g, '&gt;')}&lt;/span&gt;`
                }       
            },
            PRESET_CSS: {
                CSS: [
                    {CSS_1: `\\{[\\w\\s-;:'"#]+\}|\\([\\w\\s-]+\\)`},
                    {CSS_2: `(\\{[\\w\\s-;:'"#]+\\})?(\\([\\w\\s-]+\\))?`}
                ]
            }
        }</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.data/data-watch.js</span><span class="comment"></span><div class="detail-content">    <span>const exec = require('child_process').exec, Path = require('path'), chokidar = require('chokidar')

    let dataFile = require('./index')

    <span class="comment">// 对比差异</span>
    const diffPath = []
    const addChild = (node, path) =&gt; {
        if (node.children) {
            diffPath.push(path + '/')
            addChildren(node.children, path + '/')
        } else {
            diffPath.push(path)
        }
    }
    const addChildren = (children, parentPath) =&gt; {for (var key in children) {addChild(children[key], parentPath + key)}TEMPLATE}
    function handleDataChildren(oChildren, nChildren, parentPath) {for (key in nChildren) { compareDiff(oChildren[key], nChildren[key], key, parentPath) }TEMPLATE}
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
        .on('error', error =&gt; log(`data监听错误: ${error}`)) 
        .on('change', path =&gt; {
            delete require.cache[require.resolve('./index')]
            setTimeout(() =&gt; {
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
        })</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.data/res-create.js</span><span class="comment"></span><div class="detail-content">    <span>{}</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.data/res-watch.js</span><span class="comment"></span><div class="detail-content">    <span>{}</span></div></div>

<span class="h2 bg3 cf"> 聚合与维持 </span>
notebook/docs/.data/PATH_DATA.json ▾
    ↧↥
notebook/docs/.data/RES_PATH.json ▾{color:#ccc;background-color:transparent}   <span class="comment">// data:create时tree数据映射到资源名(资源扁平唯一)</span>
    ↧↥


<div class="block-detail"><span class="detail-desc">notebook/docs/.data/RES_INFO.json</span><span class="comment"></span><div class="detail-content">    <span>{
        links:[],
        editTime: ''
    }</span></div></div>
notebook/docs/.doctree/data/KEY_RES.json       <span class="comment">// 索引关键词  搜索 下拉</span>
notebook/docs/.doctree/data/TIT_RES.json       <span class="comment">// 索引标题    搜索 下拉</span>
notebook/docs/.doctree/data/RES_SCENE.json     <span class="comment">// 暴露的场景  主题</span>
notebook/docs/.doctree/data/RES_USAGE.json     <span class="comment">// 暴露的攻略  主题</span>
notebook/docs/.doctree/data/RES_SOLUTION.json  <span class="comment">// 暴露的方案  主题</span>
notebook/docs/.doctree/data/RES_STANDARD.json  <span class="comment">// 暴露的标准  主题</span>
notebook/docs/.doctree/data/RES_LINK.json      <span class="comment">// 采集链接    外链</span>






<span class="h6 bg3 cf"> 开发规范 </span>
    &#45; Markdown点列表
    &#42;*行内加粗*&#42;

    &#35; 标题文本
    [&#35;] 反相标题
    标题 [1][2][3][4][5][6] [fff#1#333]颜色#等级#背景
    序号标题 (1)(2)(3)(4)(5)(6)(7)(8)(9)

    &#9658;全局点缀&#9668;
    1&#9658;预设颜色1-9&#9668;
    
    <span class="comment">// 单行注释给你</span>
    <span class="comment">/* 多行注释 */</span>

    &#91;img:$withBase('/images/插入图片.jpg')&#93; 

    行样式&#91;{color:#f00}(bd)&#93;    
    &#91;盒样式{color:#f00}(bd)&#93;

    Description Of Detail &#9662;{color:#3ac}
    &#8615;Detail Content&#8613;

    &#9632;⇤&#123;&#125;&#40;bd&#41;盒子：包装一个块级元素&#9632;  <span class="comment">// ⇤为是否顶格</span>
    <div>{}(bd)CONTENT</div>
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
<span class="h6 bg3 cf"> 内容规范 </span>
    搜索
        埋码：1.[KEY#id:KEY1KEY2KEY3] 2.# 标题 
        数据：
        "KEY1KEY2KEY3":filename#id

    链接
        引入：[优先标题:vuepress#id]
        埋码：[ANCHOR#id:入库标题] 
<div class="block-detail">        <span class="detail-desc">数据：</span><span class="comment"></span><div class="detail-content">            <span>vuepress:{
                path:'', 
                links: {
                    usage: '入库标题'
                }
            }</span></div></div>
    场景Scene
        ◒ Identity:场景名称
        
        ◓ 
        数据：[
            {Identity:{
                title:'场景名称',
                res: 'reskey'
            }TEMPLATE}
        ]
    攻略Usage
        
        <a class="usage" href="/aggregation/usage#filename_Identity">攻略名称</a>
        数据：[
            {Identity:{
                title:'攻略名称',
                res: 'reskey',
                steps: ['第一点','第二点','第三点']
            }TEMPLATE}
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
        展示：&lt;a href="path#id"&gt;&#91;方案名称:solution#filename-id&#93;&lt;/a&gt;
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
            }TEMPLATE}
        ]
    <div>工具</div>

<span class="h6 bg3 cf"> config.js    </span>
    资源调度 <span class="comment">// 应对重构导至的工具、插件等变更</span>
<span class="h6 bg3 cf"> 文档体系 </span>
    结构：树形        
    作用：生成成体系的文档系统，可扩展、重构、穿插、链接、特种图形图表、层次表达、主次表达等
    目标：响应变动，包括增删改，搜索
    实现：响应增删改：watch-tree.js
         搜索：依赖资源收集的数据：SEARCH_KEY.js、SEARCH_TITLE.js等
<span class="h6 bg3 cf"> MD文件的命名规范 </span>
● <strong>扁平化文件管理，保持文件名唯一，防止资源树重构造成的路径改变，文件名可用于资源、链接索引</strong>

<span class="h6 bg3 cf"> 链接方案 </span>
依赖md文件的命名规范
● <strong>目标</strong>
    1. 格式 &#91;链接名&#93;&#40;url&#41; 面临链接地址变更的问题
    2. 链接数可自动提取
    3. 可扩展
● <strong>场景</strong>
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
    path: '/framework/vuepress' <span class="comment">// 资源树路径</span>
}
create-links.js
目标 [######] 链接方案

{
    vuepress: {
        "链接方案": {href:}
    }
}



<span class="h6 bg3 cf"> 配置与调度 </span>
docs/.usage/config.js
{
    "DATA": {
        "main": "data/.MAIN.js",                       <span class="comment">// 主数据</span>
        "src:path": "data/.SRC_PATH.json",             <span class="comment">// 用于：编辑资源文件时查找主数据路径</span>
        "src:updateTime": "data/.SRC_UPDATETIME.json", <span class="comment">// 用于：编辑资源文件时记录更新时间</span>
        "path:data": "data/.PATH_DATA.json",           <span class="comment">// 用于：编辑资源文件时记录更新时间</span>
        "creator": "data/.CREATOR.json",               <span class="comment">// 用于：创建目录与文件的依据</span>
        "stamp:link": "data/.STAMP_LINK.json",         <span class="comment">// 解析内容时收集的链接表</span>
        "scene": "data/.SCENE.json",                   <span class="comment">// 场景</span>
        "usage": "data/.USAGE.json",                   <span class="comment">// 攻略</span>
        "solution": "data/.SOLUTION.json",             <span class="comment">// 方案</span>
        "standard": "data/.STANDARD.json",             <span class="comment">// 标准</span>
        "path:keywords": "data/.PATH_KEYWORDS.json",   <span class="comment">// 数据结构关键词</span>
        "path:search": "data/.SEARCH.json",            <span class="comment">// 可用于搜索(数据结构和内容摘要)</span>
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
    fetch = identifier =&gt; { const [type, key] = identifier.split('|'); return fetchFileByType<a href="key" target="_blank">type</a> },
    fetchPath = identifier =&gt; { const [type, key] = identifier.split('|'); return fetchPathByType<a href="key" target="_blank">type</a> },
    read = identifier =&gt; { const [type, key] = identifier.split('|'); return readFileByType<a href="key" target="_blank">type</a> }
}
用法：
    const {fetch} = require('../config')
    fetch('UTILS|fs')
    fetch("DATA|creator")
    fetch('CORE|create-file')
</pre>


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