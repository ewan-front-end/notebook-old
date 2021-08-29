
/* 
锚点 ANCHOR[1627821297226|NPM帐户]   时间戳｜锚点ID  【写】.COMMON_LINKS.json: 1627821297226:{path:"npm", name:"NPM帐户"}         ANCHOR标识用于搜索
标题 TITLE2[1627821297226|NPM帐户]                  【写】.COMMON_LINKS.json: 1627821297226:{path:"npm", name:"NPM帐户"}         TITLE1-6

链接 LINK[1627821297226] 或 TITLE[1627821297226|重新命名]    【读】.COMMON_LINKS.json: 1627821297226:{path:"npm", name:"NPM帐户"}  【写】 [NPM帐户](npm)
*/
const {reWriteFile} = require('../common.js')
const PATH = './.COMMON_LINKS.json'
const DATA = require(PATH)
const dataArr = []
module.exports = {
    addAnchor(stamp, name, path){ dataArr.push({stamp, path, name}) },
    read: stamp => DATA[stamp],
    save(){        
        if (dataArr.length > 0) {
            dataArr.forEach(item => {
                DATA[item.stamp] = item
            })
            reWriteFile(PATH, DATA)
        }
    }    
}