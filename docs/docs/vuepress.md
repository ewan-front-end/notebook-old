[上一级](../)


[自定义主题-使用其它布局](#自定义主题)
[自定义主题-使用全局布局组件](#使用全局布局组件)
[自定义主题-主题应用插件](#主题应用插件)

## 改造默认主题
- 克隆默认主题代码 `vuepress-demo/docs> vuepress eject`  
  1. 使用vuepress命令,需全局安装VUEPRESS：**npm i vuepress -g**
  2. 代码会克隆到 vuepress-demo/docs/.vuepress/theme/ 下

- styles/index.styl 
  ```css
  body
    font-size 16px                                    font-size 14px        字号基础值

  blockquote                                                                引用块 
    font-size 1rem                                    font-size 0.85rem   
    margin 1rem 0                                     margin 0.5rem 0
    padding .25rem 0 .25rem 1rem                      padding 0 0 0 1rem

  ul, ol
                                                      margin: 0.5rem 0

  p, ul, ol
    line-height 1.7                                   line-height 1.2
  ```

- styles/wrapper.styl
  ```css
  $wrapper                                          
    max-width $contentWidth                           max-width none        页面内容宽
  ```

- styles/code.styl                                                          代码块
  ```css
  {$contentClass}
  pre, pre[class*="language-"]
    padding 1.25rem 1.5rem                            padding 0.2rem 1.5rem 0.4rem 1.5rem
  ```



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

## 集成第三方到主题
  - npm init -y
  - .vuepress/theme> npm i element-ui --save
  - 如果要按需引入 则
    .vuepress/theme> npm i babel-plugin-component --save-dev<br>
    .vuepress/theme/.babelrc `{"presets": [["es2015", { "modules": false }]], "plugins": [["component", {"libraryName": "element-ui", "styleLibraryName": "theme-chalk"}]]}`
  - .vuepress/theme/enhanceApp.js
    ```js
    import {Menu, Submenu, MenuItem, MenuItemGroup} from 'element-ui'; // 按需引入
    import 'element-ui/lib/theme-chalk/index.css';
    export default ({
      Vue,     // VuePress 正在使用的 Vue 构造函数
      options, // 附加到根实例的一些选项
      router,  // 当前应用的路由实例
      siteData // 站点元数据
    }) => {
      Vue.use(Menu)
      Vue.use(Submenu)
      Vue.use(MenuItem)
      Vue.use(MenuItemGroup)
    }
    ```

## 手动引入Markdown样式






## 入门部署
demo> npm init -y<br>
demo> npm install -D vuepress
1. demo/docs/README.md  `# Hello VuePress `
2. demo/package.json    `"scripts": { "docs:dev": "vuepress dev docs", "docs:build": "vuepress build docs" }`
3. npm run docs:dev

[实践部署](#最佳完整实践) [配置](#配置)

## 开发


## 配置
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     ├─ config.js     基础配置
│     └─ enhanceApp.js 应用
└─ package.json

#### 基础配置
```js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {},                    // [默认主题详情](#默认主题) [自定义主题](#自定义主题)
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
#### 应用
```js
export default ({
  Vue,      // VuePress 正在使用的 Vue 构造函数
  options,  // 附加到根实例的一些选项
  router,   // 当前应用的路由实例
  siteData, // 站点元数据
  isServer  // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // 做一些其他的应用级别的优化
}
```
导航 demo/docs/.vuepress/themeConfig.nav
```
```

## 使用指南


项目根目录/

1. 创建 docs 目录
2. 复制 .usage 到 docs/
3. 基础部署 node docs/.usage/deploy.js
4. 地图创建 node docs/.usage/create.js
5. npm run docs:dev
附 创建指定文件：node docs/.usage/create.js /scene /tools/npm
附 数据格式测试：node docs/.usage/siteMapTest.js 
附 具体文件编译：node docs/.usage/createFile.js
附 收集更新攻略：node docs/.usage/updateUsage.js
附 收集更新场景：node docs/.usage/updateScene.js


## 公共资源库
统一放在 .vuepress/public      (系统规范)<br>
图片资源 .vuepress/public/images (自定义规范)<br>
`<img :src="$withBase('/images/logo.png')">`

## 部署到一个非根路径
你将需要在 .vuepress/config.js 中设置 base，举例来说，如果你打算将你的网站部署到 https://foo.github.io/bar/，那么 base 的值就应该被设置为 "/bar/" (应当总是以斜杠开始，并以斜杠结束)

## 默认主题
docs/.vuepress/config.js
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
    sidebar: 'auto',    
    sidebar: [
        '/',                             
        ['/b', 'Explicit link text'],
        {title: "工具", collapsable: false, children:[['../tools/doc/', '文档'], ['../tools/webpack/', 'Webpack']]}
    ],
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
    ],
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
    algolia: {apiKey: '<API_KEY>', indexName: '<INDEX_NAME>'}
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

## 自定义主题


## 一个组件的简单主题
docs/.vuepress/theme
docs/.vuepress/theme/Layout.vue
```
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

```
theme
├── global-components
│   └── xxx.vue
├── components
│   └── xxx.vue
├── layouts
│   ├── GlobalLayout.vue
│   ├── Layout.vue (必要的)
│   └── 404.vue
├── styles
│   ├── index.styl
│   └── palette.styl
├── templates
│   ├── dev.html
│   └── ssr.html
├── index.js
├── enhanceApp.js
└── package.json
```




docs/.vuepress/theme/index.js
```js
module.exports = (themeConfig, ctx) => {
   return {
      // ...
   }
}
```


-----------------------------------------------------------------

- 链接
[默认主题](./default-theme)  [开发一个主题](./new-theme) [Front-matter](./front-matter)  [拓展](./tuozhan) 

# 使用攻略(.usage)

1. 创建 demo/docs 目录
2. 复制 notebook/docs/.usage 到 demo/docs/

demo➤ node docs/.usage/deploy.js    基础部署<br>
demo➤ node docs/.usage/create.js    地图创建<br>
demo➤ npm run docs:dev              开发<br>
demo➤ npm run docs:build            打包<br>


# 原生使用

【demo】npm init -y<br>
【demo】npm install -D vuepress

## 部署
1. demo/docs/README.md
    ```md
    # Hello VuePress

    ```
2. demo/package.json
    ```json 
    "scripts": {
      "docs:dev": "vuepress dev docs",
      "docs:build": "vuepress build docs" 
    }
    ```
3. npm run docs:dev

## 配置
```
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     ├─ config.js
│     └─ enhanceApp.js 应用
└─ package.json
```

 
配置 **.vuepress/config.js**
```js
module.exports = {
  title: '标题文本',
  description: '说明文本',

  // Webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }, 

  // 注入head标签                     
  head: [['link', { rel: 'icon', href: '/logo.ico' }]], 

  // link默认主题
  themeConfig: {},                                  

  base: '/bar/',          // 当站点被部署到一个非根路径
  port: '8080',           // 指定用于dev服务器的端口
  dest: '.vuepress/dist', // 指定vuepress build的输出目录

  /**
   * 使用新主题
   * links: 默认主题 开发一个主题
   */
  //theme: 'vuepress-theme-xx'
  //theme: '@org/vuepress-theme-xxx', // 或者一个官方主题: '@vuepress/theme-xxx'
}
```
应用 **.vuepress/enhanceApp.js**
```js
export default ({
  Vue,      // VuePress 正在使用的 Vue 构造函数
  options,  // 附加到根实例的一些选项
  router,   // 当前应用的路由实例
  siteData, // 站点元数据
  isServer  // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // 做一些其他的应用级别的优化
}
```
## 样式
```js
export default ({
  Vue,      // VuePress 正在使用的 Vue 构造函数
  options,  // 附加到根实例的一些选项
  router,   // 当前应用的路由实例
  siteData, // 站点元数据
  isServer  // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // 做一些其他的应用级别的优化
}
```




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




