
const PATH = require('path')

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
const dataPathMap = {
    "main": "data/.MAIN.js",                  // 主数据
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
}
const utilsMap = {
    "fs": "scripts/utils/fs",
}
const coreMap = {
    "create-file": "core/create-file.js"
}

const requireFile = relativePath => require(PATH.resolve(__dirname, relativePath))
const fetchFileByType = {
    "DATA": key => requireFile(dataPathMap[key]),
    "UTILS": key => requireFile(utilsMap[key]),
    "CORE": key => requireFile(coreMap[key])
}
const fetchPathByType = {
    "DATA": key => PATH.resolve(__dirname, dataPathMap[key]),
    "UTILS": key => PATH.resolve(__dirname, utilsMap[key]),
    "CORE": key => PATH.resolve(__dirname, coreMap[key])
}

// 资源中枢
module.exports.fetch = identifier => {
    const [type, key] = identifier.split('|')
    return fetchFileByType[type](key)
}
module.exports.fetchPath = identifier => {
    const [type, key] = identifier.split('|')
    return fetchPathByType[type](key)
}