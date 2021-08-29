const PATH = require('path')
const ARG_ARR = process.argv.slice(2)                    // 命令参数

const DATA_CONFIG = require('../data2/config')
const SRC_UPDATETIME = require(DATA_CONFIG["src:updateTime"])
const PATH_DATA = require(DATA_CONFIG["path:data"])
const CREATOR = require(DATA_CONFIG["creator"])

const { mkdirSync, writeFile, readFile } = require('../tools-fs')
const createFile = require('./create-file')

let updateItems = {}

const handleCreator = (item, path) => {
    const ABSOLUTE_PATH = PATH.resolve(__dirname, '../../' + path)
    if (path.match(/\/$/m)) {
        mkdirSync(ABSOLUTE_PATH)
        createFile(PATH.resolve(ABSOLUTE_PATH, 'README'), item, path + 'README')
    } else {
        createFile(ABSOLUTE_PATH, item, path)
    }
}
const createHomeFile = () => {
    let {src, children} = PATH_DATA["/"]
    let content = readFile(PATH.resolve(__dirname, '../resources/md/'+src+'.md'))
    let childStr = ''
    children.forEach(path => {
        let title = PATH_DATA[path].title || ''
        childStr += `- [︳${title}](${path})\n`
    })
    content = `---\nsidebar: false\n---\n\n<div class="root-children block-main">\n\n${childStr}\n</div>\n\n## 文档地图\n` + content
    writeFile(PATH.resolve(__dirname, '../../README.md'), content)
}

if (ARG_ARR.length > 0) {
    for (let i = 0; i < ARG_ARR.length; i++) {
        let path = ARG_ARR[i] 
        let item = PATH_DATA[path]
        if (path === "/" || path === "/README") {
            createHomeFile()
        } else {
            item ? handleCreator(item, path) : console.warn('参数' + path + '无效')
        }
        
    }
} else {
    CREATOR.forEach(path => {
        let item = PATH_DATA[path]
        if (path === "/" || path === "/README") {
            createHomeFile()
        } else {
            item ? handleCreator(item, path) : console.warn(path + '创建失败！')
        }
    })
}

