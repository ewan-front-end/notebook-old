
/* 
锚点 [1627821297226|NPM帐户]   时间戳｜锚点ID  写.COMMON_LINKS.json: 1627821297226:{path:"npm", name:"NPM帐户"}

标题 TITLE[1627821297226] 或 TITLE[1627821297226|重新命名]   【读】.COMMON_LINKS.json: 1627821297226:{path:"npm", name:"NPM帐户"}  【写】 ## NPM帐户 或 ## 重新命名
链接 LINK[1627821297226] 或 TITLE[1627821297226|重新命名]    【读】.COMMON_LINKS.json: 1627821297226:{path:"npm", name:"NPM帐户"}  【写】 [NPM帐户](npm)
*/
const DATA = require('./.COMMON_LINKS.json')
const data = {}
module.exports = {
    parseAnchor(stamp, name, path){

    },
    parseTitle(){},
    parseLink(){},
    read: stamp => DATA[stamp],
    save(){}    
}