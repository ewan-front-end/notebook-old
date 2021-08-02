const commonLinks = require('../data/commonLinks')

String.prototype.replaceAt=function(scope, replacement) {
    if (scope[0] > this.length) return this
    return this.substr(0, scope[0]) + replacement + this.substr(scope[0] + scope[1]);
}
module.exports = {
    parseStyle(code){ 
        let styleBlock = code.match(/^-{10}[\r\n]{1,2}([\s\S]+?)^-{10}(\d{1,2})?[\r\n]{1,2}/m)         
        if (!styleBlock) return code
        
        let styleContent = styleBlock[1].match(/^\d.+/mg)
        let scope = styleBlock[2] * 1 || 10 
        //console.log(styleContent);           
        
        code = code.replace(styleBlock[0], 'STYLEBLOCK\n')
        
        let content = code.match(new RegExp(`STYLEBLOCK\n((^.*[\n\r\u2028\u2029]{1,2}){1,${scope}})`, 'm'))
        //console.log(content);
        if (!content) return code

        let contentLine = content[1].match(/^.*[\r\n]{1,2}/gm)
        console.log('contentLine', contentLine, contentLine.length, scope);

        const parseLine = str => {
            let arr = str.split('/')
            return arr
        }
        const parseIndex = index => eval(index.replace('-', ','))
        const parseStyle = str => {
            let style = ''
            str.split(' ').forEach(e => {
                if (e === 'bold') style += 'font-weight:bold;'
                if (e.match(/^C\w{3,6}/)) style += `color:${e.replace('C','#')};`
                if (e.match(/^B\w{3,6}/)) style += `background-color:${e.replace('B','#')};`
            })
            return style
        }
        const handleCodeStyle = (line, index, style) => {            
            style = parseStyle(style)
            index = parseIndex(index)
            const lineArr =  parseLine(line)
            lineArr.forEach(i => {
                let line = contentLine[i]
                let subStr = line.slice(index[0], index[1])
                contentLine[i] = line.replaceAt(index, `<span style="${style}">${subStr}</span>`)
            })
        }
        
        styleContent.forEach(e => {
            let info = e.match(/(\d{1,2}([\/-]\d{1,2})*)(\[\d{1,2}-\d{1,2}(\|\d{1,2}-\d{1,2})*\])*\(([\w ]+)\)/)
            
            // 行： 1/2/3     索引： [14-19|20-25]     样式： bold Cf00 18PX B0f0            
            handleCodeStyle(info[1], info[3], info[5])
        })
        //console.log(contentLine);
        let newContent = contentLine.join('')

        code = code.replace(content[0], newContent)
        
        return code
    },
    parseAnchor(code, filePath){
        let matchAnchor
        while ((matchAnchor = /ANCHOR\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
            //console.log('====', matchAnchor[1], matchAnchor[2]);
            code = code.replace(matchAnchor[0], `<a name="${matchAnchor[1]}" id="${matchAnchor[1]}">隐式锚点</a>`) 
            commonLinks.addAnchor(matchAnchor[1], matchAnchor[2], filePath)
        }
        commonLinks.save()
        return code
    },
    parseTitle(code, filePath){
        let m
        while ((m = /TITLE([1-6])\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
            console.log(m[1], m[2], m[3]);
            code = code.replace(m[0], `<h${m[1]} id="${m[2]}">${m[3]}</h${m[1]}>`) 
            commonLinks.addAnchor(m[1], m[2], filePath)
        }
        commonLinks.save()
        return code
    },
    parseLink(code){
        let m
        while ((m = /LINK\[(\d{13})\|?([^\]]*)\]/.exec(code)) !== null) {
            let linkObj = commonLinks.read(m[1])
            let name = m[2] || linkObj.name
            let path = ''
            linkObj.path && (path = linkObj.path + '.html')
            console.log('**',linkObj);
            code = code.replace(m[0], `<a href="${path}#${m[1]}">${name}</a>`)             
        }        
        return code
    }
}
//<h2 id="node插件开发"> node插件开发</h2>
//<a href="#node插件开发" class="header-anchor">#</a>