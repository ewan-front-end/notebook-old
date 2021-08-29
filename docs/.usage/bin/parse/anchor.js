const fs = require('fs')
const dataArr = []
const DATA_CONFIG = require('../../data2/config')
const LINKS = require(DATA_CONFIG["stamp:link"])

module.exports = {
    parseAnchor(code, filePath) {
        let matchAnchor
        while ((matchAnchor = /ANCHOR\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
            code = code.replace(matchAnchor[0], `<div class="anchor" name="${matchAnchor[1]}" id="${matchAnchor[1]}"></div>\n`) 
            dataArr.push({stamp:matchAnchor[1], path:matchAnchor[2], name:filePath})
        }
        return code
    },
    parseTitle(code, filePath){
        let m
        while ((m = /TITLE([1-6])\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
            code = code.replace(m[0], `<h${m[1]} id="${m[2]}">${m[3]}</h${m[1]}>`) 
            Anchor.add(m[1], m[2], filePath)
            dataArr.push({stamp:m[1], path:m[2], name:filePath})
        }
        return code
    },
    parseLink(code){
        let m
        while ((m = /LINK\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
            let linkObj = LINKS[m[1]] 
            let name = m[2] || linkObj.name
            let path = ''
            linkObj.path && (path = linkObj.path + '.html')
            code = code.replace(m[0], `<a href="${path}#${m[1]}">${name}</a>`)      
        }        
        return code
    },
    add(stamp, name, path){ dataArr.push({stamp, path, name}) },
    read: stamp => LINKS[stamp],
    save(){
        if (dataArr.length > 0) {
            dataArr.forEach(item => {
                LINKS[item.stamp] = item
            })
            try {
                fs.writeFileSync(DATA_CONFIG["stamp:link"], JSON.stringify(LINKS, null, 4))
                console.log('链接列表更新: ' + DATA_CONFIG["stamp:link"])
            } catch (err) {
                console.log(err)
            }
        }
    }
}