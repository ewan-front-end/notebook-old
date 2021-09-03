const path = require('path')

module.exports.config = {
    title: '标题文本',
    description: '说明文本',
    
    // 默认主题配置
    themeConfig: {
        port: '9000',
        logo: '/logo.png', // 公共资源库：docs/.vuepress/public/
        nav: [
            { text: '首页', link: '/' },
            { text: '工具', link: '/tools/' },
            { text: '项目', link: '/projects/' },
        ],
        sidebarDepth: 2,
        sidebar: 'auto'
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@res': 'resources',
                '@res_md': 'resources/md'
            }
        }
    },
    debug: true
}

// 依赖列表 vuepress会自动安装无需罗列
module.exports.dependencies = [
    //{name: 'vuepress', version: '', type: 'save-dev'}
]

// 命令别名
module.exports.aliasCommand = {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
}

// 数据文件
module.exports.dataPath = {
    "main": path.resolve(__dirname, "data/.MAIN.js"),                  // 主数据
    "src:path": path.resolve(__dirname, "data/.SRC_PATH.json"),             // 用于：编辑资源文件时查找主数据路径
    "src:updateTime": path.resolve(__dirname, "data/.SRC_UPDATETIME.json"), // 用于：编辑资源文件时记录更新时间
    "path:data": path.resolve(__dirname, "data/.PATH_DATA.json"),           // 用于：编辑资源文件时记录更新时间     
    "creator": path.resolve(__dirname, "data/.CREATOR.json"),               // 用于：创建目录与文件的依据
    "stamp:link": path.resolve(__dirname, "data/.STAMP_LINK.json"),         // 解析内容时收集的链接表
    "scene": path.resolve(__dirname, "data/.SCENE.json"),                   // 场景
    "usage": path.resolve(__dirname, "data/.USAGE.json"),                   // 攻略
    "solution": path.resolve(__dirname, "data/.SOLUTION.json"),             // 方案
    "standard": path.resolve(__dirname, "data/.STANDARD.json"),             // 标准
    "path:keywords": path.resolve(__dirname, "data/.PATH_KEYWORDS.json"),   // 数据结构关键词
    "path:search": path.resolve(__dirname, "data/.SEARCH.json"),            // 可用于搜索(数据结构和内容摘要)
}