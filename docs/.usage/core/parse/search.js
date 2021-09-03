const {writeFileSync} = require('../../utils/fs')
const {dataPath} = require('../../config')
const PATH_KEYWORDS = require(dataPath["path:keywords"])
let debounceTimer

module.exports = {    
    add(path, keywords){ 
        keywords = keywords.replace(/(\x20{2,})|(\/\/\x20)/g, '')
        if (PATH_KEYWORDS[path]) {
            PATH_KEYWORDS[path].keywords += `■${keywords}`
        } else {
            PATH_KEYWORDS[path] = {keywords, key: '未知'}
        }
    },
    save(){    
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function(){
            writeFileSync(dataPath["path:search"], PATH_KEYWORDS, () => {console.log('搜索数据创建: ' + dataPath["path:keywords"])})
        }, 500)  
    }
}