String.prototype.replaceAt=function(scope, replacement) {
    if (scope[0] > this.length) return this
    return this.substr(0, scope[0]) + replacement + this.substr(scope[0] + scope[1]);
}
module.exports = {
    parseStyle(code){   
        console.log(code);
        const regStyleBlock = /^-{10}[\r\n]([\s\S]+?)^-{10}(\d{1,2})?[\n\r]/m

        let styleBlock = code.match(regStyleBlock) 
        console.log(styleBlock);
        if (!styleBlock) return code
        
        let styleArr = styleBlock[1].match(/^\d.+/mg)
        let scope = styleBlock[2] * 1 || 10            
        
        code = code.replace(styleBlock[0], 'STYLEBLOCK\n')
        
        const regContent = new RegExp(`STYLEBLOCK[\r\n]{1,2}(([\r\n]{1,2}|^.*[\r\n]{1,2}){1,${scope}})`, 'm')
        let content = code.match(regContent)
        if (!content) return code

        let lineContentArr = content[1].match(/^.*[\r\n]{1,2}/gm)
        //console.log('lineContentArr', lineContentArr, lineContentArr.length);
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
                let contentLine = lineContentArr[i]
                let subStr = contentLine.slice(index[0], index[1])
                lineContentArr[i] = contentLine.replaceAt(index, `<span style="${style}">${subStr}</span>`)
            })
        }
        
        styleArr.forEach(e => {
            let info = e.match(/(\d{1,2}([\/-]\d{1,2})*)(\[\d{1,2}-\d{1,2}(\|\d{1,2}-\d{1,2})*\])*\(([\w ]+)\)/)
            
            // 行： 1/2/3     索引： [14-19|20-25]     样式： bold Cf00 18PX B0f0            
            handleCodeStyle(info[1], info[3], info[5])
        })

        let newContent = lineContentArr.join('\n')

        code = code.replace(content[0], newContent)
        
        return code
    }
}