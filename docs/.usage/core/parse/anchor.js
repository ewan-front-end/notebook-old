const {writeFileSync} = require('../../utils/fs')
const dataArr = []
const {dataPath} = require('../../config')
const LINKS = require(dataPath["stamp:link"])

module.exports = {
    parseAnchor(code, filePath) {
        let matchAnchor
        while ((matchAnchor = /ANCHOR\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
            code = code.replace(matchAnchor[0], `<div class="anchor" name="${matchAnchor[1]}" id="${matchAnchor[1]}"></div>\n`) 
            dataArr.push({stamp:matchAnchor[1], path:filePath, name:matchAnchor[2]})
        }
        return code
    },
    parseTitle(code, filePath){
        let m
        while ((m = /TITLE([1-6])\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
            code = code.replace(m[0], `<h${m[1]} id="${m[2]}">${m[3]}</h${m[1]}>`) 
            Anchor.add(m[1], m[2], filePath)
            dataArr.push({stamp:m[1], path:filePath, name:m[2]})
        }
        return code
    },
    parseLink(code){
        let m
        while ((m = /LINK\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {            
            let linkObj = LINKS[m[1]]
            if (linkObj) {
                let name = m[2] || linkObj.name, path = ''
                linkObj.path && (path = linkObj.path + '.html')
                code = code.replace(m[0], `<a href="${path}#${m[1]}">${name}</a>`)
            } else {
                console.log(m[0] +'处理失败，缺失锚点')
                code = code.replace(m[0], m[2])
            } 
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
                writeFileSync(dataPath["stamp:link"], LINKS)
                console.log('链接列表更新: ' + dataPath["stamp:link"])
            } catch (err) {
                console.log(err)
            }
        }
    }
}