
const PATH = require('path')
const {readFile} = require('./scripts/utils/fs')

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

// 资源中枢
const MAP_DIR = {
    ".usage": "../.usage",
    ".usage/resources/md": "../.usage/resources/md",
    ".vuepress": "../.vuepress",
    ".vuepress/public": "../.vuepress/public",
    ".vuepress/styles": "../.vuepress/styles"
}
const MAP_FILE = {
    "package": "../../package.json",
    ".vuepress/config": "../.vuepress/config.js",
    "logo": "../.vuepress/public/logo.png",
    "doc.scene": "../scene.md",
    "doc.usage": "../usage.md",
    "doc.solution": "../solution.md",
    "doc.standard": "../standard.md"
}
const MAP_RES = {
    "logo": "resources/images/logo.png",
    "markdown.scene": "resources/md/scene.md",
    "markdown.usage": "resources/md/usage.md",
    "markdown.solution": "resources/md/solution.md",
    "markdown.standard": "resources/md/standard.md"
}
const MAP_DATA = {
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

    "res:data": "data/.RES_DATA.json",            // 可用于搜索(数据结构和内容摘要)
}
const MAP_UTILS = {
    "fs": "scripts/utils/fs",
    "ewan": "scripts/utils/ewan.js",
    "regexp-preset": "scripts/utils/regexp-preset.js"
}
const MAP_CORE = {
    "create": "core/create.js",
    "create-file": "core/create-file.js",
    "create-file-parse.js": "core/create-file-parse.js"
}
const MAP_PARSE = {
    "flex": "core/parse/flex.js",
    "uml": "core/parse/uml.js",
    "custom-block": "core/parse/custom-block.js", // 自定义代码块解析
    "anchor": "core/parse/anchor.js",
    "search": "core/parse/search.js",
    "aggregate": "core/parse/aggregate.js"
}
const requireFile = relativePath => require(PATH.resolve(__dirname, relativePath))
const readFileFn = relativePath => readFile(PATH.resolve(__dirname, relativePath))
const fetchFileByType = {
    "DATA": key => requireFile(MAP_DATA[key]),
    "UTILS": key => requireFile(MAP_UTILS[key]),
    "CORE": key => requireFile(MAP_CORE[key]),
    "PARSE": key => requireFile(MAP_PARSE[key]),
    "FILE": key => requireFile(MAP_FILE[key]),
    "RES": key => requireFile(MAP_RES[key])
}
const fetchPathByType = {
    "DATA": key => PATH.resolve(__dirname, MAP_DATA[key]),
    "UTILS": key => PATH.resolve(__dirname, MAP_UTILS[key]),
    "CORE": key => PATH.resolve(__dirname, MAP_CORE[key]),
    "PARSE": key => PATH.resolve(__dirname, MAP_PARSE[key]),
    "DIR": key => PATH.resolve(__dirname, MAP_DIR[key]),
    "FILE": key => PATH.resolve(__dirname, MAP_FILE[key]),
    "RES": key => PATH.resolve(__dirname, MAP_RES[key])
}
const readFileByType = {
    "DATA": key => readFileFn(MAP_DATA[key]),
    "UTILS": key => readFileFn(MAP_UTILS[key]),
    "CORE": key => readFileFn(MAP_CORE[key]),
    "PARSE": key => readFileFn(MAP_PARSE[key]),
    "FILE": key => readFileFn(MAP_FILE[key]),
    "RES": key => readFileFn(MAP_RES[key])
}
module.exports.fetch = identifier => {
    const [type, key] = identifier.split('|')
    return fetchFileByType[type](key)
}
module.exports.fetchPath = identifier => {
    const [type, key] = identifier.split('|')
    return fetchPathByType[type](key)
}
module.exports.read = identifier => {
    const [type, key] = identifier.split('|')
    return readFileByType[type](key)
}