const {mkdirSync, writeFile} = require('./src/tools-fs')
const Path = require('path')
const generateFile = require('./generateFile')
const argArr = process.argv.slice(2)
const siteMap = require('./siteMap')
const dataToMap = require('./src/handleDataToMap.js')
const {ROOT_PATH, PATH_MAP_CREATOR, INDEX_CHILDREN, RES_MAP_PATH} = dataToMap(siteMap)

const handleCreator = ({type, path, target}) => {
    const ABSOLUTE_PATH = ROOT_PATH ? Path.resolve(__dirname, path) : Path.resolve(__dirname, '..' + path)
    type === 'DIR'  && mkdirSync(ABSOLUTE_PATH)
    type === 'FILE' && generateFile(ABSOLUTE_PATH, target)
}

if (argArr.length > 0) {
    for (let i = 0; i < argArr.length; i++) {
        let path = (ROOT_PATH && argArr[i].slice(0,2) !== '..') ? '..' + argArr[i] : argArr[i]
        let item = PATH_MAP_CREATOR[path]
        if (item && item.type === 'DIR') item = PATH_MAP_CREATOR[path += '/README']
        item ? handleCreator(item) : console.warn('参数' + path + '无效')
    }
} else {    
    for (key in PATH_MAP_CREATOR) { 
        handleCreator(PATH_MAP_CREATOR[key]) 
    } 
    writeFile(Path.resolve(__dirname, './.RES_MAP_PATH.json'), JSON.stringify(RES_MAP_PATH, null, 4))
}

