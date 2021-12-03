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
            <span>M 2021.12.03 20:30</span>
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
<span class="block-command">notebook</span> npm install vuepress --save-dev
notebook/docs/
<div class="block-detail"><span class="detail-desc">notebook/docs/README.md</span> <div class="detail-content">    <span>Hello VuePress</span></div></div>
<div class="block-detail"><span class="detail-desc">notebook/package.json</span><div class="detail-content">    <span>{"scripts": {"docs:dev": "vuepress dev docs", "docs:build": "vuepress build docs"<img :src="$withBase('/images/db-brace-right.png')"></span></div></div>
<span class="block-command">notebook</span> npm run docs:dev
    http://localhost:8080

<span class="h2 bg3 cf"> 部署基础功能 </span>
notebook/docs/.deploy/
<div class="block-detail"><span class="detail-desc">notebook/docs/.deploy/config.js</span><div class="detail-content">    <span>const PATH = require('path')
    const MAP_UTILS = {
        "fs": "../.utils/fs"
    }
    const MAP_DIR = {
        ".vuepress": "../.vuepress"
    }

    module.exports.utils = key =&gt; {
        return require(PATH.resolve(__dirname, MAP_UTILS[key]))
    }
    module.exports.dir = key =&gt; {
        return PATH.resolve(__dirname, MAP_DIR[key])
    }</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.deploy/index.js</span><div class="detail-content">    <span>const {utils, dir} = require('./config')
    const { mkdirSync } = utils('fs')

    mkdirSync(dir('.vuepress'), res =&gt; {
        console.log('创建目录：docs/.vuepress', res.message)
    })</span></div></div>
<div class="block-detail"><span class="detail-desc">notebook/package.json</span><div class="detail-content">    <span>"scripts": {
        "deploy": "node docs/.deploy/index.js"        
    }</span></div></div>
<span class="block-command">notebook</span> npm run <span style="color:#0c0">deploy</span> 

<span class="h2 bg3 cf"> 建立文档体系 </span>
notebook/docs/.doctree/
<div class="block-detail"><span class="detail-desc">notebook/docs/.doctree/tree.js</span><div class="detail-content">    <span>{
        vue: {
            title: 'Vue', src: 'vue/index', 
            links: [name: 'vue-element-admin',href: 'vue/vue-element-admin/index'], 
            children: {}, 
            peripheral: {
                mvvm: {title: 'MVVM模式', src: 'vue/mvvm'}
            }
        }    
    }</span></div></div>
<div class="block-detail"><span class="detail-desc">notebook/package.json</span><div class="detail-content">    <span>"scripts": {
        "create": "node docs/.doctree/create.js"
        "watch:tree": "node docs/.doctree/watch-tree.js"      
    }</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.doctree/watch-tree.js</span><div class="detail-content">    <span>{}</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.doctree/create.js</span><div class="detail-content">    <span>{
        vue: {
            title: 'Vue', src: 'vue_index', 
            links: [name: 'vue-element-admin',href: 'vue/vue-element-admin/index'], 
            children: {}, 
            peripheral: {
                mvvm: {title: 'MVVM模式', src: 'vue/mvvm'}
            }
        }    
    }</span></div></div>
<span class="block-command">notebook</span> npm run <span style="color:#0c0">create</span>                       <span class="comment color4">// 依据体系树创建初级文档</span>
<span class="block-command">notebook</span> npm run <span style="color:#0c0">watch:tree</span>                   <span class="comment color4">// 监控tree树变化</span>
<div class="block-detail"><span class="detail-desc" style="color:#ccc;background-color:transparent">notebook/docs/.doctree/data/RES_DATA.json</span>   <span class="comment">// create时tree数据映射到资源名(资源扁平唯一)</span><div class="detail-content">
    <span>vuepress_index: {
        path: '', <span class="comment">// 链接、文件结构</span>
    }</span></div></div>

● <strong>资源库</strong>
notebook/docs/.doctree/markdown/
notebook/docs/.doctree/markdown/vuepress.md
<div class="block-detail"><span class="detail-desc">notebook/package.json</span> <span class="comment">// 设置scripts</span><div class="detail-content">
    <span>"scripts": {
        "watch:res": "node docs/.doctree/watch-res.js",
        "gather": "node docs/.doctree/gather.js"  
    }</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.doctree/watch-res.js</span><div class="detail-content">    <span>{}</span></div></div>
<span class="block-command">notebook</span> npm run <span style="color:#0c0">watch:res</span>                    <span class="comment color4">// 监控资源变化 依据RES_DATA检索对应的Path更新对应的资源(由扁平到结构)</span>
<span style="color:#3ac">notebook/docs/.doctree/data/RES_TIME.json</span>      <span class="comment">// 更新编辑时间</span>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.doctree/gather.js</span>            <span class="comment color4">// 抓取数据</span><div class="detail-content">
    <span>{}</span></div></div>
<span class="cc">notebook/docs/.doctree/data/KEY_RES.json</span>       <span class="comment">// 索引关键词  搜索 下拉</span>
<span class="cc">notebook/docs/.doctree/data/TIT_RES.json</span>       <span class="comment">// 索引标题    搜索 下拉</span>
<span class="cc">notebook/docs/.doctree/data/RES_SCENE.json</span>     <span class="comment">// 暴露的场景  主题</span>
<span class="cc">notebook/docs/.doctree/data/RES_USAGE.json</span>     <span class="comment">// 暴露的攻略  主题</span>
<span class="cc">notebook/docs/.doctree/data/RES_SOLUTION.json</span>  <span class="comment">// 暴露的方案  主题</span>
<span class="cc">notebook/docs/.doctree/data/RES_STANDARD.json</span>  <span class="comment">// 暴露的标准  主题</span>
<span class="cc">notebook/docs/.doctree/data/RES_LINK.json</span>      <span class="comment">// 采集链接    外链</span>

● <strong>统筹</strong>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.doctree/scene.js</span><div class="detail-content">    <span>{}</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.doctree/usage.js</span><div class="detail-content">    <span>{}</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.doctree/solution.js</span><div class="detail-content">    <span>{}</span></div></div>
<div class="block-detail"><span class="detail-desc" style="background-color:#6d6;color:#fff">notebook/docs/.doctree/standard.js</span><div class="detail-content">    <span>{}</span></div></div>

<span class="h6 bg3 cf"> 开发规范 </span>
    &#45; Markdown点列表
    &#42;*行内加粗*&#42;

    &#35; 标题文本
    [&#35;] 反相标题
    
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
        埋码：1.[KEY#id:KEY1KEY2KEY3] 2.<span class="h1">标题 </span>
        数据：
        "KEY1KEY2KEY3":filename#id

    链接
        引入：[优先标题:vuepress#id]
        埋码：[ANCHOR#id:入库标题] 
<div class="block-detail">        <span class="detail-desc">数据：</span><div class="detail-content">            <span>vuepress:{
                path:'', 
                links: {
                    usage: '入库标题'
                }
            }</span></div></div>
    场景Scene
        ★ Identity:场景名称
        
        ☆ 
        数据：[
            {Identity:{
                title:'场景名称',
                res: 'reskey'
            <img :src="$withBase('/images/db-brace-right.png')">
        ]
    攻略Usage
        
        ◒ Identity:攻略名称
        第一点
        第二点
        第三点
        ◓
        数据：[
            {Identity:{
                title:'攻略名称',
                res: 'reskey',
                steps: ['第一点','第二点','第三点']
            <img :src="$withBase('/images/db-brace-right.png')">
        ]
    方案Solution
        ✿ Identity:方案名称
        去问问在
        ❀
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
            <img :src="$withBase('/images/db-brace-right.png')">
        ]

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
目标 <span class="h6 bg3 cf"> 链接方案 </span>

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