# 最佳实践
https://github.com/ewan-front-end/notebook.git

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
  
  configureWebpack: {},                                 // 详细:Webpack配置
  head: [['link', { rel: 'icon', href: '/logo.ico' }]], // 详细:注入head标签
  themeConfig: {},                                      // 详细:导航

  base: '/bar/',          // 当站点被部署到一个非根路径
  port: '8080',           // 指定用于dev服务器的端口
  dest: '.vuepress/dist', // 指定vuepress build的输出目录
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


## 开发


## 详细
.vuepress/config.js
#### Webpack配置
```js
configureWebpack: {
  resolve: {
    alias: {
      '@alias': 'path/to/some/dir'
    }
  }
}
```

#### 注入head标签
```js
head: [
  ['link', { rel: 'icon', href: '/logo.ico' }]
]
```

#### 导航
```js
themeConfig: {
  nav: [
    { text: '指南', link: '/' },
  ],
  sidebarDepth: 1,
  sidebar: [
    ['/', '简介'],
    {
      title: "工具",
      collapsable: false,
      children:[
        ['../tools/doc/', '文档'],
        ['../tools/webpack/', 'Webpack']
      ]
    }
  ]
}
```

## 默认主题


## 开发主题
#### 一个组件的简单主题
1. .vuepress/theme
2. .vuepress/theme/Layout.vue
3. 






# 二次开发
├─ docs
│  └─ .vuepress-ewan
│     ├─ config.js
│     ├─ siteMap.js
│     └─ app.js 

【demo】npm init -y<br>
【demo】npm install -D vuepress






