/**
 * 弹性盒子
 * 目标：<div class="box-flex"><div class="box-flex-item flex-8">col 01</div><div class="box-flex-item classname" style="flex-basis:100px">col 02</div></div>
 * 格式：
    ---------- 8             小于等于10 flex-grow: 8
    col 01
    ========== 100classname  大于10 flex-basis: n  可注入自定义classname
    col 02
    ----------
 */
module.exports = code => {
    let matchFLEX
    while ((matchFLEX = /\-{10,}\s(\d{1,4})([a-z-]*)[\r\n]([\s\S]+?)\-{10,}/.exec(code)) !== null) { 
        let itemSize = matchFLEX[1],
            itemClass = matchFLEX[2],                
            itemStyle = '',
            content = matchFLEX[3]
        
        if (itemSize > 10) { itemStyle = ` style="flex-basis:${itemSize}px"` } else { itemClass += ' flex-' + itemSize }

        let matchNext, itemsStr = ''
        while (matchNext = /([\s\S]+?)={10,}\s(\d{1,4})([a-z-]*)[\r\n]/.exec(content)){                
            content = content.replace(matchNext[0], '')
            itemsStr += `\n<div class="box-flex-item ${itemClass}"${itemStyle}>\n${matchNext[1]}\n</div>`

            itemSize = matchNext[2],
            itemClass = matchNext[3],                    
            itemStyle = ''
            if (itemSize > 10) { itemStyle = ` style="flex-basis:${itemSize}px"` } else { itemClass += ' flex-' + itemSize }                
        }
        
        itemsStr += `\n<div class="box-flex-item ${itemClass}"${itemStyle}>\n${content}\n</div>`
        code = code.replace(matchFLEX[0], `<div class="box-flex">${itemsStr}\n</div>`)            
    }
    return code
}
            