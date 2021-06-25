const {mkdirSync, writeFile, readFile} = require('./src/tools-fs')
const Path = require('path')
const generateFile = require('./generateFile')
const argArr = process.argv.slice(2)
const siteMap = require('./siteMap')
const dataToMap = require('./src/handleDataToMap.js')
const {PATH_MAP_CREATOR, INDEX_CHILDREN_STR, RES_MAP_PATH} = dataToMap(siteMap)

const handleCreator = ({type, path, target}) => {
    const ABSOLUTE_PATH = Path.resolve(__dirname, '..' + path)
    type === 'DIR'  && mkdirSync(ABSOLUTE_PATH)
    type === 'FILE' && generateFile(ABSOLUTE_PATH, target)
}
const createIndexFile = () => {
    let content = readFile(Path.resolve(__dirname, './resources/md/index.md'))
    content += `---\nsidebar: false\n---\n\n${INDEX_CHILDREN_STR}\n\n## 文档地图\n`
    writeFile(Path.resolve(__dirname, '../README.md'), content)
}

if (argArr.length > 0) {
    for (let i = 0; i < argArr.length; i++) {
        let path = argArr[i]
        if (path === '/' || path === '/README' || path === '/index') {
            createIndexFile()
        } else {
            let item = PATH_MAP_CREATOR[path]
            if (item && item.type === 'DIR') item = PATH_MAP_CREATOR[path += '/README']
            item ? handleCreator(item) : console.warn('参数' + path + '无效')
        }
    }
} else {
    for (key in PATH_MAP_CREATOR) { 
        handleCreator(PATH_MAP_CREATOR[key]) 
    } 
    createIndexFile()    
    writeFile(Path.resolve(__dirname, './.RES_MAP_PATH.json'), JSON.stringify(RES_MAP_PATH, null, 4))
}

