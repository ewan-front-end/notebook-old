const {fetch, fetchPath} = require('../../center')
const {writeFileSync} = fetch('UTILS|fs')
const PATH_KEYWORDS = fetch("DATA|path:keywords")
let debounceTimer

module.exports = {    
    add(path, keywords){ 
        keywords = keywords.toLowerCase().replace(/(\x20{2,})|(\/\/\x20)/g, '')
        if (PATH_KEYWORDS[path]) {
            PATH_KEYWORDS[path].keywords += `■${keywords}`
        } else {
            PATH_KEYWORDS[path] = {keywords, key: '未知'}
        }
    },
    save(){    
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function(){
            writeFileSync(fetchPath("DATA|path:search"), PATH_KEYWORDS, () => {console.log('搜索数据创建: ' + fetchPath("DATA|path:keywords"))})
        }, 500)  
    }
}