.vuepress/config.js
```js
module.exports = {
    themeConfig: {
        /** 导航栏 **
         **********************************************************************
         * 包含LOGO、页面标题、搜索框、 导航栏链接、多语言切换、仓库链接等
         * 公共资源库：docs/.vuepress/public/logo.png
         * 链接类型：普通链接、外部链接、下拉列表、分组下拉列表
         * 注：禁用导航栏
         */
        logo: '/logo.png', 
        nav: [
            { text: 'Home', link: '/' },                                              
            { text: 'External', link: 'https://google.com', target:'_self', rel:'' }, 
            {                                                                         
                text: 'Languages',
                ariaLabel: 'Language Menu',
                // 普通/分组 二选一
                items: [
                    { text: 'Chinese', link: '/language/chinese/' },
                    { text: 'Japanese', link: '/language/japanese/' }
                ]
                items: [
                    { text: 'Group1', items: [{ text: 'Chinese', link: '/language/chinese/' }] },
                    { text: 'Group2', items: [{ text: 'Japanese', link: '/language/japanese/' }] }
                ]
            }
        ],
        
        /** 侧边栏
         **********************************************************************
         * 禁用侧边栏
         * 自动侧栏
         * 嵌套深度 默认为 1 为0时禁用标题链接 注：重写深度
         * 链接类型：自动获取链接文本、显式指定链接文本、嵌套标题链接
         * 分组
         * 页面sidebar定制 
         * 注：应用于特定路由(如特定语言)
         * 注：显示所有页面的标题链接(默认只显示当前页标题)
         * 注：活动的标题链接(浏览器地址栏)禁用
        
         */
        sidebarDepth: 1,
        sidebar: false,
        sidebar: auto    
        sidebar: [
            '/',                             
            ['/b', 'Explicit link text'],
            {
                title: "工具",
                collapsable: false,
                children:[
                    ['../tools/doc/', '文档'],
                    ['../tools/webpack/', 'Webpack']
                ]
            }
        ]
        sidebar: [
            {
                title: 'Group 1',   // 必要的
                path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是true可折叠, false永远都是展开状态
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: ['/']
            },
            {
                title: 'Group 2',
                children: [ /* ... */ ],
                initialOpenGroupIndex: -1 // 可选的, 默认值是 0
            }
        ]
        sidebar: {
            '/foo/': ['', 'one', 'two'],
            '/bar/': ['', 'three', 'four']
        },

        /** 内置搜索框
         **********************************************************************
         * 禁用
         * 搜索结果数量 默认
         * 注：设置tags优化搜索结果
         */
        search: false,            
        searchMaxSuggestions: 10, 

        /** Algolia全文搜索
         **********************************************************************
         * 会覆盖内置搜索框
         */
        algolia: {
            apiKey: '<API_KEY>',
            indexName: '<INDEX_NAME>'
        }

        /** 上一篇/下一篇
         **********************************************************************
         * 默认值 true
         */
        nextLinks: false, 
        prevLinks: false, 

        /** Git仓库和编辑链接
         **********************************************************************
         * 1 假定是GitHub. 同时也可以是一个完整的 GitLab URL
         * 2 自定义仓库链接文字。默认自动推断为"GitHub"/"GitLab"/"Bitbucket" 或"Source"
         * 3 假如你的文档仓库和项目本身不在一个仓库：
         * 4 假如文档不是放在仓库的根目录下：
         * 5 假如文档放在一个特定的分支下：
         * 6 默认是 false, 设置为 true 来启用
         * 7 默认为 "Edit this page"
         */        
        repo: 'vuejs/vuepress',            // 1
        repoLabel: '查看源码',              // 2
        
        docsRepo: 'vuejs/vuepress',        // 3        
        docsDir: 'docs',                   // 4        
        docsBranch: 'master',              // 5        
        editLinks: true,                   // 6        
        editLinkText: '帮助我们改善此页面！' // 

        /** 启用页面滚动效果
         **********************************************************************
         * 默认值 false
         */
        smoothScroll: true
    }
}
```
front-matter 当前页生效
```
---
navbar: false    禁用导航栏
sidebar: false   禁用侧边栏
sidebar: auto    自动侧栏
sidebarDepth: 2  重写侧栏深度
search: false    禁用搜索框
prev: ./page1    上一篇
next: false      下一篇
editLink: false  禁用编辑链接

pageClass: custom-page-class  便针对该页添加一些专门的CSS 参考##自定义CLASS
---
```

注：应用于特定路由
themeConfig: {'/zh/': {navbar: false, sidebar: 'auto', search: false ...}}

注：显示所有页面的标题链接(默认只显示当前页标题)
themeConfig: { displayAllHeaders: true }

注：活动的标题链接(浏览器地址栏)禁用
themeConfig: { activeHeaderLinks: false }

注：设置tags优化搜索结果
```
---
tags:
  - 配置
  - 主题
  - 索引
---
```




## 主页
docs/README.md
```{2,16}
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
