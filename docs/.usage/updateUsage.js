const fs = require('fs')
const path = require('path')
const siteMap = require('./siteMap')
const vuepressConfig = require('../.vuepress/config')

let usageArr = []

const createDir = (children) => {
    for (key in children) { handleItem(key, children[key]) }
}
const handleItem = (key, item) => {
    if (item.usage){
        usageArr.push({
            title: item.usage.title || item.title || item.linkName || '未命名',
            usage: item.usage
        })
    }
    // 创建
    item.CHILDREN && createDir(item.CHILDREN)  
}

for (key in siteMap) {
    let item = siteMap[key]  
    handleItem(key, item)
}

// 聚合页面
let aggregationContent = ``
function handleUsage(usage){
    const desc = usage.desc
    const descType = Object.prototype.toString.call(desc)
    if (descType === '[object String]') {
        aggregationContent += `> ${desc}` // 添加简单内容
    }
    if (descType === '[object Object]') {
        aggregationContent += `> ${desc.title}: ${desc.text}` // 添加 [标题：文本] 结构内容
    }
    if (descType === '[object Array]') { // 添加 简单内容 或 [标题：文本] 组合的列表
        desc.forEach(e => {
            const eType = Object.prototype.toString.call(e)
            if(eType === '[object Object]'){
                aggregationContent += `> ${e.title}: ${e.text}`
                if (e.notes) {
                    e.notes.forEach(note => {
                        aggregationContent += ` 【${note[0]}】`
                    })
                }
                aggregationContent += `<br>\n`
            } else {
                aggregationContent += `> ${e}<br>\n`
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
        aggregationContent += `## ${usage.title || item.title}攻略\n` // 添加标题
        handleUsage(usage)
    }
    if (usageType === '[object Array]') {
        aggregationContent += `## ${item.title}攻略\n` // 添加标题
        usage.forEach(sort => {
            aggregationContent += `- ${sort.title}\n` // 添加分类标题
            handleUsage(sort)
        })
    }
    aggregationContent += `\n`
})
console.log(aggregationContent)

// 写入导航菜单
vuepressConfig.themeConfig.nav.push({
    "text": "聚合",
    "link": "/aggregation"
})
//fs.writeFile(path.resolve(__dirname, '../.vuepress/config.js'), `module.exports = ${JSON.stringify(vuepressConfig, null, 4)}`, { encoding: 'utf8' }, err => {  })
