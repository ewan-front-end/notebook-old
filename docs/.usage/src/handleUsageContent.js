
module.exports = function (usageArr) {
    let content = ``
    function handleUsage(usage){
        const desc = usage.desc
        const descType = Object.prototype.toString.call(desc)
        if (descType === '[object String]') {
            content += `> ${desc}` // 添加简单内容
        }
        if (descType === '[object Object]') {
            content += `> ${desc.title}: ${desc.text}` // 添加 [标题：文本] 结构内容
        }
        if (descType === '[object Array]') { // 添加 简单内容 或 [标题：文本] 组合的列表
            desc.forEach(e => {
                const eType = Object.prototype.toString.call(e)
                if(eType === '[object Object]'){
                    content += `> ${e.title}: ${e.text}`
                    if (e.links) {
                        e.links.forEach(link => {
                            content += ` 【${link[0]}】`
                        })
                    }
                    content += `<br>\n`
                } else {
                    content += `> ${e}<br>\n`
                }            
            })            
        }
    }
    usageArr.forEach(item => { 
        const usage = item.usage   
        const usageType = Object.prototype.toString.call(usage)
        //[object Object]
        //[object Array]
        if (usageType === '[object Object]') {
            content += `## ${usage.title || item.title}攻略\n` // 添加标题
            handleUsage(usage)
        }
        if (usageType === '[object Array]') {
            content += `## ${item.title}攻略\n` // 添加标题
            usage.forEach(sort => {
                content += `- ${sort.title}\n` // 添加分类标题
                handleUsage(sort)
            })
        }
        content += `\n`
    })
    return content
}