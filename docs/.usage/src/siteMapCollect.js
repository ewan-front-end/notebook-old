const {SITE_MAP} = require('../data/siteMap')

// 从SITE_MAP中收集更新指定内容
module.exports = function collectUpdated(collectKey){
    let arr = []
    const handleDir = (children) => { 
        for (key in children) { handleItem(key, children[key]) } 
    }
    const handleItem = (key, item) => { 
        if (item[collectKey]){
            let obj = {} 
            obj.title = item[collectKey].title || item.title || item.linkName || '未命名'
            obj[collectKey] = item[collectKey]
            arr.push(obj) 
        }
        item.CHILDREN && handleDir(item.CHILDREN) 
    }
    for (key in SITE_MAP) { 
        let item = SITE_MAP[key]; handleItem(key, item) 
    }
    return arr
}